<<<<<<< HEAD
import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © 2025 Barangay Sua Management System. Created by Joemar Balaba. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
=======
import { Button } from "@/components/ui/button"
import { Heart, Info, FileText } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Barangay Sua Management System. Created by{" "}
          <span className="font-medium">Joemar Balaba</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/about">
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Info className="h-3.5 w-3.5" />
              <span>About</span>
            </Button>
          </Link>
          <Link href="/license">
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <FileText className="h-3.5 w-3.5" />
              <span>License</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Heart className="h-3.5 w-3.5 text-red-500" />
            <span>Support</span>
          </Button>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
        </div>
      </div>
    </footer>
  )
}

