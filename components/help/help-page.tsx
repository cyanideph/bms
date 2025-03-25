"use client"

<<<<<<< HEAD
import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Mail, Phone, MessageSquare } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I request a barangay clearance?",
      answer:
        "To request a barangay clearance, navigate to the Permits & Clearances section, click on 'Request New Permit', select 'Barangay Clearance' from the dropdown menu, fill out the required information, and submit your request. You will receive a notification once your request has been processed.",
    },
    {
      question: "How do I report an incident in my area?",
      answer:
        "To report an incident, go to the Incidents & Complaints section, click on 'Report New Incident', fill out the incident details form with as much information as possible, and submit. A barangay official will review your report and take appropriate action.",
    },
    {
      question: "How can I update my resident information?",
      answer:
        "To update your resident information, navigate to the Resident Records section, find your profile, click on 'Edit Profile', make the necessary changes to your information, and save the updates. Your profile will be updated immediately.",
    },
    {
      question: "How do I view announcements from the barangay?",
      answer:
        "All barangay announcements can be viewed in the Announcements section. You can filter announcements by category or date to find specific information. Important announcements will also appear on the Dashboard when you log in.",
    },
    {
      question: "Who can I contact in case of emergency?",
      answer:
        "In case of emergency, visit the Emergency Contacts section for a list of important contact numbers including the barangay emergency hotline, local police, fire department, and medical services. You can also use the quick dial feature to call these numbers directly from the app.",
    },
    {
      question: "How do I send a message to barangay officials?",
      answer:
        "To send a message to barangay officials, go to the Messages section, click on 'New Message', select the recipient (either a specific official or department), compose your message, and send. You will receive a notification when you get a reply.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of navigating and using the Barangay Management System",
      content:
        "This guide will walk you through the essential features of the Barangay Management System, including how to navigate the dashboard, update your profile, and access key services. Start by exploring the sidebar menu to access different sections of the system. The Dashboard provides an overview of recent announcements, pending requests, and important notifications. To update your personal information, visit the Profile section accessible from the user menu in the top right corner.",
    },
    {
      title: "Requesting Documents",
      description: "Step-by-step guide on how to request various barangay documents",
      content:
        "To request documents such as Barangay Clearance, Certificate of Residency, or Business Permits: 1) Navigate to the Permits & Clearances section from the sidebar. 2) Click on 'Request New Permit/Clearance'. 3) Select the document type you need from the dropdown menu. 4) Fill out the required information and upload any necessary supporting documents. 5) Submit your request and note the reference number provided. 6) Track the status of your request through the 'My Requests' tab. 7) Once approved, you'll receive a notification with instructions for pickup or digital delivery.",
    },
    {
      title: "Reporting Incidents",
      description: "How to report incidents and track their resolution",
      content:
        "The Incident Reporting feature allows residents to report various issues such as security concerns, infrastructure problems, or neighborhood disturbances. To report an incident: 1) Go to the Incidents & Complaints section. 2) Click 'Report New Incident'. 3) Select the incident category and provide detailed information including location, date/time, and description. 4) Upload photos or videos if available. 5) Submit your report. You can track the status of your reported incidents in the 'My Reports' section. Barangay officials will update the status as they address the issue, and you'll receive notifications at each stage of resolution.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="mb-2 text-3xl font-bold">Help Center</h1>
        <p className="mb-8 text-muted-foreground">
          Find answers to common questions and learn how to use the Barangay Management System
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to the most common questions about the Barangay Management System
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <p className="py-4 text-center text-muted-foreground">
                    No results found for "{searchQuery}". Try a different search term.
                  </p>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>
                Step-by-step guides to help you navigate the system and complete common tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {guides.map((guide, index) => (
                  <AccordionItem key={index} value={`guide-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <div>{guide.title}</div>
                        <p className="text-sm text-muted-foreground">{guide.description}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{guide.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get in touch with our support team for assistance with the Barangay Management System
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Send us an email and we'll get back to you within 24 hours.
                    </p>
                    <Button className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Email: support@barangaysua.gov.ph
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Phone Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Call our support hotline during office hours (8AM - 5PM, Monday to Friday).
                    </p>
                    <Button className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Call: (053) 123-4567
                    </Button>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Live Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Chat with a support representative for immediate assistance during office hours.
                    </p>
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start Live Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Mail, MessageSquare, HelpCircle, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"

export function HelpPage() {
  const isMobile = useIsMobile()

  return (
    <PageTransition>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight philippines-text-gradient">Help & About</h2>
              <p className="text-muted-foreground">
                Documentation, support resources, and information about Barangay Sua Management System
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        <Tabs defaultValue="help" className="space-y-4">
          <TabsList className={isMobile ? "w-full" : ""}>
            <TabsTrigger value="help" className="flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>About</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </TabsTrigger>
            <TabsTrigger value="license" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>License</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="help" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions and answers about the Barangay Sua Management System</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is the Barangay Sua Management System?</AccordionTrigger>
                    <AccordionContent>
                      The Barangay Sua Management System is a comprehensive digital solution designed to streamline
                      administrative processes and enhance service delivery at the barangay level. It helps manage
                      resident information, permit applications, incident reports, and community events.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I navigate the system?</AccordionTrigger>
                    <AccordionContent>
                      You can navigate the system using the sidebar menu on the left. It provides access to all the main
                      features including Dashboard, Resident Records, Permits & Clearances, Incidents & Complaints,
                      Announcements, Emergency Contacts, and Messages. You can collapse the sidebar by clicking the
                      arrow button on its edge.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I register a new resident?</AccordionTrigger>
                    <AccordionContent>
                      To register a new resident, navigate to the "Resident Records" section from the sidebar. Click on
                      the "Add Resident" button at the top right of the page. Fill in the required information in the
                      form that appears and click "Save Resident" to complete the registration.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I process permit applications?</AccordionTrigger>
                    <AccordionContent>
                      To process permit applications, go to the "Permits & Clearances" section. You can view all pending
                      applications, review their details, and update their status. Click on a permit to view its
                      details, then use the action buttons to approve, reject, or request additional information.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I report an incident?</AccordionTrigger>
                    <AccordionContent>
                      To report an incident, navigate to the "Incidents & Complaints" section. Click on the "Report
                      Incident" button, fill in the incident details including location, description, and priority
                      level. You can also attach photos or documents related to the incident before submitting the
                      report.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Guide</CardTitle>
                <CardDescription>Documentation and guides for using the Barangay Sua Management System</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Getting Started</h3>
                    <p className="text-sm text-muted-foreground">
                      Welcome to the Barangay Sua Management System. This guide will help you get started with using the
                      system effectively.
                    </p>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      <li>Navigate using the sidebar menu on the left</li>
                      <li>Access different modules like Residents, Permits, Incidents, and Announcements</li>
                      <li>Use the search function to quickly find information</li>
                      <li>Generate reports from the Analytics section</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">User Roles</h3>
                    <p className="text-sm text-muted-foreground">
                      The system has different user roles with varying levels of access:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      <li>
                        <span className="font-medium">Admin:</span> Full access to all system features, including user
                        management and system settings
                      </li>
                      <li>
                        <span className="font-medium">Staff:</span> Access to most features except user management and
                        system settings
                      </li>
                      <li>
                        <span className="font-medium">Regular User:</span> Limited access to view information and submit
                        requests
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
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
                      <li>Firebase - Authentication, Database, and Storage</li>
                      <li>shadcn/ui - UI Component Library</li>
                      <li>Responsive Design for All Devices</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Creator</CardTitle>
                  <CardDescription>About Joemar Balaba</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border">
                      <Image
                        src="/images/barangay-seal.png"
                        alt="Creator"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Joemar Balaba</h3>
                      <p className="text-sm text-muted-foreground">Software Developer & System Architect</p>
                      <div className="mt-2 flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="mailto:joemar.balaba@example.com">
                            <Mail className="h-4 w-4 mr-1" />
                            Email
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
                      deep understanding of barangay operations, Joemar has developed this system to address the
                      specific needs of barangay administration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get help with the Barangay Sua Management System</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Support Options</h3>
                    <p className="text-sm text-muted-foreground">
                      If you need assistance with the Barangay Sua Management System, you have several options:
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Email Support</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col items-center gap-2">
                            <Mail className="h-8 w-8 text-primary" />
                            <p className="text-sm text-center">Send an email to our support team</p>
                            <Button variant="outline" className="w-full mt-2" asChild>
                              <Link href="mailto:support@barangay-sua.gov.ph">
                                <Mail className="mr-2 h-4 w-4" />
                                Email Support
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Live Chat</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col items-center gap-2">
                            <MessageSquare className="h-8 w-8 text-primary" />
                            <p className="text-sm text-center">Chat with a support representative</p>
                            <Button variant="outline" className="w-full mt-2">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Start Chat
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Documentation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col items-center gap-2">
                            <FileText className="h-8 w-8 text-primary" />
                            <p className="text-sm text-center">Browse our documentation</p>
                            <Button variant="outline" className="w-full mt-2" asChild>
                              <Link href="#help">
                                <FileText className="mr-2 h-4 w-4" />
                                View Docs
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <p className="text-sm text-muted-foreground">You can also contact the creator directly:</p>
                    <div className="rounded-md bg-muted p-4">
                      <p className="font-medium">Joemar Balaba</p>
                      <p className="text-sm text-muted-foreground">Email: joemar.balaba@example.com</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Support Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Our support team is available during the following hours:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
                      <li>Saturday: 9:00 AM - 12:00 PM</li>
                      <li>Sunday: Closed</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      All times are in Philippine Standard Time (PST).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="license" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>MIT License</CardTitle>
                <CardDescription>Copyright (c) {new Date().getFullYear()} Joemar Balaba</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4 text-sm">
                  <p>
                    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
                    associated documentation files (the "Software"), to deal in the Software without restriction,
                    including without limitation the rights to use, copy, modify, merge, publish, distribute,
                    sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
                    furnished to do so, subject to the following conditions:
                  </p>
                  <p className="mt-4">
                    The above copyright notice and this permission notice shall be included in all copies or substantial
                    portions of the Software.
                  </p>
                  <p className="mt-4">
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
                    NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
                    OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">About This License</h3>
                  <p className="text-sm text-muted-foreground">
                    The MIT License is a permissive free software license originating at the Massachusetts Institute of
                    Technology. It puts only very limited restriction on reuse and has, therefore, high license
                    compatibility.
                  </p>
                  <p className="text-sm text-muted-foreground">This means you are free to:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>Use the software for commercial purposes</li>
                    <li>Modify the software and create derivative works</li>
                    <li>Distribute the software</li>
                    <li>Sublicense the software</li>
                    <li>Use the software privately</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    The only requirement is that the license and copyright notice must be included in all copies or
                    substantial portions of the software.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  )
}

