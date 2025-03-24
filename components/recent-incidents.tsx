import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function RecentIncidents() {
  const incidents = [
    {
      id: "INC-2024-023",
      title: "Water Pipe Leak",
      location: "Main Street, near Market",
      date: "June 5, 2024",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "INC-2024-022",
      title: "Fallen Electric Post",
      location: "Rizal Avenue",
      date: "June 4, 2024",
      status: "New",
      priority: "High",
    },
    {
      id: "INC-2024-021",
      title: "Garbage Collection Issue",
      location: "Barangay Plaza",
      date: "June 3, 2024",
      status: "In Progress",
      priority: "Low",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {incidents.map((incident) => (
          <div key={incident.id} className="flex items-center justify-between border-b pb-2 last:border-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{incident.title}</span>
                <Badge
                  variant={
                    incident.priority === "High"
                      ? "destructive"
                      : incident.priority === "Medium"
                        ? "default"
                        : "outline"
                  }
                >
                  {incident.priority}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {incident.location} • {incident.date}
              </div>
            </div>
            <Badge variant={incident.status === "New" ? "secondary" : "outline"}>{incident.status}</Badge>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full">
        View All Incidents
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

