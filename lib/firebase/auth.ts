import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
<<<<<<< HEAD
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./config"
import type { User, UserRole } from "@/types/user"

// Sign up a new user
export async function registerUser(
=======
  type UserCredential,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./config"
import type { UserRole } from "@/types/user"

// Check if Firebase is initialized
const isFirebaseInitialized = () => {
  if (!auth || !db) {
    console.error("Firebase not initialized")
    throw new Error("Firebase services not available")
  }
  return true
}

// Register a new user
export const registerUser = async (
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  email: string,
  password: string,
  displayName: string,
  role: UserRole = "user",
<<<<<<< HEAD
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
=======
): Promise<UserCredential> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, { displayName })

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      displayName,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      photoURL: user.photoURL || null,
    })

    return userCredential
  } catch (error: any) {
    console.error("Error registering user:", error)

    // Provide more specific error messages for common Firebase auth errors
    if (error.code === "auth/operation-not-allowed") {
      throw new Error(
        "Email/Password authentication is not enabled in the Firebase Console. Please contact the administrator to enable it.",
      )
    } else if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already in use. Please use a different email or try logging in.")
    } else if (error.code === "auth/invalid-email") {
      throw new Error("The email address is invalid. Please check and try again.")
    } else if (error.code === "auth/weak-password") {
      throw new Error("The password is too weak. Please use a stronger password.")
    }

>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    throw error
  }
}

<<<<<<< HEAD
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
=======
// Sign in existing user
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    console.error("Error signing in:", error)
    throw error
  }
}

<<<<<<< HEAD
// Sign out the current user
export async function signOut(): Promise<void> {
  try {
    if (!auth) throw new Error("Auth not initialized")
=======
// Sign out user
export const signOut = async (): Promise<void> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

<<<<<<< HEAD
// Send password reset email
export async function resetPassword(email: string): Promise<void> {
  try {
    if (!auth) throw new Error("Auth not initialized")
=======
// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

<<<<<<< HEAD
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
=======
// Get user role from Firestore
export const getUserRole = async (uid: string): Promise<UserRole | null> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data().role as UserRole
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    }
    return null
  } catch (error) {
    console.error("Error getting user role:", error)
    return null
  }
}

<<<<<<< HEAD
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
=======
// Update user role
export const updateUserRole = async (uid: string, role: UserRole): Promise<void> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    await updateDoc(doc(db, "users", uid), {
      role,
      updatedAt: serverTimestamp(),
    })
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

<<<<<<< HEAD
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
=======
// Update user profile
export const updateUserProfile = async (
  uid: string,
  data: { displayName?: string; photoURL?: string },
): Promise<void> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    // Update in Firestore
    await updateDoc(doc(db, "users", uid), {
      ...data,
      updatedAt: serverTimestamp(),
    })

    // Update in Firebase Auth if user is current user
    const currentUser = auth.currentUser
    if (currentUser && currentUser.uid === uid) {
      await updateProfile(currentUser, data)
    }
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

// Deactivate/Activate user
export const toggleUserStatus = async (uid: string, isActive: boolean): Promise<void> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    await updateDoc(doc(db, "users", uid), {
      isActive,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error toggling user status:", error)
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    throw error
  }
}

