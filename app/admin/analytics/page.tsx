import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Analytics Dashboard | Barangay Sua Management System",
  description: "Analytics and reporting dashboard for Barangay Sua Management System",
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "staff"]} requiredPermissions={["canViewAnalytics"]}>
      <AnalyticsDashboard />
    </ProtectedRoute>
  )
}

