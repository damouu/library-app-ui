<template>
  <div class="history-container">
    <div v-if="userStore.recordsLoading" class="text-center my-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="mt-2">履歴を読み込み中...</p>
    </div>

    <div v-else-if="userStore.borrowHistory?.borrows.length === 0" class="text-center my-5">
      <i class="bi bi-archive h1 text-muted"></i>
      <p>貸出履歴はありません。</p>
    </div>

    <div v-else>
      <div v-for="record in userStore.borrowHistory.borrows" :key="record.uuid" class="card mb-4 border-0 shadow-sm">

        <div class="card-header bg-light d-flex justify-content-between align-items-center">
          <div>
            <span class="small text-muted d-block">注文番号: {{ record.uuid.split('-')[0] }}</span>
            <span class="badge rounded-pill bg-dark">
              {{ record.startDate }} 〜 {{ record.expectedEndDate }}
            </span>
          </div>

          <div v-if="record.actualReturnDate === null || record.actualReturnDate === 'null'">
            <button @click="openReturnModal(record.uuid)" class="btn btn-sm btn-warning fw-bold shadow-sm">
              返却する (Return)
            </button>
          </div>

          <div v-else>
            <div class="text-end">
              <span class="badge bg-success d-block mb-1">返却済み (Returned)</span>
              <small class="text-muted" style="font-size: 0.7rem;">返却日: {{ record.actualReturnDate }}</small>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="d-flex gap-3 overflow-auto py-2">
            <div v-for="chapter in record.chapters" :key="chapter.uuid" class="chapter-item">
              <img :src="chapter.coverArtworkUrl"
                   :alt="chapter.title"
                   class="rounded shadow-sm mb-2"
                   style="width: 100px; height: 140px; object-fit: cover;">
              <h6 class="mb-0 text-truncate" style="max-width: 100px;">{{ chapter.title }}</h6>
              <small class="text-muted">第 {{ chapter.chapterNumber }} 巻</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ReturnModal
        v-if="showModal"
        :borrowUuid="selectedUuid"
        @close="showModal = false"
        @confirm="handleReturn"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from '@/stores/User';
import ReturnModal from './ReturnModal.vue';

const userStore = useUserStore();
const showModal = ref(false);
const selectedUuid = ref('');

const openReturnModal = (uuid: string) => {
  selectedUuid.value = uuid;
  showModal.value = true;
};

const handleReturn = async (uuid: string) => {
  const success = await userStore.returnBorrow(uuid);
  if (success) {
    showModal.value = false;
    // userStore.returnBorrow already triggers getRecords to refresh the list
  }
};
</script>

<style scoped>
.chapter-item {
  flex: 0 0 auto;
  transition: transform 0.2s;
}
.chapter-item:hover {
  transform: translateY(-5px);
}
.overflow-auto::-webkit-scrollbar {
  height: 6px;
}
.overflow-auto::-webkit-scrollbar-thumb {
  background: #ffc107;
  border-radius: 10px;
}
</style>