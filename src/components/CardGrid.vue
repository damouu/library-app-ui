<template>
  <div class="row row-cols-md-6 gy-5" ref="scrollComponent">
    <div v-for="book in bookStore.bookList" :key="book.uuid">
      <div class="col">
        <div class="card" style="width: 18rem;">
          <img src="../assets/pokemon-pokemon-red-and-blue-wallpaper-preview.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title text-primary">Title: {{ book.title }} 📕</h5>
            <p class="card-text">{{ book.genre }}, {{ book.publisher }}, {{ book.totalPages }}, </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useBookStore} from "@/stores/Book";

const bookStore = useBookStore();
const scrollComponent = ref(null);

bookStore.getBooks();

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

function handleScroll(): void {
  let element = scrollComponent.value
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    bookStore.fetchMoreBooks();
  }
}

</script>