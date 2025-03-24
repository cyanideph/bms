import { FirebaseStatus } from "@/components/firebase-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/ui/file-upload"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Firebase Test | Barangay Sua Management System",
  description: "Test Firebase connection for Barangay Sua Management System",
}

export default function FirebaseTestPage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight philippines-text-gradient">Firebase Connection Test</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Firebase Status</CardTitle>
            <CardDescription>This page tests the connection to Firebase services</CardDescription>
          </CardHeader>
          <CardContent>
            <FirebaseStatus />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>
              For production, create a .env.local file in your project root with these variables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
              <p># Firebase Configuration</p>
              <p>NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key</p>
              <p>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain</p>
              <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id</p>
              <p>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket</p>
              <p>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id</p>
              <p>NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id</p>
              <p>NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Note: The Firebase configuration is currently using fallback values for development. In production, these
              values should be loaded from environment variables.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test File Upload</CardTitle>
            <CardDescription>Test uploading files to Firebase Storage</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              onUpload={(url) => {
                console.log("Uploaded file URL:", url)
                alert(`File uploaded successfully! URL: ${url}`)
              }}
              path="test-uploads"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

