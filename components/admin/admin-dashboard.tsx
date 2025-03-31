"use client"

<<<<<<< HEAD
import { useState, useEffect } from "react"
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  AlertTriangle,
  Bell,
  Settings,
  UserCog,
  BarChart,
  Activity,
  ArrowRight,
  TrendingUp,
  TrendingDown,
<<<<<<< HEAD
  Shield,
  Database,
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
} from "lucide-react"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { AnimatedCounter } from "@/components/animations/animated-counter"
<<<<<<< HEAD
import { countUsersByRole } from "@/lib/firebase/users"
import { countResidents } from "@/lib/firebase/services/resident-service"
import { countPermitsByStatus } from "@/lib/firebase/services/permit-service"
import { countIncidentsByStatus } from "@/lib/firebase/services/incident-service"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export function AdminDashboard() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    staffUsers: 0,
    regularUsers: 0,
    totalResidents: 0,
    pendingPermits: 0,
    activeIncidents: 0,
    systemUptime: 99.9,
    errorRate: 0.02,
  })

  useEffect(() => {
    const fetchAdminStats = async () => {
      setLoading(true)
      try {
        // Fetch counts in parallel
        const [userCounts, totalResidents, permitCounts, incidentStatusCounts] = await Promise.all([
          countUsersByRole(),
          countResidents(),
          countPermitsByStatus(),
          countIncidentsByStatus(),
        ])

        // Calculate active incidents (New + In Progress)
        const activeIncidents = (incidentStatusCounts["New"] || 0) + (incidentStatusCounts["In Progress"] || 0)

        setStats({
          totalUsers: userCounts.admin + userCounts.staff + userCounts.user,
          adminUsers: userCounts.admin,
          staffUsers: userCounts.staff,
          regularUsers: userCounts.user,
          totalResidents,
          pendingPermits: (permitCounts["Pending"] || 0) + (permitCounts["Under Review"] || 0),
          activeIncidents,
          systemUptime: 99.9, // Mock data for now
          errorRate: 0.02, // Mock data for now
        })
      } catch (error) {
        console.error("Error fetching admin stats:", error)
        toast({
          title: "Error",
          description: "Failed to load admin statistics. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAdminStats()
  }, [toast])

  const handleBackupSystem = () => {
    toast({
      title: "Backup Initiated",
      description: "System backup has been started. You will be notified when complete.",
    })
  }

  const handleViewErrorLogs = () => {
    toast({
      title: "Error Logs",
      description: "Error logs feature is coming soon.",
    })
  }

  const handleUpdateSettings = () => {
    toast({
      title: "System Settings",
      description: "System settings feature is coming soon.",
    })
  }

=======
import Link from "next/link"

import { ResidentAnalytics } from "@/components/admin/analytics/resident-analytics"
import { UserActivityAnalytics } from "@/components/admin/analytics/user-activity-analytics"

export function AdminDashboard() {
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  return (
    <PageTransition>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight philippines-text-gradient">Admin Dashboard</h2>
              <p className="text-muted-foreground">
                Welcome to the administrative dashboard for Barangay Sua Management System
              </p>
            </div>
            <div className="flex items-center gap-2">
<<<<<<< HEAD
              <Button variant="outline" size="icon" onClick={handleUpdateSettings}>
                <Settings className="h-4 w-4" />
              </Button>
              <Link href="/announcements">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </Link>
=======
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
            </div>
          </div>
        </FadeIn>

        <SlideIn direction="up">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                {loading ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter to={stats.totalUsers} />
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500 font-medium">+5.2%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </>
                )}
=======
                <div className="text-2xl font-bold">
                  <AnimatedCounter to={100} />
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+5.2%</span>
                  <span className="ml-1">from last month</span>
                </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                {loading ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter to={24} />
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500 font-medium">+12.5%</span>
                      <span className="ml-1">from yesterday</span>
                    </div>
                  </>
                )}
=======
                <div className="text-2xl font-bold">
                  <AnimatedCounter to={24} />
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+12.5%</span>
                  <span className="ml-1">from yesterday</span>
                </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                {loading ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.systemUptime}%</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500 font-medium">+0.1%</span>
                      <span className="ml-1">from last week</span>
                    </div>
                  </>
                )}
=======
                <div className="text-2xl font-bold">99.9%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+0.1%</span>
                  <span className="ml-1">from last week</span>
                </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                {loading ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-destructive border-t-transparent" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.errorRate}%</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingDown className="mr-1 h-3 w-3 text-green-500 rotate-180" />
                      <span className="text-green-500 font-medium">-0.5%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </>
                )}
=======
                <div className="text-2xl font-bold">0.02%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingDown className="mr-1 h-3 w-3 text-green-500 rotate-180" />
                  <span className="text-green-500 font-medium">-0.5%</span>
                  <span className="ml-1">from last month</span>
                </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </CardContent>
            </Card>
          </div>
        </SlideIn>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <StaggerContainer>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StaggerItem>
                  <Card>
                    <CardHeader className="pb-2">
<<<<<<< HEAD
                      <CardTitle>User Distribution</CardTitle>
                      <CardDescription>Breakdown of user accounts by role</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="flex justify-center py-8">
                          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Shield className="mr-2 h-4 w-4 text-destructive" />
                              <span>Administrators</span>
                            </div>
                            <span className="font-medium">{stats.adminUsers}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <UserCog className="mr-2 h-4 w-4 text-primary" />
                              <span>Staff Members</span>
                            </div>
                            <span className="font-medium">{stats.staffUsers}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Regular Users</span>
                            </div>
                            <span className="font-medium">{stats.regularUsers}</span>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <Link href="/admin/users">
                              <Button variant="outline" className="w-full justify-between">
                                Manage Users
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
=======
                      <CardTitle>User Activity</CardTitle>
                      <CardDescription>Recent user logins and actions</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <UserActivityAnalytics />
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card>
                    <CardHeader className="pb-2">
<<<<<<< HEAD
                      <CardTitle>System Status</CardTitle>
                      <CardDescription>Current system performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="flex justify-center py-8">
                          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Database className="mr-2 h-4 w-4 text-primary" />
                              <span>Database Status</span>
                            </div>
                            <span className="text-green-500 font-medium">Healthy</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Activity className="mr-2 h-4 w-4 text-primary" />
                              <span>API Response Time</span>
                            </div>
                            <span className="font-medium">245ms</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                              <span>Active Warnings</span>
                            </div>
                            <span className="font-medium">2</span>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" className="w-full justify-between" onClick={handleViewErrorLogs}>
                              View Error Logs
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
=======
                      <CardTitle>System Performance</CardTitle>
                      <CardDescription>Server load and response times</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResidentAnalytics />
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Link href="/admin/analytics">
                          <Button variant="outline" className="w-full justify-between">
                            View Analytics Dashboard
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
<<<<<<< HEAD
                        <Link href="/admin/users">
                          <Button variant="outline" className="w-full justify-between">
                            Manage User Accounts
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full justify-between" onClick={handleBackupSystem}>
                          System Backup
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between" onClick={handleViewErrorLogs}>
                          Error Logs
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between" onClick={handleUpdateSettings}>
=======
                        <Button variant="outline" className="w-full justify-between">
                          Manage User Accounts
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between">
                          System Backup
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between">
                          Error Logs
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between">
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                          Update System Settings
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </div>
            </StaggerContainer>

            <Card>
              <CardHeader>
<<<<<<< HEAD
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Key metrics from across the system</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Residents</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total Residents</span>
                        <span className="font-medium">{stats.totalResidents}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">New This Month</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Households</span>
                        <span className="font-medium">{Math.round(stats.totalResidents / 4)}</span>
                      </div>
                      <Link href="/residents">
                        <Button variant="link" className="p-0 h-auto">
                          View Resident Records →
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Permits</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Pending Approval</span>
                        <span className="font-medium">{stats.pendingPermits}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Approved This Month</span>
                        <span className="font-medium">28</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Rejected This Month</span>
                        <span className="font-medium">5</span>
                      </div>
                      <Link href="/permits">
                        <Button variant="link" className="p-0 h-auto">
                          View Permit Applications →
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Incidents</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Active Incidents</span>
                        <span className="font-medium">{stats.activeIncidents}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Resolved This Month</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">High Priority</span>
                        <span className="font-medium">3</span>
                      </div>
                      <Link href="/incidents">
                        <Button variant="link" className="p-0 h-auto">
                          View Incident Reports →
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>Latest actions performed in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <UserCog className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">User Account Created</p>
                        <p className="text-xs text-muted-foreground">New staff account for Maria Santos</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">System Settings Updated</p>
                        <p className="text-xs text-muted-foreground">Email notification settings changed</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Report Generated</p>
                        <p className="text-xs text-muted-foreground">Monthly resident statistics report</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <div>
                        <p className="text-sm font-medium">System Error</p>
                        <p className="text-xs text-muted-foreground">Database connection timeout (resolved)</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Announcement Published</p>
                        <p className="text-xs text-muted-foreground">Barangay Assembly Meeting announcement</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>Detailed analytics about system usage and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-10">
                  <Link href="/admin/analytics">
                    <Button>
                      <BarChart className="mr-2 h-4 w-4" />
                      Go to Analytics Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-10">
<<<<<<< HEAD
                  <Link href="/admin/users">
                    <Button>
                      <Users className="mr-2 h-4 w-4" />
                      Go to User Management
                    </Button>
                  </Link>
=======
                  <p className="text-muted-foreground">User management interface coming soon</p>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-2">General Settings</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-between" onClick={handleUpdateSettings}>
                          System Configuration
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between" onClick={handleUpdateSettings}>
                          Email Templates
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between" onClick={handleUpdateSettings}>
                          Notification Settings
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Security Settings</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-between" onClick={handleUpdateSettings}>
                          Authentication Settings
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between" onClick={handleUpdateSettings}>
                          Permission Management
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between" onClick={handleBackupSystem}>
                          Backup & Recovery
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">System Maintenance</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-between" onClick={handleBackupSystem}>
                        Database Backup
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between" onClick={handleViewErrorLogs}>
                        System Logs
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Link href="/admin/seed">
                        <Button variant="outline" className="w-full justify-between">
                          Seed Database
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
=======
                <div className="flex justify-center py-10">
                  <p className="text-muted-foreground">System settings interface coming soon</p>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}

