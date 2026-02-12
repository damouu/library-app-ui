<template>
  <div class="modal-backdrop fade show"></div>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header bg-warning text-dark ">
          <h5 class="modal-title fw-bold text-center">返却の確認 </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body text-center p-4">
          <i class="bi bi-exclamation-circle-fill h1 text-warning"></i>
          <h4 class="mt-4">選択されたの貸し出し返却されますか？</h4>
          <h5 class="text-muted small mt-4">貸し出し番号: {{ borrowUuid }}</h5>
        </div>
        <div class="modal-footer border-0 justify-content-center gap-5">
          <button type="button" class="btn btn-warning px-4" @click="$emit('confirm', borrowUuid)">
            返却する
          </button>
          <button type="button" class="btn btn-light" @click="$emit('close')">キャンセル</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ borrowUuid: string }>();
defineEmits(['close', 'confirm']);
</script>
