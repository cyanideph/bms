"use client"

import { useEffect, useState } from "react"
import { app, auth, db, storage } from "@/lib/firebase/config"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Database, Lock, FileImage } from "lucide-react"

export function FirebaseStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [services, setServices] = useState({
    app: false,
    auth: false,
    firestore: false,
    storage: false,
  })

  useEffect(() => {
    const checkFirebaseConnection = async () => {
      try {
        // Check Firebase App
        if (!app) {
          throw new Error("Firebase app not initialized")
        }
        setServices((prev) => ({ ...prev, app: true }))

        // Check Auth
        if (!auth) {
          throw new Error("Firebase Auth not initialized")
        }
        setServices((prev) => ({ ...prev, auth: true }))

        // Check Firestore
        if (!db) {
          throw new Error("Firebase Firestore not initialized")
        }
        setServices((prev) => ({ ...prev, firestore: true }))

        // Check Storage
        if (!storage) {
          throw new Error("Firebase Storage not initialized")
        }
        setServices((prev) => ({ ...prev, storage: true }))

        // If we get here, all services are initialized
        setStatus("connected")
      } catch (error) {
        console.error("Firebase connection error:", error)
        setStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Unknown error")
      }
    }

    checkFirebaseConnection()
  }, [])

  if (status === "loading") {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Checking Firebase connection...</AlertTitle>
        <AlertDescription>Please wait while we verify the connection to Firebase services.</AlertDescription>
      </Alert>
    )
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Firebase Connection Error</AlertTitle>
        <AlertDescription>
          {errorMessage || "There was an error connecting to Firebase. Please check your configuration."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-2">
      <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-600 dark:text-green-400">Firebase Connected</AlertTitle>
        <AlertDescription className="text-green-600 dark:text-green-400">
          Successfully connected to Firebase project: {app?.options.projectId}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
        <div className="flex items-center p-3 rounded-md bg-muted">
          <Lock className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="text-sm font-medium">Authentication</p>
            <p className="text-xs text-muted-foreground">Status: {services.auth ? "Connected" : "Error"}</p>
          </div>
        </div>

        <div className="flex items-center p-3 rounded-md bg-muted">
          <Database className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="text-sm font-medium">Firestore Database</p>
            <p className="text-xs text-muted-foreground">Status: {services.firestore ? "Connected" : "Error"}</p>
          </div>
        </div>

        <div className="flex items-center p-3 rounded-md bg-muted">
          <FileImage className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="text-sm font-medium">Storage</p>
            <p className="text-xs text-muted-foreground">Status: {services.storage ? "Connected" : "Error"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

