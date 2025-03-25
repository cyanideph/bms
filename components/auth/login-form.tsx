"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, createTestUser } from "@/lib/firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Info } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [testUserLoading, setTestUserLoading] = useState(false)
  const [showDevTools, setShowDevTools] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate inputs
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!password.trim()) {
      setError("Password is required")
      return
    }

    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "An error occurred during login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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

