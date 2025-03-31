import { db } from "../config"
import { COLLECTIONS, type Official } from "../collections"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"

// Get all officials
export const getOfficials = async (): Promise<Official[]> => {
  try {
    const q = query(collection(db, COLLECTIONS.OFFICIALS), orderBy("order", "asc"))

    const querySnapshot = await getDocs(q)
    const officials: Official[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Official, "id">
      officials.push({
        id: doc.id,
        ...data,
      })
    })

    return officials
  } catch (error) {
    console.error("Error getting officials:", error)
    throw error
  }
}

// Get official by ID
export const getOfficialById = async (id: string): Promise<Official | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.OFFICIALS, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Official, "id">),
      }
    }

    return null
  } catch (error) {
    console.error("Error getting official:", error)
    throw error
  }
}

// Add a new official
export const addOfficial = async (official: Omit<Official, "id" | "createdAt" | "updatedAt">): Promise<Official> => {
  try {
    const newOfficial = {
      ...official,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.OFFICIALS), newOfficial)

    return {
      id: docRef.id,
      ...newOfficial,
    }
  } catch (error) {
    console.error("Error adding official:", error)
    throw error
  }
}

// Update an official
export const updateOfficial = async (id: string, data: Partial<Official>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.OFFICIALS, id)

    // Remove id from data if it exists
    const { id: _, ...updateData } = data

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating official:", error)
    throw error
  }
}

// Delete an official
export const deleteOfficial = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.OFFICIALS, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting official:", error)
    throw error
  }
}

