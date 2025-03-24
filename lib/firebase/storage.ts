import { storage } from "./config"
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

// Upload a file to Firebase Storage
export const uploadFile = async (file: File, path = "uploads"): Promise<string> => {
  try {
    if (!storage) {
      throw new Error("Firebase Storage not initialized")
    }

    // Create a unique filename
    const fileExtension = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`
    const fullPath = `${path}/${fileName}`

    // Create a reference to the file location
    const storageRef = ref(storage, fullPath)

    // Upload the file
    await uploadBytes(storageRef, file)

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

// Get a download URL for a file
export const getFileURL = async (path: string): Promise<string> => {
  try {
    if (!storage) {
      throw new Error("Firebase Storage not initialized")
    }

    const storageRef = ref(storage, path)
    return await getDownloadURL(storageRef)
  } catch (error) {
    console.error("Error getting file URL:", error)
    throw error
  }
}

// Delete a file from Firebase Storage
export const deleteFile = async (path: string): Promise<void> => {
  try {
    if (!storage) {
      throw new Error("Firebase Storage not initialized")
    }

    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error("Error deleting file:", error)
    throw error
  }
}

// List all files in a directory
export const listFiles = async (path: string): Promise<string[]> => {
  try {
    if (!storage) {
      throw new Error("Firebase Storage not initialized")
    }

    const storageRef = ref(storage, path)
    const result = await listAll(storageRef)

    // Get download URLs for all items
    const urls = await Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)))

    return urls
  } catch (error) {
    console.error("Error listing files:", error)
    throw error
  }
}

