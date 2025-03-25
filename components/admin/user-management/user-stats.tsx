"use client"

import { useState, useEffect } from "react"
import { countUsersByRole } from "@/lib/firebase/users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserRole } from "@/types/user"
import { Shield, UserCog, User, Users, Loader2 } from "lucide-react"
import { AnimatedCounter } from "@/components/animations/animated-counter"

export function UserStats() {
  const [counts, setCounts] = useState<Record<UserRole, number>>({
    admin: 0,
    staff: 0,
    user: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userCounts = await countUsersByRole()
        setCounts(userCounts)
      } catch (error) {
        console.error("Error fetching user counts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">
              <AnimatedCounter to={counts.admin + counts.staff + counts.user} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Administrators</CardTitle>
          <Shield className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">
              <AnimatedCounter to={counts.admin} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
          <UserCog className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">
              <AnimatedCounter to={counts.staff} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">
              <AnimatedCounter to={counts.user} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

