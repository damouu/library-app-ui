<template>
  <div class="modal-backdrop fade show"></div>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">

        <!-- Header du modal -->
        <div class="modal-header text-white"
             style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">
          <h5 class="modal-title fw-bold">返却の確認</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>

        <!-- Body -->
        <div class="modal-body text-center p-5">
          <i class="bi bi-exclamation-circle-fill display-1 text-primary mb-4"></i>
          <h4 class="mb-3 mt-4">選択された貸出を返却しますか？</h4>
          <h5 class="text-muted">貸出番号: {{ borrowUuid }}</h5>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 justify-content-center gap-4 pb-4">
          <button
              type="button"
              class="btn btn-primary px-5 py-2"
              @click="$emit('confirm', borrowUuid)">
            返却する
          </button>
          <button
              type="button"
              class="btn btn-outline-secondary px-5 py-2"
              @click="$emit('close')">
            キャンセル
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ borrowUuid: string }>();
defineEmits(['close', 'confirm']);
</script>
