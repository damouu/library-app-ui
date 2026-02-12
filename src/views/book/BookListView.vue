<template>
  <div class="container-fluid px-0">
    <section>
      <main>
        <CardGrid/>
      </main>
    </section>
  </div>
</template>


<script lang="ts" setup>
import CardGrid from "@/components/ui/CardGrid.vue"
import {ref} from "vue";

let inputReceived: String = ref(null);
let booksNotFound: Boolean = ref(null);

function pageEmitReceived(inputEmit): void {
  inputReceived.value = inputEmit;
}

function bookEmitReceived(bookEmit): void {
  booksNotFound.value = bookEmit;
}

</script>