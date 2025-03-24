import { registerUser } from "./auth"

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

