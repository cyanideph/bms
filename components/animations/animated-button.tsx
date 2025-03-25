"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
}

export function AnimatedButton({ children, className, hoverScale = 1.05, ...props }: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ scale: hoverScale }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Button className={cn(className)} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

