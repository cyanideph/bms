"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function AnimatedGradient({ children, className, duration = 5 }: AnimatedGradientProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      {children}
    </motion.div>
  )
}

