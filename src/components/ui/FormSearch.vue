<template>
  <div class="d-flex align-items-center">
    <template v-if="authStore.isAuthenticated">
      <div
          @mouseenter="showPreview = true"
          @mouseleave="showPreview = false"
          class="position-relative"
      >
        <Cart v-if="cartStore.items.length > 0"/>
        <CartEmpty v-else/>

        <CartPreview
            v-if="showPreview && cartStore.items.length > 0"
            class="my-cart-dropdown"
            @close="showPreview = false"
        />
      </div>

    </template>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/stores/Cart";
import { useUserStore } from "@/stores/User";
import Cart from "@/components/icons/Cart.vue";
import CartEmpty from "@/components/icons/CartEmpty.vue";
import CartPreview from "@/components/common/CartDropdown.vue";

const cartStore = useCartStore();
const authStore = useUserStore();

const showPreview = ref<boolean>(false);
</script>