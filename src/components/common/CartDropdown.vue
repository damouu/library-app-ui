<template>
  <div class="my-cart-dropdown d-flex flex-column">
    <div class="flex-grow-1 overflow-auto cart-scroll-container">
      <div
          v-for="item in cartStore.items"
          :key="item.book_uuid"
          class="cart-item-snap"
      >

        <div class="cart-item-snap d-flex align-items-center border-bottom py-2">
          <img :src="item.chapter.chapter_cover_url" class="cart-thumb me-3" alt="Cover">

          <div class="flex-grow-1 min-width-0 mb-3 mt-4">
            <h6 class="text-truncate ">
              {{ item.chapter.chapter_title }}
            </h6>
            <div class="d-flex mt-4 mb-3">
              <span class="text-body-emphasis ">巻 {{ item.chapter.chapter_number }}</span>
            </div>
            <button
                @click="cartStore.removeFromCart(item.book_uuid)"
                class="btn btn-danger btn-lg btn-sm text-truncate mt-2"
            >
              <i class="bi-trash3"/>
              削除
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-1 mt-3 border-top">
      <router-link
          :to="{ name: 'checkout-success' }"
          class="text-decoration-none text-reset"
          @click="$emit('close')"
      >
        <button class="btn btn-primary w-100">
          レジに進む&nbsp;<i class="bi-check-circle"/>
        </button>
      </router-link>
    </div>

  </div>
</template>

<script setup lang="ts">

import {useCartStore} from "@/stores/Cart";

const cartStore = useCartStore();

defineEmits(['close']);

</script>