import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password | Barangay Sua Management System",
  description: "Reset your password for Barangay Sua Management System",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight philippines-text-gradient">Barangay Sua</h1>
          <p className="text-sm text-muted-foreground">Management System</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

