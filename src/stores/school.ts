import { defineStore } from 'pinia'
import { ref } from 'vue'
import { schoolService } from '@/services/school.service'
import type { School } from '@/types/school'

export const useSchoolStore = defineStore('school', () => {
  const schools = ref<School[]>([])
  const currentSchool = ref<School | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Use CSS variables to apply theme dynamically
  const applyTheme = (color: string) => {
    document.documentElement.style.setProperty('--school-primary-color', color)
    // You can add more derived colors here if needed
  }

  const fetchSchools = async () => {
    loading.value = true
    try {
      schools.value = await schoolService.getSchools()
    } catch (e: any) {
      error.value = e.message || 'Error fetching schools'
    } finally {
      loading.value = false
    }
  }

  const setSchoolBySlug = async (slug: string) => {
    loading.value = true
    try {
      // Logic: if we have schools loaded, find it. If not, fetch specific or all.
      // For now, simpler to find in list or fetch specific if not found? 
      // mocking service is fast, let's just use getSchoolBySlug
      const school = await schoolService.getSchoolBySlug(slug)
      if (school) {
        currentSchool.value = school
        applyTheme(school.theme_color)
      } else {
        error.value = 'School not found'
        currentSchool.value = null
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const clearCurrentSchool = () => {
    currentSchool.value = null
    // Reset theme or apply default?
    document.documentElement.style.removeProperty('--school-primary-color')
  }

  return {
    schools,
    currentSchool,
    loading,
    error,
    fetchSchools,
    setSchoolBySlug,
    clearCurrentSchool
  }
})
