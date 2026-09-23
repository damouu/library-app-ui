<template>
  <div class="search-results">
    <SearchResultCard
        v-for="chapter in chapters"
        :key="chapter.uuid"
        :chapter="chapter"
    />
  </div>
</template>

<script setup lang="ts">
import type { Chapter } from "@/models/Chapter";
import SearchResultCard from "@/components/search/SearchResultCard.vue";

defineProps<{
  chapters: Chapter[];
}>();

</script>

<style scoped>
.search-results {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  border-radius: 0.4rem;
  margin-bottom: 3rem;
}

@media (max-width: 1100px) {
  .search-results {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .search-results {
    grid-template-columns: 1fr;
  }
}
</style>