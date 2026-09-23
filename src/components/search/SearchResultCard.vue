<template>
  <RouterLink
      :to="`/chapter/${chapter.uuid}`"
      class="search-result-card text-decoration-none"
  >
    <img
        :src="chapter.coverArtworkUrl"
        :alt="chapter.title"
        class="search-result-cover"
    />

    <div class="search-result-content">
      <h2 class="search-result-title">
        {{ chapter.title }}
      </h2>

      <div class="search-result-meta">
        <span
            class="badge bg-primary bg-opacity-10 text-primary rounded-pill"
        >
          第{{ chapter.chapterNumber }}話
        </span>

        <span class="search-result-second-title">
          {{ chapter.secondTitle }}
        </span>
      </div>

      <p class="search-result-summary">
        {{ chapter.summary }}
      </p>

      <div class="search-result-footer">
        <span
            v-if="chapter.publicationDate"
            class="text-secondary small"
        >
          {{ chapter.publicationDate }}
        </span>

        <span
            v-if="chapter.totalPages"
            class="text-secondary small"
        >
          {{ chapter.totalPages }}ページ
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Chapter } from "@/models/Chapter";

defineProps<{
  chapter: Chapter;
}>();
</script>

<style scoped>
.search-result-card {
  display: flex;
  gap: 1.25rem;
  min-width: 0;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 1rem;
  transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
}

.search-result-card:hover {
  transform: translateY(-3px);
  border-color: rgba(37, 99, 235, 0.2);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08);
}

.search-result-cover {
  width: 120px;
  height: 165px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 0.6rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

.search-result-content {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-result-title {
  margin: 0 0 0.75rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #212529;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-result-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  margin-bottom: 1rem;
}

.search-result-meta .badge {
  flex-shrink: 0;
  padding: 0.45rem 0.75rem;
  font-size: 0.8rem;
}

.search-result-second-title {
  min-width: 0;
  color: #6c757d;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-result-summary {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.55;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.search-result-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
}

@media (max-width: 768px) {
  .search-result-cover {
    width: 95px;
    height: 135px;
  }

  .search-result-title {
    font-size: 1rem;
  }
}
</style>