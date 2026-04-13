<template>
  <RouterLink to="/" class="logo-link d-flex align-items-center text-decoration-none">
    <div class="d-flex align-items-center gap-3">

      <div class="logo-icon">
        <i class="bi bi-book-fill"></i>
      </div>

      <div class="d-flex flex-column">
        <span class="logo-main">図書館アプリ</span>
        <span class="logo-sub">Library App</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';
</script>