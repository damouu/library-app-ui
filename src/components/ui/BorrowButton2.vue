<template>
  <div>
    <button
        :disabled="cartStore.isLoading"
        @click="handleBorrowAction"
        class="btn btn-warning py-3 shadow-sm"
        style="min-width: 250px;"
    >
      <span v-if="cartStore.isLoading" class="spinner-border spinner-border-sm"></span>
      <span v-else>貸し出しする</span>
    </button>
  </div>
</template>

<script setup lang="ts">

import {useCartStore} from "@/stores/Cart";
import router from "@/router";

const cartStore = useCartStore();

const handleBorrowAction = async () => {

  const borrow = await cartStore.borrow();

  if (borrow) {
    await router.push({
      name: 'checkout'
    });
  } else {
    alert("エラーが発生しました。もう一度お試しください。");
  }
};


</script>