"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
}

export function FadeIn({ children, className, delay = 0, direction = "up", duration = 0.5, once = true }: FadeInProps) {
  const directionOffset = {
    up: { y: 10 },
    down: { y: -10 },
    left: { x: 10 },
    right: { x: -10 },
    none: { x: 0, y: 0 },
  }

  const initial = {
    opacity: 0,
    ...directionOffset[direction],
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

