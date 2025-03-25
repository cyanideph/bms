import { db } from "../config"
import { COLLECTIONS, type EmergencyContact } from "../collections"
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
  serverTimestamp,
} from "firebase/firestore"

// Get all emergency contacts
export const getEmergencyContacts = async (): Promise<EmergencyContact[]> => {
  try {
    const q = query(collection(db, COLLECTIONS.EMERGENCY_CONTACTS), orderBy("category", "asc"), orderBy("name", "asc"))

    const querySnapshot = await getDocs(q)
    const contacts: EmergencyContact[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<EmergencyContact, "id">
      contacts.push({
        id: doc.id,
        ...data,
      })
    })

    return contacts
  } catch (error) {
    console.error("Error getting emergency contacts:", error)
    throw error
  }
}

// Get emergency contacts by category
export const getEmergencyContactsByCategory = async (category: string): Promise<EmergencyContact[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.EMERGENCY_CONTACTS),
      where("category", "==", category),
      orderBy("name", "asc"),
    )

    const querySnapshot = await getDocs(q)
    const contacts: EmergencyContact[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<EmergencyContact, "id">
      contacts.push({
        id: doc.id,
        ...data,
      })
    })

    return contacts
  } catch (error) {
    console.error("Error getting emergency contacts by category:", error)
    throw error
  }
}

// Get emergency contact by ID
export const getEmergencyContactById = async (id: string): Promise<EmergencyContact | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.EMERGENCY_CONTACTS, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<EmergencyContact, "id">),
      }
    }

    return null
  } catch (error) {
    console.error("Error getting emergency contact:", error)
    throw error
  }
}

// Add a new emergency contact
export const addEmergencyContact = async (
  contact: Omit<EmergencyContact, "id" | "createdAt" | "updatedAt">,
): Promise<EmergencyContact> => {
  try {
    const newContact = {
      ...contact,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.EMERGENCY_CONTACTS), newContact)

    return {
      id: docRef.id,
      ...newContact,
    }
  } catch (error) {
    console.error("Error adding emergency contact:", error)
    throw error
  }
}

// Update an emergency contact
export const updateEmergencyContact = async (id: string, data: Partial<EmergencyContact>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.EMERGENCY_CONTACTS, id)

    // Remove id from data if it exists
    const { id: _, ...updateData } = data

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating emergency contact:", error)
    throw error
  }
}

// Delete an emergency contact
export const deleteEmergencyContact = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.EMERGENCY_CONTACTS, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting emergency contact:", error)
    throw error
  }
}

// Get all categories
export const getEmergencyContactCategories = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.EMERGENCY_CONTACTS))
    const categories = new Set<string>()

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.category) {
        categories.add(data.category)
      }
    })

    return Array.from(categories).sort()
  } catch (error) {
    console.error("Error getting emergency contact categories:", error)
    throw error
  }
}

