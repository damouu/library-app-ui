<template>
  <div class="container-fluid">
    <div class="text-center mb-5">
      <h4 v-if="chapterStore.Chapters?.length > 0">
      </h4>
      <h4 v-else-if="chapterStore.isLoading" class="text-muted">読み込み中...</h4>
      <h4 v-else class="text-muted">チャプターが見つかりませんでした</h4>
    </div>

    <div class="row g-4">
      <div
          v-for="chapter in chapterStore.Chapters"
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
              <p class="card-text mb-1 small"> {{ chapter.secondTitle }}</p>
              <p class="card-text mb-1 small">巻{{ chapter.chapterNumber }}</p>
              <p class="card-text text-muted small">ページ数{{ chapter.totalPages }}</p>
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
  sort: string,
  direction: string,
  page: number,
  size: number,
}>();

onUnmounted(() => {
  chapterStore.Chapters = null;
});


</script>