"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">Barangay Sua Management System</span>
        {isAdmin && (
          <Badge variant="outline" className="ml-2">
            Admin
          </Badge>
        )}
      </Link>
      <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
        <Link
          href="/"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/about" ? "text-primary" : "text-muted-foreground",
          )}
        >
          About
        </Link>
        <Link
          href="/license"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/license" ? "text-primary" : "text-muted-foreground",
          )}
        >
          License
        </Link>
        <Link
          href="/help"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/help" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Help
        </Link>
      </nav>
    </div>
  )
}

