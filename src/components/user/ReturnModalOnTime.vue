<template>
  <div class="modal-backdrop fade show"></div>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header bg-warning text-dark ">
          <h5 v-if="!response.return_lately" class="modal-title fw-bold text-center text-success">
            Return on time
          </h5>

          <h5 v-else class="modal-title fw-bold text-center text-danger">
            Return late
          </h5>

        </div>
        <div v-if="!response.return_lately" class="modal-body text-center p-5">
          <i class="bi bi-check-circle-fill display-1 text-success"></i>

          <h4 class="mt-4 fw-bold">図書返却受領のお知らせ</h4>

          <div class="bg-light rounded p-4 mt-4 border">
            <p class="mb-0 fs-5 text-dark">
              図書の返却手続きが正常に完了いたしました。
            </p>
            <p class="mt-2 text-muted">
              期限内のご返却、誠にありがとうございました。
            </p>
          </div>

          <p class="mt-4 text-muted small">
            返却データはシステムに反映されました。次回の利用をお待ちしております。
          </p>
        </div>
        <div v-else class="modal-body text-center p-5">
          <i class="bi bi-exclamation-triangle-fill display-1 text-danger"></i>

          <h4 class="mt-4 fw-bold">返却期限超過のお知らせ</h4>

          <p class="mt-3 fs-5">
            図書の返却期限日を
            <span class="badge bg-danger px-2">{{ response.days_late }}</span>
            日経過しております。
          </p>

          <div class="bg-light rounded p-3 mt-4 border">
            <p class="mb-0 text-muted small">規定に基づく延滞金</p>
            <h3 class="text-dark fw-bold">¥{{ response.fine_amount?.toLocaleString() }}</h3>
          </div>

          <p class="mt-4 text-muted">
            恐れ入りますが、窓口にてお支払いのお手続きをお願いいたします。
          </p>
        </div>
        <div class="modal-footer border-0 justify-content-center ">
          <button type="button" class="btn btn-light" @click="$emit('close')">Ok</button>
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
