<<<<<<< HEAD
import HelpPage from "@/components/help/help-page"
=======
import { HelpPage } from "@/components/help/help-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help & About | Barangay Sua Management System",
  description: "Help, documentation, and information about Barangay Sua Management System",
}
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

export default function Help() {
  return <HelpPage />
}

