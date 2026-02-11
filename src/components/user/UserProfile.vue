<template>
  <div class="border-0 shadow-sm text-center p-4">
    <img
        :src="userStore.currentUser?.avatar_img_url"
        class="rounded-circle mx-auto mb-3"
        style="width: 100px; height: 100px;">
    <h4>{{ userStore.currentUser?.name }}</h4>
    <p class="text-muted">{{ userStore.currentUser?.email }}</p>
    <hr>
    <button @click="handleLogOut" class="btn btn-outline-danger btn-sm w-100">
      ログアウト
    </button>
  </div>

</template>

<script setup lang="ts">
import {useUserStore} from '@/stores/User';
import router from "@/router";

const userStore = useUserStore();

const handleLogOut = async () => {
  userStore.logout();
  await router.push({
    path: '/'
  });
};

</script>