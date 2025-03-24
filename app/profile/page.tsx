import { ProfileForm } from "@/components/auth/profile-form"
import { ProtectedRoute } from "@/components/auth/protected-route"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile | Barangay Sua Management System",
  description: "Manage your profile in Barangay Sua Management System",
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="container max-w-4xl py-10">
        <h1 className="mb-6 text-3xl font-bold tracking-tight philippines-text-gradient">Your Profile</h1>
        <ProfileForm />
      </div>
    </ProtectedRoute>
  )
}

