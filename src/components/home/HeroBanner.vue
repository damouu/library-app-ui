<template>
  <section class="hero-banner-spacer mb-5">
    <div class="hero-banner-full-bleed">

      <div class="hero-banner overflow-hidden shadow-sm position-relative">

        <img
            src="../../assets/117981.jpg"
            alt="Illustration de la série principale"
            class="hero-image w-100 h-100 object-fit-cover"
            fetchpriority="high"
            decoding="sync"
        />


        <div class="banner-overlay"></div>

        <div
            class="banner-content container h-100 position-absolute top-0 start-50 translate-middle-x d-flex flex-column justify-content-center align-items-start z-1">
          <h1 class="hero-title text-white fw-black mb-3 drop-shadow">
            広がる、 <br/><span class="text-primary">無限の</span>世界へ
          </h1>
          <p class="hero-subtitle text-white-50 fs-5 mb-4 max-w-50 drop-shadow pt-5">
            マンガ、ライトノベル、オリジナル作品など、圧倒的なラインナップを心ゆくまでお楽しみください。
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-banner-spacer {
  height: 60vh;
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
  height: 60vh;
  min-height: 500px;
  background-color: #0f172a;
}

.object-fit-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
}


.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 100%
  );
  pointer-events: none;
}

.banner-content {
  padding-left: 1rem;
  padding-right: 1rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -1px;
  line-height: 1.1;
}

.hero-subtitle {
  max-width: 600px;
}

.drop-shadow {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .banner-overlay {
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.1) 100%
    );
  }

  .banner-content {
    justify-content: flex-end !important;
    padding-bottom: 2rem;
  }
}
</style>