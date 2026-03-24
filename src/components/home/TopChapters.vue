<template>
  <div class="container-fluid mt-3">
    <TransitionGroup
        name="fade-slide"
        tag="div"
        class="row g-4 text-center mt-2 mb-2 position-relative"
    >
      <div
          v-for="(item, index) in props.displayedBooks"
          :key="item.uuid"
          class="col-6 col-sm-4 col-md-3 col-lg-2 mt-4 ranking-item"
      >
        <router-link
            :to="{ name: 'chapter-details', params: { chapterUuid: item.uuid }}"
            class="text-decoration-none text-reset"
        >
          <div class="card h-100 border-0 shadow-sm ranking-card">
            <div :class="['rank-badge', getRankClass(index + 1)]">
              {{ index + 1 }}
            </div>

            <div class="image-container overflow-hidden rounded-top">
              <img :src="item.coverArtworkUrl" class="card-img-top ranking-img" alt="Cover">
            </div>

            <div class="card-body p-2">
              <h6 class="card-title text-dark fw-bold text-truncate mb-1">{{ item.title }}</h6>
              <p class="small text-muted mb-0">巻 {{ item.chapterNumber }}</p>
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
import { Chapter } from "@/types/Chapter";

const props = defineProps<{
  displayedBooks: Chapter[];
}>();

const getRankClass = (rank: number) => {
  if (rank === 1) return 'rank-gold';
  if (rank === 2) return 'rank-silver';
  if (rank === 3) return 'rank-bronze';
  return 'rank-standard';
};
</script>