<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSchoolStore } from '@/stores/school'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const router = useRouter()
const schoolStore = useSchoolStore()
const userStore = useUserStore()
const { schools, loading, error } = storeToRefs(schoolStore)

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const navigateToSchool = (slug: string) => {
  router.push(`/${slug}/dashboard`)
}

const goToLogin = () => router.push('/login')
const logout = () => {
  localStorage.removeItem('access_token')
  userStore.clear()
  window.location.reload()
}

onMounted(() => {
  schoolStore.fetchSchools()
  if (!userStore.id && localStorage.getItem('access_token')) {
    userStore.hydrate()
  }

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<template>
  <div class="hub-container">
    <nav class="hub-nav">
        <!-- Logo -->
        <div class="logo-container">
            <!-- Desktop Logos -->
            <img v-if="!isDark" src="@/assets/logos/logo-short.png" alt="Nabux" class="logo desktop" />
            <img v-else src="@/assets/logos/logo-large-white.png" alt="Fudmaster" class="logo desktop" />
            
            <!-- Mobile Logo -->
             <img src="@/assets/logos/logo-short.png" alt="Fudmaster" class="logo mobile" />
        </div>
        
        <div class="nav-controls">
            <!-- Theme Toggle -->
            <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
                <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
            </button>

            <!-- Auth Actions -->
            <div class="auth-buttons">
                <template v-if="userStore.isAuthenticated">
                    <div class="user-pill">
                        <span class="welcome-text">Hola, {{ userStore.name?.split(' ')[0] }}</span>
                        <div class="divider"></div>
                        <button @click="logout" class="btn-logout" title="Cerrar Sesión">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </div>
                </template>
                <template v-else>
                    <button @click="goToLogin" class="btn-primary">
                        Iniciar Sesión
                    </button>
                </template>
            </div>
        </div>
    </nav>

    <header class="hub-header">
      <h1>Hub de Academias</h1>
      <p class="subtitle">Selecciona tu ruta de aprendizaje</p>
    </header>

    <!-- State: Loading -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando academias...</p>
    </div>

    <!-- State: Error -->
    <div v-else-if="error" class="error-state">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <p>{{ error }}</p>
    </div>

    <!-- State: Success -->
    <div v-else class="schools-grid">
      <div 
        v-for="school in schools" 
        :key="school.id" 
        class="school-card"
        :style="{ '--school-color': school.theme_color }"
        @click="navigateToSchool(school.slug)"
      >
        <div class="card-content">
          <div class="icon-wrapper">
             <img v-if="school.logo" :src="school.logo" :alt="school.name" class="school-logo" />
             <span v-else class="initial">{{ school.name.charAt(0) }}</span>
          </div>
          <div class="info">
              <h3>{{ school.name }}</h3>
              <p>{{ school.description }}</p>
          </div>
          <div class="footer">
            <span class="course-count">
                <i class="fa-solid fa-book-open"></i>
                {{ school.courses_count }} Cursos
            </span>
            <span class="arrow-icon">
                <i class="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Variables Mapping (assuming globals are available, if not using fallbacks)
$primary: #010D27; // $FUDMASTER-DARK
$secondary: #2BBB92; // $FUDMASTER-SECONDARY
$text-light: #f5f5f5;
$white: #ffffff;

.hub-container {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

// THEMING
:root {
  --bg: #f8f9fa;
  --text: #333;
  --card-bg: #ffffff;
  --card-border: rgba(0, 0, 0, 0.05);
  --hover-bg: rgba(0, 0, 0, 0.03);
}

:root[data-theme='dark'] {
  --bg: #0b1120; // Deep dark blue/black
  --text: #e2e8f0;
  --card-bg: #1e293b;
  --card-border: rgba(255, 255, 255, 0.1);
  --hover-bg: rgba(255, 255, 255, 0.05);
}

// NAVIGATION
.hub-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 4rem;
  padding: 1rem 0;

  .logo-container {
    .logo {
      height: 48px;
      object-fit: contain;

      &.mobile {
        display: none; // Hidden by default on desktop
      }
    }
  }

  @media (max-width: 768px) {
    .logo-container {
      .logo {
        &.desktop {
          display: none; // Hide desktop logo on mobile
        }

        &.mobile {
          display: block; // Show mobile logo
          height: 40px;
        }
      }
    }
  }

  .nav-controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .theme-toggle {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--text);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--hover-bg);
      transform: rotate(15deg);
    }
  }

  .auth-buttons {
    .btn-primary {
      background-color: $secondary;
      color: $primary;
      border: none;
      padding: 0.6rem 1.5rem;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s, filter 0.2s;
      box-shadow: 0 4px 12px rgba(43, 187, 146, 0.25);

      &:hover {
        transform: translateY(-2px);
        filter: brightness(1.1);
      }
    }

    .user-pill {
      display: flex;
      align-items: center;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 999px;
      padding: 0.4rem 0.5rem 0.4rem 1rem;
      gap: 0.8rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .welcome-text {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text);
      }

      .divider {
        width: 1px;
        height: 16px;
        background-color: var(--card-border);
      }

      .btn-logout {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
          background: #ef4444;
          color: white;
        }
      }
    }
  }
}

// HEADER
.hub-header {
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, var(--text) 0%, #aaa 100%);
    -webkit-background-clip: text;
    background-clip: text;
    // color: transparent; // Optional gradient text
    color: var(--text);
    letter-spacing: -0.03em;
  }

  .subtitle {
    font-size: 1.25rem;
    color: color-mix(in srgb, var(--text) 60%, transparent);
  }
}

// GRID
.schools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
}

.school-card {
  background: var(--card-bg);
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent); // More visible border
  border-radius: 24px; // Slightly rounder
  padding: 2rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08); // Deeper shadow

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px; // Left accent bar instead of top
    height: 100%;
    background: var(--school-color);
    opacity: 1;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: color-mix(in srgb, var(--school-color) 50%, transparent);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15); // Stronger lift

    .arrow-icon {
      transform: translateX(6px);
      color: var(--school-color);
      background: color-mix(in srgb, var(--school-color) 10%, transparent);
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center; // Center children horizontally (Flexbox approach)
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    background-color: color-mix(in srgb, var(--school-color) 10%, var(--card-bg));
    color: var(--school-color);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem; // No auto margin needed with flex parent
    font-size: 2rem;
    font-weight: 800;
    padding: 10px;

    .school-logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }
  }

  .info {
    width: 100%;
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      line-height: 1.2;
      color: var(--text);
    }

    p {
      font-size: 1rem;
      color: color-mix(in srgb, var(--text) 70%, transparent);
      line-height: 1.6;
      margin-bottom: 2rem;
      max-width: 90%;
    }
  }

  .footer {
    width: 100%; // Force full width
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid var(--card-border);

    .course-count {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 0.5rem;

      i {
        color: var(--school-color);
      }
    }

    .arrow-icon {
      color: var(--text);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--hover-bg);
      transition: all 0.3s ease;

      i {
        font-size: 14px;
      }
    }
  }
}

// STATES
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text);

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--card-border);
    border-top-color: $secondary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

.error-state {
  color: #ef4444;
  text-align: center;
  font-size: 1.2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .hub-header h1 {
    font-size: 2rem;
  }

  .hub-nav {
    flex-direction: column;
    gap: 1.5rem;

    .auth-buttons {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
