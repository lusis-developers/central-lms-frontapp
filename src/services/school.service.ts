import type { School } from '@/types/school'

// Mock Data for Schools based on user requirement
const MOCK_SCHOOLS: School[] = [
  {
    id: 'adm-gastronomica',
    name: 'Administración Gastronómica',
    slug: 'administracion-gastronomica', // URL friendly
    description: 'Domina la gestión y rentabilidad de tu negocio culinario.',
    courses_count: 5,
    theme_color: '#F96E46', // $FUDMASTER-ORANGE
    logo: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1770509913/Remove_Background_Image_2_sujbky.png'
  },
  {
    id: 'digitalizacion-emp',
    name: 'Digitalización Empresarial y de Emprendimientos',
    slug: 'digitalizacion',
    description: 'Transforma tu negocio con herramientas digitales modernas.',
    courses_count: 5,
    theme_color: '#0a81d1', // $FUDMASTER-BLUE
    logo: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1770509780/Remove_Background_Image_Preview_1_wpgcrs.png'
  },
  {
    id: 'marketing-diseno',
    name: 'Marketing y Diseño para No Marketeros',
    slug: 'marketing-diseno',
    description: 'Crea marcas impactantes sin ser un experto.',
    courses_count: 5,
    theme_color: '#DA4167', // $FUDMASTER-PINK (High impact)
    logo: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1770509775/Remove_Background_Image_txifn2.png'
  },
  {
    id: 'inteligencia-emocional',
    name: 'Inteligencia Emocional para Equipos',
    slug: 'inteligencia-emocional',
    description: 'Liderazgo y bienestar para el éxito de tu equipo.',
    courses_count: 5,
    theme_color: '#2BBB92', // $FUDMASTER-GREEN
    logo: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1770509771/Remove_Background_Image_Preview_lhaaft.png'
  },
  {
    id: 'monetizacion',
    name: 'Monetización de Habilidades y Manejo de Flujo',
    slug: 'monetizacion',
    description: 'Convierte tus habilidades en ingresos sostenibles.',
    courses_count: 5,
    theme_color: '#7F5A83', // $FUDMASTER-PURPLE
    logo: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1770509786/Remove_Background_Image_1_wbjqzn.png'
  }
]

class SchoolService {
  /**
   * Get all available schools (simulated API call)
   */
  async getSchools(): Promise<School[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_SCHOOLS), 300) // Simulate network latency
    })
  }

  /**
   * Get a specific school by its slug
   */
  async getSchoolBySlug(slug: string): Promise<School | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const school = MOCK_SCHOOLS.find(s => s.slug === slug)
        resolve(school)
      }, 200)
    })
  }

  /**
 * Get a specific school by its ID
 */
  async getSchoolById(id: string): Promise<School | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const school = MOCK_SCHOOLS.find(s => s.id === id)
        resolve(school)
      }, 200)
    })
  }
}

export const schoolService = new SchoolService()
