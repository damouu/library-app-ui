<template>
  <div class="app-layout">
    <Header/>

    <main class="content">
      <RouterView/>
    </main>

    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
</script>