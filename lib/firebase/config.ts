// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Fallback configuration for development if environment variables are not set
const fallbackConfig = {
  apiKey: "AIzaSyC5bEHqb8Jbpj83Mn9vwb2oUrvMgLYuOAc",
  authDomain: "bms-sua.firebaseapp.com",
  projectId: "bms-sua",
  storageBucket: "bms-sua.appspot.com",
  messagingSenderId: "518730381204",
  appId: "1:518730381204:web:61bda85a5fd6b10b508181",
  measurementId: "G-TLCEX016ZR",
}

// Use environment variables if available, otherwise use fallback
const config = {
  apiKey: firebaseConfig.apiKey || fallbackConfig.apiKey,
  authDomain: firebaseConfig.authDomain || fallbackConfig.authDomain,
  projectId: firebaseConfig.projectId || fallbackConfig.projectId,
  storageBucket: firebaseConfig.storageBucket || fallbackConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId || fallbackConfig.messagingSenderId,
  appId: firebaseConfig.appId || fallbackConfig.appId,
  measurementId: firebaseConfig.measurementId || fallbackConfig.measurementId,
}

// Initialize Firebase
let app
let auth
let db
let storage

try {
  // Check if Firebase app is already initialized
  if (!getApps().length) {
    app = initializeApp(config)
    console.log("Firebase initialized successfully with project:", config.projectId)
  } else {
    app = getApp()
    console.log("Using existing Firebase app")
  }

  // Initialize Firebase services
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
} catch (error) {
  console.error("Error initializing Firebase:", error)
  // Provide fallback values for development/testing
  app = null
  auth = null
  db = null
  storage = null
}

export { app, auth, db, storage }

