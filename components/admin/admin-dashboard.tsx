"use client"

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
} from "lucide-react"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import Link from "next/link"

import { ResidentAnalytics } from "@/components/admin/analytics/resident-analytics"
import { UserActivityAnalytics } from "@/components/admin/analytics/user-activity-analytics"

export function AdminDashboard() {
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
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
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
                <div className="text-2xl font-bold">
                  <AnimatedCounter to={100} />
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+5.2%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter to={24} />
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+12.5%</span>
                  <span className="ml-1">from yesterday</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+0.1%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.02%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingDown className="mr-1 h-3 w-3 text-green-500 rotate-180" />
                  <span className="text-green-500 font-medium">-0.5%</span>
                  <span className="ml-1">from last month</span>
                </div>
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
                      <CardTitle>User Activity</CardTitle>
                      <CardDescription>Recent user logins and actions</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <UserActivityAnalytics />
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>System Performance</CardTitle>
                      <CardDescription>Server load and response times</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResidentAnalytics />
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
                  <p className="text-muted-foreground">User management interface coming soon</p>
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
                <div className="flex justify-center py-10">
                  <p className="text-muted-foreground">System settings interface coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}

