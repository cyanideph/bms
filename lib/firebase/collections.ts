import type { Timestamp } from "firebase/firestore"

// Collection names
export const COLLECTIONS = {
  USERS: "users",
  RESIDENTS: "residents",
  PERMITS: "permits",
  INCIDENTS: "incidents",
  ANNOUNCEMENTS: "announcements",
  OFFICIALS: "officials",
  EMERGENCY_CONTACTS: "emergency_contacts",
  MESSAGES: "messages",
}

// User types
export type UserRole = "admin" | "staff" | "user"

export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  role: UserRole
  createdAt: Timestamp
  updatedAt: Timestamp
  lastLogin?: Timestamp
  isActive: boolean
  phoneNumber?: string
  address?: string
}

// Resident types
export interface Resident {
  id: string
  residentId: string
  firstName: string
  lastName: string
  middleName?: string
  birthdate: Timestamp
  gender: "male" | "female" | "other"
  civilStatus: "single" | "married" | "divorced" | "widowed"
  address: string
  contactNumber: string
  email?: string
  occupation?: string
  photoURL?: string
  registeredVoter: boolean
  householdHead: boolean
  householdMembers?: number
  emergencyContact?: {
    name: string
    relationship: string
    contactNumber: string
  }
  createdAt: Timestamp
  updatedAt: Timestamp
  userId?: string // Link to user account if exists
}

// Permit types
export interface Permit {
  id: string
  permitId: string
  type: string
  applicant: string
  applicantId?: string // Reference to resident ID
  dateApplied: Timestamp
  purpose: string
  status: "Pending" | "Under Review" | "Approved" | "Rejected"
  approvedBy?: string
  approvedAt?: Timestamp
  rejectedBy?: string
  rejectedAt?: Timestamp
  rejectionReason?: string
  expiryDate?: Timestamp
  attachments?: string[] // URLs to attachments
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Incident types
export interface Incident {
  id: string
  incidentId: string
  title: string
  reporter: string
  reporterId?: string // Reference to resident ID
  location: string
  dateReported: Timestamp
  dateOccurred: Timestamp
  description: string
  status: "Reported" | "Under Investigation" | "Resolved" | "Closed"
  assignedTo?: string
  resolution?: string
  resolvedAt?: Timestamp
  attachments?: string[] // URLs to attachments
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Announcement types
export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  authorId: string // Reference to user ID
  type: "announcement" | "event" | "notice"
  priority: "low" | "medium" | "high"
  publishDate: Timestamp
  expiryDate?: Timestamp
  attachments?: string[] // URLs to attachments
  tags?: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Event type
export interface Event {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  type: "event"
  priority: "low" | "medium" | "high"
  publishDate: Timestamp
  eventDate: string
  location: string
  time: string
  attachments?: string[]
  tags?: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Official types
export interface Official {
  id: string
  firstName: string
  lastName: string
  position: string
  term: {
    start: Timestamp
    end: Timestamp
  }
  contactNumber?: string
  email?: string
  photoURL?: string
  biography?: string
  committees?: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Emergency Contact types
export interface EmergencyContact {
  id: string
  name: string
  type: "police" | "fire" | "medical" | "disaster" | "other"
  contactNumber: string
  alternateNumber?: string
  address?: string
  email?: string
  website?: string
  operatingHours?: string
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Message types
export interface Message {
  id: string
  senderId: string
  recipientId: string
  subject: string
  content: string
  read: boolean
  readAt?: Timestamp
  attachments?: string[] // URLs to attachments
  createdAt: Timestamp
  updatedAt: Timestamp
}

