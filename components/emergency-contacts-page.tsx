"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, AlertTriangle, Flame, Shield, Heart, Waves, Truck, Lightbulb, Building, Wrench } from "lucide-react"

export function EmergencyContactsPage() {
  // Mock data for emergency contacts
  const emergencyContacts = [
    {
      id: 1,
      category: "Police",
      contacts: [
        {
          name: "San Juan Police Station",
          number: "123-4567",
          mobile: "09123456789",
          address: "San Juan Municipal Hall, San Juan, Southern Leyte",
          icon: Shield,
        },
        {
          name: "Southern Leyte Provincial Police Office",
          number: "234-5678",
          mobile: "09234567890",
          address: "Provincial Capitol, Maasin City, Southern Leyte",
          icon: Shield,
        },
      ],
    },
    {
      id: 2,
      category: "Fire Department",
      contacts: [
        {
          name: "San Juan Fire Station",
          number: "345-6789",
          mobile: "09345678901",
          address: "San Juan Municipal Hall, San Juan, Southern Leyte",
          icon: Flame,
        },
        {
          name: "Bureau of Fire Protection - Southern Leyte",
          number: "456-7890",
          mobile: "09456789012",
          address: "Provincial Capitol, Maasin City, Southern Leyte",
          icon: Flame,
        },
      ],
    },
    {
      id: 3,
      category: "Health & Medical",
      contacts: [
        {
          name: "San Juan Rural Health Unit",
          number: "567-8901",
          mobile: "09567890123",
          address: "San Juan Municipal Hall, San Juan, Southern Leyte",
          icon: Heart,
        },
        {
          name: "Southern Leyte Provincial Hospital",
          number: "678-9012",
          mobile: "09678901234",
          address: "Maasin City, Southern Leyte",
          icon: Heart,
        },
        {
          name: "Barangay Sua Health Center",
          number: "789-0123",
          mobile: "09789012345",
          address: "Barangay Sua, San Juan, Southern Leyte",
          icon: Heart,
        },
      ],
    },
    {
      id: 4,
      category: "Disaster Response",
      contacts: [
        {
          name: "Municipal Disaster Risk Reduction and Management Office",
          number: "890-1234",
          mobile: "09890123456",
          address: "San Juan Municipal Hall, San Juan, Southern Leyte",
          icon: AlertTriangle,
        },
        {
          name: "Provincial Disaster Risk Reduction and Management Office",
          number: "901-2345",
          mobile: "09901234567",
          address: "Provincial Capitol, Maasin City, Southern Leyte",
          icon: AlertTriangle,
        },
      ],
    },
    {
      id: 5,
      category: "Utilities",
      contacts: [
        {
          name: "Southern Leyte Electric Cooperative (SOLECO)",
          number: "012-3456",
          mobile: "09012345678",
          address: "Maasin City, Southern Leyte",
          icon: Lightbulb,
        },
        {
          name: "San Juan Water District",
          number: "123-4567",
          mobile: "09123456789",
          address: "San Juan, Southern Leyte",
          icon: Waves,
        },
      ],
    },
    {
      id: 6,
      category: "Other Services",
      contacts: [
        {
          name: "Department of Public Works and Highways (DPWH)",
          number: "234-5678",
          mobile: "09234567890",
          address: "Maasin City, Southern Leyte",
          icon: Truck,
        },
        {
          name: "Department of Social Welfare and Development (DSWD)",
          number: "345-6789",
          mobile: "09345678901",
          address: "San Juan Municipal Hall, San Juan, Southern Leyte",
          icon: Building,
        },
        {
          name: "San Juan Municipal Engineering Office",
          number: "456-7890",
          mobile: "09456789012",
          address: "San Juan Municipal Hall, San Juan, Southern Leyte",
          icon: Wrench,
        },
      ],
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight philippines-text-gradient">Emergency Contacts</h2>
      </div>
      <p className="text-muted-foreground">
        Important contact numbers for emergency situations. Save these numbers on your phone for quick access.
      </p>

      <div className="relative overflow-hidden rounded-lg p-6 mb-6">
        <div className="absolute inset-0 bg-secondary opacity-10"></div>
        <div className="flex items-start relative z-10">
          <AlertTriangle className="h-10 w-10 text-secondary mt-0.5 mr-4" />
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-2">Emergency Hotline</h3>
            <p className="text-secondary/80 dark:text-secondary/90 mb-4">
              For immediate emergency assistance, call the National Emergency Hotline:
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="destructive"
                size="lg"
                className="font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Phone className="mr-2 h-5 w-5" />
                911
              </Button>
              <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary/10">
                <Phone className="mr-2 h-5 w-5" />
                143 (Red Cross)
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 flex flex-wrap">
          <TabsTrigger value="all" className="data-[state=active]:bg-background">
            All Contacts
          </TabsTrigger>
          {emergencyContacts.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.category.toLowerCase().replace(/\s+/g, "-")}
              className="data-[state=active]:bg-background"
            >
              {category.category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {emergencyContacts.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1 flex-grow philippines-gradient rounded-full"></div>
                <h3 className="text-xl font-semibold whitespace-nowrap">{category.category}</h3>
                <div className="h-1 flex-grow philippines-gradient rounded-full"></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.contacts.map((contact, index) => (
                  <ContactCard key={index} contact={contact} />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        {emergencyContacts.map((category) => (
          <TabsContent
            key={category.id}
            value={category.category.toLowerCase().replace(/\s+/g, "-")}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.contacts.map((contact, index) => (
                <ContactCard key={index} contact={contact} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ContactCard({ contact }: { contact: any }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="h-1 philippines-gradient"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <contact.icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{contact.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-secondary" />
            <span className="text-sm font-medium">{contact.number}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{contact.mobile}</span>
          </div>
          <p className="text-xs text-muted-foreground pt-1">{contact.address}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-primary/90">
          <Phone className="mr-2 h-4 w-4" />
          Call Now
        </Button>
      </CardFooter>
    </Card>
  )
}

