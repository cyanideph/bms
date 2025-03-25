"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole, UserPermissions } from "@/types/user" // Fixed: Added import for UserPermissions
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requiredPermissions?: Array<keyof UserPermissions>
}

export function ProtectedRoute({
  children,
  allowedRoles = ["admin", "staff", "user"],
  requiredPermissions = [],
}: ProtectedRouteProps) {
  const { user, loading, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!user) {
        router.push("/auth/login")
        return
      }

      // Check if user has allowed role
      if (!allowedRoles.includes(user.role)) {
        router.push("/unauthorized")
        return
      }

      // Check if user has all required permissions
      const hasAllPermissions = requiredPermissions.every((permission) => hasPermission(permission))

      if (!hasAllPermissions) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, loading, router, allowedRoles, requiredPermissions, hasPermission])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If not loading and checks passed in useEffect, render children
  return <>{children}</>
}

