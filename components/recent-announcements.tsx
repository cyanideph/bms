import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function RecentAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: "Barangay Assembly Meeting",
      content:
        "The quarterly Barangay Assembly Meeting will be held on June 15, 2024 at the Barangay Hall. All residents are encouraged to attend.",
      date: "June 5, 2024",
      author: {
        name: "Maria Santos",
        role: "Barangay Secretary",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: 2,
      title: "Free Medical Mission",
      content:
        "A free medical mission will be conducted on June 20, 2024 at the Barangay Plaza. Services include general check-up, dental services, and free medicines.",
      date: "June 3, 2024",
      author: {
        name: "Dr. Jose Reyes",
        role: "Health Committee Head",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: 3,
      title: "Road Repair Schedule",
      content:
        "The Department of Public Works and Highways will be conducting road repairs on the main street from June 10-12, 2024. Please use alternative routes.",
      date: "June 1, 2024",
      author: {
        name: "Pedro Mendoza",
        role: "Barangay Captain",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
  ]

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="flex flex-col space-y-2 border-b pb-4 last:border-0">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={announcement.author.avatar} alt={announcement.author.name} />
                <AvatarFallback>{announcement.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-semibold">{announcement.title}</h4>
                <p className="text-xs text-muted-foreground">
                  Posted by {announcement.author.name} • {announcement.date}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{announcement.content}</p>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Announcements
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

