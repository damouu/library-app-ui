<template>
  <section class="hero-banner-spacer mb-5">

    <div class="hero-banner-full-bleed">
      <div class="hero-banner overflow-hidden shadow-sm">
        <img
            src="../../assets/117981.jpg"
            alt="Bannière principale"
            class="w-100 h-100 object-fit-cover"
        />
        <div class="banner-overlay"></div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>

.hero-banner-spacer {
  height: 600px;
  width: 100%;
  margin-top: -1.5rem;
}

.hero-banner-full-bleed {
  position: absolute;
  left: 0;
  right: 0;
}

.hero-banner {
  width: 100%;
  height: 600px;
  background-color: #f8f9fa;
}

.object-fit-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0.2) 100%
  );
  pointer-events: none;
}

@media (max-width: 768px) {
  .hero-banner, .hero-banner-spacer {
    height: 250px;
  }
}
</style>