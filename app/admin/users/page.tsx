import type { Metadata } from "next"
import { UserStats } from "@/components/admin/user-management/user-stats"
import { UserTable } from "@/components/admin/user-management/user-table"
import { CreateUserForm } from "@/components/admin/user-management/create-user-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata: Metadata = {
  title: "User Management | Barangay Sua Management System",
  description: "Manage users in the Barangay Sua Management System",
}

export default function UserManagementPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]} requiredPermissions={["canManageUsers"]}>
      <div className="container py-10">
        <h1 className="mb-6 text-3xl font-bold tracking-tight philippines-text-gradient">User Management</h1>

        <div className="space-y-6">
          <UserStats />

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">All Users</TabsTrigger>
              <TabsTrigger value="create">Create User</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Accounts</CardTitle>
                  <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create New User</CardTitle>
                  <CardDescription>Add a new user to the system</CardDescription>
                </CardHeader>
                <CardContent className="max-w-md">
                  <CreateUserForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}

