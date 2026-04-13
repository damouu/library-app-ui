<script lang="ts" setup>
import {useChapterStore} from "@/stores/Chapter";
import {storeToRefs} from "pinia";

const chapterStore = useChapterStore();


const {newChapters, loadingNext} = storeToRefs(chapterStore);
</script>

<template>
  <div class="mt-5 pt-4 border-top">
    <div class="d-flex align-items-center mb-4">
      <div class="icon-box bg-primary-subtle rounded-circle p-2 me-3">
        <i class="bi bi-layers-half text-primary fs-4"></i>
      </div>
      <div>
        <h3 class="mb-0 fw-bold text-dark">続きの巻</h3>
        <p class="text-muted small mb-0">このシリーズの次のエピソード</p>
      </div>
    </div>

    <div v-if="loadingNext" class="row g-3">
      <div v-for="i in 3" :key="i" class="col-12 col-xl-4">
        <div class="card border-0 shadow-sm placeholder-glow overflow-hidden">
          <div class="row g-0">
            <div class="col-4 bg-light placeholder" style="min-height: 140px;"></div>
            <div class="col-8 card-body">
              <span class="placeholder col-8 mb-2"></span>
              <span class="placeholder col-4 small"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="newChapters && newChapters.length > 0" class="row g-3">
      <div v-for="next in newChapters" :key="next.uuid" class="col-12 col-xl-4">
        <router-link
            :to="{ name: 'chapter-details', params: { chapterUuid: next.uuid } }"
            class="text-decoration-none"
        >
          <div class="card border-0 shadow-sm h-100 next-book-card overflow-hidden">
            <div class="row g-0 h-100">
              <div class="col-4 position-relative">
                <img
                    :src="next.coverArtworkUrl || '/placeholder-cover.jpg'"
                    class="h-100 w-100 next-cover-img"
                    alt="Book Cover"
                >
                <div class="position-absolute top-0 start-0 m-1">
                  <span class="badge bg-primary shadow-sm small">
                    第 {{ next.chapterNumber }} 巻
                  </span>
                </div>
              </div>

              <div class="col-8 d-flex align-items-center">
                <div class="card-body py-2 px-3">
                  <h6 class="text-dark fw-bold mb-1 text-multi-line-truncate">
                    {{ next.title }}
                  </h6>
                  <div class="d-flex align-items-center text-muted x-small">
                    <i class="bi bi-calendar-event me-1"></i>
                    {{ next.publicationDate }}
                  </div>
                  <div class="mt-2 text-primary fw-bold x-small read-hint">
                    今すぐ読む <i class="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div v-else class="text-center py-5 bg-light rounded-4 border border-dashed border-2">
      <div class="mb-2">
        <i class="bi bi-journal-check text-success display-4"></i>
      </div>
      <h5 class="fw-bold text-dark">最新巻まで読了！</h5>
      <p class="text-muted mb-0">続きの巻が追加されるのを楽しみにお待ちください。</p>
    </div>
  </div>
</template>