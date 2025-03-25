import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ScaleIn } from "@/components/animations/scale-in"
import { FadeIn } from "@/components/animations/fade-in"

export const metadata: Metadata = {
  title: "Welcome to Barangay Sua Management System",
  description: "A comprehensive management system for Barangay Sua",
}

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center">
      <FadeIn>
        <div className="mb-4 flex justify-center">
          <ScaleIn>
            <img
              src="/images/barangay-seal.png"
              alt="Barangay Sua Seal"
              className="h-32 w-32 rounded-full border-4 border-primary/20 shadow-lg"
            />
          </ScaleIn>
        </div>

        <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Barangay Sua Management System
        </h1>

        <p className="mb-8 max-w-2xl text-muted-foreground">
          A comprehensive system for managing residents, permits, incidents, and more for Barangay Sua.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}

