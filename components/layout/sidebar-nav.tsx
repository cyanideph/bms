"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  FileText,
  Home,
  Users,
  FileCheck,
  AlertTriangle,
  CalendarDays,
  Settings,
  Bell,
  MessageSquare,
  Info,
  HelpCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  isAdmin?: boolean
}

export function SidebarNav({ className, isAdmin = false, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const adminItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const userItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Residents",
      href: "/residents",
      icon: Users,
    },
    {
      title: "Permits",
      href: "/permits",
      icon: FileCheck,
    },
    {
      title: "Incidents",
      href: "/incidents",
      icon: AlertTriangle,
    },
    {
      title: "Events",
      href: "/events",
      icon: CalendarDays,
    },
    {
      title: "Announcements",
      href: "/announcements",
      icon: Bell,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
  ]

  const helpItems = [
    {
      title: "About",
      href: "/about",
      icon: Info,
    },
    {
      title: "License",
      href: "/license",
      icon: FileText,
    },
    {
      title: "Help",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  const items = isAdmin ? adminItems : userItems

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{isAdmin ? "Admin" : "General"}</h2>
        <div className="space-y-1">
          {items.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Help & Info</h2>
        <div className="space-y-1">
          {helpItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}

