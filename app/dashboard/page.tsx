import { DashboardPage } from "@/components/dashboard-page"
import { ProtectedRoute } from "@/components/auth/protected-route"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Barangay Sua Management System",
  description: "Barangay Sua Management System Dashboard",
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  )
}

