<template>
  <div class="modal-backdrop fade show"></div>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-xl">

        <div class="modal-header text-white"
             style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">

          <h5 v-if="!response.return_lately" class="modal-title fw-bold">
            <i class="bi bi-check-circle me-2"></i>
            返却完了
          </h5>

          <h5 v-else class="modal-title fw-bold">
            <i class="bi bi-exclamation-triangle me-2"></i>
            返却期限超過
          </h5>

          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>

        <div v-if="!response.return_lately" class="modal-body text-center p-5">
          <i class="bi bi-check-circle-fill display-1 text-success mb-4"></i>

          <h4 class="fw-bold text-success mt-4">図書返却受領のお知らせ</h4>

          <div class="bg-light rounded-3 p-4 mt-4 border">
            <p class="mb-0 fs-5 fw-medium">
              図書の返却手続きが正常に完了いたしました。
            </p>
            <p class="mt-2">
              期限内のご返却、誠にありがとうございました。
            </p>
          </div>

          <p class="mt-4 text-muted ">
            返却データはシステムに反映されました。<br>
            次回の利用をお待ちしております。
          </p>
        </div>

        <div v-else class="modal-body text-center p-5">
          <i class="bi bi-exclamation-triangle-fill display-1 text-danger mb-4"></i>

          <h4 class="fw-bold text-danger">返却期限超過のお知らせ</h4>

          <p class="mt-3 fs-5">
            図書の返却期限を
            <span class="badge bg-danger px-3 py-1 fs-6">{{ response.days_late }}日</span>
            超過しています。
          </p>

          <div class="bg-light rounded-3 p-4 mt-4 border">
            <p class="text-muted mb-1">延滞金</p>
            <h3 class="fw-bold text-dark">¥{{ response.fine_amount?.toLocaleString() }}</h3>
          </div>

          <p class="mt-4 text-muted">
            恐れ入りますが、窓口にてお支払いをお願いいたします。
          </p>
        </div>


        <div class="modal-footer border-0 justify-content-center pt-0 pb-4">
          <button
              type="button"
              class="btn btn-primary px-5 py-2"
              @click="$emit('close')">
            OK
          </button>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
defineProps({
  response: {
    type: Object,
    required: true
  }
});
defineEmits(['close', 'confirm']);
</script>
