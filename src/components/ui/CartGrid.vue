<template>
  <div class="row justify-content-center">
    <div class="row">
      <div class="col-12  mt-3">
        <div class="row g-3 justify-content-center">
          <div v-for="item in cartStore.lastTransaction.borrowedItems" :key="item.bookUuid" class="col-2">
            <img :src="item.chapter.coverArtworkUrl" class="img-fluid rounded shadow-sm">
            <p class="small mt-1">{{ item.chapter.title }} {{ item.chapter.chapterNumber }}巻</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useCartStore} from "@/stores/Cart";

const cartStore = useCartStore();


</script>