<template>
  <div
      class="modal fade show d-block"
      style="background-color: rgba(0, 0, 0, 0.5);"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      @click.self="$emit('close')"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-light">
          <h5 class="modal-title fw-bold">絞り込み検索</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body p-4">
          <form @submit.prevent="applyFilters">
            <div class="mb-3">
              <label class="form-label fw-semibold">タイトル</label>
              <input v-model="filters.title" type="text" class="form-control" placeholder="例: 呪術廻戦">
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">secondTitle</label>
              <input v-model="filters.secondTitle" type="text" class="form-control" placeholder="著者名を入力">
            </div>

            <div class="mb-1">
              <label class="form-label fw-semibold">巻数</label>
              <input v-model="filters.chapterNumber" type="number" class="form-control" placeholder="25">
            </div>

          </form>
        </div>

        <div class="modal-footer border-top-0 px-4 pb-4 justify-content-center gap-5">
          <button type="button" class="btn btn-outline-secondary px-4" @click="resetFilters">リセット</button>
          <button type="button" class="btn btn-primary px-4" @click="applyFilters">検索する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const emit = defineEmits(['close', 'confirm']);

const filters = ref({
  title: '', secondTitle: '', chapterNumber: ''
});

const applyFilters = () => {
  const cleanFilters = Object.fromEntries(
      Object.entries(filters.value).filter(([_, value]) => value !== '')
  );

  emit('confirm', cleanFilters);
};

const resetFilters = () => {
  filters.value = {title: '', secondTitle: '', chapterNumber: ''};
};
</script>