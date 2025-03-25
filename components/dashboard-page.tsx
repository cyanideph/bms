"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarDays, FileText, Users, Bell, AlertTriangle, ArrowRight, Loader2 } from "lucide-react"
import { RecentAnnouncements } from "@/components/recent-announcements"
import { PendingPermits } from "@/components/pending-permits"
import { RecentIncidents } from "@/components/recent-incidents"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { ScaleIn } from "@/components/animations/scale-in"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { AnimatedGradient } from "@/components/animations/animated-gradient"
import { AnimatedButton } from "@/components/animations/animated-button"
import { PageTransition } from "@/components/animations/page-transition"
import { countResidents } from "@/lib/firebase/services/resident-service"
import { countPermitsByStatus } from "@/lib/firebase/services/permit-service"
import { countIncidentsByStatus, countIncidentsByPriority } from "@/lib/firebase/services/incident-service"
import { getAnnouncementsAndEvents } from "@/lib/firebase/services/announcement-service"
import Image from "next/image"
import Link from "next/link"

export function DashboardPage() {
  const isMobile = useIsMobile()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalResidents: 0,
    pendingPermits: 0,
    upcomingEvents: 0,
    activeIncidents: 0,
    highPriorityIncidents: 0,
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        // Fetch counts in parallel
        const [totalResidents, permitCounts, incidentStatusCounts, incidentPriorityCounts, eventsResult] =
          await Promise.all([
            countResidents(),
            countPermitsByStatus(),
            countIncidentsByStatus(),
            countIncidentsByPriority(),
            getAnnouncementsAndEvents(null, 10),
          ])

        // Calculate upcoming events (events with future dates)
        const upcomingEvents = eventsResult.items.filter(
          (item) => item.type === "event" && new Date(item.eventDate) > new Date(),
        ).length

        // Calculate active incidents (New + In Progress)
        const activeIncidents = (incidentStatusCounts["New"] || 0) + (incidentStatusCounts["In Progress"] || 0)

        setStats({
          totalResidents,
          pendingPermits: (permitCounts["Pending"] || 0) + (permitCounts["Under Review"] || 0),
          upcomingEvents,
          activeIncidents,
          highPriorityIncidents: incidentPriorityCounts["High"] || 0,
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <PageTransition>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div className="flex items-center gap-3">
              <div className="hidden md:block relative h-12 w-12">
                <Image
                  src="/images/barangay-seal.png"
                  alt="Barangay Sua Official Seal"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight philippines-text-gradient">Dashboard</h2>
                <p className="text-muted-foreground">Welcome to Barangay Sua Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/announcements">
                <AnimatedButton className="bg-primary hover:bg-primary/90">
                  <Bell className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Hero banner with Philippines flag colors */}
        <SlideIn direction="up">
          <AnimatedGradient className="relative overflow-hidden rounded-lg p-6 shadow-md mb-6">
            <div className="absolute inset-0 philippines-gradient opacity-10"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="hidden md:block relative h-16 w-16">
                <Image
                  src="/images/barangay-seal.png"
                  alt="Barangay Sua Official Seal"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Welcome to Barangay Sua</h3>
                <p className="text-muted-foreground max-w-3xl">
                  San Juan, Southern Leyte's comprehensive management system. Access resident records, apply for
                  permits, report incidents, and stay updated with barangay announcements.
                </p>
              </div>
            </div>
          </AnimatedGradient>
        </SlideIn>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-muted/50 p-1 overflow-x-auto flex-nowrap w-full">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-background">
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <StaggerContainer>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StaggerItem>
                  <Card className="border-l-4 border-l-primary hover:shadow-md transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <div className="text-2xl font-bold">
                            <AnimatedCounter to={stats.totalResidents} />
                          </div>
                          <p className="text-xs text-muted-foreground">+3 from last month</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="border-l-4 border-l-secondary hover:shadow-md transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Permits</CardTitle>
                      <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-secondary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <div className="text-2xl font-bold">
                            <AnimatedCounter to={stats.pendingPermits} />
                          </div>
                          <p className="text-xs text-muted-foreground">+2 since yesterday</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="border-l-4 border-l-accent hover:shadow-md transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <CalendarDays className="h-4 w-4 text-accent" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <div className="text-2xl font-bold">
                            <AnimatedCounter to={stats.upcomingEvents} />
                          </div>
                          <p className="text-xs text-muted-foreground">Next: Barangay Assembly</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="border-l-4 border-l-destructive hover:shadow-md transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                      <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <div className="text-2xl font-bold">
                            <AnimatedCounter to={stats.activeIncidents} />
                          </div>
                          <p className="text-xs text-muted-foreground">{stats.highPriorityIncidents} high priority</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </StaggerItem>
              </div>
            </StaggerContainer>

            <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-7"}`}>
              <ScaleIn className={isMobile ? "" : "col-span-4"} delay={0.2}>
                <Card className="shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                    <CardDescription>Latest updates from Barangay Sua</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentAnnouncements />
                  </CardContent>
                </Card>
              </ScaleIn>
              <ScaleIn className={isMobile ? "" : "col-span-3"} delay={0.3}>
                <Card className="shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Pending Permit Requests</CardTitle>
                    <CardDescription>Awaiting approval or processing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PendingPermits />
                  </CardContent>
                </Card>
              </ScaleIn>
            </div>

            <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-7"}`}>
              <ScaleIn className={isMobile ? "" : "col-span-3"} delay={0.4}>
                <Card className="shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Recent Incidents</CardTitle>
                    <CardDescription>Recently reported incidents in the barangay</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentIncidents />
                  </CardContent>
                </Card>
              </ScaleIn>
              <ScaleIn className={isMobile ? "" : "col-span-4"} delay={0.5}>
                <Card className="shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Emergency Alert</CardTitle>
                    <CardDescription>Important information for residents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="border-secondary bg-secondary/10 dark:bg-secondary/5">
                      <AlertTriangle className="h-4 w-4 text-secondary" />
                      <AlertTitle className="text-secondary font-bold">Weather Advisory</AlertTitle>
                      <AlertDescription>
                        Tropical Depression expected to bring heavy rainfall in the next 48 hours. Please secure your
                        homes and prepare emergency supplies.
                      </AlertDescription>
                    </Alert>
                    <div className="mt-4">
                      <Link href="/emergency">
                        <AnimatedButton variant="outline" className="w-full group">
                          View All Alerts
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </AnimatedButton>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </ScaleIn>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>Population Analytics</CardTitle>
                  <CardDescription>Demographic breakdown of Barangay Sua</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Reports</CardTitle>
                  <CardDescription>Generate and download reports</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Reports dashboard coming soon</p>
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}

