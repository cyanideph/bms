import { HelpPage } from "@/components/help/help-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help & About | Barangay Sua Management System",
  description: "Help, documentation, and information about Barangay Sua Management System",
}

export default function Help() {
  return <HelpPage />
}

