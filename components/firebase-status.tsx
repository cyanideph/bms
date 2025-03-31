"use client"

<<<<<<< HEAD
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { auth, db, storage } from "@/lib/firebase/config"
import { collection, getDocs, limit, query, doc, setDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadString } from "firebase/storage"

export function FirebaseStatus() {
  const [authStatus, setAuthStatus] = useState<"loading" | "success" | "error">("loading")
  const [firestoreStatus, setFirestoreStatus] = useState<"loading" | "success" | "error">("loading")
  const [storageStatus, setStorageStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const checkFirebaseServices = async () => {
      // Check Auth
      try {
        await auth?.app?.options
        setAuthStatus("success")
      } catch (error) {
        console.error("Auth error:", error)
        setAuthStatus("error")
        setErrorMessage((prev) => (prev ? `${prev}\nAuth: ${error}` : `Auth: ${error}`))
      }

      // Check Firestore
      try {
        // Using v9 syntax for Firestore
        if (!db) throw new Error("Firestore not initialized")

        // First test a read operation
        const testQuery = query(collection(db, "users"), limit(1))
        await getDocs(testQuery)

        // Then test a write operation
        const testDocRef = doc(collection(db, "_connection_test_"), "test")
        await setDoc(testDocRef, {
          timestamp: new Date().toISOString(),
          test: true,
        })

        setFirestoreStatus("success")
      } catch (error) {
        console.error("Firestore error:", error)
        setFirestoreStatus("error")
        setErrorMessage((prev) => (prev ? `${prev}\nFirestore: ${error}` : `Firestore: ${error}`))
      }

      // Check Storage
      try {
        if (!storage) throw new Error("Storage not initialized")

        const testRef = ref(storage, "test-file.txt")
        await uploadString(testRef, "Test content")
        await getDownloadURL(testRef)
        setStorageStatus("success")
      } catch (error) {
        console.error("Storage error:", error)
        setStorageStatus("error")
        setErrorMessage((prev) => (prev ? `${prev}\nStorage: ${error}` : `Storage: ${error}`))
      }
    }

    checkFirebaseServices()
  }, [])

  const getStatusIcon = (status: "loading" | "success" | "error") => {
    if (status === "loading")
      return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    if (status === "success") return <CheckCircle className="h-4 w-4 text-green-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const allSuccess = authStatus === "success" && firestoreStatus === "success" && storageStatus === "success"
  const anyError = authStatus === "error" || firestoreStatus === "error" || storageStatus === "error"

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Firebase Status</CardTitle>
        <CardDescription>Check the status of Firebase services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {anyError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Firebase Configuration Error</AlertTitle>
            <AlertDescription>
              One or more Firebase services failed to initialize. Please check your configuration.
              {errorMessage && <div className="mt-2 text-xs whitespace-pre-wrap">{errorMessage}</div>}
            </AlertDescription>
          </Alert>
        )}

        {allSuccess && (
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-800 dark:text-green-300">All Services Operational</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Firebase Authentication, Firestore, and Storage are working correctly.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Authentication</span>
            <span>{getStatusIcon(authStatus)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Firestore Database</span>
            <span>{getStatusIcon(firestoreStatus)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Storage</span>
            <span>{getStatusIcon(storageStatus)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
          Refresh Status
        </Button>
      </CardFooter>
    </Card>
=======
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
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
  )
}

