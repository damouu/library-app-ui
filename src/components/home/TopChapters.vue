<template>
  <div class="container-fluid mt-3">

    <div v-if="chapterStore.rankingLoading" class="row g-4 text-center mt-2 mb-2">
      <div
          v-for="i in 6"
          :key="i"
          class="col-6 col-sm-4 col-md-3 col-lg-2 mt-4"
      >
        <div class="card h-100 border-0 shadow-sm ranking-card placeholder-glow">

          <div class="rank-badge rank-standard placeholder"></div>

          <div class="image-container overflow-hidden rounded-top">
            <div class="placeholder w-100 ranking-img"></div>
          </div>

          <div class="card-body p-2">
            <span class="placeholder col-10 d-block mx-auto mb-2"></span>
            <span class="placeholder col-5 d-block mx-auto"></span>
          </div>

          <div class="card-footer border-0 bg-transparent pb-3 pt-0">
            <span class="placeholder col-4 d-block mx-auto"></span>
          </div>

        </div>
      </div>
    </div>

    <TransitionGroup
        v-else
        name="fade-slide"
        tag="div"
        class="row g-4 text-center mt-2 mb-2 position-relative"
    >
      <div
          v-for="(item, index) in props.displayedBooks"
          :key="item.chapterUuid"
          class="col-6 col-sm-4 col-md-3 col-lg-2 mt-4 ranking-item"
      >
        <router-link
            :to="{ name: 'chapter-details', params: { chapterUuid: item.chapterUuid }}"
            class="text-decoration-none text-reset text-center"
        >
          <div class="card h-100 border-0 shadow-sm ranking-card">
            <div :class="['rank-badge', getRankClass(index + 1)]">
              {{ index + 1 }}
            </div>

            <div class="image-container overflow-hidden rounded-top">
              <img :src="item.coverArtworkUrl" class="card-img-top ranking-img" alt="Cover">
            </div>

            <div class="card-body p-2 text-center">
              <h4 class="card-title text-dark fw-bold text-truncate mb-1 text-center">{{ item.title }}</h4>
              <h4 class="small text-muted mb-0">巻 {{ item.chapterNumber }}</h4>
            </div>

            <div class="card-footer border-0 bg-transparent pb-3 pt-0">
              <div :class="['rank-footer-text', getRankClass(index + 1)]">
                <i v-if="(index + 1) <= 3" class="bi bi-trophy-fill me-1"></i>
                {{ index + 1 }}位
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import {TopBorrowedChapter} from "@/types/chapter/TopBorrowedChapter";
import {useChapterStore} from "@/stores/Chapter";

const chapterStore = useChapterStore();

const props = defineProps<{
  displayedBooks: TopBorrowedChapter[];
}>();

const getRankClass = (rank: number) => {
  if (rank === 1) return 'rank-gold';
  if (rank === 2) return 'rank-silver';
  if (rank === 3) return 'rank-bronze';
  return 'rank-standard';
};
</script>