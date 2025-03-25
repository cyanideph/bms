import type { Metadata } from "next"
import { FirebaseStatus } from "@/components/firebase-status"
import { PageTransition } from "@/components/animations/page-transition"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Firebase Test",
  description: "Test Firebase connection and services",
}

export default function FirebaseTestPage() {
  return (
    <PageTransition>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Firebase Connection Test</h1>
        <p className="text-muted-foreground mb-8">
          This page tests the connection to Firebase services and displays their status.
        </p>

        <div className="grid gap-8">
          <FirebaseStatus />

          <div className="flex justify-center mt-4">
            <Button asChild>
              <a href="/auth/login">Go to Login Page</a>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

