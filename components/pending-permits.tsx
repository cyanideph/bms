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
    </div>
  )
}

