<template>

  <div class="container-fluid mt-3">

    <div class="row g-4 text-center mt-2 mb-2">
      <div
          v-for="item in props.displayedBooks"
          :key="item.uuid"
          class="col-6 col-sm-4 col-md-3 col-lg-2 mt-4"
      >

        <router-link
            :to="{ name: 'chapter-details', params: { chapterUuid: item.uuid }}"
            class="text-decoration-none text-reset"
        >

          <div class="card h-95">
            <img :src="item.coverArtworkUrl" class="card-img-top" alt="Cover">
            <div class="card-body">
              <h5 class="card-title text-primary text-center">{{ item.title }} </h5>
              <p class="card-text mb-1 text-center">{{ item.secondTitle }}</p>
              <p class="card-text mb-1 text-center">巻 {{ item.chapterNumber }}</p>
            </div>
          </div>

        </router-link>

        <div class="card-body text-center mt-4 mb-2">
          <p>#{{ displayedBooks.indexOf(item) + 1 }}位</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {Chapter} from "@/types/Chapter";

const props = defineProps<{
  displayedBooks: Chapter[];
}>();

</script>
