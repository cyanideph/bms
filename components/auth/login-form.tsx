"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
<<<<<<< HEAD
import { signIn, createTestUser } from "@/lib/firebase/auth"
=======
import { signIn } from "@/lib/firebase/auth"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
<<<<<<< HEAD
import { AlertCircle, Loader2, Info } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
=======
import { AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
<<<<<<< HEAD
  const [testUserLoading, setTestUserLoading] = useState(false)
  const [showDevTools, setShowDevTools] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
=======
  const router = useRouter()
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
<<<<<<< HEAD

    // Validate inputs
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!password.trim()) {
      setError("Password is required")
      return
    }

=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Login error:", err)
<<<<<<< HEAD
      setError(err.message || "An error occurred during login. Please try again.")
=======

      // Handle different Firebase auth errors
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.")
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed login attempts. Please try again later.")
      } else {
        setError("An error occurred during login. Please try again.")
      }
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
  const handleCreateTestUser = async () => {
    setTestUserLoading(true)
    setError(null)

    try {
      const testUser = await createTestUser()
      toast({
        title: "Test User Created",
        description: `Email: test@example.com, Password: Test@123`,
      })

      // Auto-fill the form
      setEmail("test@example.com")
      setPassword("Test@123")
    } catch (err: any) {
      console.error("Error creating test user:", err)
      setError(err.message || "Failed to create test user")
    } finally {
      setTestUserLoading(false)
    }
  }

=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
<<<<<<< HEAD

        <div className="mt-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground flex items-center"
            onClick={() => setShowDevTools(!showDevTools)}
          >
            <Info className="h-3 w-3 mr-1" />
            {showDevTools ? "Hide development info" : "Show development info"}
          </Button>

          {showDevTools && (
            <div className="mt-2 p-3 bg-muted rounded-md text-xs">
              <p className="font-medium mb-2">Development Options:</p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs mb-2"
                onClick={handleCreateTestUser}
                disabled={testUserLoading}
              >
                {testUserLoading ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    Creating...
                  </>
                ) : (
                  "Create Test User"
                )}
              </Button>
              <p className="text-muted-foreground">
                This will create a test user with:
                <br />
                Email: test@example.com
                <br />
                Password: Test@123
                <br />
                Role: Admin
              </p>
            </div>
          )}
        </div>
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

