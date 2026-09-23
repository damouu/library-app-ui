<template>
  <div class="search-results-dropdown d-flex flex-column">

    <div
        v-if="isLoading"
        class="d-flex justify-content-center align-items-center py-5 text-primary"
    >
      <div
          class="spinner-border"
          role="status"
          style="width: 2rem; height: 2rem;"
      >
        <span class="visually-hidden">
          書き込み中
        </span>
      </div>
    </div>

    <div
        v-else-if="!query && history.length > 0"
        class="search-history"
    >
      <div
          class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom"
      >
        <span class="text-secondary small fw-bold">
          <i class="bi bi-clock-history me-2"></i>
          最近の検索
        </span>

        <button
            type="button"
            class="btn btn-sm text-secondary p-0"
            @click="$emit('clear-history')"
        >
          履歴を削除
        </button>
      </div>

      <div class="search-history-list">
        <button
            v-for="item in history"
            :key="`${item.query}-${item.searchedAt}`"
            type="button"
            class="search-history-item"
            @click="$emit('select-history', item.query)"
        >
          <i class="bi bi-clock-history text-secondary"></i>

          <span class="search-history-query text-truncate">
            {{ item.query }}
          </span>

          <i class="bi bi-arrow-up-left text-secondary ms-auto"></i>
        </button>
      </div>
    </div>

    <div
        v-else-if="results.length === 0"
        class="d-flex flex-column align-items-center justify-content-center py-5 text-muted"
    >
      <i
          class="bi bi-search text-secondary opacity-50 mb-3"
          style="font-size: 2.5rem;"
      ></i>

      <h6 class="fw-semibold text-dark">
        検索結果が見つかりませんでした
      </h6>

      <p class="small mb-0">
        別のキーワードでお試しください。
      </p>
    </div>

    <template v-else>

      <div
          class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom"
      >
        <span class="text-secondary small fw-bold">
          章の検索結果
        </span>

        <button
            type="button"
            class="btn btn-link text-primary small text-decoration-none fw-semibold p-0"
            @click="$emit('view-all')"
        >
          <i class="bi bi-caret-right-fill"></i>
          すべての結果を見る
        </button>
      </div>

      <div class="search-results-list overflow-y-auto">

        <RouterLink
            v-for="(chapter, index) in results"
            :key="chapter.uuid"
            :to="`/chapter/${chapter.uuid}`"
            class="search-result-item text-decoration-none"
            :class="{
              'search-result-item-active':
                  index === highlightedIndex
            }"
            @click="$emit('select-result', chapter)"
        >
          <img
              :src="chapter.coverArtworkUrl"
              :alt="chapter.title"
              class="search-result-cover"
          />

          <div class="search-result-content">

            <div class="fw-bold text-dark text-truncate mb-2">
              {{ chapter.title }}

              <span
                  class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-2 py-1 fw-semibold"
              >
                第{{ chapter.chapterNumber }}話
              </span>
            </div>

            <div class="mb-2">
              <span class="text-secondary ms-2">
                {{ chapter.secondTitle }}
              </span>
            </div>

            <div class="text-secondary small summary mt-1">
              {{ chapter.summary }}
            </div>

          </div>
        </RouterLink>

      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import type { Chapter } from "@/models/Chapter";
import type { SearchHistoryItem } from "@/stores/DiscoverySearch";

defineProps<{
  query: string;
  results: Chapter[];
  history: SearchHistoryItem[];
  isLoading: boolean;
  highlightedIndex: number;
}>();

defineEmits<{
  "select-history": [query: string];
  "clear-history": [];
  "view-all": [];
  "select-result": [chapter: Chapter];
}>();
</script>