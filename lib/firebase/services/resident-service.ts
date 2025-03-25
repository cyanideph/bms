import { db } from "../config"
import { COLLECTIONS, type Resident } from "../collections"
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

// Get all residents with pagination
export const getResidents = async (
  lastVisible?: DocumentSnapshot,
  pageSize = 10,
  filterOptions?: { gender?: string; purok?: string },
): Promise<{ residents: Resident[]; lastVisible: QueryDocumentSnapshot | null }> => {
  try {
    let q = query(collection(db, COLLECTIONS.RESIDENTS), orderBy("createdAt", "desc"), limit(pageSize))

    // Add filters if provided
    if (filterOptions?.gender) {
      q = query(q, where("gender", "==", filterOptions.gender))
    }

    if (filterOptions?.purok) {
      q = query(q, where("purok", "==", filterOptions.purok))
    }

    // Add pagination if lastVisible is provided
    if (lastVisible) {
      q = query(q, startAfter(lastVisible))
    }

    const querySnapshot = await getDocs(q)
    const residents: Resident[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Resident, "id">
      residents.push({
        id: doc.id,
        ...data,
      })
    })

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null

    return { residents, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting residents:", error)
    throw error
  }
}

// Get resident by ID
export const getResidentById = async (id: string): Promise<Resident | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.RESIDENTS, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Resident, "id">),
      }
    }

    return null
  } catch (error) {
    console.error("Error getting resident:", error)
    throw error
  }
}

// Search residents
export const searchResidents = async (searchTerm: string): Promise<Resident[]> => {
  try {
    // Basic implementation - in a real app, you might want to use Algolia or Firebase Extensions for better search
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.RESIDENTS))
    const residents: Resident[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Resident, "id">

      // Check if the search term is in the name, address, or ID
      if (
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.residentId.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        residents.push({
          id: doc.id,
          ...data,
        })
      }
    })

    return residents
  } catch (error) {
    console.error("Error searching residents:", error)
    throw error
  }
}

// Add a new resident
export const addResident = async (resident: Omit<Resident, "id" | "createdAt" | "updatedAt">): Promise<Resident> => {
  try {
    // Generate a new resident ID (R-YYYY-XXX format)
    const year = new Date().getFullYear()
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.RESIDENTS),
        where("residentId", ">=", `R-${year}-`),
        where("residentId", "<", `R-${year + 1}-`),
        orderBy("residentId", "desc"),
        limit(1),
      ),
    )

    let nextNumber = 1
    if (!querySnapshot.empty) {
      const lastId = querySnapshot.docs[0].data().residentId
      const lastNumber = Number.parseInt(lastId.split("-")[2])
      nextNumber = lastNumber + 1
    }

    const residentId = `R-${year}-${nextNumber.toString().padStart(3, "0")}`

    const newResident = {
      ...resident,
      residentId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.RESIDENTS), newResident)

    return {
      id: docRef.id,
      ...newResident,
    }
  } catch (error) {
    console.error("Error adding resident:", error)
    throw error
  }
}

// Update a resident
export const updateResident = async (id: string, data: Partial<Resident>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.RESIDENTS, id)

    // Remove id from data if it exists
    const { id: _, ...updateData } = data

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating resident:", error)
    throw error
  }
}

// Delete a resident
export const deleteResident = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.RESIDENTS, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting resident:", error)
    throw error
  }
}

// Count residents
export const countResidents = async (filterOptions?: { gender?: string; purok?: string }): Promise<number> => {
  try {
    let q = collection(db, COLLECTIONS.RESIDENTS)

    // Add filters if provided
    if (filterOptions) {
      if (filterOptions.gender) {
        q = query(q, where("gender", "==", filterOptions.gender)) as any
      }

      if (filterOptions.purok) {
        q = query(q, where("purok", "==", filterOptions.purok)) as any
      }
    }

    const querySnapshot = await getDocs(query(q))
    return querySnapshot.size
  } catch (error) {
    console.error("Error counting residents:", error)
    throw error
  }
}

