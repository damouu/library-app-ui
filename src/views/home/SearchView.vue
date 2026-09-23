<template>
  <div class="container py-5">

    <SearchPageHeader
        :query="query"
    />

    <div class="content-wrapper position-relative">

      <div class="search-results-wrapper">

        <Transition name="search-results" mode="out-in">

          <SearchState
              v-if="searchStore.isLoading"
              key="loading"
              type="loading"
          />

          <SearchState
              v-else-if="searchStore.results.length === 0"
              key="empty"
              type="empty"
          />

          <div
              v-else
              :key="`page-${searchStore.pagination?.currentPage}`"
          >
            <SearchResultsGrid
                :chapters="searchStore.results"
            />
          </div>

        </Transition>

      </div>

      <div
          v-if="searchStore.pagination && searchStore.results.length > 0"
          class="pagination-container mt-5 pt-4 border-top"
      >
        <div class="d-flex justify-content-center">

          <Pagination
              :total-pages="searchStore.pagination.totalPages"
              :current-page="searchStore.pagination.currentPage"
              :is-first="searchStore.pagination.isFirst"
              :is-last="searchStore.pagination.isLast"
              @change-page="handlePageChange"
          />

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

import {useSearchStore} from "@/stores/Search";

import Pagination from "@/components/common/Pagination.vue";
import SearchPageHeader from "@/components/search/SearchPageHeader.vue";
import SearchState from "@/components/search/SearchState.vue";
import SearchResultsGrid from "@/components/search/SearchResultsGrid.vue";

const route = useRoute();
const searchStore = useSearchStore();

const query = ref(
    String(route.query.q ?? "").trim()
);

const executeSearch = async () => {
  if (!query.value) {
    searchStore.clearResults();
    return;
  }

  await searchStore.search(query.value, 0);
};

const handlePageChange = async (newPage: number) => {
  await searchStore.search(query.value, newPage);
};

watch(
    () => route.query.q,
    async (newQuery) => {
      query.value =
          String(newQuery ?? "").trim();

      await executeSearch();
    },
    {
      immediate: true,
    }
);
</script>

<style scoped>
.search-results-wrapper {
  overflow: hidden;
}

.search-results-enter-active,
.search-results-leave-active {
  transition: opacity 0.25s ease;
}

.search-results-enter-from,
.search-results-leave-to {
  opacity: 0;
}
</style>