<template>
  <router-link v-slot="{ navigate }" custom to="/">
    <button class="btn rounded ms-2 me-2" role="link" @click="navigate">
      <i class="bi bi-shop-window h4">図書館アプリ</i>
    </button>
  </router-link>
</template>