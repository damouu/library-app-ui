<template>
  <div class="row">
    <nav
        class="navbar navbar-expand-lg navbar-light bg-warning position-fixed fixed-top border border-primary p-2 d-flex justify-content-between align-items-center">

      <div class="d-flex flex-1 justify-content-start" style="flex: 1;">
        <BorrowButton/>
      </div>

      <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
        <ul class="navbar-nav d-flex flex-row justify-content-center gap-5 mt-2">
          <li class="nav-item d-flex flex-column align-items-center">
            <i class="bi bi-book-fill fs-4"></i>
            <RouterLink class="nav-link active p-0" to="/series">シリーズ</RouterLink>
          </li>
          <li class="nav-item d-flex flex-column align-items-center">
            <i class="bi bi-journal-bookmark-fill fs-4"></i>
            <RouterLink class="nav-link active p-0" to="/chapter">コミックス</RouterLink>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center gap-3 justify-content-end" style="flex: 1;">
        <FormSearch/>
        <div v-if="!authStore.isAuthenticated">
          <AuthActions/>
        </div>
        <div v-else class="d-flex align-items-center me-3">
          <RouterLink to="/profile">
            <img :src="authStore.currentUser?.avatar_img_url"
                 class="rounded-circle border border-2 border-white shadow-sm"
                 style="width: 40px; height: 40px; object-fit: cover;">
          </RouterLink>
        </div>
      </div>

    </nav>
  </div>
</template>

<script setup lang="ts">
import BorrowButton from "@/components/ui/BorrowButton.vue";
import FormSearch from "@/components/ui/FormSearch.vue";
import AuthActions from "@/components/user/AuthActions.vue";
import {useUserStore} from "@/stores/User";

const authStore = useUserStore();

</script>