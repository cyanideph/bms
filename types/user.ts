export type UserRole = "admin" | "staff" | "user"

export interface User {
  uid: string
  email: string
  displayName: string
  role: UserRole
  createdAt: Date | null
  updatedAt: Date | null
  isActive: boolean
  photoURL: string | null
}

export interface UserPermissions {
  canManageUsers: boolean
  canManageRoles: boolean
  canViewAnalytics: boolean
  canManageResidents: boolean
  canApprovePermits: boolean
  canManageIncidents: boolean
  canPostAnnouncements: boolean
}

export const DEFAULT_PERMISSIONS: Record<UserRole, UserPermissions> = {
  admin: {
    canManageUsers: true,
    canManageRoles: true,
    canViewAnalytics: true,
    canManageResidents: true,
    canApprovePermits: true,
    canManageIncidents: true,
    canPostAnnouncements: true,
  },
  staff: {
    canManageUsers: false,
    canManageRoles: false,
    canViewAnalytics: true,
    canManageResidents: true,
    canApprovePermits: true,
    canManageIncidents: true,
    canPostAnnouncements: true,
  },
  user: {
    canManageUsers: false,
    canManageRoles: false,
    canViewAnalytics: false,
    canManageResidents: false,
    canApprovePermits: false,
    canManageIncidents: false,
    canPostAnnouncements: false,
  },
}

