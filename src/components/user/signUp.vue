<template>
  <div class="border border-success shadow-sm p-4 w-50">

    <h3 class="text-center mb-5">
      <i class="bi bi-person-plus-fill"></i>
      新規登録
    </h3>

    <div v-if="userStore.authError" class="alert alert-danger p-2 small mb-3 text-center" role="alert">
      <i class="bi bi-exclamation-circle-fill me-2"></i>
      {{ userStore.authError }}
    </div>

    <form @submit.prevent="handleRegister">

      <div class="mt-3 mb-4">
        <label class="form-label">ユーザー名 (Username)</label>
        <input v-model="user_name" type="text" class="form-control" required/>

        <div v-if="userStore.validationErrors.user_name" class="text-danger small">
          {{ userStore.validationErrors.user_name[0] }}
        </div>
      </div>

      <div class="mt-3 mb-4">
        <label class="form-label">メールアドレス</label>
        <input v-model="email" type="email" class="form-control" required/>

        <div v-if="userStore.validationErrors.email" class="text-danger small mt-1">
          {{ userStore.validationErrors.email[0] }}
        </div>
      </div>

      <div class="mt-3 mb-4">
        <label class="form-label">パスワード (Password)</label>
        <input v-model="password" type="password" class="form-control" required/>

        <div v-if="userStore.validationErrors.password" class="text-danger small">
          {{ userStore.validationErrors.password[0] }}
        </div>
      </div>

      <div class="mt-3 mb-4">
        <label class="form-label">パスワード確認 (Confirm Password)</label>
        <input v-model="password_confirmation" type="password" class="form-control" required/>

        <div v-if="userStore.validationErrors.password_confirmation" class="text-danger small">
          {{ userStore.validationErrors.password_confirmation[0] }}
        </div>
      </div>

      <button :disabled="userStore.isLoading" type="submit" class="btn btn-success w-50 offset-3 mt-3">
        <span v-if="userStore.isLoading" class="spinner-border spinner-border-sm"></span>
        <span v-else>登録</span>
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

const user_name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const handleRegister = async () => {
  try {

    await userStore.register(
        user_name.value,
        email.value,
        password.value,
        password_confirmation.value
    );

    if (userStore.isAuthenticated) {
      await router.push({
        path: '/series',
        query: {page: 1}
      });
    }

  } catch (err) {
    console.error("Register attempt failed");
  }
};
</script>