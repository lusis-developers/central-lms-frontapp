<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/assets/logos/logo-short.png';

const router = useRouter();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const scrollToSection = (id: string) => {
  isMobileMenuOpen.value = false;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const goToLogin = () => {
  router.push('/login');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="landing-navbar" :class="{ 'scrolled': isScrolled }">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="logo-wrapper" @click="scrollToSection('hero')">
        <img :src="logo" alt="Fudmaster Logo" class="logo-img" />
      </div>

      <!-- Desktop Menu -->
      <div class="desktop-menu">
        <a href="#hero" @click.prevent="scrollToSection('hero')" class="nav-link">Inicio</a>
        <a href="#categories" @click.prevent="scrollToSection('categories')" class="nav-link">Categorías</a>
        <a href="#features" @click.prevent="scrollToSection('features')" class="nav-link">Nosotros</a>
        <a href="#courses" @click.prevent="scrollToSection('courses')" class="nav-link">Cursos</a>
      </div>

      <!-- Actions -->
      <div class="navbar-actions">
        <button @click="goToLogin" class="btn-login">
          Iniciar Sesión
        </button>
        
        <!-- Mobile Toggle -->
        <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <a href="#hero" @click.prevent="scrollToSection('hero')" class="mobile-link">Inicio</a>
        <a href="#categories" @click.prevent="scrollToSection('categories')" class="mobile-link">Categorías</a>
        <a href="#features" @click.prevent="scrollToSection('features')" class="mobile-link">Nosotros</a>
        <a href="#courses" @click.prevent="scrollToSection('courses')" class="mobile-link">Cursos</a>
      </div>
    </transition>
  </nav>
</template>

<style lang="scss" scoped>
.landing-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.3s ease;
  background: transparent;

  &.scrolled {
    background: rgba($white, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 15px 0;
  }
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.desktop-menu {
  display: none;
  gap: 32px;

  @media (min-width: 768px) {
    display: flex;
  }

  .nav-link {
    text-decoration: none;
    color: $FUDMASTER-PRIMARY;
    font-weight: 500;
    font-size: 1rem;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
      color: $FUDMASTER-TEAL;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: $FUDMASTER-TEAL;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-login {
  background: $FUDMASTER-PRIMARY;
  color: $white;
  border: none;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: $FUDMASTER-TEAL;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba($FUDMASTER-TEAL, 0.3);
  }
}

.mobile-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }

  .bar {
    width: 25px;
    height: 3px;
    background-color: $FUDMASTER-PRIMARY;
    border-radius: 2px;
  }
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: $white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);

  .mobile-link {
    text-decoration: none;
    color: $FUDMASTER-PRIMARY;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:last-child {
      border-bottom: none;
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
