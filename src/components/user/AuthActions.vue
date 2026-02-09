<template>
  <div class="d-flex gap-2">
    <button class="btn btn-outline-dark btn-sm" @click="goToLogin">
      サインイン
    </button>
    <button class="btn btn-dark btn-sm" @click="goToRegister">
      新規登録
    </button>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter();

const goToLogin = () => router.push('/login');
const goToRegister = () => router.push('/register');
</script>