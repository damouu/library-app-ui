<template>
  <button class="btn btn-primary" v-on:click="addToCart">カートに入れる
    <i class="bi-cart-check"/>
  </button>
</template>

<script lang="ts" setup>
import {CartItem, useCartStore} from "@/stores/Cart";
import {useInventoryStore} from "@/stores/Inventory";
import {useChapterStore} from "@/stores/Chapter";


const cartStore = useCartStore();
const chapterStore = useChapterStore();
const inventoryStore = useInventoryStore();

function addToCart() {

  const newItem: CartItem = {
    book_uuid: inventoryStore.currentChapter.bookUuID,
    chapter: {
      chapter_uuid: inventoryStore.currentChapter.chapterUuID,
      chapter_title: chapterStore.currentChapter.title,
      chapter_second_title: chapterStore.currentChapter.secondTitle,
      chapter_number: chapterStore.currentChapter.chapterNumber,
      chapter_cover_url: chapterStore.currentChapter.coverArtworkUrl,
    }
  };

  cartStore.addToCart(newItem)

}
</script>