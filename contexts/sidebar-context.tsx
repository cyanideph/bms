"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface SidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
  setSidebarOpen: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Get initial state from localStorage if available
  const [isOpen, setIsOpen] = useState<boolean>(true)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-state")
      if (savedState) {
        setIsOpen(savedState === "open")
      }

      // Set initial state based on screen size
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setIsOpen(false)
        }
      }

      // Call once on mount
      handleResize()

      // Add event listener
      window.addEventListener("resize", handleResize)

      // Clean up
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isOpen
    setIsOpen(newState)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-state", newState ? "open" : "closed")
    }
  }

  const setSidebarOpen = (open: boolean) => {
    setIsOpen(open)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-state", open ? "open" : "closed")
    }
  }

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar, setSidebarOpen }}>{children}</SidebarContext.Provider>
}

