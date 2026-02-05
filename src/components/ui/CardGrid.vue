<template>
  <div class="container-fluid">
    <div class="row g-4">
      <div
          v-for="chapter in chapterStore.seriesList"
          :key="chapter.uuid"
          class="col-6 col-sm-4 col-md-3 col-lg-2 mt-4"
      >

        <router-link
            :to="{ name: 'chapter-details', params: { chapterUuid: chapter.uuid }}"
            class="text-decoration-none text-reset"
        >

          <div class="card h-100">
            <img :src="chapter.coverArtworkUrl" class="card-img-top" alt="Cover">
            <div class="card-body">
              <h5 class="card-title text-primary">{{ chapter.title }} </h5>
              <p class="card-text mb-1 small">サブタイトル: {{ chapter.secondTitle }}</p>
              <p class="card-text mb-1 small">巻の番号: {{ chapter.chapterNumber }}</p>
              <p class="card-text text-muted small">ページの数: {{ chapter.totalPages }}</p>
            </div>
          </div>

        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onUnmounted} from "vue";
import {useChapterStore} from "@/stores/Chapter";

const chapterStore = useChapterStore();

const props = defineProps<{
  seriesUuid: string,
  sort: string,
  direction: string,
  page: number,
  size: number,
}>();

onUnmounted(() => {
  chapterStore.seriesList = null;
});


</script>