import { db } from "../config"
import { COLLECTIONS, type Incident } from "../collections"
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

// Get all incidents with pagination
export const getIncidents = async (
  lastVisible?: DocumentSnapshot,
  pageSize = 10,
  filterOptions?: { status?: string; priority?: string },
): Promise<{ incidents: Incident[]; lastVisible: QueryDocumentSnapshot | null }> => {
  try {
    let q = query(collection(db, COLLECTIONS.INCIDENTS), orderBy("createdAt", "desc"), limit(pageSize))

    // Add filters if provided
    if (filterOptions?.status) {
      q = query(q, where("status", "==", filterOptions.status))
    }

    if (filterOptions?.priority) {
      q = query(q, where("priority", "==", filterOptions.priority))
    }

    // Add pagination if lastVisible is provided
    if (lastVisible) {
      q = query(q, startAfter(lastVisible))
    }

    const querySnapshot = await getDocs(q)
    const incidents: Incident[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Incident, "id">
      incidents.push({
        id: doc.id,
        ...data,
      })
    })

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null

    return { incidents, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting incidents:", error)
    throw error
  }
}

// Get incident by ID
export const getIncidentById = async (id: string): Promise<Incident | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.INCIDENTS, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Incident, "id">),
      }
    }

    return null
  } catch (error) {
    console.error("Error getting incident:", error)
    throw error
  }
}

// Add a new incident
export const addIncident = async (
  incident: Omit<Incident, "id" | "incidentId" | "createdAt" | "updatedAt">,
): Promise<Incident> => {
  try {
    // Generate a new incident ID (INC-YYYY-XXX format)
    const year = new Date().getFullYear()
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.INCIDENTS),
        where("incidentId", ">=", `INC-${year}-`),
        where("incidentId", "<", `INC-${year + 1}-`),
        orderBy("incidentId", "desc"),
        limit(1),
      ),
    )

    let nextNumber = 1
    if (!querySnapshot.empty) {
      const lastId = querySnapshot.docs[0].data().incidentId
      const lastNumber = Number.parseInt(lastId.split("-")[2])
      nextNumber = lastNumber + 1
    }

    const incidentId = `INC-${year}-${nextNumber.toString().padStart(3, "0")}`

    const newIncident = {
      ...incident,
      incidentId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.INCIDENTS), newIncident)

    return {
      id: docRef.id,
      ...newIncident,
    }
  } catch (error) {
    console.error("Error adding incident:", error)
    throw error
  }
}

// Update an incident
export const updateIncident = async (id: string, data: Partial<Incident>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.INCIDENTS, id)

    // Remove id from data if it exists
    const { id: _, ...updateData } = data

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating incident:", error)
    throw error
  }
}

// Assign an incident
export const assignIncident = async (id: string, assignedTo: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.INCIDENTS, id)

    await updateDoc(docRef, {
      assignedTo,
      status: "In Progress",
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error assigning incident:", error)
    throw error
  }
}

// Resolve an incident
export const resolveIncident = async (id: string, resolvedBy: string, resolutionNotes: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.INCIDENTS, id)

    await updateDoc(docRef, {
      status: "Resolved",
      resolvedBy,
      resolutionNotes,
      resolvedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error resolving incident:", error)
    throw error
  }
}

// Delete an incident
export const deleteIncident = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.INCIDENTS, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting incident:", error)
    throw error
  }
}

// Count incidents by status
export const countIncidentsByStatus = async (): Promise<Record<string, number>> => {
  try {
    const statuses = ["New", "In Progress", "Resolved", "Rejected"]
    const counts: Record<string, number> = {}

    for (const status of statuses) {
      const q = query(collection(db, COLLECTIONS.INCIDENTS), where("status", "==", status))
      const querySnapshot = await getDocs(q)
      counts[status] = querySnapshot.size
    }

    return counts
  } catch (error) {
    console.error("Error counting incidents by status:", error)
    throw error
  }
}

// Count incidents by priority
export const countIncidentsByPriority = async (): Promise<Record<string, number>> => {
  try {
    const priorities = ["High", "Medium", "Low"]
    const counts: Record<string, number> = {}

    for (const priority of priorities) {
      const q = query(collection(db, COLLECTIONS.INCIDENTS), where("priority", "==", priority))
      const querySnapshot = await getDocs(q)
      counts[priority] = querySnapshot.size
    }

    return counts
  } catch (error) {
    console.error("Error counting incidents by priority:", error)
    throw error
  }
}

