<template>
  <button class="btn rounded">
    <i class="bi bi-cart-fill h2"> <span class="text-danger"> {{ cartStore.items.length }}</span> </i>
  </button>
</template>

<script setup lang="ts">
import {useCartStore} from "@/stores/Cart";

const cartStore = useCartStore();

</script>