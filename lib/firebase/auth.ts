import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./config"
import type { User, UserRole } from "@/types/user"

// Sign up a new user
export async function registerUser(
  email: string,
  password: string,
  displayName: string,
  role: UserRole = "user",
): Promise<User> {
  try {
    if (!auth) throw new Error("Auth not initialized")

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Update profile with display name
    await updateProfile(firebaseUser, { displayName })

    // Create user document in Firestore
    const userData = {
      email: firebaseUser.email || email,
      displayName: displayName,
      role: role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      photoURL: firebaseUser.photoURL || null,
      isActive: true,
    }

    await setDoc(doc(db, "users", firebaseUser.uid), userData)

    // Return user data
    return {
      uid: firebaseUser.uid,
      ...userData,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    } as User
  } catch (error: any) {
    console.error("Error signing up:", error)
    throw error
  }
}

// Sign in an existing user
export async function signIn(email: string, password: string): Promise<User> {
  try {
    if (!auth) throw new Error("Auth not initialized")

    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

    if (!userDoc.exists()) {
      throw new Error("User document not found in Firestore")
    }

    // Return user data from Firestore
    const userData = userDoc.data() as any
    return {
      uid: firebaseUser.uid,
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      photoURL: userData.photoURL || null,
      isActive: userData.isActive,
    } as User
  } catch (error: any) {
    console.error("Error signing in:", error)
    throw error
  }
}

// Sign out the current user
export async function signOut(): Promise<void> {
  try {
    if (!auth) throw new Error("Auth not initialized")
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Send password reset email
export async function resetPassword(email: string): Promise<void> {
  try {
    if (!auth) throw new Error("Auth not initialized")
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

// Get the current user
export async function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    if (!auth) {
      reject(new Error("Auth not initialized"))
      return
    }

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      unsubscribe()

      if (!firebaseUser) {
        resolve(null)
        return
      }

      try {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

        if (!userDoc.exists()) {
          resolve(null)
          return
        }

        // Return user data from Firestore
        const userData = userDoc.data() as any
        resolve({
          uid: firebaseUser.uid,
          email: userData.email,
          displayName: userData.displayName,
          role: userData.role,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
          photoURL: userData.photoURL || null,
          isActive: userData.isActive,
        } as User)
      } catch (error) {
        console.error("Error getting current user:", error)
        reject(error)
      }
    })
  })
}

// Get user role from Firestore
export async function getUserRole(uid: string): Promise<UserRole | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      const userData = userDoc.data() as any
      return userData.role || null
    }
    return null
  } catch (error) {
    console.error("Error getting user role:", error)
    return null
  }
}

// Update user profile
export async function updateUserProfile(uid: string, data: { displayName?: string; photoURL?: string }): Promise<void> {
  try {
    if (!auth) throw new Error("Auth not initialized")

    const user = auth.currentUser
    if (!user) throw new Error("No user currently signed in")

    if (data.displayName) {
      await updateProfile(user, { displayName: data.displayName })
    }
    if (data.photoURL) {
      await updateProfile(user, { photoURL: data.photoURL })
    }

    await setDoc(
      doc(db, "users", uid),
      {
        displayName: data.displayName || user.displayName,
        photoURL: data.photoURL || user.photoURL,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

export async function updateUserRole(uid: string, role: UserRole): Promise<void> {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        role: role,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

// Create a test user for development purposes
export async function createTestUser(): Promise<{ email: string; uid: string }> {
  try {
    if (!auth) throw new Error("Auth not initialized")
    if (!db) throw new Error("Firestore not initialized")

    const testEmail = "test@example.com"
    const testPassword = "Test@123"
    const testName = "Test User"

    try {
      // Try to sign in first in case the user already exists
      const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword)
      return {
        email: testEmail,
        uid: userCredential.user.uid,
      }
    } catch (error: any) {
      // If user doesn't exist, create a new one
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword)
        const firebaseUser = userCredential.user

        // Update profile with display name
        await updateProfile(firebaseUser, { displayName: testName })

        // Create user document in Firestore
        const userData = {
          email: testEmail,
          displayName: testName,
          role: "admin", // Make test user an admin for testing
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          photoURL: null,
          isActive: true,
        }

        await setDoc(doc(db, "users", firebaseUser.uid), userData)

        return {
          email: testEmail,
          uid: firebaseUser.uid,
        }
      } else {
        throw error
      }
    }
  } catch (error) {
    console.error("Error creating test user:", error)
    throw error
  }
}

