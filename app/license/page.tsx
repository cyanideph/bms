import { LicensePage } from "@/components/license/license-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Software License | Barangay Sua Management System",
  description: "License information for Barangay Sua Management System",
}

export default function License() {
  return <LicensePage />
}

