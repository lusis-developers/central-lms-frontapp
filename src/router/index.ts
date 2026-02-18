import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

// Layout
// import UserLayout from "../layout/UserLayout.vue"; // Removed unused
import PublicLayout from "../layout/PublicLayout.vue";

// Views
import UserDashboard from "../views/User/UserDashboard.vue";
import MyCourses from "../views/User/MyCourses.vue";
import AllCourses from "../views/User/AllCourses.vue";
// import CourseDetail from "../views/User/CourseDetail.vue"; // Removed unused
import CourseDetail from "../views/User/CourseDetail.vue";
import LectureDetail from "../views/User/LectureDetail.vue";
import QuizView from "../views/User/QuizView.vue";
import QuizResult from "../views/User/QuizResult.vue";
import CertificatesView from "../views/User/CertificatesView.vue";
import ProfileEdit from "../views/User/ProfileEdit.vue";
// import UserOnboarding from "../views/User/UserOnboarding.vue";

// Landingpage
import LandingPage from "../views/Landing/LandingPage.vue";
import LoginView from "../views/Auth/Login.vue";
import Checkout from "../views/Checkout.vue";
import PayResponse from "../views/PayResponse.vue";
import Careers from "../views/Careers.vue";
import CareerDetail from "../views/CareerDetail.vue";

// Hub
import HubView from "@/views/Hub/HubView.vue";
import SchoolLayout from "@/layout/SchoolLayout.vue";

const routes: Array<RouteRecordRaw> = [
  // Public Landing Page (Root)
  {
    path: '/',
    component: LandingPage,
    meta: {
      title: 'Fudmaster - Best Platform to Empower Skills',
      requiresAuth: false
    }
  },
  // Hub Landing (Authenticated - Select School)
  // MOVED from '/' to '/hub'
  {
    path: '/hub',
    component: HubView,
    meta: {
      title: 'Hub de Academias',
      requiresAuth: true
    }
  },
  // School Context Routes
  {
    path: '/:schoolSlug',
    component: SchoolLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: to => `/${to.params.schoolSlug}/dashboard`
      },
      {
        path: 'dashboard',
        component: UserDashboard,
        meta: { title: 'Dashboard' }
      },
      {
        path: 'courses',
        component: MyCourses,
        meta: { title: 'Mis cursos' }
      },
      {
        path: 'courses/all',
        component: AllCourses,
        meta: { title: 'Todos los cursos' }
      },
      {
        path: 'courses/:id',
        component: CourseDetail,
        meta: { title: 'Detalle del curso' }
      },
      {
        path: 'courses/:id/lectures/:lectureId',
        component: LectureDetail,
        meta: { title: 'Clase' }
      },
      {
        path: 'courses/:id/quiz',
        component: QuizView,
        meta: { title: 'Quiz' }
      },
      {
        path: 'courses/:id/quiz/result',
        component: QuizResult,
        meta: { title: 'Resultado del quiz' }
      },
      {
        path: 'courses/:id/quizzes/:quizId',
        component: QuizView,
        meta: { title: 'Quiz' }
      },
      {
        path: 'courses/:id/quizzes/:quizId/result',
        component: QuizResult,
        meta: { title: 'Resultado del quiz' }
      },
      {
        path: 'careers',
        component: Careers,
        meta: { title: 'Escuelas o Carreras' }
      },
      {
        path: 'careers/:id',
        component: CareerDetail,
        meta: { title: 'Detalle de carrera' }
      },
      {
        path: 'profile/edit',
        component: ProfileEdit,
        meta: { title: 'Editar perfil' }
      },
      {
        path: 'certificates',
        component: CertificatesView,
        meta: { title: 'Mis Certificados' }
      }
    ]
  },
  // Auth & Public Routes (Keep as is)
  {
    path: '/courses/:id',
    redirect: to => `/administracion-gastronomica/courses/${to.params.id}`
  },
  {
    path: '/courses/:id/lectures/:lectureId',
    redirect: to => `/administracion-gastronomica/courses/${to.params.id}/lectures/${to.params.lectureId}`
  },
  {
    path: '/onboarding',
    redirect: '/'
  },
  // ... (keep existing public routes below)
  {
    path: '/login',
    component: PublicLayout,
    meta: { title: 'Iniciar sesión' },
    children: [
      { path: '', component: LoginView }
    ]
  },
  {
    path: '/request-password-recovery',
    component: PublicLayout,
    meta: { title: 'Recuperar Contraseña' },
    children: [
      { path: '', component: () => import('../views/Auth/RequestPasswordRecovery.vue') }
    ]
  },
  {
    path: '/reset-password',
    component: PublicLayout,
    meta: { title: 'Restablecer Contraseña' },
    children: [
      { path: '', component: () => import('../views/Auth/ResetPassword.vue') }
    ]
  },
  {
    path: '/checkout',
    component: PublicLayout,
    meta: { title: 'Checkout' },
    children: [
      { path: '', component: Checkout }
    ]
  },
  {
    path: '/pay-response',
    component: PublicLayout,
    meta: { title: 'Respuesta de pago' },
    children: [
      { path: '', component: PayResponse }
    ]
  },
  {
    path: '/pay-cancel',
    component: PublicLayout,
    meta: { title: 'Pago Cancelado' },
    children: [
      { path: '', component: () => import('../views/PayCancel.vue') }
    ]
  },
  {
    path: '/verify-certificate',
    component: PublicLayout,
    meta: { title: 'Verificar Certificado' },
    children: [
      { path: '', component: () => import('../views/Public/VerifyCertificate.vue') },
      { path: ':id', component: () => import('../views/Public/VerifyCertificate.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0, behavior: 'smooth' }
  }
})

import { useSchoolStore } from '@/stores/school'

router.beforeEach(async (to, _from, next) => {
  const hasToken = !!localStorage.getItem('access_token')
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth)
  const schoolStore = useSchoolStore()

  // Handle School Context
  const schoolSlug = to.params.schoolSlug as string
  if (schoolSlug) {
    if (schoolStore.currentSchool?.slug !== schoolSlug) {
      await schoolStore.setSchoolBySlug(schoolSlug)
      if (schoolStore.error && schoolStore.error === 'School not found') {
        // Redirect to Hub if school is invalid (or 404)
        return next('/hub')
      }
    }
  } else {
    // If we are at root or non-school route, maybe clear current school?
    // schoolStore.clearCurrentSchool()
    // Keeping it might be fine for persistence but explicit clear is safer for Hub
    if (to.path === '/hub') {
      schoolStore.clearCurrentSchool()
    }
  }

  if (requiresAuth && !hasToken) {
    // If trying to access a protected school route, redirect to login or Hub?
    // Let's redirect to Login to be standard, or Landing if that's the sales page.
    // User said "Maintain Login".
    return next({ path: '/login', replace: true })
  }

  if (to.path === '/login' && hasToken) {
    return next({ path: '/hub', replace: true })
  }

  // If user is authenticated and visits root '/', redirect to '/hub'
  if (to.path === '/' && hasToken) {
    return next({ path: '/hub', replace: true })
  }

  next()
})

export default router
