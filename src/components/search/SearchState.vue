<template>
  <div class="search-state">

    <template v-if="type === 'loading'">
      <div
          class="spinner-border text-primary"
          role="status"
      >
        <span class="visually-hidden">
          検索中...
        </span>
      </div>

      <p class="mt-3 mb-0 text-secondary">
        検索中...
      </p>
    </template>

    <template v-else>
      <i class="bi bi-search search-empty-icon"></i>

      <h2>
        検索結果が見つかりませんでした
      </h2>

      <p class="text-secondary mb-0">
        別のキーワードでお試しください。
      </p>
    </template>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: "loading" | "empty";
}>();
</script>

<style scoped>
.search-state {
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.search-empty-icon {
  margin-bottom: 1rem;
  font-size: 3rem;
  color: #adb5bd;
}

.search-state h2 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
}
</style>