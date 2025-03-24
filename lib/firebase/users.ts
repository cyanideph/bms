import {
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  limit,
  startAfter,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { db } from "./config"
import type { User, UserRole } from "@/types/user"

// Get all users with pagination
export const getUsers = async (
  lastVisible?: DocumentSnapshot,
  pageSize = 10,
  role?: UserRole,
): Promise<{ users: User[]; lastVisible: QueryDocumentSnapshot | null }> => {
  try {
    let q = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(pageSize))

    // Add role filter if provided
    if (role) {
      q = query(q, where("role", "==", role))
    }

    // Add pagination if lastVisible is provided
    if (lastVisible) {
      q = query(q, startAfter(lastVisible))
    }

    const querySnapshot = await getDocs(q)
    const users: User[] = []

    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      users.push({
        uid: doc.id,
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        createdAt: userData.createdAt?.toDate() || null,
        updatedAt: userData.updatedAt?.toDate() || null,
        isActive: userData.isActive,
        photoURL: userData.photoURL,
      })
    })

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null

    return { users, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting users:", error)
    throw error
  }
}

// Get user by ID
export const getUserById = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))

    if (userDoc.exists()) {
      const userData = userDoc.data()
      return {
        uid: userDoc.id,
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        createdAt: userData.createdAt?.toDate() || null,
        updatedAt: userData.updatedAt?.toDate() || null,
        isActive: userData.isActive,
        photoURL: userData.photoURL,
      }
    }

    return null
  } catch (error) {
    console.error("Error getting user:", error)
    throw error
  }
}

// Search users
export const searchUsers = async (searchTerm: string): Promise<User[]> => {
  try {
    // Firebase doesn't support native text search, so we'll fetch all users and filter
    // In a production app, you might want to use Algolia or another search service
    const querySnapshot = await getDocs(collection(db, "users"))
    const users: User[] = []

    querySnapshot.forEach((doc) => {
      const userData = doc.data()

      // Check if the search term is in the email or display name
      if (
        userData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userData.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        users.push({
          uid: doc.id,
          email: userData.email,
          displayName: userData.displayName,
          role: userData.role,
          createdAt: userData.createdAt?.toDate() || null,
          updatedAt: userData.updatedAt?.toDate() || null,
          isActive: userData.isActive,
          photoURL: userData.photoURL,
        })
      }
    })

    return users
  } catch (error) {
    console.error("Error searching users:", error)
    throw error
  }
}

// Count users by role
export const countUsersByRole = async (): Promise<Record<UserRole, number>> => {
  try {
    const roles: UserRole[] = ["admin", "staff", "user"]
    const counts: Record<UserRole, number> = {
      admin: 0,
      staff: 0,
      user: 0,
    }

    for (const role of roles) {
      const q = query(collection(db, "users"), where("role", "==", role))
      const querySnapshot = await getDocs(q)
      counts[role] = querySnapshot.size
    }

    return counts
  } catch (error) {
    console.error("Error counting users by role:", error)
    throw error
  }
}

// Delete user (admin only)
export const deleteUser = async (uid: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "users", uid))
    // Note: This only deletes the Firestore document
    // To delete the actual Firebase Auth user, you need to use Firebase Admin SDK
    // or implement a Cloud Function
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}

// Deactivate/Activate user
export const toggleUserStatus = async (uid: string, isActive: boolean): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", uid), {
      isActive,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error toggling user status:", error)
    throw error
  }
}

