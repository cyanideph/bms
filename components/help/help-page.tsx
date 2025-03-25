"use client"

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
  )
}

