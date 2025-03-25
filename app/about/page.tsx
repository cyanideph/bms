import { AboutPage } from "@/components/about/about-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Barangay Sua Management System",
  description: "About the Barangay Sua Management System and its creator",
}

export default function About() {
  return <AboutPage />
}

