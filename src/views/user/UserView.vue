<template>
  <div class="container mt-5 pt-5 ">
    <div class="row g-lg-5">
      <div class="col-md-4 mb-4">
        <UserProfile/>
      </div>

      <div class="col-md-8">
        <div class="row g-lg-7 justify-content-center">
          <h4 class="mb-4">最近の貸出履歴</h4>
        </div>
        <BorrowHistory/>
        <Pagination :total-pages="totalPages" :current-page="currentPage" :is-first="isFirst" :is-last="isLast"/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import BorrowHistory from '@/components/user/BorrowHistory.vue';
import UserProfile from '@/components/user/UserProfile.vue';
import Pagination from "@/components/common/Pagination.vue";
import {useUserStore} from "@/stores/User";
import {computed} from "vue";

const userStore = useUserStore();

const currentPage = computed(() => userStore.borrowHistory?.number ?? 0);
const totalPages = computed(() => userStore.borrowHistory?.totalPages ?? 0);
const isFirst = computed(() => userStore.borrowHistory?.first ?? true);
const isLast = computed(() => userStore.borrowHistory?.last ?? true);

</script>