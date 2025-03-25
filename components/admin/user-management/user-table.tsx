"use client"

import { useState, useEffect } from "react"
import { getUsers, searchUsers, toggleUserStatus, deleteUser } from "@/lib/firebase/users"
import { updateUserRole } from "@/lib/firebase/auth"
import type { User, UserRole } from "@/types/user"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader2, MoreHorizontal, Search, UserIcon, Shield, UserCog, UserCheck, UserX, Trash2 } from "lucide-react"
import { format } from "date-fns"
import type { DocumentSnapshot } from "firebase/firestore"
<<<<<<< HEAD
import { useToast } from "@/components/ui/use-toast"

export function UserTable() {
  const { toast } = useToast()
=======

export function UserTable() {
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all")
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadUsers = async (reset = false) => {
    setLoading(true)
    try {
      const lastDoc = reset ? null : lastVisible
      const role = roleFilter !== "all" ? roleFilter : undefined

      const { users: newUsers, lastVisible: newLastVisible } = await getUsers(lastDoc, 10, role)

      if (reset) {
        setUsers(newUsers)
      } else {
        setUsers((prevUsers) => [...prevUsers, ...newUsers])
      }

      setLastVisible(newLastVisible)
      setHasMore(newUsers.length === 10)
    } catch (error) {
      console.error("Error loading users:", error)
<<<<<<< HEAD
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      })
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadUsers(true)
      return
    }

    setLoading(true)
    try {
      const searchResults = await searchUsers(searchTerm)
      setUsers(searchResults)
      setHasMore(false)
    } catch (error) {
      console.error("Error searching users:", error)
<<<<<<< HEAD
      toast({
        title: "Search Failed",
        description: "Failed to search users. Please try again.",
        variant: "destructive",
      })
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setActionLoading(userId)
    try {
      await updateUserRole(userId, newRole)
      setUsers((prevUsers) => prevUsers.map((user) => (user.uid === userId ? { ...user, role: newRole } : user)))
<<<<<<< HEAD
      toast({
        title: "Role Updated",
        description: `User role has been updated to ${newRole}.`,
      })
    } catch (error) {
      console.error("Error updating user role:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update user role. Please try again.",
        variant: "destructive",
      })
=======
    } catch (error) {
      console.error("Error updating user role:", error)
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    } finally {
      setActionLoading(null)
    }
  }

  const handleStatusToggle = async (userId: string, isActive: boolean) => {
    setActionLoading(userId)
    try {
      await toggleUserStatus(userId, isActive)
      setUsers((prevUsers) => prevUsers.map((user) => (user.uid === userId ? { ...user, isActive } : user)))
<<<<<<< HEAD
      toast({
        title: isActive ? "User Activated" : "User Deactivated",
        description: `User has been ${isActive ? "activated" : "deactivated"} successfully.`,
      })
    } catch (error) {
      console.error("Error toggling user status:", error)
      toast({
        title: "Action Failed",
        description: `Failed to ${isActive ? "activate" : "deactivate"} user. Please try again.`,
        variant: "destructive",
      })
=======
    } catch (error) {
      console.error("Error toggling user status:", error)
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    setActionLoading(userId)
    try {
      await deleteUser(userId)
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== userId))
<<<<<<< HEAD
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Delete Failed",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
=======
    } catch (error) {
      console.error("Error deleting user:", error)
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    } finally {
      setActionLoading(null)
    }
  }

  useEffect(() => {
    loadUsers(true)
  }, [roleFilter])

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "staff":
        return "default"
      case "user":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <Shield className="h-3 w-3 mr-1" />
      case "staff":
        return <UserCog className="h-3 w-3 mr-1" />
      case "user":
        return <UserIcon className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} className="sm:w-auto w-full">
          Search
        </Button>
        <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName} />
                        <AvatarFallback>{user.displayName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.displayName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)} className="flex w-fit items-center">
                      {getRoleIcon(user.role)}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "outline" : "destructive"} className="flex w-fit items-center">
                      {user.isActive ? <UserCheck className="h-3 w-3 mr-1" /> : <UserX className="h-3 w-3 mr-1" />}
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt ? format(user.createdAt, "MMM d, yyyy") : "N/A"}</TableCell>
                  <TableCell className="text-right">
                    {actionLoading === user.uid ? (
                      <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleStatusToggle(user.uid, !user.isActive)}>
                            {user.isActive ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate User
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate User
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.uid, "admin")}
                            disabled={user.role === "admin"}
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.uid, "staff")}
                            disabled={user.role === "staff"}
                          >
                            <UserCog className="h-4 w-4 mr-2" />
                            Make Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.uid, "user")}
                            disabled={user.role === "user"}
                          >
                            <UserIcon className="h-4 w-4 mr-2" />
                            Make Regular User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the user account and remove
                                  their data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.uid)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => loadUsers()}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

