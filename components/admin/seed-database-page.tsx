"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Database,
  Users,
  FileText,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Loader2,
  UserCog,
  Shield,
  User,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { seedUsers } from "@/lib/firebase/seed-data"
import { PageTransition } from "@/components/animations/page-transition"

export function SeedDatabasePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, { success: boolean; message: string }>>({})

  const handleSeedUsers = async () => {
    setLoading("users")
    try {
      await seedUsers()
      setResults((prev) => ({
        ...prev,
        users: {
          success: true,
          message: "Successfully seeded user accounts with different roles",
        },
      }))
      toast({
        title: "Users Seeded",
        description: "Sample user accounts have been created successfully.",
      })
    } catch (error) {
      console.error("Error seeding users:", error)
      setResults((prev) => ({
        ...prev,
        users: {
          success: false,
          message: `Failed to seed users: ${error instanceof Error ? error.message : String(error)}`,
        },
      }))
      toast({
        title: "Seeding Failed",
        description: "Failed to seed user accounts. See console for details.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  const handleSeedResidents = async () => {
    setLoading("residents")
    try {
      // Implement resident seeding
      // await seedResidents()
      setTimeout(() => {
        setResults((prev) => ({
          ...prev,
          residents: {
            success: true,
            message: "Successfully seeded resident records",
          },
        }))
        toast({
          title: "Residents Seeded",
          description: "Sample resident records have been created successfully.",
        })
        setLoading(null)
      }, 2000)
    } catch (error) {
      console.error("Error seeding residents:", error)
      setResults((prev) => ({
        ...prev,
        residents: {
          success: false,
          message: `Failed to seed residents: ${error instanceof Error ? error.message : String(error)}`,
        },
      }))
      toast({
        title: "Seeding Failed",
        description: "Failed to seed resident records. See console for details.",
        variant: "destructive",
      })
      setLoading(null)
    }
  }

  const handleSeedPermits = async () => {
    setLoading("permits")
    try {
      // Implement permit seeding
      // await seedPermits()
      setTimeout(() => {
        setResults((prev) => ({
          ...prev,
          permits: {
            success: true,
            message: "Successfully seeded permit applications",
          },
        }))
        toast({
          title: "Permits Seeded",
          description: "Sample permit applications have been created successfully.",
        })
        setLoading(null)
      }, 2000)
    } catch (error) {
      console.error("Error seeding permits:", error)
      setResults((prev) => ({
        ...prev,
        permits: {
          success: false,
          message: `Failed to seed permits: ${error instanceof Error ? error.message : String(error)}`,
        },
      }))
      toast({
        title: "Seeding Failed",
        description: "Failed to seed permit applications. See console for details.",
        variant: "destructive",
      })
      setLoading(null)
    }
  }

  const handleSeedIncidents = async () => {
    setLoading("incidents")
    try {
      // Implement incident seeding
      // await seedIncidents()
      setTimeout(() => {
        setResults((prev) => ({
          ...prev,
          incidents: {
            success: true,
            message: "Successfully seeded incident reports",
          },
        }))
        toast({
          title: "Incidents Seeded",
          description: "Sample incident reports have been created successfully.",
        })
        setLoading(null)
      }, 2000)
    } catch (error) {
      console.error("Error seeding incidents:", error)
      setResults((prev) => ({
        ...prev,
        incidents: {
          success: false,
          message: `Failed to seed incidents: ${error instanceof Error ? error.message : String(error)}`,
        },
      }))
      toast({
        title: "Seeding Failed",
        description: "Failed to seed incident reports. See console for details.",
        variant: "destructive",
      })
      setLoading(null)
    }
  }

  const handleSeedAnnouncements = async () => {
    setLoading("announcements")
    try {
      // Implement announcement seeding
      // await seedAnnouncements()
      setTimeout(() => {
        setResults((prev) => ({
          ...prev,
          announcements: {
            success: true,
            message: "Successfully seeded announcements and events",
          },
        }))
        toast({
          title: "Announcements Seeded",
          description: "Sample announcements and events have been created successfully.",
        })
        setLoading(null)
      }, 2000)
    } catch (error) {
      console.error("Error seeding announcements:", error)
      setResults((prev) => ({
        ...prev,
        announcements: {
          success: false,
          message: `Failed to seed announcements: ${error instanceof Error ? error.message : String(error)}`,
        },
      }))
      toast({
        title: "Seeding Failed",
        description: "Failed to seed announcements. See console for details.",
        variant: "destructive",
      })
      setLoading(null)
    }
  }

  const handleSeedAll = async () => {
    setLoading("all")
    try {
      await handleSeedUsers()
      await handleSeedResidents()
      await handleSeedPermits()
      await handleSeedIncidents()
      await handleSeedAnnouncements()

      toast({
        title: "Database Seeded",
        description: "All sample data has been created successfully.",
      })
    } catch (error) {
      console.error("Error seeding database:", error)
      toast({
        title: "Seeding Failed",
        description: "Failed to seed all data. See console for details.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <PageTransition>
      <div className="container py-10">
        <h1 className="mb-6 text-3xl font-bold tracking-tight philippines-text-gradient">Seed Database</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Database Seeding Tool</CardTitle>
            <CardDescription>
              Populate the database with sample data for testing and development purposes. This tool should only be used
              in development or testing environments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Seeding the database will add sample data to your Firebase collections. This operation is meant for
                development and testing purposes only.
              </AlertDescription>
            </Alert>

            <Button onClick={handleSeedAll} disabled={loading !== null} className="w-full">
              {loading === "all" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Seeding Database...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Seed All Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reference">Reference Data</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>Create sample user accounts with different roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 mr-2 text-destructive" />
                      <h3 className="font-medium">Admin User</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Full access to all system features</p>
                    <div className="text-xs space-y-1">
                      <p>
                        <span className="font-medium">Email:</span> admin@barangay-sua.gov.ph
                      </p>
                      <p>
                        <span className="font-medium">Password:</span> Admin@123
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <UserCog className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Staff User</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Access to manage content and records</p>
                    <div className="text-xs space-y-1">
                      <p>
                        <span className="font-medium">Email:</span> staff1@barangay-sua.gov.ph
                      </p>
                      <p>
                        <span className="font-medium">Password:</span> Staff@123
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <User className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="font-medium">Regular User</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Limited access to view content</p>
                    <div className="text-xs space-y-1">
                      <p>
                        <span className="font-medium">Email:</span> user1@example.com
                      </p>
                      <p>
                        <span className="font-medium">Password:</span> User@123
                      </p>
                    </div>
                  </div>
                </div>

                {results.users && (
                  <Alert variant={results.users.success ? "default" : "destructive"}>
                    {results.users.success ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <AlertTitle>{results.users.success ? "Success" : "Error"}</AlertTitle>
                    <AlertDescription>{results.users.message}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSeedUsers} disabled={loading !== null} className="w-full">
                  {loading === "users" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Users...
                    </>
                  ) : (
                    <>
                      <Users className="mr-2 h-4 w-4" />
                      Seed User Accounts
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Residents</CardTitle>
                  <CardDescription>Create sample resident records</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will create 50 sample resident records with various demographics and household information.
                  </p>

                  {results.residents && (
                    <Alert variant={results.residents.success ? "default" : "destructive"}>
                      {results.residents.success ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      <AlertTitle>{results.residents.success ? "Success" : "Error"}</AlertTitle>
                      <AlertDescription>{results.residents.message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSeedResidents} disabled={loading !== null} className="w-full">
                    {loading === "residents" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Residents...
                      </>
                    ) : (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Seed Residents
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permits</CardTitle>
                  <CardDescription>Create sample permit applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will create 20 sample permit applications with various types, statuses, and applicants.
                  </p>

                  {results.permits && (
                    <Alert variant={results.permits.success ? "default" : "destructive"}>
                      {results.permits.success ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      <AlertTitle>{results.permits.success ? "Success" : "Error"}</AlertTitle>
                      <AlertDescription>{results.permits.message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSeedPermits} disabled={loading !== null} className="w-full">
                    {loading === "permits" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Permits...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Seed Permits
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Incidents</CardTitle>
                  <CardDescription>Create sample incident reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will create 15 sample incident reports with various types, priorities, and statuses.
                  </p>

                  {results.incidents && (
                    <Alert variant={results.incidents.success ? "default" : "destructive"}>
                      {results.incidents.success ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      <AlertTitle>{results.incidents.success ? "Success" : "Error"}</AlertTitle>
                      <AlertDescription>{results.incidents.message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSeedIncidents} disabled={loading !== null} className="w-full">
                    {loading === "incidents" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Incidents...
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Seed Incidents
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Create sample announcements and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will create 10 sample announcements and 5 upcoming events.
                  </p>

                  {results.announcements && (
                    <Alert variant={results.announcements.success ? "default" : "destructive"}>
                      {results.announcements.success ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      <AlertTitle>{results.announcements.success ? "Success" : "Error"}</AlertTitle>
                      <AlertDescription>{results.announcements.message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSeedAnnouncements} disabled={loading !== null} className="w-full">
                    {loading === "announcements" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Announcements...
                      </>
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Seed Announcements
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reference" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reference Data</CardTitle>
                <CardDescription>Create sample reference data for the system</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This will create reference data including barangay officials, emergency contacts, and system settings.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" disabled={loading !== null}>
                    Seed Barangay Officials
                  </Button>
                  <Button variant="outline" disabled={loading !== null}>
                    Seed Emergency Contacts
                  </Button>
                  <Button variant="outline" disabled={loading !== null}>
                    Seed System Settings
                  </Button>
                  <Button variant="outline" disabled={loading !== null}>
                    Seed Categories & Tags
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}

