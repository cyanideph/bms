<<<<<<< HEAD
"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { getPermits } from "@/lib/firebase/services/permit-service"
import type { Permit } from "@/lib/firebase/collections"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function PendingPermits() {
  const [permits, setPermits] = useState<Permit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPermits = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await getPermits(null, 4, {
          status: "Pending", // Only fetch pending permits
        })
        setPermits(result.permits)
      } catch (error) {
        console.error("Error fetching permits:", error)
        setError("Failed to load permits. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPermits()
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

  if (permits.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No pending permits available</p>
      </div>
    )
  }
=======
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function PendingPermits() {
  const permits = [
    {
      id: "P-2024-056",
      type: "Barangay Clearance",
      applicant: "Juan Dela Cruz",
      date: "June 5, 2024",
      status: "Pending",
    },
    {
      id: "P-2024-055",
      type: "Business Permit",
      applicant: "Maria Garcia",
      date: "June 4, 2024",
      status: "Under Review",
    },
    {
      id: "P-2024-054",
      type: "Residency Certificate",
      applicant: "Roberto Santos",
      date: "June 3, 2024",
      status: "Pending",
    },
    {
      id: "P-2024-053",
      type: "Barangay Clearance",
      applicant: "Elena Reyes",
      date: "June 2, 2024",
      status: "Under Review",
    },
  ]
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {permits.map((permit) => (
          <div key={permit.id} className="flex items-center justify-between border-b pb-2 last:border-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{permit.type}</span>
                <Badge variant={permit.status === "Pending" ? "outline" : "secondary"}>{permit.status}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
<<<<<<< HEAD
                {permit.applicant} • {formatDate(permit.dateApplied)}
              </div>
            </div>
            <div className="text-xs font-medium">{permit.permitId}</div>
          </div>
        ))}
      </div>
      <Link href="/permits">
        <Button variant="outline" className="w-full">
          View All Permits
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
=======
                {permit.applicant} • {permit.date}
              </div>
            </div>
            <div className="text-xs font-medium">{permit.id}</div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full">
        View All Permits
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    </div>
  )
}

<<<<<<< HEAD
// Helper function to safely format dates from Firestore
function formatDate(date: any): string {
  if (!date) return "Unknown date"

  try {
    // Handle Firestore Timestamp
    if (date && typeof date.toDate === "function") {
      return date.toDate().toLocaleDateString()
    }

    // Handle Date objects
    if (date instanceof Date) {
      return date.toLocaleDateString()
    }

    // Handle string dates
    return new Date(date).toLocaleDateString()
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}

=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
