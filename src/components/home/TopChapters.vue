<template>
  <div class="container-fluid mt-3">

    <div
        v-if="chapterStore.rankingLoading"
        class="d-flex justify-content-center align-items-center"
        style="min-height: 350px;"
    >
      <div class="text-center">
        <div class="spinner-border text-warning" role="status"></div>
        <p class="mt-3 mb-0">ランキングを読み込み中...</p>
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

            <div class="card-body p-2">
              <h4 class="card-title text-dark fw-bold text-truncate mb-1 text-center">{{ item.title }}</h4>
              <h5 class="small text-muted mb-0">巻 {{ item.chapterNumber }}</h5>
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