import { Button } from "@/components/ui/button"
import { ShieldAlert, Home } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Unauthorized | Barangay Sua Management System",
  description: "You don't have permission to access this page",
}

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <ShieldAlert className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Unauthorized</h1>
        <p className="mt-2 text-muted-foreground">You don't have permission to access this page.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

