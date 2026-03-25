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
          <form @submit.prevent="applyFilters" @keyup.enter="applyFilters">

            <div class="mb-3 text-start">
              <label class="form-label fw-semibold d-block">タイトル</label>
              <input v-model="filters.title" type="text" class="form-control" placeholder="例: 呪術廻戦">
            </div>

            <div class="mb-3 text-start">
              <label class="form-label fw-semibold d-block">著者</label>
              <input v-model="filters.author" type="text" class="form-control" placeholder="著者名を入力">
            </div>

            <div class="mb-3 text-start">
              <label class="form-label fw-semibold d-block">作画</label>
              <input v-model="filters.illustrator" type="text" class="form-control" placeholder="作画担当者名を入力">
            </div>

            <div class="row">
              <div class="col-md-6 mb-3 text-start">
                <label class="form-label fw-semibold d-block">ジャンル</label>
                <input v-model="filters.genre" type="text" class="form-control" placeholder="ファンタジーなど">
              </div>

              <div class="col-md-6 mb-3 text-start">
                <label class="form-label fw-semibold d-block">出版社</label>
                <input v-model="filters.publisher" type="text" class="form-control" placeholder="集英社など">
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer border-top-0 px-4 pb-4">
          <button type="button" class="btn btn-outline-secondary px-4 rounded-pill" @click="resetFilters">リセット</button>
          <button type="button" class="btn btn-primary px-4 rounded-pill" @click="applyFilters">検索する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const emit = defineEmits(['close', 'confirm']);


const filters = ref({
  title: route.query.title || '',
  author: route.query.author || '',
  illustrator: route.query.illustrator || '',
  genre: route.query.genre || '',
  publisher: route.query.publisher || ''
});


onMounted(() => {
  filters.value.title = route.query.title || '';
  filters.value.author = route.query.author || '';
  filters.value.illustrator = route.query.illustrator || '';
  filters.value.genre = route.query.genre || '';
  filters.value.publisher = route.query.publisher || '';
});

const applyFilters = () => {
  const cleanFilters = Object.fromEntries(
      Object.entries(filters.value).filter(([_, value]) => value !== '')
  );

  emit('confirm', cleanFilters);
  emit('close');
};

const resetFilters = () => {
  filters.value = {title: '', author: '', illustrator: '', genre: '', publisher: ''};
};
</script>