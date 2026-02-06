<template>
  <button
      @click="borrow"
      class="btn btn-primary w-100 py-3">
    貸し出しする
  </button>
</template>

<script setup lang="ts">

import {useCartStore} from "@/stores/Cart";

const cartStore = useCartStore();

const borrow = cartStore.borrow;


</script>