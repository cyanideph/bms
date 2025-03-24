"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
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
        </div>
      </div>
    </header>
  )
}

