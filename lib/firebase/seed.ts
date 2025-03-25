import { registerUser } from "./auth"
<<<<<<< HEAD
import { db } from "./config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { COLLECTIONS } from "./collections"
=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

// Function to seed the database with mock users
export const seedUsers = async () => {
  try {
    // Create admin user
    await registerUser("admin@barangay-sua.gov.ph", "Admin@123", "Admin User", "admin")

    // Create staff users
    await registerUser("staff1@barangay-sua.gov.ph", "Staff@123", "Maria Santos", "staff")

    await registerUser("staff2@barangay-sua.gov.ph", "Staff@123", "Juan Dela Cruz", "staff")

    // Create regular users
    await registerUser("user1@example.com", "User@123", "Pedro Reyes", "user")

    await registerUser("user2@example.com", "User@123", "Elena Garcia", "user")

    await registerUser("user3@example.com", "User@123", "Roberto Lim", "user")

    console.log("Database seeded successfully!")
    return true
  } catch (error) {
    console.error("Error seeding database:", error)
    return false
  }
}

<<<<<<< HEAD
// Sample data for announcements
const announcementData = [
  {
    type: "announcement",
    title: "Barangay Assembly Meeting",
    content:
      "The quarterly Barangay Assembly Meeting will be held on June 15, 2024 at the Barangay Hall. All residents are encouraged to attend.",
    date: new Date("2024-06-05"),
    author: {
      name: "Maria Santos",
      role: "Barangay Secretary",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  },
  {
    type: "announcement",
    title: "Free Medical Mission",
    content:
      "A free medical mission will be conducted on June 20, 2024 at the Barangay Plaza. Services include general check-up, dental services, and free medicines.",
    date: new Date("2024-06-03"),
    author: {
      name: "Dr. Jose Reyes",
      role: "Health Committee Head",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  },
  {
    type: "announcement",
    title: "Road Repair Schedule",
    content:
      "The Department of Public Works and Highways will be conducting road repairs on the main street from June 10-12, 2024. Please use alternative routes.",
    date: new Date("2024-06-01"),
    author: {
      name: "Pedro Mendoza",
      role: "Barangay Captain",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  },
]

// Function to seed announcements
export const seedAnnouncements = async () => {
  try {
    const announcementsCollection = collection(db, COLLECTIONS.ANNOUNCEMENTS)

    for (const announcement of announcementData) {
      await addDoc(announcementsCollection, announcement)
    }

    console.log("Announcements seeded successfully")
    return { success: true, message: "Announcements seeded successfully" }
  } catch (error) {
    console.error("Error seeding announcements:", error)
    return { success: false, message: "Error seeding announcements" }
  }
}

// Sample data for residents
const residentData = [
  // Add resident data here
]

// Function to seed residents
export const seedResidents = async () => {
  // Implementation
}

// Sample data for permits
const permitData = [
  // Add permit data here
]

// Function to seed permits
export const seedPermits = async () => {
  // Implementation
}

// Sample data for incidents
const incidentData = [
  // Add incident data here
]

// Function to seed incidents
export const seedIncidents = async () => {
  // Implementation
}

// Main seed function to seed all collections
export const seedAllData = async () => {
  try {
    await seedAnnouncements()
    // Uncomment these as you implement them
    // await seedResidents();
    // await seedPermits();
    // await seedIncidents();

    return { success: true, message: "All data seeded successfully" }
  } catch (error) {
    console.error("Error seeding data:", error)
    return { success: false, message: "Error seeding data" }
  }
}

=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
