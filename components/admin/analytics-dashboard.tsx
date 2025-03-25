"use client"

<<<<<<< HEAD
import { useState, useEffect } from "react"
=======
import { useState } from "react"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileDown,
  FileText,
  Filter,
  PieChart,
  RefreshCw,
  Users,
  CalendarDays,
  AlertTriangle,
  FileCheck,
  TrendingUp,
<<<<<<< HEAD
  Loader2,
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
} from "lucide-react"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
<<<<<<< HEAD
import { useToast } from "@/components/ui/use-toast"
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

import { ResidentAnalytics } from "@/components/admin/analytics/resident-analytics"
import { PermitAnalytics } from "@/components/admin/analytics/permit-analytics"
import { IncidentAnalytics } from "@/components/admin/analytics/incident-analytics"
import { UserActivityAnalytics } from "@/components/admin/analytics/user-activity-analytics"
import { ReportGenerator } from "@/components/admin/report-generator"
<<<<<<< HEAD
import { countResidents } from "@/lib/firebase/services/resident-service"
import { countPermitsByStatus } from "@/lib/firebase/services/permit-service"
import { countIncidentsByStatus } from "@/lib/firebase/services/incident-service"

export function AnalyticsDashboard() {
  const { toast } = useToast()
=======

export function AnalyticsDashboard() {
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
<<<<<<< HEAD
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalResidents: 0,
    permitsIssued: 0,
    eventsHeld: 0,
    incidentsReported: 0,
  })

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // Fetch counts in parallel
      const [totalResidents, permitCounts, incidentStatusCounts] = await Promise.all([
        countResidents(),
        countPermitsByStatus(),
        countIncidentsByStatus(),
      ])

      // Calculate total permits issued (Approved)
      const permitsIssued = permitCounts["Approved"] || 0

      // Calculate total incidents reported (all statuses)
      const incidentsReported = Object.values(incidentStatusCounts).reduce((sum, count) => sum + count, 0)

      // Mock data for events held
      const eventsHeld = 24

      setStats({
        totalResidents,
        permitsIssued,
        eventsHeld,
        incidentsReported,
      })
    } catch (error) {
      console.error("Error fetching analytics data:", error)
      toast({
        title: "Error",
        description: "Failed to load analytics data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [toast])

  const handleRefresh = async () => {
    toast({
      title: "Refreshing Data",
      description: "Updating analytics with the latest information...",
    })

    try {
      await fetchAnalyticsData()
      toast({
        title: "Data Refreshed",
        description: "Analytics data has been updated successfully.",
      })
    } catch (error) {
      console.error("Error refreshing data:", error)
      toast({
        title: "Refresh Failed",
        description: "Could not update analytics data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Your analytics export is being prepared and will download shortly.",
    })

    // Mock export functionality
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Analytics data has been exported successfully.",
      })
    }, 2000)
  }
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

  return (
    <PageTransition>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight philippines-text-gradient">Analytics & Reports</h2>
              <p className="text-muted-foreground">View detailed analytics and generate reports for Barangay Sua</p>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Options</h4>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Date Range</h5>
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => range && setDateRange(range)}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Data Type</h5>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select data type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Data</SelectItem>
                          <SelectItem value="residents">Residents</SelectItem>
                          <SelectItem value="permits">Permits</SelectItem>
                          <SelectItem value="incidents">Incidents</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end">
<<<<<<< HEAD
                      <Button
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Filters Applied",
                            description: "Analytics data has been filtered according to your selection.",
                          })
                        }}
                      >
                        Apply Filters
                      </Button>
=======
                      <Button size="sm">Apply Filters</Button>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
<<<<<<< HEAD
              <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
=======
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                <FileDown className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </FadeIn>

        <SlideIn direction="up">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.totalResidents.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500 font-medium">+3.2%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </>
                )}
=======
                <div className="text-2xl font-bold">1,247</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+3.2%</span>
                  <span className="ml-1">from last month</span>
                </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Permits Issued</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.permitsIssued.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500 font-medium">+12.5%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </>
                )}
=======
                <div className="text-2xl font-bold">342</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+12.5%</span>
                  <span className="ml-1">from last month</span>
                </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events Held</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.eventsHeld.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500 font-medium">+4.1%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </>
                )}
=======
                <div className="text-2xl font-bold">24</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+4.1%</span>
                  <span className="ml-1">from last month</span>
                </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incidents Reported</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.incidentsReported.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-red-500 rotate-180" />
                      <span className="text-red-500 font-medium">-2.3%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </>
                )}
=======
                <div className="text-2xl font-bold">87</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-red-500 rotate-180" />
                  <span className="text-red-500 font-medium">-2.3%</span>
                  <span className="ml-1">from last month</span>
                </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </CardContent>
            </Card>
          </div>
        </SlideIn>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="residents" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Residents
            </TabsTrigger>
            <TabsTrigger value="permits" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Permits
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Incidents
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <StaggerContainer>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StaggerItem>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Resident Demographics</CardTitle>
                      <CardDescription>Age and gender distribution</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                      <UserActivityAnalytics />
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Permit Types</CardTitle>
                      <CardDescription>Distribution by permit category</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                      <PermitAnalytics />
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Incident Categories</CardTitle>
                      <CardDescription>Types of reported incidents</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                      <IncidentAnalytics />
                    </CardContent>
                  </Card>
                </StaggerItem>
              </div>
            </StaggerContainer>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Activity Overview</CardTitle>
                <CardDescription>Trends across all barangay services</CardDescription>
              </CardHeader>
              <CardContent>
                <ResidentAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="residents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resident Analytics</CardTitle>
                <CardDescription>Detailed resident statistics and demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResidentAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Permit Analytics</CardTitle>
                <CardDescription>Permit application and approval statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <PermitAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Incident Analytics</CardTitle>
                <CardDescription>Incident reporting and resolution statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <IncidentAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <ReportGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}

