<<<<<<< HEAD
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
=======
"use client"

import { useState } from "react"
import { seedUsers } from "@/lib/firebase/seed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2, Database } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function SeedDatabasePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSeedDatabase = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await seedUsers()
      if (result) {
        setSuccess(true)
      } else {
        setError("Failed to seed database. Please check the console for details.")
      }
    } catch (err: any) {
      console.error("Error seeding database:", err)
      setError("An error occurred while seeding the database.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]} requiredPermissions={["canManageUsers"]}>
      <div className="container max-w-md py-10">
        <h1 className="mb-6 text-3xl font-bold tracking-tight philippines-text-gradient">Seed Database</h1>

        <Card>
          <CardHeader>
            <CardTitle>Populate with Mock Data</CardTitle>
            <CardDescription>This will create sample users with different roles for testing purposes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-600 dark:text-green-400">
                  Database seeded successfully! The following accounts were created:
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <div className="space-y-2 text-sm">
                <div className="rounded-md border p-3">
                  <p className="font-medium">Admin User</p>
                  <p>Email: admin@barangay-sua.gov.ph</p>
                  <p>Password: Admin@123</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="font-medium">Staff Users</p>
                  <p>Email: staff1@barangay-sua.gov.ph</p>
                  <p>Password: Staff@123</p>
                  <p className="mt-2">Email: staff2@barangay-sua.gov.ph</p>
                  <p>Password: Staff@123</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="font-medium">Regular Users</p>
                  <p>Email: user1@example.com</p>
                  <p>Password: User@123</p>
                  <p className="mt-2">Email: user2@example.com</p>
                  <p>Password: User@123</p>
                  <p className="mt-2">Email: user3@example.com</p>
                  <p>Password: User@123</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSeedDatabase} disabled={loading || success} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Seeding Database...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Seed Database with Mock Data
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    </ProtectedRoute>
  )
}

