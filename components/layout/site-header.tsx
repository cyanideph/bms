"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
<<<<<<< HEAD
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
=======
import { MainNav } from "@/components/layout/main-nav"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { Info } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileSidebar isAdmin={isAdmin} />
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <Link href="/help">
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
                <span className="sr-only">Help & About</span>
              </Button>
            </Link>
            <ModeToggle />
            <UserNav />
          </nav>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
        </div>
      </div>
    </header>
  )
}

