import type React from "react"
import "@/app/globals.css"
<<<<<<< HEAD
import type { Metadata } from "next"
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
<<<<<<< HEAD
import { Toaster } from "@/components/ui/toaster"
import Sidebar from "@/components/sidebar"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Barangay Sua Management System",
  description: "A comprehensive management system for Barangay Sua, San Juan, Southern Leyte",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <SidebarProvider>
              <div className="flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                  <Sidebar />
                  <main className="flex-1">
                    <div className="container py-6">{children}</div>
                  </main>
                </div>
                <SiteFooter />
              </div>
              <Toaster />
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
=======
import { AuthProvider } from "@/contexts/auth-context"
import { SidebarProvider } from "@/contexts/sidebar-context"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SidebarProvider>
              <div className="relative flex min-h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <SiteHeader />
                  <main className="flex-1">{children}</main>
                  <SiteFooter />
                </div>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
      </body>
    </html>
  )
}



<<<<<<< HEAD
import './globals.css'
=======
import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
