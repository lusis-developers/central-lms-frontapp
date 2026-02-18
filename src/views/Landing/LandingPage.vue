<script setup lang="ts">
import { useHead } from '@unhead/vue';
import LandingNavbar from './components/LandingNavbar.vue';
import LandingHero from './components/LandingHero.vue';
import LandingCategories from './components/LandingCategories.vue';
import LandingCourses from './components/LandingCourses.vue';

// Use Head for SEO
useHead({
  title: 'Nabux - Potencia tus Habilidades',
  meta: [
    { name: 'description', content: 'Únete a Nabux para dominar las artes culinarias, la gestión y más con cursos dirigidos por expertos.' },
    { property: 'og:title', content: 'Nabux - Potencia tus Habilidades' },
    { property: 'og:description', content: 'Educación de clase mundial para chefs y gerentes.' }
  ]
})
</script>

<template>
  <div class="landing-wrapper">
    <LandingNavbar />
    
    <main>
      <div id="hero">
        <LandingHero />
      </div>
      <div id="categories">
        <LandingCategories />
      </div>
      <div id="courses">
        <LandingCourses />
      </div>
    </main>

    <footer class="landing-footer">
      <div class="footer-content">
        <p>© {{ new Date().getFullYear() }} Nabux. Todos los derechos reservados.</p>
        <div class="links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.landing-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: $bg-white;
  font-family: 'Inter', sans-serif; // Ensure font is applied
}

.landing-footer {
  padding: 40px 20px;
  background-color: $FUDMASTER-PRIMARY;
  color: rgba(255, 255, 255, 0.7);

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  .links {
    display: flex;
    gap: 20px;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: white;
      }
    }
  }
}
</style>

