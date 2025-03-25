"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { RefreshCcw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="container px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-6 h-32 w-32 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 opacity-20 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-destructive/20 bg-white/90 p-2 shadow-xl">
            <Image
              src="/images/barangay-seal.png"
              alt="Barangay Sua Official Seal"
              width={100}
              height={100}
              className="object-contain opacity-70"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-4xl font-extrabold tracking-tight text-destructive md:text-6xl"
        >
          Error
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Something went wrong</h2>
          <p className="mb-8 text-muted-foreground">
            We apologize for the inconvenience. Please try again or contact support if the problem persists.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Button onClick={() => reset()} size="lg" className="gap-2">
            <RefreshCcw className="h-5 w-5" />
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              Return to Dashboard
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-destructive/10 px-4 py-1 text-sm text-destructive">
            <span>Error Code: {error.digest}</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

