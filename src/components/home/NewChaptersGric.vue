<template>
  <div class="container-fluid mt-5">
    <div class="row  gy-5">
      <div class="text-center mb-1">
        <h2><i class="bi bi-fire"> 最新リリース</i></h2>
      </div>

      <div
          v-for="chapter in chapterStore.newChapters"
          :key="chapter.uuid"
          class="col-6 col-sm-4 col-md-3 col-lg-2"
      >
        <router-link
            :to="{ name: 'chapter-details', params: { chapterUuid: chapter.uuid }}"
            class="text-decoration-none text-reset"
        >
          <div class="card h-100 shadow-sm border-2">
            <div class="img-container">
              <img :src="chapter.coverArtworkUrl" class="card-img-top custom-card-img" alt="Cover">
            </div>
            <div class="card-body p-2 text-center"><h6 class="card-title text-primary mb-1 text-truncate">
              {{ chapter.title }}</h6>
              <p class="card-text mb-0 text-body-secondary text-muted">巻 {{ chapter.chapterNumber }} </p>
              <p class="card-text mb-0 text-body-secondary text-muted">出版 {{ chapter.publicationDate }} </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useChapterStore} from "@/stores/Chapter";

const chapterStore = useChapterStore();


</script>
