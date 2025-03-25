<<<<<<< HEAD
"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { getIncidents } from "@/lib/firebase/services/incident-service"
import type { Incident } from "@/lib/firebase/collections"
import Link from "next/link"

export function RecentIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true)
      try {
        const result = await getIncidents(null, 3)
        setIncidents(result.incidents)
      } catch (error) {
        console.error("Error fetching incidents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchIncidents()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (incidents.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No incidents available</p>
      </div>
    )
  }
=======
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
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

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
<<<<<<< HEAD
                {incident.location} • {new Date(incident.date?.toDate()).toLocaleDateString()}
=======
                {incident.location} • {incident.date}
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              </div>
            </div>
            <Badge variant={incident.status === "New" ? "secondary" : "outline"}>{incident.status}</Badge>
          </div>
        ))}
      </div>
<<<<<<< HEAD
      <Link href="/incidents">
        <Button variant="outline" className="w-full">
          View All Incidents
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
=======
      <Button variant="outline" className="w-full">
        View All Incidents
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    </div>
  )
}

