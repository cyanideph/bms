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
import {
  Search,
  Plus,
  AlertTriangle,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Upload,
} from "lucide-react"

export function IncidentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for incidents
  const incidents = [
    {
      id: "INC-2024-023",
      title: "Water Pipe Leak",
      description: "Major water leak from the main pipe near the market area. Water is flowing onto the street.",
      location: "Main Street, near Market",
      date: "June 5, 2024",
      reportedBy: "Juan Dela Cruz",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "INC-2024-022",
      title: "Fallen Electric Post",
      description: "An electric post has fallen due to the strong winds last night. Wires are on the ground.",
      location: "Rizal Avenue",
      date: "June 4, 2024",
      reportedBy: "Maria Santos",
      status: "New",
      priority: "High",
    },
    {
      id: "INC-2024-021",
      title: "Garbage Collection Issue",
      description: "Garbage has not been collected for the past week. The area is starting to smell.",
      location: "Barangay Plaza",
      date: "June 3, 2024",
      reportedBy: "Pedro Reyes",
      status: "In Progress",
      priority: "Low",
    },
    {
      id: "INC-2024-020",
      title: "Stray Dogs",
      description: "A pack of stray dogs in the area is causing concern for residents, especially children.",
      location: "Elementary School vicinity",
      date: "June 2, 2024",
      reportedBy: "Elena Garcia",
      status: "New",
      priority: "Medium",
    },
    {
      id: "INC-2024-019",
      title: "Street Light Not Working",
      description: "The street light at the corner has been out for several days, making the area dark at night.",
      location: "Corner of Mabini and Bonifacio Streets",
      date: "June 1, 2024",
      reportedBy: "Roberto Lim",
      status: "Resolved",
      priority: "Low",
    },
    {
      id: "INC-2024-018",
      title: "Noise Complaint",
      description: "Excessive noise from construction work during early morning hours, disturbing residents.",
      location: "New Subdivision Area",
      date: "May 31, 2024",
      reportedBy: "Sophia Cruz",
      status: "Resolved",
      priority: "Medium",
    },
  ]

  // Filter incidents based on search term
  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group incidents by status
  const newIncidents = filteredIncidents.filter((incident) => incident.status === "New")
  const inProgressIncidents = filteredIncidents.filter((incident) => incident.status === "In Progress")
  const resolvedIncidents = filteredIncidents.filter((incident) => incident.status === "Resolved")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Incidents & Complaints</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Report Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Report an Incident or Complaint</DialogTitle>
              <DialogDescription>Fill out the form to report an incident or file a complaint.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Incident Title</Label>
                <Input id="title" placeholder="Brief title of the incident" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the incident" rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Where did this happen?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date of Incident</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportedBy">Your Name</Label>
                <Input id="reportedBy" placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" placeholder="Your contact number" />
              </div>
              <div className="space-y-2">
                <Label>Attachments (Optional)</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports images and videos up to 10MB</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search incidents by title, ID, or location..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Incidents</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
            {filteredIncidents.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No incidents found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="new" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {newIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
            {newIncidents.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No new incidents found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="inProgress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
            {inProgressIncidents.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No in-progress incidents found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="resolved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resolvedIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
            {resolvedIncidents.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">No resolved incidents found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function IncidentCard({ incident }: { incident: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{incident.title}</CardTitle>
          <PriorityBadge priority={incident.priority} />
        </div>
        <CardDescription>{incident.id}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <p className="text-sm line-clamp-2">{incident.description}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {incident.location}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {incident.date}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Reported by: {incident.reportedBy}</span>
            <StatusBadge status={incident.status} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
        <Button size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Comment
        </Button>
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  let icon = null
  let variant: "default" | "secondary" | "destructive" | "outline" = "default"

  switch (status) {
    case "New":
      icon = <Clock className="h-3 w-3 mr-1" />
      variant = "secondary"
      break
    case "In Progress":
      icon = <Clock className="h-3 w-3 mr-1" />
      variant = "default"
      break
    case "Resolved":
      icon = <CheckCircle className="h-3 w-3 mr-1" />
      variant = "outline"
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

function PriorityBadge({ priority }: { priority: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default"

  switch (priority) {
    case "High":
      variant = "destructive"
      break
    case "Medium":
      variant = "default"
      break
    case "Low":
      variant = "outline"
      break
  }

  return (
    <Badge variant={variant} className="flex items-center">
      <AlertTriangle className="h-3 w-3 mr-1" />
      {priority}
    </Badge>
  )
}

