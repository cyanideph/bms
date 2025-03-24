"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Globe, Mail, FileText } from "lucide-react"
import Link from "next/link"

export function AboutPage() {
  return (
    <PageTransition>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight philippines-text-gradient">About</h2>
              <p className="text-muted-foreground">About the Barangay Sua Management System and its creator</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/license">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">View License</span>
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2">
          <SlideIn direction="left">
            <Card>
              <CardHeader>
                <CardTitle>About the System</CardTitle>
                <CardDescription>Barangay Sua Management System</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  The Barangay Sua Management System is a comprehensive digital solution designed to streamline
                  administrative processes and enhance service delivery at the barangay level. This system facilitates
                  efficient management of resident information, permit applications, incident reports, and community
                  events.
                </p>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Key Features</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>Resident Information Management</li>
                    <li>Permit and Clearance Processing</li>
                    <li>Incident Reporting and Tracking</li>
                    <li>Event Management</li>
                    <li>Analytics and Reporting</li>
                    <li>User Role Management</li>
                    <li>Secure Authentication</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Technology Stack</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>Next.js - React Framework</li>
                    <li>Tailwind CSS - Utility-first CSS framework</li>
                    <li>shadcn/ui - UI Component Library</li>
                    <li>Recharts - Charting Library</li>
                    <li>Secure Authentication System</li>
                    <li>Responsive Design for All Devices</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Version Information</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Current Version:</span> 1.0.0
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Release Date:</span>{" "}
                    {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">License:</span> MIT License
                  </p>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          <SlideIn direction="right">
            <Card>
              <CardHeader>
                <CardTitle>Creator</CardTitle>
                <CardDescription>About Joemar Balaba</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border">
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                      JB
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Joemar Balaba</h3>
                    <p className="text-sm text-muted-foreground">Software Developer & System Architect</p>
                    <div className="mt-2 flex items-center gap-3">
                      <Button variant="outline" size="icon" asChild>
                        <Link href="https://github.com/joemarbalaba" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="https://joemarbalaba.example.com" target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                          <span className="sr-only">Website</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="mailto:joemar.balaba@example.com">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">About the Creator</h3>
                  <p className="text-sm text-muted-foreground">
                    Joemar Balaba is a software developer specializing in creating efficient and user-friendly
                    management systems for local government units. With extensive experience in web development and a
                    deep understanding of barangay operations, Joemar has developed this system to address the specific
                    needs of barangay administration.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Acknowledgments</h3>
                  <p className="text-sm text-muted-foreground">The creator would like to acknowledge the following:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>The open-source community for providing the tools and libraries used in this project</li>
                    <li>Barangay officials who provided valuable insights into administrative processes</li>
                    <li>Beta testers who helped identify and resolve issues</li>
                  </ul>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm italic">
                    "This system was created with the goal of empowering barangay officials with modern tools to better
                    serve their communities."
                  </p>
                  <p className="text-sm font-medium mt-2">— Joemar Balaba</p>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </div>
      </div>
    </PageTransition>
  )
}

