<script setup lang="ts">


const logos = [
  { name: 'Google', url: 'https://cdn.worldvectorlogo.com/logos/google-1-1.svg' },
  { name: 'Microsoft', url: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
  { name: 'Amazon', url: 'https://cdn.worldvectorlogo.com/logos/amazon-2.svg' },
  { name: 'Spotify', url: 'https://cdn.worldvectorlogo.com/logos/spotify-2.svg' },
  { name: 'Netflix', url: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg' },
  { name: 'Airbnb', url: 'https://cdn.worldvectorlogo.com/logos/airbnb.svg' },
  { name: 'Uber', url: 'https://cdn.worldvectorlogo.com/logos/uber-2.svg' },
  { name: 'Slack', url: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' }
];

// Duplicate logos to ensure seamless loop
const duplicatedLogos = [...logos, ...logos];
</script>

<template>
  <section class="trusted-by-section">
    <div class="marquee-container">
      <div class="marquee-content">
        <div 
          v-for="(logo, index) in duplicatedLogos" 
          :key="index" 
          class="logo-item"
        >
          <img :src="logo.url" :alt="logo.name" />
        </div>
      </div>
       <!-- Duplicate content for seamless loop if needed, relying on CSS animation of a single long strip -->
       <div class="marquee-content" aria-hidden="true">
        <div 
          v-for="(logo, index) in duplicatedLogos" 
          :key="`dup-${index}`" 
          class="logo-item"
        >
          <img :src="logo.url" :alt="logo.name" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/styles/colorVariables.module.scss" as *;

.trusted-by-section {
  background-color: $bg-white; // Light background
  padding: 40px 0;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); // Optional separator

  // Fade mask (left and right) - matching background
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 150px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, $bg-white, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, $bg-white, transparent);
  }
}

.marquee-container {
  display: flex;
  width: 100%;
  overflow: hidden;

  // Pause/slow on hover
  &:hover .marquee-content {
    animation-play-state: paused;
  }
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 80px; // Larger gap for cleaner look
  animation: scroll 40s linear infinite;
  padding-right: 80px;
  min-width: 100%;
  flex-shrink: 0;
}

.logo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 32px; // Slightly smaller for professional look
    width: auto;
    max-width: 140px;
    // Dark gray look on light background
    filter: grayscale(100%) brightness(0);
    opacity: 0.4;
    transition: all 0.3s ease;

    // Hover effect: Color and full opacity
    &:hover {
      filter: grayscale(0%) brightness(1);
      opacity: 1;
      transform: scale(1.05);
    }
  }
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .logo-item img {
    height: 24px;
  }

  .marquee-content {
    gap: 40px;
    padding-right: 40px;
    animation-duration: 20s; // Faster on mobile
  }

  .trusted-by-section::before,
  .trusted-by-section::after {
    width: 60px;
  }
}
</style>
