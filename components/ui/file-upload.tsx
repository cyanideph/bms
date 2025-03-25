"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadFile } from "@/lib/firebase/storage"
import { Loader2, Upload, X, FileIcon, ImageIcon, FileText } from "lucide-react"
import Image from "next/image"

interface FileUploadProps {
  onUpload: (url: string) => void
  accept?: string
  maxSize?: number // in MB
  path?: string
  label?: string
  buttonText?: string
  className?: string
}

export function FileUpload({
  onUpload,
  accept = "image/*",
  maxSize = 5, // 5MB default
  path = "uploads",
  label = "Upload file",
  buttonText = "Select file",
  className,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    setFile(selectedFile)
    setError(null)

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const downloadURL = await uploadFile(file, path)
      onUpload(downloadURL)
      setFile(null)
      setPreview(null)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    } catch (err) {
      console.error("Upload error:", err)
      setError("Failed to upload file. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const getFileIcon = () => {
    if (!file) return <Upload className="h-8 w-8 text-muted-foreground" />

    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-primary" />
    } else if (file.type.includes("pdf")) {
      return <FileText className="h-8 w-8 text-primary" />
    } else {
      return <FileIcon className="h-8 w-8 text-primary" />
    }
  }

  return (
    <div className={className}>
      <Label htmlFor="file-upload">{label}</Label>

      <div className="mt-2 border-2 border-dashed rounded-md p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          {preview ? (
            <div className="relative h-32 w-32 overflow-hidden rounded-md">
              <Image src={preview || "/placeholder.svg"} alt="File preview" fill className="object-cover" />
              <button
                type="button"
                onClick={clearFile}
                className="absolute top-1 right-1 rounded-full bg-background/80 p-1 hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {getFileIcon()}
              <p className="mt-2 text-sm text-muted-foreground">
                {file ? file.name : "Drag and drop or click to upload"}
              </p>
              {file && <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)}MB</p>}
            </div>
          )}

          {error && <p className="text-sm text-destructive mt-2">{error}</p>}

          <div className="flex gap-2 mt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              {buttonText}
            </Button>

            {file && (
              <Button type="button" size="sm" onClick={handleUpload} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Input
        id="file-upload"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
    </div>
  )
}

