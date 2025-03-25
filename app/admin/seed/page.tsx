import type { Metadata } from "next"
import { SeedDatabasePage } from "@/components/admin/seed-database-page"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata: Metadata = {
  title: "Seed Database | Barangay Sua Management System",
  description: "Seed the database with initial data for testing and development",
}

export default function SeedPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <SeedDatabasePage />
    </ProtectedRoute>
  )
}

