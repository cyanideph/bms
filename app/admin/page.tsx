import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Barangay Sua Management System",
  description: "Administrative dashboard for Barangay Sua Management System",
}

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  )
}

