<script setup lang="ts">
import { ref } from 'vue'

const categories = [
  {
    id: 1,
    name: 'Administración Gastronómica',
    icon: 'fa-solid fa-utensils',
    color: '#F96E46',
    description: 'No más teoría muerta. Construye un sistema operativo para tu cocina que garantice rentabilidad desde el día 1.',
    count: 5
  },
  {
    id: 2,
    name: 'Digitalización Empresarial',
    icon: 'fa-solid fa-laptop-code',
    color: '#0a81d1',
    description: 'La K-Economy llegó. Automatiza, digitaliza y gestiona tu empresa con herramientas del futuro, no del pasado.',
    count: 5
  },
  {
    id: 3,
    name: 'Marketing para No Marketeros',
    icon: 'fa-solid fa-bullhorn',
    color: '#DA4167',
    description: 'No busques likes, busca ventas. Aprende a contar tu historia y construir una marca con alma y propósito.',
    count: 5
  },
  {
    id: 4,
    name: 'Finanzas Estratégicas',
    icon: 'fa-solid fa-coins',
    color: '#2BBB92',
    description: 'Sal del "modo supervivencia". Domina los números para reinvertir, crecer y construir patrimonio real.',
    count: 4
  },
  {
    id: 5,
    name: 'Experiencia y Servicio',
    icon: 'fa-solid fa-bell-concierge',
    color: '#FFC107',
    description: 'Crea productos que la gente ame. Diseña experiencias memorables que conviertan clientes en fanáticos.',
    count: 6
  },
  {
    id: 6,
    name: 'Liderazgo e Innovación',
    icon: 'fa-solid fa-lightbulb',
    color: '#7F5A83',
    description: 'Sé un "Founder", no un jefe. Desarrolla la visión y resiliencia para navegar la incertidumbre y liderar el cambio.',
    count: 3
  },
]

// Mobile interaction state
const activeCard = ref<number | null>(null)

function toggleCard(id: number) {
  // Toggle logic for mobile/click
  if (activeCard.value === id) {
    activeCard.value = null
  } else {
    activeCard.value = id
  }
}
</script>

<template>
  <section class="categories-section" id="categories">
    <div class="container">
      <div class="header">
        <h2 class="title">Nuestras Academias</h2>
        <p class="subtitle">Especialízate en las áreas clave para el éxito de tu negocio</p>
      </div>

      <div class="grid">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="academy-card"
          :class="{ 'is-active': activeCard === category.id }"
          :style="{ '--accent-color': category.color }"
          @click="toggleCard(category.id)"
        >
          <div class="card-border"></div>
          
          <div class="card-content">
            <div class="icon-badge">
              <i :class="category.icon" />
            </div>
            
            <h3 class="card-title">{{ category.name }}</h3>
            
            <div class="reveal-content">
              <p class="card-desc">{{ category.description }}</p>
              
              <div class="card-footer">
                <span class="course-count">
                  <div class="count-bar" :style="{ background: category.color }"></div>
                  {{ category.count }} Cursos
                </span>
                <span class="arrow-icon">
                  <i class="fa-solid fa-arrow-right-long" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Light Theme Colors
$card-bg: #ffffff;
$card-surface: #ffffff;
$text-primary: #1e293b; // Slate 800
$text-secondary: #64748b; // Slate 500
$border-color: #e2e8f0; // Slate 200

.categories-section {
  padding: 100px 20px;
  background-color: #f8fafc; // Very light gray background for contrast with white cards
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 60px;

  .title {
    font-size: 2.8rem;
    font-weight: 800;
    color: #0f172a; // Slate 900
    margin-bottom: 16px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: $text-secondary;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.academy-card {
  position: relative;
  background: $card-surface;
  border-radius: 20px;
  padding: 32px;
  cursor: pointer;
  overflow: hidden;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid $border-color;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

  // The colored border line on the left
  .card-border {
    position: absolute;
    top: 24px;
    bottom: 24px;
    left: 0;
    width: 6px;
    background: var(--accent-color);
    border-radius: 0 6px 6px 0;
    transition: width 0.3s ease;
  }

  &:hover,
  &.is-active {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: transparent; // Clean look on hover

    // Optional: subtle background change
    // background: #fff; 

    // Expand border? Or keep simple strip? User liked the ref which had a strip.
    // Let's keep the user's "open" request focused on content reveal.

    .reveal-content {
      opacity: 1;
      transform: translateY(0);
      max-height: 200px;
    }

    .icon-badge {
      background: var(--accent-color);
      color: #fff;
      transform: scale(1.1);
      border-color: transparent;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .arrow-icon {
      transform: translateX(5px);
      color: var(--accent-color);
    }
  }
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.icon-badge {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--accent-color);
  background: #f1f5f9; // Slate 100
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
  transition: all 0.3s ease;

  i {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }
}

.card-title {
  color: $text-primary;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px 0;
  max-width: 90%;
}

.reveal-content {
  // Logic remains: Hidden initially, reveals on interaction
  opacity: 0;
  transform: translateY(20px);
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s ease;
}

// Media query to keep it open on mobile if active, or different behavior
@media (max-width: 1024px) {
  .academy-card.is-active .reveal-content {
    max-height: 300px;
    opacity: 1;
    transform: translateY(0);
  }
}

// On desktop, hover triggers it
@media (min-width: 1025px) {
  .academy-card:hover .reveal-content {
    max-height: 300px;
    opacity: 1;
    transform: translateY(0);
  }

  // Allow text to be slightly visible? No, "Open" implies closed first.
}

.card-desc {
  color: $text-secondary;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 32px;
}

.card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid $border-color;
  padding-top: 20px;
}

.course-count {
  display: flex;
  align-items: center;
  gap: 10px;
  color: $text-primary;
  font-weight: 600;
  font-size: 0.9rem;

  .count-bar {
    width: 4px;
    height: 16px;
    border-radius: 4px;
  }
}

.arrow-icon {
  color: #94a3b8; // Slate 400
  font-size: 18px;
  transition: transform 0.3s ease, color 0.3s ease;
}
</style>
