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
<<<<<<< HEAD
  Info,
  FileCheck,
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD
      icon: FileCheck,
=======
      icon: FileText,
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD
  ]

  const helpRoutes = [
    {
      label: "Help",
      icon: HelpCircle,
      href: "/help",
      active: pathname === "/help",
    },
    {
      label: "About",
      icon: Info,
      href: "/about",
      active: pathname === "/about",
    },
    {
      label: "License",
      icon: FileText,
      href: "/license",
      active: pathname === "/license",
    },
  ]

  // Philippine flag colors animation
  const flagGradientVariants = {
    initial: { backgroundPosition: "0% 0%" },
    animate: {
      backgroundPosition: "100% 0%",
      transition: { duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
    },
  }

=======
    {
      label: "Help & About",
      icon: HelpCircle,
      href: "/help",
      active: pathname === "/help" || pathname === "/about",
    },
  ]

>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-10">
<<<<<<< HEAD
          <MobileSidebar routes={routes} helpRoutes={helpRoutes} setOpen={setOpen} />
=======
          <MobileSidebar routes={routes} setOpen={setOpen} />
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
<<<<<<< HEAD
      <motion.div
        className={cn(
          "hidden border-r md:block transition-all duration-300 relative overflow-hidden",
          isOpen ? "w-64" : "w-20",
          className,
        )}
        variants={flagGradientVariants}
        initial="initial"
        animate="animate"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,56,168,0.95) 0%, rgba(206,17,38,0.95) 50%, rgba(252,209,22,0.95) 100%)",
          backgroundSize: "200% 100%",
        }}
=======
      <div
        className={cn(
          "hidden border-r bg-sidebar md:block transition-all duration-300 relative",
          isOpen ? "w-64" : "w-20",
          className,
        )}
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD
          <div
            className={cn(
              "flex h-20 items-center border-b border-sidebar-border px-4",
              isOpen ? "justify-between" : "justify-center",
            )}
          >
=======
          <div className={cn("flex h-20 items-center border-b px-4", isOpen ? "justify-between" : "justify-center")}>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
            {isOpen ? (
              <Link href="/" className="flex items-center gap-3 font-semibold">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
<<<<<<< HEAD
                  className="relative h-12 w-12 overflow-hidden rounded-full bg-white/90 p-1"
=======
                  className="relative h-12 w-12 overflow-hidden rounded-full"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD
                  <span className="text-white text-lg font-bold">Barangay Sua</span>
                  <p className="text-xs text-white/80">San Juan, Southern Leyte</p>
=======
                  <span className="text-sidebar-foreground text-lg font-bold">Barangay Sua</span>
                  <p className="text-xs text-sidebar-foreground/70">San Juan, Southern Leyte</p>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                </motion.div>
              </Link>
            ) : (
              <Link href="/" className="flex items-center justify-center">
<<<<<<< HEAD
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/90 p-1">
=======
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD
                className="text-white hover:text-white hover:bg-white/20"
=======
                className="text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
          </div>
<<<<<<< HEAD
          <ScrollArea className="flex-1 bg-black/10">
=======
          <ScrollArea className="flex-1">
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-200",
                        route.active ? "bg-white/30 text-white" : "text-white",
=======
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200",
                        route.active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD

            {/* Help & Info Section */}
            <div className="px-2 py-2">
              {isOpen && (
                <motion.h3
                  className="mb-2 px-3 text-sm font-semibold text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Help & Information
                </motion.h3>
              )}
              <nav className="grid gap-1">
                {helpRoutes.map((route, index) => (
                  <motion.div
                    key={route.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  >
                    <Link href={route.href} onClick={() => setOpen(false)}>
                      <span
                        className={cn(
                          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-200",
                          route.active ? "bg-white/30 text-white" : "text-white",
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
            </div>
          </ScrollArea>
          <motion.div
            className={cn("mt-auto p-4 border-t border-sidebar-border", !isOpen && "flex justify-center")}
=======
          </ScrollArea>
          <motion.div
            className={cn("mt-auto p-4", !isOpen && "flex justify-center")}
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              variant="outline"
              className={cn(
<<<<<<< HEAD
                "text-white bg-white/20 hover:bg-white/30 border-white/30 transition-colors duration-200",
=======
                "text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors duration-200",
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                isOpen ? "w-full justify-start" : "w-10 h-10 p-0",
              )}
            >
              <LogOut className={cn("h-4 w-4", isOpen && "mr-2")} />
              {isOpen && "Log out"}
            </Button>
          </motion.div>
        </div>
<<<<<<< HEAD
      </motion.div>
=======
      </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD
  helpRoutes: {
    label: string
    icon: any
    href: string
    active: boolean
  }[]
  setOpen: (open: boolean) => void
}

function MobileSidebar({ routes, helpRoutes, setOpen }: MobileSidebarProps) {
=======
  setOpen: (open: boolean) => void
}

function MobileSidebar({ routes, setOpen }: MobileSidebarProps) {
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme toggle only renders client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
<<<<<<< HEAD
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(0,56,168,0.95) 0%, rgba(206,17,38,0.95) 50%, rgba(252,209,22,0.95) 100%)",
      }}
    >
      <div className="flex h-20 items-center border-b border-white/20 px-4">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/90 p-1">
=======
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-20 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
<<<<<<< HEAD
            <span className="text-white text-lg font-bold">Barangay Sua</span>
            <p className="text-xs text-white/80">San Juan, Southern Leyte</p>
=======
            <span className="text-sidebar-foreground text-lg font-bold">Barangay Sua</span>
            <p className="text-xs text-sidebar-foreground/70">San Juan, Southern Leyte</p>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
          </div>
        </Link>
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
<<<<<<< HEAD
            className="ml-auto text-white hover:text-white hover:bg-white/20"
=======
            className="ml-auto text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
      </div>
<<<<<<< HEAD
      <ScrollArea className="flex-1 bg-black/10">
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
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-200",
                    route.active ? "bg-white/30 text-white" : "text-white",
                  )}
                >
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Help & Info Section */}
        <div className="px-2 py-2 border-t border-white/20 mt-2">
          <h3 className="mb-2 px-3 text-sm font-semibold text-white/80">Help & Information</h3>
          <nav className="grid gap-1">
            {helpRoutes.map((route, index) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              >
                <Link href={route.href} onClick={() => setOpen(false)}>
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-200",
                      route.active ? "bg-white/30 text-white" : "text-white",
                    )}
                  >
                    <route.icon className="mr-3 h-5 w-5" />
                    {route.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t border-white/20">
        <Button
          variant="outline"
          className="w-full justify-start text-white bg-white/20 hover:bg-white/30 border-white/30 transition-colors duration-200"
=======
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
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
<<<<<<< HEAD
    </motion.div>
=======
    </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  )
}

