<template>
  <div class="modal-backdrop fade show"></div>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">

        <div class="modal-header text-white"
             style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">
          <h5 class="modal-title fw-bold">返却の確認</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>

        <div class="modal-body text-center p-5">
          <i class="bi bi-exclamation-circle-fill display-1 text-primary mb-4"></i>
          <h4 class="mb-3 mt-4">選択された貸出を返却しますか？</h4>
          <h5 class="text-muted">貸出番号: {{ borrowUuid }}</h5>
        </div>

        <div class="modal-footer border-0 justify-content-center gap-4 pb-4">

          <button
              type="button"
              class="btn btn-primary px-5 py-2"
              :disabled="userStore.isLoading"
              @click="$emit('confirm', borrowUuid)"
          >
            <template v-if="userStore.isLoading">
        <span
            class="spinner-border spinner-border-sm text-warning me-2"
            role="status"
            aria-hidden="true"
        ></span>
              返却中...
            </template>

            <template v-else>
              返却する
            </template>
          </button>

          <button
              type="button"
              class="btn-close btn-close-white"
              :disabled="userStore.isLoading"
              @click="$emit('close')">
          </button>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/User";

const userStore = useUserStore();
defineProps<{ borrowUuid: string }>();
defineEmits(['close', 'confirm']);
</script>
