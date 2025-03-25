"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { SidebarTrigger } from "@/components/layout/sidebar-trigger"
import { Bell } from "lucide-react"
import { motion } from "framer-motion"

export function SiteHeader() {
  const pathname = usePathname()

  // Don't show header on auth pages
  if (pathname?.startsWith("/auth/")) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger />
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="hidden items-center space-x-2 md:flex">
              <span className="text-xl font-bold">Barangay Sua Management System</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <span className="text-lg font-bold">BSMS</span>
            </Link>
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-destructive"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

