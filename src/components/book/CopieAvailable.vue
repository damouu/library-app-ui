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
    bookUuid: inventoryStore.currentChapter.bookUuID,
    chapter: {
      uuid: inventoryStore.currentChapter.chapterUuID,
      title: chapterStore.currentChapter.title,
      secondTitle: chapterStore.currentChapter.secondTitle,
      chapterNumber: chapterStore.currentChapter.chapterNumber,
      coverArtworkUrl: chapterStore.currentChapter.coverArtworkUrl,
    }
  };

  cartStore.addToCart(newItem)

}
</script>