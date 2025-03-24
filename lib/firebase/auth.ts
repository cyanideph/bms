import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
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
  email: string,
  password: string,
  displayName: string,
  role: UserRole = "user",
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

    throw error
  }
}

// Sign in existing user
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

// Sign out user
export const signOut = async (): Promise<void> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

// Get user role from Firestore
export const getUserRole = async (uid: string): Promise<UserRole | null> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data().role as UserRole
    }
    return null
  } catch (error) {
    console.error("Error getting user role:", error)
    return null
  }
}

// Update user role
export const updateUserRole = async (uid: string, role: UserRole): Promise<void> => {
  try {
    // Check Firebase initialization
    isFirebaseInitialized()

    await updateDoc(doc(db, "users", uid), {
      role,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

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
    throw error
  }
}

