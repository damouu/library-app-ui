<template>
  <div class="border border-danger shadow-sm p-4 w-50">

    <h3 class="text-center mb-5">
      <i class="bi bi-box-arrow-in-right"></i>
      サインイン
    </h3>
    <div v-if="userStore.authError" class="alert alert-danger p-2 small mb-3 text-center" role="alert">
      <i class="bi bi-exclamation-circle-fill me-2"></i>
      {{ userStore.authError }}
    </div>

    <form @submit.prevent="handleLogin">
      <div class="mt-3 mb-4">
        <label class="form-label">メールアドレス (Email)</label>
        <input v-model="email" type="email" class="form-control" required/>
      </div>

      <div class="mt-5 mb-4">
        <label class="form-label">パスワード (Password)</label>
        <input v-model="password" type="password" class="form-control" required/>
      </div>

      <button :disabled="userStore.isLoading" type="submit" class="btn btn-warning w-50 offset-3 mt-3">
        <span v-if="userStore.isLoading" class="spinner-border spinner-border-sm"></span>
        <span v-else>ログイン</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useUserStore} from '@/stores/User';
import {useRouter} from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const handleLogin = async () => {

  try {

    await userStore.signIn(email.value, password.value);

    if (userStore.isAuthenticated) {
      await router.push({
        path: '/series',
        query: {page: 1}
      });
    }

  } catch (err) {
    console.error("Login attempt failed");
  }

};
</script>