"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/lib/firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
<<<<<<< HEAD
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { UserRole } from "@/types/user"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    role: "user" as UserRole,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: UserRole) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }

    if (!formData.password.trim()) {
      setError("Password is required")
      return false
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    if (!formData.displayName.trim()) {
      setError("Name is required")
      return false
    }

    return true
  }

=======

export function RegisterForm() {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

<<<<<<< HEAD
    if (!validateForm()) return
=======
    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

    setLoading(true)

    try {
<<<<<<< HEAD
      await registerUser(formData.email, formData.password, formData.displayName, formData.role)
      setSuccess(true)

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (err: any) {
      console.error("Registration error:", err)

      if (err.message) {
        setError(err.message)
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please use a different email or try logging in.")
      } else if (err.code === "auth/invalid-email") {
        setError("The email address is invalid. Please check and try again.")
      } else if (err.code === "auth/weak-password") {
        setError("The password is too weak. Please use a stronger password.")
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email/Password authentication is not enabled in Firebase. Please contact the administrator.")
=======
      // Register with default role "user"
      await registerUser(email, password, displayName)
      router.push("/auth/login?registered=true")
    } catch (err: any) {
      console.error("Registration error:", err)

      // Display the specific error message from our auth.ts file
      if (err.message) {
        setError(err.message)
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
      } else {
        setError("An error occurred during registration. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Registration Successful</CardTitle>
          <CardDescription>Your account has been created successfully.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
            <AlertDescription className="text-green-800 dark:text-green-300">
              You will be redirected to the login page shortly.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
<<<<<<< HEAD
        <CardDescription>Enter your information to create an account</CardDescription>
=======
        <CardDescription>Register to access Barangay Sua Management System</CardDescription>
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
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
            <Label htmlFor="displayName">Full Name</Label>
            <Input
              id="displayName"
<<<<<<< HEAD
              name="displayName"
              placeholder="John Doe"
              value={formData.displayName}
              onChange={handleChange}
=======
              placeholder="Juan Dela Cruz"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
<<<<<<< HEAD
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
=======
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
<<<<<<< HEAD
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
=======
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
<<<<<<< HEAD
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
=======
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
              required
            />
          </div>

<<<<<<< HEAD
          <div className="space-y-2">
            <Label htmlFor="role">Account Type</Label>
            <Select value={formData.role} onValueChange={(value) => handleRoleChange(value as UserRole)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Resident</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select the appropriate account type. Administrator accounts require approval.
            </p>
          </div>

=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
<<<<<<< HEAD
                Creating Account...
              </>
            ) : (
              "Create Account"
=======
                Creating account...
              </>
            ) : (
              "Register"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

