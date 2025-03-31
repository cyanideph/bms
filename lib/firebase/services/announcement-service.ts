import { db } from "../config"
import { COLLECTIONS, type Announcement, type Event } from "../collections"
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
  limit,
  startAfter,
  serverTimestamp,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
} from "firebase/firestore"

// Get all announcements with pagination
export const getAnnouncements = async (
  lastVisible?: DocumentSnapshot,
  pageSize = 10,
): Promise<{ announcements: Announcement[]; lastVisible: QueryDocumentSnapshot | null }> => {
  try {
    // First try with a simpler query that doesn't require a composite index
    let q = query(collection(db, COLLECTIONS.ANNOUNCEMENTS), orderBy("createdAt", "desc"), limit(pageSize))

    // Add pagination if lastVisible is provided
    if (lastVisible) {
      q = query(q, startAfter(lastVisible))
    }

    const querySnapshot = await getDocs(q)
    const announcements: Announcement[] = []

    // Filter the type client-side to avoid needing the composite index
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Announcement, "id">
      if (data.type === "announcement") {
        announcements.push({
          id: doc.id,
          ...data,
        })
      }
    })

    // Only take the requested number of items
    const filteredAnnouncements = announcements.slice(0, pageSize)

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null

    return { announcements: filteredAnnouncements, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting announcements:", error)

    // Fallback to a simpler approach if there's an error
    try {
      const simpleQuery = query(collection(db, COLLECTIONS.ANNOUNCEMENTS), limit(pageSize))

      const snapshot = await getDocs(simpleQuery)
      const announcements: Announcement[] = []

      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Announcement, "id">
        if (data.type === "announcement") {
          announcements.push({
            id: doc.id,
            ...data,
          })
        }
      })

      return {
        announcements: announcements.slice(0, pageSize),
        lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
      }
    } catch (fallbackError) {
      console.error("Fallback query also failed:", fallbackError)
      return { announcements: [], lastVisible: null }
    }
  }
}

// Get all events with pagination
export const getEvents = async (
  lastVisible?: DocumentSnapshot,
  pageSize = 10,
): Promise<{ events: Event[]; lastVisible: QueryDocumentSnapshot | null }> => {
  try {
    // First try with a simpler query that doesn't require a composite index
    let q = query(collection(db, COLLECTIONS.ANNOUNCEMENTS), orderBy("createdAt", "desc"), limit(pageSize))

    // Add pagination if lastVisible is provided
    if (lastVisible) {
      q = query(q, startAfter(lastVisible))
    }

    const querySnapshot = await getDocs(q)
    const events: Event[] = []

    // Filter the type client-side to avoid needing the composite index
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Event, "id">
      if (data.type === "event") {
        events.push({
          id: doc.id,
          ...data,
        })
      }
    })

    // Only take the requested number of items
    const filteredEvents = events.slice(0, pageSize)

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null

    return { events: filteredEvents, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting events:", error)

    // Fallback to a simpler approach if there's an error
    try {
      const simpleQuery = query(collection(db, COLLECTIONS.ANNOUNCEMENTS), limit(pageSize))

      const snapshot = await getDocs(simpleQuery)
      const events: Event[] = []

      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Event, "id">
        if (data.type === "event") {
          events.push({
            id: doc.id,
            ...data,
          })
        }
      })

      return {
        events: events.slice(0, pageSize),
        lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
      }
    } catch (fallbackError) {
      console.error("Fallback query also failed:", fallbackError)
      return { events: [], lastVisible: null }
    }
  }
}

// Get both announcements and events with pagination
export const getAnnouncementsAndEvents = async (
  lastVisible?: DocumentSnapshot,
  pageSize = 10,
): Promise<{ items: (Announcement | Event)[]; lastVisible: QueryDocumentSnapshot | null }> => {
  try {
    let q = query(collection(db, COLLECTIONS.ANNOUNCEMENTS), orderBy("createdAt", "desc"), limit(pageSize))

    // Add pagination if lastVisible is provided
    if (lastVisible) {
      q = query(q, startAfter(lastVisible))
    }

    const querySnapshot = await getDocs(q)
    const items: (Announcement | Event)[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      items.push({
        id: doc.id,
        ...data,
      } as Announcement | Event)
    })

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null

    return { items, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting announcements and events:", error)
    throw error
  }
}

// Get announcement or event by ID
export const getAnnouncementById = async (id: string): Promise<Announcement | Event | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Announcement | Event, "id">),
      }
    }

    return null
  } catch (error) {
    console.error("Error getting announcement:", error)
    throw error
  }
}

// Add a new announcement
export const addAnnouncement = async (
  announcement: Omit<Announcement, "id" | "createdAt" | "updatedAt">,
): Promise<Announcement> => {
  try {
    const newAnnouncement = {
      ...announcement,
      type: "announcement",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.ANNOUNCEMENTS), newAnnouncement)

    return {
      id: docRef.id,
      ...newAnnouncement,
    }
  } catch (error) {
    console.error("Error adding announcement:", error)
    throw error
  }
}

// Add a new event
export const addEvent = async (event: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<Event> => {
  try {
    const newEvent = {
      ...event,
      type: "event",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.ANNOUNCEMENTS), newEvent)

    return {
      id: docRef.id,
      ...newEvent,
    }
  } catch (error) {
    console.error("Error adding event:", error)
    throw error
  }
}

// Update an announcement or event
export const updateAnnouncementOrEvent = async (id: string, data: Partial<Announcement | Event>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, id)

    // Remove id from data if it exists
    const { id: _, ...updateData } = data

    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating announcement or event:", error)
    throw error
  }
}

// Delete an announcement or event
export const deleteAnnouncementOrEvent = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting announcement or event:", error)
    throw error
  }
}

