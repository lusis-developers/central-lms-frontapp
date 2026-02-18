<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleStartLearning = () => {
  router.push('/login')
}
</script>

<template>
  <section class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          La Mejor Plataforma <br />
          <span class="highlight">Potencia tus Habilidades</span>
        </h1>
        <p class="hero-subtitle">
          Desbloquea tu potencial con cursos dirigidos por expertos en artes culinarias, gestión y más.
          Únete a una comunidad de estudiantes hoy.
        </p>
        
        <div class="hero-actions">
          <button @click="handleStartLearning" class="btn-primary">
            Empieza a Aprender
          </button>
          <div class="stats-badge">
             <div class="avatars-stack">
               <!-- Placeholder for avatars if needed, or just icons -->
               <img src="https://ui-avatars.com/api/?name=User+One&background=random" alt="User" class="avatar" />
               <img src="https://ui-avatars.com/api/?name=User+Two&background=random" alt="User" class="avatar" />
               <img src="https://ui-avatars.com/api/?name=User+Three&background=random" alt="User" class="avatar" />
             </div>
             <div class="stats-text">
               <span class="count">100K+</span>
               <span class="label">Estudiantes Inscritos</span>
             </div>
          </div>
        </div>
      </div>

      <div class="hero-image-wrapper">
        <div class="abstract-shape shape-1"></div>
        <div class="abstract-shape shape-2"></div>
         <!-- Optimally we would use a real image here. Using a placeholder for now that fits the description -->
         <!-- "Cutout photo of a male student sitting cross-legged reading a book" -->
        <div class="image-container">
            <img 
              src="https://res.cloudinary.com/dp9w6l7ir/image/upload/v1771457674/Mujer_asia%CC%81tica_en_silla_de_ruedas_riendo_en_oficina_q9yoyl.jpg" 
              alt="Estudiante Leyendo" 
              class="hero-image"
            />
            <div class="glass-badge">
              <span class="icon"><i class="fa-solid fa-certificate" /></span>
              <span class="text">Cursos Certificados</span>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  width: 100%;
  background-color: $bg-white;
  padding: 80px 20px;
  overflow: hidden;
  position: relative;

  @media (min-width: 1024px) {
    padding: 120px 60px;
    height: 90vh;
    /* Full viewport height on desktop */
    min-height: 700px;
    display: flex;
    align-items: center;
  }
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-title {
  font-family: 'Inter', sans-serif; // Assuming Inter is available or default
  font-weight: 800;
  font-size: 3rem;
  line-height: 1.1;
  color: $FUDMASTER-PRIMARY;

  @media (min-width: 768px) {
    font-size: 4rem;
  }

  .highlight {
    color: $FUDMASTER-TEAL;
    position: relative;

    // Optional: Abstract underline
    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 12px;
      background-color: rgba($FUDMASTER-YELLOW, 0.4);
      z-index: -1;
      border-radius: 4px;
    }
  }
}

.hero-subtitle {
  font-size: 1.125rem;
  color: $text-muted;
  line-height: 1.6;
  max-width: 500px;
}

.btn-primary {
  background-color: $FUDMASTER-TEAL;
  color: $white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px; // Pill shape
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba($FUDMASTER-TEAL, 0.3);
  width: fit-content;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba($FUDMASTER-TEAL, 0.4);
    background-color: darken($FUDMASTER-TEAL, 5%);
  }
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
}

.stats-badge {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.avatars-stack {
  display: flex;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid $white;
    margin-left: -15px;
    object-fit: cover;

    &:first-child {
      margin-left: 0;
    }
  }
}

.stats-text {
  display: flex;
  flex-direction: column;

  .count {
    font-weight: 700;
    font-size: 1.1rem;
    color: $FUDMASTER-PRIMARY;
  }

  .label {
    font-size: 0.8rem;
    color: $text-muted;
  }
}

.hero-image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .image-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    border-radius: 30px;
    overflow: hidden; // Crop image if needed, or remove for cutout style
    // If it's a cutout, we wouldn't use overflow hidden and background box.
    // Simulating "Cutout" style with a masked image or simpler approach for now.

    .hero-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
      border-radius: 30px;
      // Filter to blend or enhance if needed
    }
  }

  // Abstract shapes
  .abstract-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    z-index: -1;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    background-color: rgba($FUDMASTER-TEAL, 0.2);
    top: -20px;
    right: -20px;
  }

  .shape-2 {
    width: 250px;
    height: 250px;
    background-color: rgba($FUDMASTER-YELLOW, 0.2);
    bottom: -20px;
    left: -20px;
  }

  .glass-badge {
    position: absolute;
    bottom: 40px;
    right: -20px; // Float out slightly
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 12px 24px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.18);

    .icon {
      font-size: 1.5rem;
    }

    .text {
      font-weight: 600;
      color: $FUDMASTER-PRIMARY;
    }

    @media (max-width: 768px) {
      right: 10px;
      bottom: 20px;
    }
  }
}
</style>
