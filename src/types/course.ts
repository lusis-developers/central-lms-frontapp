export interface Course {
  id: number | string
  title: string
  slug: string
  description?: string
  thumbnail?: string
  schoolId?: string // New field for Multi-School support
  schoolSlug?: string // Helper for routing
  // Add other existing fields as needed based on API response
  [key: string]: any
}
