"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase/config"
import { getUserRole } from "@/lib/firebase/auth"
import { type User, type UserRole, DEFAULT_PERMISSIONS, type UserPermissions } from "@/types/user"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  permissions: UserPermissions
  hasPermission: (permission: keyof UserPermissions) => boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  permissions: DEFAULT_PERMISSIONS.user,
  hasPermission: () => false,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [permissions, setPermissions] = useState<UserPermissions>(DEFAULT_PERMISSIONS.user)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if auth is available (Firebase initialized correctly)
    if (!auth) {
      console.error("Firebase Auth not initialized")
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          try {
            // Get user role from Firestore
            const role = (await getUserRole(firebaseUser.uid)) || "user"

            // Create user object
            const userObj: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              displayName: firebaseUser.displayName || "",
              role: role as UserRole,
              createdAt: null, // We don't have this from auth state
              updatedAt: null, // We don't have this from auth state
              isActive: true,
              photoURL: firebaseUser.photoURL,
            }

            setUser(userObj)
            setPermissions(DEFAULT_PERMISSIONS[role])
          } catch (error) {
            console.error("Error getting user data:", error)
            setUser(null)
            setPermissions(DEFAULT_PERMISSIONS.user)
          }
        } else {
          setUser(null)
          setPermissions(DEFAULT_PERMISSIONS.user)

          // Redirect to login if accessing protected routes
          if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
            router.push("/auth/login")
          }
        }

        setLoading(false)
      },
      (error) => {
        console.error("Auth state change error:", error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [router, pathname])

  const hasPermission = (permission: keyof UserPermissions): boolean => {
    return permissions[permission]
  }

  return <AuthContext.Provider value={{ user, loading, permissions, hasPermission }}>{children}</AuthContext.Provider>
}

