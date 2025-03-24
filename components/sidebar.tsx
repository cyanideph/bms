"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/contexts/sidebar-context"
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  Bell,
  Phone,
  MessageSquare,
  Menu,
  LogOut,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isOpen, toggleSidebar } = useSidebar()

  // Ensure theme toggle only renders client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/" || pathname === "/dashboard",
    },
    {
      label: "Resident Records",
      icon: Users,
      href: "/residents",
      active: pathname === "/residents",
    },
    {
      label: "Permits & Clearances",
      icon: FileText,
      href: "/permits",
      active: pathname === "/permits",
    },
    {
      label: "Incidents & Complaints",
      icon: AlertTriangle,
      href: "/incidents",
      active: pathname === "/incidents",
    },
    {
      label: "Announcements",
      icon: Bell,
      href: "/announcements",
      active: pathname === "/announcements",
    },
    {
      label: "Emergency Contacts",
      icon: Phone,
      href: "/emergency",
      active: pathname === "/emergency",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/messages",
      active: pathname === "/messages",
    },
    {
      label: "Help & About",
      icon: HelpCircle,
      href: "/help",
      active: pathname === "/help" || pathname === "/about",
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-10">
          <MobileSidebar routes={routes} setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden border-r bg-sidebar md:block transition-all duration-300 relative",
          isOpen ? "w-64" : "w-20",
          className,
        )}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-background border shadow-sm rounded-full z-10 h-6 w-6 p-0"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        <div className="flex h-screen flex-col">
          <div className={cn("flex h-20 items-center border-b px-4", isOpen ? "justify-between" : "justify-center")}>
            {isOpen ? (
              <Link href="/" className="flex items-center gap-3 font-semibold">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative h-12 w-12 overflow-hidden rounded-full"
                >
                  <Image
                    src="/images/barangay-seal.png"
                    alt="Barangay Sua Official Seal"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-sidebar-foreground text-lg font-bold">Barangay Sua</span>
                  <p className="text-xs text-sidebar-foreground/70">San Juan, Southern Leyte</p>
                </motion.div>
              </Link>
            ) : (
              <Link href="/" className="flex items-center justify-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="/images/barangay-seal.png"
                    alt="Barangay Sua Official Seal"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            )}
            {mounted && isOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
          </div>
          <ScrollArea className="flex-1">
            <nav className="grid gap-1 px-2 py-4">
              {routes.map((route, index) => (
                <motion.div
                  key={route.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link href={route.href} onClick={() => setOpen(false)}>
                    <span
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200",
                        route.active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
                        !isOpen && "justify-center px-2",
                      )}
                    >
                      <route.icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                      {isOpen && route.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </ScrollArea>
          <motion.div
            className={cn("mt-auto p-4", !isOpen && "flex justify-center")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              variant="outline"
              className={cn(
                "text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors duration-200",
                isOpen ? "w-full justify-start" : "w-10 h-10 p-0",
              )}
            >
              <LogOut className={cn("h-4 w-4", isOpen && "mr-2")} />
              {isOpen && "Log out"}
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  )
}

interface MobileSidebarProps {
  routes: {
    label: string
    icon: any
    href: string
    active: boolean
  }[]
  setOpen: (open: boolean) => void
}

function MobileSidebar({ routes, setOpen }: MobileSidebarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme toggle only renders client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-20 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src="/images/barangay-seal.png"
              alt="Barangay Sua Official Seal"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-sidebar-foreground text-lg font-bold">Barangay Sua</span>
            <p className="text-xs text-sidebar-foreground/70">San Juan, Southern Leyte</p>
          </div>
        </Link>
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-4">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} onClick={() => setOpen(false)}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200",
                  route.active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
                )}
              >
                <route.icon className="mr-3 h-5 w-5" />
                {route.label}
              </span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full justify-start text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors duration-200"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}

