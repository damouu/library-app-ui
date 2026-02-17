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
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import BorrowHistory from '@/components/user/BorrowHistory.vue';
import UserProfile from '@/components/user/UserProfile.vue';
</script>