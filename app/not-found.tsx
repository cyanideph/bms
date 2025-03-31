"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="container px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-6 h-32 w-32 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 via-red-500 to-yellow-400 opacity-20 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-primary/20 bg-white/90 p-2 shadow-xl">
            <Image
              src="/images/barangay-seal.png"
              alt="Barangay Sua Official Seal"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-4xl font-extrabold tracking-tight text-primary md:text-6xl"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Page Not Found</h2>
          <p className="mb-8 text-muted-foreground">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
            <span>Need help? Visit our</span>
            <Link href="/help" className="ml-1 font-medium underline underline-offset-4">
              Help Center
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

