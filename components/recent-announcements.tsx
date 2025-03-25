"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { getAnnouncements } from "@/lib/firebase/services/announcement-service"
import type { Announcement } from "@/lib/firebase/collections"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Helper function to safely format dates
const formatDate = (dateValue: any): string => {
  if (!dateValue) return "No date"

  try {
    // Handle Firestore Timestamp
    if (dateValue && typeof dateValue.toDate === "function") {
      return new Date(dateValue.toDate()).toLocaleDateString()
    }

    // Handle Date objects or strings
    return new Date(dateValue).toLocaleDateString()
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}

export function RecentAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await getAnnouncements(null, 3)

        // Validate and sanitize the data before setting state
        const validAnnouncements = result.announcements.map((announcement) => ({
          ...announcement,
          // Ensure author object exists with required properties
          author: {
            name: announcement.author?.name || "Unknown",
            role: announcement.author?.role || "Staff",
            avatar: announcement.author?.avatar || "/placeholder.svg?height=40&width=40",
          },
          // Ensure other required fields exist
          title: announcement.title || "Untitled Announcement",
          content: announcement.content || "No content available",
          date: announcement.date || new Date(),
        }))

        setAnnouncements(validAnnouncements)
      } catch (error) {
        console.error("Error fetching announcements:", error)
        setError("Failed to load announcements. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No announcements available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="flex flex-col space-y-2 border-b pb-4 last:border-0">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage
                  src={announcement.author?.avatar || "/placeholder.svg?height=40&width=40"}
                  alt={announcement.author?.name || "Unknown"}
                />
                <AvatarFallback>{(announcement.author?.name || "U").charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-semibold">{announcement.title || "Untitled"}</h4>
                <p className="text-xs text-muted-foreground">
                  Posted by {announcement.author?.name || "Unknown"} • {formatDate(announcement.date)}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{announcement.content || "No content available"}</p>
        </div>
      ))}
      <Link href="/announcements">
        <Button variant="outline" className="w-full">
          View All Announcements
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}

