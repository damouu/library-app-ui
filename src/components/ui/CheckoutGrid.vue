<template>
  <div class="row g-4 justify-content-center">
    <div
        v-for="item in cartStore.items"
        :key="item.book_uuid"
        class="col-6 col-sm-4 col-md-3 col-lg-2 mt-4"
    >

      <div class="card h-95">
        <img :src="item.chapter.chapter_cover_url" class="card-img-top" alt="Cover">
        <div class="card-body">
          <h5 class="card-title text-primary text-center">{{ item.chapter.chapter_title }} </h5>
          <p class="card-text mb-1 text-center">{{ item.chapter.chapter_second_title }}</p>
          <p class="card-text mb-1 text-center">巻 {{ item.chapter.chapter_number }}</p>
        </div>
      </div>

      <button
          @click="cartStore.removeFromCart(item.book_uuid)"
          class="btn btn-danger btn-lg btn-sm text-truncate mt-2 w-100 py-2 mt-4"
      >
        <i class="bi-trash3"/>
        削除
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useCartStore} from "@/stores/Cart";

const cartStore = useCartStore();


</script>