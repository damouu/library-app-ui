<template>
  <div class="row align-items-center mb-5 pb-3 border-bottom">
    <div class="col-12">
      <div class="d-flex align-items-center justify-content-between">
        <div
            class="ps-3 border-start border-primary border-5"
            style="min-width: 250px;"
        >
          <h1 class="fw-bold text-dark mb-0 h2">
            検索結果
          </h1>

          <div class="d-flex align-items-center mt-1">
            <span class="text-muted small">
              <span class="query-highlight">
                「{{ query }}」
              </span>
              の検索結果
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  query: string;
}>();
</script>

<style scoped>
.query-highlight {
  color: #2563eb;
  font-weight: 700;
  background: rgba(37, 99, 235, 0.08);
  padding: 0.2rem 0.6rem;
  border-radius: 0.4rem;
  margin-right: 0.2rem;
}
</style>