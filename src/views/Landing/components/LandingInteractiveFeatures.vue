<script setup lang="ts">
import { ref } from 'vue';

const features = [
  {
    id: 1,
    title: 'Creación de Automatizaciones',
    description: 'Automatiza procesos complejos con nuestro editor visual intuitivo. Integra código SQL y scripts personalizados.',
    icon: 'fa-solid fa-wand-magic-sparkles',
    image: 'https://res.cloudinary.com/dp9w6l7ir/image/upload/v1771459977/Captura_de_pantalla_2026-02-18_a_la_s_7.09.03_p._m._upgscr.png'
  },
  {
    id: 2,
    title: 'Aprende cosas cada 5 minutos',
    description: 'Micro-learning optimizado. Analíticas en tiempo real para seguir tu progreso y el de tu equipo.',
    icon: 'fa-solid fa-clock', // or fa-bolt
    image: 'https://res.cloudinary.com/dp9w6l7ir/image/upload/v1771459990/Captura_de_pantalla_2026-02-18_a_la_s_7.07.58_p._m._r3onlm.png'
  },
  {
    id: 3,
    title: 'Escuelas Completas',
    description: 'Rutas de aprendizaje estructuradas por expertos. Desde ingeniería hasta marketing.',
    icon: 'fa-solid fa-layer-group',
    image: 'https://res.cloudinary.com/dp9w6l7ir/image/upload/v1771459981/Captura_de_pantalla_2026-02-18_a_la_s_7.08.47_p._m._jpgqrg.png'
  },
  {
    id: 4,
    title: 'Habilidades de Marketing y diseño',
    description: 'Cursos especializados en marketing digital y diseño gráfico para potenciar tu creatividad y habilidades profesionales.',
    icon: 'fa-solid fa-palette',
    image: 'https://res.cloudinary.com/dp9w6l7ir/image/upload/v1771460716/Captura_de_pantalla_2026-02-18_a_la_s_7.25.06_p._m._1_bs0pdc.png'
  }
];

const activeFeatureId = ref(1);

const setActive = (id: number) => {
  activeFeatureId.value = id;
};

</script>

<template>
  <section class="interactive-features">
    <div class="container">
      <div class="split-layout">
        <!-- Left Column: Navigation -->
        <div class="nav-column">
          <h2 class="section-title">
            Tenemos el objetivo de <br class="desktop-br"/>
            <span class="highlight">escalar la educación</span> <br class="desktop-br"/>
            en Latinoamérica
          </h2>
          
          <div class="feature-list">
            <div 
              v-for="feature in features" 
              :key="feature.id"
              class="feature-item"
              :class="{ 'is-active': activeFeatureId === feature.id }"
              @click="setActive(feature.id)"
              @mouseenter="setActive(feature.id)"
            >
              <div class="icon-wrapper">
                <i :class="feature.icon"></i>
              </div>
              <div class="text-content">
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p v-if="activeFeatureId === feature.id" class="feature-desc">
                  {{ feature.description }}
                </p>
              </div>
              <div class="active-indicator" v-if="activeFeatureId === feature.id">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Visualization -->
        <div class="visual-column">
          <transition name="fade" mode="out-in">
            <div :key="activeFeatureId" class="visual-content">
               <div class="image-card">
                 <div class="browser-header">
                   <div class="dot red"></div>
                   <div class="dot yellow"></div>
                   <div class="dot green"></div>
                 </div>
                 <img 
                   :src="features.find(f => f.id === activeFeatureId)?.image" 
                   :alt="features.find(f => f.id === activeFeatureId)?.title" 
                   class="feature-image"
                 />
               </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.interactive-features {
  background-color: $bg-white; // Was #020617
  padding: 100px 20px;
  color: $text-main; // Was white
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 4fr 6fr; // 40/60 split roughly
  }
}

// Left Column
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 40px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: $FUDMASTER-PRIMARY;

  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }

  .highlight {
    color: $FUDMASTER-TEAL;
    position: relative;
    z-index: 1;

    // Subtle highlight underline
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: -4px;
      right: -4px;
      height: 12px;
      background: rgba($FUDMASTER-TEAL, 0.15);
      z-index: -1;
      transform: rotate(-1deg);
      border-radius: 4px;
    }
  }

  .desktop-br {
    display: none;

    @media (min-width: 1024px) {
      display: block;
    }
  }
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start; // Align to top for expandable desc
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0; // Slate 200
  background: white; // Was rgba(255, 255, 255, 0.03)
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f8fafc; // Slate 50
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  &.is-active {
    background: rgba($FUDMASTER-TEAL, 0.08);
    border-color: rgba($FUDMASTER-TEAL, 0.3);

    .icon-wrapper {
      color: $FUDMASTER-TEAL;
      background: white; // Or lighter teal
      box-shadow: 0 4px 6px -1px rgba($FUDMASTER-TEAL, 0.2);
    }

    .feature-title {
      color: $FUDMASTER-TEAL;
    }
  }
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #f1f5f9; // Slate 100
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #64748b; // Slate 500
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.text-content {
  flex: 1;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 4px;
  transition: color 0.3s ease;
  color: $text-main;
}

.feature-desc {
  font-size: 0.95rem;
  color: $text-muted; // Was $text-secondary
  line-height: 1.5;
  margin-top: 8px;
  animation: slideDown 0.3s ease-out;
}

.active-indicator {
  color: $FUDMASTER-TEAL;
  display: flex;
  align-items: center;
  height: 48px; // Match icon height for alignment
}

// Right Column
.visual-column {
  perspective: 1000px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-card {
  background: white; // Was #1e293b
  border-radius: 24px; // Rounded-2xl
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); // Lighter shadow
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 600px; // Contain image size
}

.browser-header {
  height: 40px;
  background: #f8fafc; // Was #0f172a
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
  border-bottom: 1px solid #e2e8f0;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;

    &.red {
      background: #ef4444;
    }

    &.yellow {
      background: #eab308;
    }

    &.green {
      background: #22c55e;
    }
  }
}

.feature-image {
  width: 100%;
  height: auto;
  display: block;
}

// Animations
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
