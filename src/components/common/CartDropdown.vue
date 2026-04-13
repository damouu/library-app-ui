<template>
  <div class="my-cart-dropdown d-flex flex-column">
    <div class="flex-grow-1 overflow-auto cart-scroll-container">
      <div
          v-for="item in cartStore.items"
          :key="item.book_uuid"
          class="cart-item-snap d-flex align-items-center border-bottom py-2"
      >
        <router-link
            :to="{ name: 'chapter-details', params: { chapterUuid: item.chapter.chapter_uuid }}"
            class="d-flex align-items-center flex-grow-1 text-decoration-none text-reset min-width-0"
            @click="$emit('close')"
        >
          <div class="cart-thumb-wrapper me-3">
            <img :src="item.chapter.chapter_cover_url" class="cart-thumb" alt="Cover">
          </div>

          <div class="flex-grow-1 min-width-0">
            <h6 class="text-truncate mb-1">
              {{ item.chapter.chapter_title }}
            </h6>
            <span class="text-muted small">巻 {{ item.chapter.chapter_number }}</span>
          </div>
        </router-link>

        <div class="ms-2">
          <button
              @click.stop="cartStore.removeFromCart(item.book_uuid)"
              class="btn btn-outline-danger btn-sm"
              title="Supprimer"
          >
            <i class="bi-trash3"/>
          </button>
        </div>
      </div>

      <div class="p-1 mt-3 border-top">
        <router-link
            :to="{ name: 'cart' }"
            class="text-decoration-none text-reset"
            @click="$emit('close')"
        >
          <button class="btn btn-primary w-100">
            レジに進む&nbsp;<i class="bi-check-circle"/>
          </button>
        </router-link>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import {useCartStore} from "@/stores/Cart";

const cartStore = useCartStore();

defineEmits(['close']);

</script>