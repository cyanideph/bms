"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, FileText, Building, FileCheck, Clock, CheckCircle, XCircle, Eye, Download } from "lucide-react"

export function PermitsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for permits
  const permits = [
    {
      id: "P-2024-056",
      type: "Barangay Clearance",
      applicant: "Juan Dela Cruz",
      purpose: "Employment",
      dateApplied: "June 5, 2024",
      status: "Pending",
      icon: FileText,
    },
    {
      id: "P-2024-055",
      type: "Business Permit",
      applicant: "Maria Garcia",
      purpose: "Sari-sari Store",
      dateApplied: "June 4, 2024",
      status: "Under Review",
      icon: Building,
    },
    {
      id: "P-2024-054",
      type: "Residency Certificate",
      applicant: "Roberto Santos",
      purpose: "Scholarship Application",
      dateApplied: "June 3, 2024",
      status: "Pending",
      icon: FileCheck,
    },
    {
      id: "P-2024-053",
      type: "Barangay Clearance",
      applicant: "Elena Reyes",
      purpose: "Bank Requirement",
      dateApplied: "June 2, 2024",
      status: "Approved",
      icon: FileText,
    },
    {
      id: "P-2024-052",
      type: "Business Permit",
      applicant: "Carlos Mendoza",
      purpose: "Internet Cafe",
      dateApplied: "June 1, 2024",
      status: "Rejected",
      icon: Building,
    },
    {
      id: "P-2024-051",
      type: "Residency Certificate",
      applicant: "Sophia Lim",
      purpose: "School Enrollment",
      dateApplied: "May 31, 2024",
      status: "Approved",
      icon: FileCheck,
    },
  ]

  // Filter permits based on search term
  const filteredPermits = permits.filter(
    (permit) =>
      permit.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group permits by status
  const pendingPermits = filteredPermits.filter(
    (permit) => permit.status === "Pending" || permit.status === "Under Review",
  )
  const approvedPermits = filteredPermits.filter((permit) => permit.status === "Approved")
  const rejectedPermits = filteredPermits.filter((permit) => permit.status === "Rejected")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Permits & Clearances</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Apply for Permit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Apply for Permit or Clearance</DialogTitle>
              <DialogDescription>Fill out the form to apply for a barangay permit or clearance.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="permitType">Permit Type</Label>
                <Select>
                  <SelectTrigger id="permitType">
                    <SelectValue placeholder="Select permit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clearance">Barangay Clearance</SelectItem>
                    <SelectItem value="business">Business Permit</SelectItem>
                    <SelectItem value="residency">Residency Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Last Name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Complete Address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" placeholder="Contact Number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea id="purpose" placeholder="State the purpose for this permit/clearance" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search permits by ID, applicant name, or type..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Permits</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPermits.map((permit) => (
              <PermitCard key={permit.id} permit={permit} />
            ))}
            {filteredPermits.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No permits found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingPermits.map((permit) => (
              <PermitCard key={permit.id} permit={permit} />
            ))}
            {pendingPermits.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No pending permits found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {approvedPermits.map((permit) => (
              <PermitCard key={permit.id} permit={permit} />
            ))}
            {approvedPermits.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No approved permits found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rejectedPermits.map((permit) => (
              <PermitCard key={permit.id} permit={permit} />
            ))}
            {rejectedPermits.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No rejected permits found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PermitCard({ permit }: { permit: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <permit.icon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{permit.type}</CardTitle>
          </div>
          <StatusBadge status={permit.status} />
        </div>
        <CardDescription>{permit.id}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1">
          <div className="text-sm">
            <span className="font-medium">Applicant:</span> {permit.applicant}
          </div>
          <div className="text-sm">
            <span className="font-medium">Purpose:</span> {permit.purpose}
          </div>
          <div className="text-sm">
            <span className="font-medium">Date Applied:</span> {permit.dateApplied}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
        {permit.status === "Approved" && (
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  let icon = null
  let variant: "default" | "secondary" | "destructive" | "outline" = "default"

  switch (status) {
    case "Pending":
      icon = <Clock className="h-3 w-3 mr-1" />
      variant = "outline"
      break
    case "Under Review":
      icon = <Clock className="h-3 w-3 mr-1" />
      variant = "secondary"
      break
    case "Approved":
      icon = <CheckCircle className="h-3 w-3 mr-1" />
      variant = "default"
      break
    case "Rejected":
      icon = <XCircle className="h-3 w-3 mr-1" />
      variant = "destructive"
      break
  }

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {status}
    </Badge>
  )
}

