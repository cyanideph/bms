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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Calendar,
  Bell,
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  Share2,
  CalendarDays,
  Upload,
} from "lucide-react"

export function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: "Barangay Assembly Meeting",
      content:
        "The quarterly Barangay Assembly Meeting will be held on June 15, 2024 at the Barangay Hall. All residents are encouraged to attend. Important matters regarding the barangay development plan will be discussed.",
      date: "June 5, 2024",
      author: {
        name: "Maria Santos",
        role: "Barangay Secretary",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 24,
      comments: 8,
      type: "announcement",
    },
    {
      id: 2,
      title: "Free Medical Mission",
      content:
        "A free medical mission will be conducted on June 20, 2024 at the Barangay Plaza. Services include general check-up, dental services, and free medicines. Please bring your Barangay ID for verification.",
      date: "June 3, 2024",
      author: {
        name: "Dr. Jose Reyes",
        role: "Health Committee Head",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 45,
      comments: 12,
      type: "announcement",
    },
    {
      id: 3,
      title: "Road Repair Schedule",
      content:
        "The Department of Public Works and Highways will be conducting road repairs on the main street from June 10-12, 2024. Please use alternative routes during this period to avoid inconvenience.",
      date: "June 1, 2024",
      author: {
        name: "Pedro Mendoza",
        role: "Barangay Captain",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 18,
      comments: 6,
      type: "announcement",
    },
    {
      id: 4,
      title: "Fiesta Celebration",
      content:
        "The annual fiesta celebration will be held on July 15-16, 2024. Various activities are planned including a parade, cultural shows, and sports competitions. Everyone is invited to join the festivities.",
      date: "May 30, 2024",
      eventDate: "July 15-16, 2024",
      location: "Barangay Plaza",
      time: "8:00 AM onwards",
      author: {
        name: "Pedro Mendoza",
        role: "Barangay Captain",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 56,
      comments: 15,
      type: "event",
    },
    {
      id: 5,
      title: "Clean-up Drive",
      content:
        "A community clean-up drive will be conducted on June 25, 2024. All residents are encouraged to participate. Please bring your own cleaning materials. Let's work together to keep our barangay clean!",
      date: "May 28, 2024",
      eventDate: "June 25, 2024",
      location: "Starting at Barangay Hall",
      time: "7:00 AM - 11:00 AM",
      author: {
        name: "Elena Garcia",
        role: "Environmental Committee Head",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 32,
      comments: 9,
      type: "event",
    },
    {
      id: 6,
      title: "Basketball Tournament",
      content:
        "The inter-purok basketball tournament will start on July 1, 2024. Teams can register at the Barangay Hall until June 20. Cash prizes await the champions!",
      date: "May 25, 2024",
      eventDate: "July 1-15, 2024",
      location: "Barangay Basketball Court",
      time: "3:00 PM onwards",
      author: {
        name: "Roberto Lim",
        role: "Sports Committee Head",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 41,
      comments: 14,
      type: "event",
    },
  ]

  // Filter announcements based on search term
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group announcements by type
  const announcementsOnly = filteredAnnouncements.filter((item) => item.type === "announcement")
  const eventsOnly = filteredAnnouncements.filter((item) => item.type === "event")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Announcements & Events</h2>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Create a new event for the barangay calendar.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input id="eventTitle" placeholder="Title of the event" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDescription">Description</Label>
                  <Textarea id="eventDescription" placeholder="Detailed description of the event" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input id="eventDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventTime">Event Time</Label>
                    <Input id="eventTime" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Location</Label>
                  <Input id="eventLocation" placeholder="Where will the event be held?" />
                </div>
                <div className="space-y-2">
                  <Label>Event Image (Optional)</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop an image here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports JPG, PNG up to 5MB</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Bell className="mr-2 h-4 w-4" />
                Post Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Post New Announcement</DialogTitle>
                <DialogDescription>Create a new announcement for barangay residents.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="announcementTitle">Announcement Title</Label>
                  <Input id="announcementTitle" placeholder="Title of the announcement" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="announcementContent">Content</Label>
                  <Textarea id="announcementContent" placeholder="Content of the announcement" rows={6} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="announcementType">Announcement Type</Label>
                  <Select>
                    <SelectTrigger id="announcementType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Announcement</SelectItem>
                      <SelectItem value="important">Important Notice</SelectItem>
                      <SelectItem value="emergency">Emergency Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports images, PDFs up to 10MB</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Post Announcement</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search announcements and events..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredAnnouncements.map((item) =>
              item.type === "announcement" ? (
                <AnnouncementCard key={item.id} announcement={item} />
              ) : (
                <EventCard key={item.id} event={item} />
              ),
            )}
            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No announcements or events found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="announcements" className="space-y-4">
          <div className="grid gap-4">
            {announcementsOnly.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
            {announcementsOnly.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No announcements found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4">
            {eventsOnly.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {eventsOnly.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No events found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AnnouncementCard({ announcement }: { announcement: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={announcement.author.avatar} alt={announcement.author.name} />
              <AvatarFallback>{announcement.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{announcement.title}</CardTitle>
              <CardDescription>
                Posted by {announcement.author.name} • {announcement.date}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline">Announcement</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{announcement.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{announcement.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{announcement.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

function EventCard({ event }: { event: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={event.author.avatar} alt={event.author.name} />
              <AvatarFallback>{event.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription>
                Posted by {event.author.name} • {event.date}
              </CardDescription>
            </div>
          </div>
          <Badge>Event</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{event.content}</p>
        <div className="flex flex-col space-y-1 pt-2">
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            <span>{event.eventDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{event.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{event.comments}</span>
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>
      </CardFooter>
    </Card>
  )
}

