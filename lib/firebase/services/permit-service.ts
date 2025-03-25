import { db } from "../config"
import { COLLECTIONS, type Permit } from "../collections"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
} from "firebase/firestore"

// Get all permits with pagination
export const getPermits = async (
  lastVisible?: DocumentSnapshot,
  pageSize = 10,
  filterOptions?: { status?: string; type?: string },
): Promise<{ permits: Permit[]; lastVisible: QueryDocumentSnapshot | null }> => {
  try {
    // Start with a simple query to avoid index issues
    let q = query(
      collection(db, COLLECTIONS.PERMITS),
      orderBy("createdAt", "desc"),
      limit(pageSize * 2), // Fetch more to allow for filtering
    )

    // Add pagination if lastVisible is provided
    if (lastVisible) {
      q = query(q, startAfter(lastVisible))
    }

    const querySnapshot = await getDocs(q)
    let permits: Permit[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Permit, "id">
      permits.push({
        id: doc.id,
        ...data,
      })
    })

    // Apply filters client-side to avoid index requirements
    if (filterOptions?.status) {
      permits = permits.filter((permit) => permit.status === filterOptions.status)
    }

    if (filterOptions?.type) {
      permits = permits.filter((permit) => permit.type === filterOptions.type)
    }

    // Limit to requested page size after filtering
    permits = permits.slice(0, pageSize)

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null

    return { permits, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting permits:", error)

    // Fallback to an even simpler query if the first one fails
    try {
      const simpleQuery = query(collection(db, COLLECTIONS.PERMITS), limit(pageSize))

      const snapshot = await getDocs(simpleQuery)
      const fallbackPermits: Permit[] = []

      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Permit, "id">
        fallbackPermits.push({
          id: doc.id,
          ...data,
        })
      })

      return {
        permits: fallbackPermits,
        lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
      }
    } catch (fallbackError) {
      console.error("Fallback query also failed:", fallbackError)
      return { permits: [], lastVisible: null }
    }
  }
}

// Get permit by ID
export const getPermitById = async (id: string): Promise<Permit | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.PERMITS, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Permit, "id">),
      }
    }

    return null
  } catch (error) {
    console.error("Error getting permit:", error)
    throw error
  }
}

// Add a new permit
export const addPermit = async (
  permit: Omit<Permit, "id" | "permitId" | "createdAt" | "updatedAt">,
): Promise<Permit> => {
  try {
    // Generate a new permit ID (P-YYYY-XXX format)
    const year = new Date().getFullYear()
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.PERMITS),
        where("permitId", ">=", `P-${year}-`),
        where("permitId", "<", `P-${year + 1}-`),
        orderBy("permitId", "desc"),
        limit(1),
      ),
    )

    let nextNumber = 1
    if (!querySnapshot.empty) {
      const lastId = querySnapshot.docs[0].data().permitId
      const lastNumber = Number.parseInt(lastId.split("-")[2])
      nextNumber = lastNumber + 1
    }

    const permitId = `P-${year}-${nextNumber.toString().padStart(3, "0")}`

    const newPermit = {
      ...permit,
      permitId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.PERMITS), newPermit)

    return {
      id: docRef.id,
      ...newPermit,
    }
  } catch (error) {
    console.error("Error adding permit:", error)
    throw error
  }
}

// Update a permit
export const updatePermit = async (id: string, data: Partial<Permit>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PERMITS, id)

    // Remove id from data if it exists
    const { id: _, ...updateData } = data

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating permit:", error)
    throw error
  }
}

// Approve a permit
export const approvePermit = async (id: string, approvedBy: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PERMITS, id)

    await updateDoc(docRef, {
      status: "Approved",
      approvedBy,
      approvedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error approving permit:", error)
    throw error
  }
}

// Reject a permit
export const rejectPermit = async (id: string, rejectedBy: string, rejectionReason: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PERMITS, id)

    await updateDoc(docRef, {
      status: "Rejected",
      rejectedBy,
      rejectionReason,
      rejectedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error rejecting permit:", error)
    throw error
  }
}

// Delete a permit
export const deletePermit = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PERMITS, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting permit:", error)
    throw error
  }
}

// Count permits by status
export const countPermitsByStatus = async (): Promise<Record<string, number>> => {
  try {
    const statuses = ["Pending", "Under Review", "Approved", "Rejected"]
    const counts: Record<string, number> = {}

    // Get all permits and count by status client-side to avoid index issues
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.PERMITS))

    // Initialize counts
    statuses.forEach((status) => {
      counts[status] = 0
    })

    // Count documents by status
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.status && statuses.includes(data.status)) {
        counts[data.status]++
      }
    })

    return counts
  } catch (error) {
    console.error("Error counting permits by status:", error)
    return ["Pending", "Under Review", "Approved", "Rejected"].reduce(
      (acc, status) => {
        acc[status] = 0
        return acc
      },
      {} as Record<string, number>,
    )
  }
}

