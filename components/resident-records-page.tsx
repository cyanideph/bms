"use client"

<<<<<<< HEAD
import type React from "react"

import { useState, useEffect } from "react"
=======
import { useState } from "react"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
<<<<<<< HEAD
import { Search, Plus, MoreHorizontal, FileUp, FileDown, Edit, Trash2, Eye, Loader2 } from "lucide-react"
import { getResidents, searchResidents, addResident, deleteResident } from "@/lib/firebase/services/resident-service"
import type { Resident } from "@/lib/firebase/collections"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import type { DocumentSnapshot } from "firebase/firestore"
=======
import { Search, Plus, MoreHorizontal, FileUp, FileDown, Edit, Trash2, Eye } from "lucide-react"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

export function ResidentRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
<<<<<<< HEAD
  const [residents, setResidents] = useState<Resident[]>([])
  const [loading, setLoading] = useState(true)
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, hasPermission } = useAuth()

  // Form state for adding/editing resident
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    gender: "",
    address: "",
    contact: "",
    civilStatus: "",
    occupation: "",
    purok: "Purok 1",
  })

  // Load residents on component mount
  useEffect(() => {
    loadResidents()
  }, [filter])

  // Function to load residents
  const loadResidents = async (reset = true) => {
    setLoading(true)
    try {
      const filterOptions = filter !== "all" ? { gender: filter } : undefined
      const result = await getResidents(reset ? null : lastVisible, 10, filterOptions)

      if (reset) {
        setResidents(result.residents)
      } else {
        setResidents((prev) => [...prev, ...result.residents])
      }

      setLastVisible(result.lastVisible)
      setHasMore(result.residents.length === 10)
    } catch (error) {
      console.error("Error loading residents:", error)
      toast({
        title: "Error",
        description: "Failed to load residents. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Function to handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadResidents()
      return
    }

    setLoading(true)
    try {
      const results = await searchResidents(searchTerm)
      setResidents(results)
      setHasMore(false)
    } catch (error) {
      console.error("Error searching residents:", error)
      toast({
        title: "Error",
        description: "Failed to search residents. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Function to handle select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addResident(formData)

      // Reset form and close dialog
      setFormData({
        name: "",
        birthdate: "",
        gender: "",
        address: "",
        contact: "",
        civilStatus: "",
        occupation: "",
        purok: "Purok 1",
      })
      setIsAddDialogOpen(false)

      // Reload residents
      loadResidents()

      toast({
        title: "Success",
        description: "Resident added successfully.",
      })
    } catch (error) {
      console.error("Error adding resident:", error)
      toast({
        title: "Error",
        description: "Failed to add resident. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to handle resident deletion
  const handleDeleteResident = async (id: string) => {
    try {
      await deleteResident(id)

      // Remove from state
      setResidents((prev) => prev.filter((resident) => resident.id !== id))

      toast({
        title: "Success",
        description: "Resident deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting resident:", error)
      toast({
        title: "Error",
        description: "Failed to delete resident. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter residents based on search term
  const filteredResidents = residents

=======

  // Mock data for residents
  const residents = [
    {
      id: "R-2024-001",
      name: "Juan Dela Cruz",
      address: "123 Main St., Purok 1",
      birthdate: "1985-05-15",
      contact: "09123456789",
      gender: "Male",
      civilStatus: "Married",
      occupation: "Farmer",
    },
    {
      id: "R-2024-002",
      name: "Maria Santos",
      address: "456 Rizal Ave., Purok 2",
      birthdate: "1990-10-20",
      contact: "09234567890",
      gender: "Female",
      civilStatus: "Single",
      occupation: "Teacher",
    },
    {
      id: "R-2024-003",
      name: "Pedro Reyes",
      address: "789 Mabini St., Purok 3",
      birthdate: "1978-03-08",
      contact: "09345678901",
      gender: "Male",
      civilStatus: "Married",
      occupation: "Fisherman",
    },
    {
      id: "R-2024-004",
      name: "Elena Garcia",
      address: "101 Bonifacio St., Purok 1",
      birthdate: "1995-12-25",
      contact: "09456789012",
      gender: "Female",
      civilStatus: "Single",
      occupation: "Nurse",
    },
    {
      id: "R-2024-005",
      name: "Roberto Lim",
      address: "202 Aguinaldo St., Purok 4",
      birthdate: "1982-07-30",
      contact: "09567890123",
      gender: "Male",
      civilStatus: "Married",
      occupation: "Driver",
    },
  ]

  // Filter and search residents
  const filteredResidents = residents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.id.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "male") return matchesSearch && resident.gender === "Male"
    if (filter === "female") return matchesSearch && resident.gender === "Female"
    return matchesSearch
  })

>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Resident Records</h2>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" />
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Import from CSV</DropdownMenuItem>
              <DropdownMenuItem>Import from Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
<<<<<<< HEAD
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!hasPermission("canManageResidents")}>
=======
          <Dialog>
            <DialogTrigger asChild>
              <Button>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                <Plus className="mr-2 h-4 w-4" />
                Add Resident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
<<<<<<< HEAD
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Resident</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new resident. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purok">Purok</Label>
                      <Select value={formData.purok} onValueChange={(value) => handleSelectChange("purok", value)}>
                        <SelectTrigger id="purok">
                          <SelectValue placeholder="Select purok" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Purok 1">Purok 1</SelectItem>
                          <SelectItem value="Purok 2">Purok 2</SelectItem>
                          <SelectItem value="Purok 3">Purok 3</SelectItem>
                          <SelectItem value="Purok 4">Purok 4</SelectItem>
                          <SelectItem value="Purok 5">Purok 5</SelectItem>
                          <SelectItem value="Purok 6">Purok 6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Birthdate</Label>
                      <Input
                        id="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Complete Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        placeholder="Contact Number"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="civilStatus">Civil Status</Label>
                      <Select
                        value={formData.civilStatus}
                        onValueChange={(value) => handleSelectChange("civilStatus", value)}
                      >
                        <SelectTrigger id="civilStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                          <SelectItem value="Separated">Separated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      placeholder="Occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Resident"
                    )}
                  </Button>
                </DialogFooter>
              </form>
=======
              <DialogHeader>
                <DialogTitle>Add New Resident</DialogTitle>
                <DialogDescription>
                  Enter the details of the new resident. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="First Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Last Name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input id="birthdate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Complete Address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input id="contact" placeholder="Contact Number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="civilStatus">Civil Status</Label>
                    <Select>
                      <SelectTrigger id="civilStatus">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                        <SelectItem value="separated">Separated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" placeholder="Occupation" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Resident</Button>
              </DialogFooter>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search residents by name, address, or ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
=======
          />
        </div>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Residents</SelectItem>
<<<<<<< HEAD
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
=======
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">Civil Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
<<<<<<< HEAD
            {loading && residents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Loading residents...</p>
                </TableCell>
              </TableRow>
            ) : filteredResidents.length === 0 ? (
=======
            {filteredResidents.length === 0 ? (
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No residents found
                </TableCell>
              </TableRow>
            ) : (
              filteredResidents.map((resident) => (
                <TableRow key={resident.id}>
<<<<<<< HEAD
                  <TableCell className="font-medium">{resident.residentId}</TableCell>
=======
                  <TableCell className="font-medium">{resident.id}</TableCell>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                  <TableCell>{resident.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{resident.address}</TableCell>
                  <TableCell className="hidden md:table-cell">{resident.contact}</TableCell>
                  <TableCell className="hidden md:table-cell">{resident.gender}</TableCell>
                  <TableCell className="hidden md:table-cell">{resident.civilStatus}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
<<<<<<< HEAD
                        <DropdownMenuItem disabled={!hasPermission("canManageResidents")}>
=======
                        <DropdownMenuItem>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Resident
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
<<<<<<< HEAD
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onSelect={(e) => e.preventDefault()}
                              disabled={!hasPermission("canManageResidents")}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Resident
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the resident record and
                                remove the data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => resident.id && handleDeleteResident(resident.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
=======
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Resident
                        </DropdownMenuItem>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
<<<<<<< HEAD

      {hasMore && !loading && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => loadResidents(false)}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    </div>
  )
}

