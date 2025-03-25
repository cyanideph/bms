"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Calendar } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { AnimatedButton } from "@/components/animations/animated-button"
import { AnimatedGradient } from "@/components/animations/animated-gradient"
import { PageTransition } from "@/components/animations/page-transition"
import Image from "next/image"

export function OfficialsPage() {
  // Mock data for barangay officials
  const officials = [
    {
      id: 1,
      name: "RAYMUND Q. VASQUEZ",
      position: "Punong Barangay",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Raymund Q. Vasquez serves as the Punong Barangay (Barangay Captain) of Barangay Sua. He leads various development projects in the barangay including infrastructure improvements and community initiatives.",
    },
    {
      id: 2,
      name: "LEONIDES Y. MALUBAY",
      position: "Sangguniang Barangay Member",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Leonides Y. Malubay is a dedicated member of the Sangguniang Barangay, working to address the needs and concerns of the community.",
    },
    {
      id: 3,
      name: "RENE O. BALIC",
      position: "Sangguniang Barangay Member",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Rene O. Balic serves as a Sangguniang Barangay Member, contributing to the development and welfare of Barangay Sua.",
    },
    {
      id: 4,
      name: "MARCIANITO D. BALABA",
      position: "Sangguniang Barangay Member",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Marcianito D. Balaba is an active Sangguniang Barangay Member who participates in community programs and initiatives.",
    },
    {
      id: 5,
      name: "EVELYN D. RANEZ",
      position: "Sangguniang Barangay Member",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Evelyn D. Ranez is a committed Sangguniang Barangay Member who focuses on addressing the needs of the residents.",
    },
    {
      id: 6,
      name: "JESUS D. POJAS",
      position: "Sangguniang Barangay Member",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Jesus D. Pojas serves as a Sangguniang Barangay Member, working on various community projects and initiatives.",
    },
    {
      id: 7,
      name: "MELBOY S. MONTER",
      position: "Sangguniang Barangay Member",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Melboy S. Monter is a dedicated Sangguniang Barangay Member who contributes to the development of Barangay Sua.",
    },
    {
      id: 8,
      name: "PANFILO S. CORAZON",
      position: "Sangguniang Barangay Member",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Panfilo S. Corazon serves as a Sangguniang Barangay Member, actively participating in community programs and services.",
    },
    {
      id: 9,
      name: "ALEX F. QUIBAN",
      position: "SK Chairperson",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "quibanalex2@gmail.com",
      phone: "N/A",
      bio: "Alex F. Quiban is the Sangguniang Kabataan Chairperson. He represents the youth sector and organizes various youth development programs.",
    },
    {
      id: 10,
      name: "ANALYN F. QUIBAN",
      position: "Barangay Secretary",
      term: "2022-2025",
      avatar: "/placeholder.svg?height=300&width=300",
      email: "Not Available",
      phone: "0",
      bio: "Analyn F. Quiban serves as the Barangay Secretary, efficiently managing all barangay records and ensuring smooth administrative operations.",
    },
  ]

  return (
    <PageTransition>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FadeIn>
          <div className="flex items-center gap-4">
            <div className="hidden md:block relative h-16 w-16">
              <Image
                src="/images/barangay-seal.png"
                alt="Barangay Sua Official Seal"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight philippines-text-gradient">Barangay Officials</h2>
              <p className="text-muted-foreground">
                Meet the elected officials of Barangay Sua, San Juan, Southern Leyte for the term 2022-2025.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Philippines flag-inspired banner */}
        <SlideIn direction="up">
          <AnimatedGradient className="relative overflow-hidden rounded-lg h-16 mb-8 philippines-gradient">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/barangay-seal.png"
                    alt="Barangay Sua Official Seal"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-bold text-xl">Serving the Community</h3>
              </div>
            </div>
          </AnimatedGradient>
        </SlideIn>

        {/* Captain - Featured at the top */}
        <div className="mb-8">
          {officials
            .filter((official) => official.position === "Punong Barangay")
            .map((captain) => (
              <FadeIn key={captain.id} delay={0.2}>
                <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-primary/5">
                      <div className="p-6 flex justify-center">
                        <div className="relative">
                          <div className="absolute -inset-0.5 rounded-full philippines-gradient blur-sm opacity-75"></div>
                          <Avatar className="h-48 w-48 rounded-full border-4 border-white relative">
                            <AvatarImage src={captain.avatar} alt={captain.name} />
                            <AvatarFallback className="text-4xl bg-primary text-white">
                              {captain.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-2xl">{captain.name}</CardTitle>
                        <CardDescription className="text-lg font-medium text-primary">
                          {captain.position}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 pb-4 space-y-4">
                        <p>{captain.bio}</p>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Term: {captain.term}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{captain.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{captain.phone}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-0">
                        <AnimatedButton className="bg-primary hover:bg-primary/90">
                          <Mail className="mr-2 h-4 w-4" />
                          Contact
                        </AnimatedButton>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
        </div>

        {/* Other Officials */}
        <FadeIn delay={0.3}>
          <h3 className="text-xl font-semibold mb-4">Barangay Council</h3>
        </FadeIn>
        <StaggerContainer staggerChildren={0.05}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {officials
              .filter((official) => official.position !== "Punong Barangay")
              .map((official) => (
                <StaggerItem key={official.id}>
                  <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                    <div className="h-1 philippines-gradient"></div>
                    <CardHeader className="text-center pb-2">
                      <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24 border-2 border-primary/20">
                          <AvatarImage src={official.avatar} alt={official.name} />
                          <AvatarFallback className="bg-primary text-white">{official.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <CardTitle>{official.name}</CardTitle>
                      <CardDescription className="font-medium text-primary">{official.position}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                      <p className="line-clamp-3 mb-4">{official.bio}</p>
                      <div className="flex flex-col space-y-1 items-center text-xs">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>Term: {official.term}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center gap-2">
                      <AnimatedButton variant="outline" size="sm" className="hover:bg-primary/5">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </AnimatedButton>
                      <AnimatedButton variant="outline" size="sm" className="hover:bg-primary/5">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </AnimatedButton>
                    </CardFooter>
                  </Card>
                </StaggerItem>
              ))}
          </div>
        </StaggerContainer>
      </div>
    </PageTransition>
  )
}

