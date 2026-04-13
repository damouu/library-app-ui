<template>
  <nav class="navbar navbar-expand-lg fixed-top shadow-sm border-bottom border-primary"
       style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%);">

    <div class="container-fluid px-4 py-2">

      <div class="d-flex align-items-center" style="flex: 1;">
        <LogoComponent/>
      </div>

      <div class="collapse navbar-collapse justify-content-center flex-grow-0" id="navbarNav">
        <ul class="navbar-nav d-flex flex-row gap-4">
          <li class="nav-item d-flex flex-column align-items-center">
            <i class="bi bi-book-fill fs-4 text-white"></i>
            <RouterLink class="nav-link text-white fw-semibold p-0 mt-1" style="font-size: 0.9rem;" to="/series">
              シリーズ
            </RouterLink>
          </li>
          <li class="nav-item d-flex flex-column align-items-center">
            <i class="bi bi-journal-bookmark-fill fs-4 text-white"></i>
            <RouterLink class="nav-link text-white fw-semibold p-0 mt-1" style="font-size: 0.9rem;" to="/chapter">
              コミックス
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center gap-3" style="flex: 1; justify-content: flex-end;">
        <FormSearch/>

        <div v-if="!authStore.isAuthenticated">
          <AuthActions/>
        </div>

        <div v-else>
          <RouterLink to="/profile" class="profile-link">
            <img
                :src="authStore.currentUser?.avatar_img_url"
                class="rounded-circle border border-2 border-primary shadow-sm"
                style="width: 36px; height: 36px; object-fit: cover;"
                alt="Profile"
            >
          </RouterLink>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import LogoComponent from "@/components/ui/LogoComponent.vue";
import FormSearch from "@/components/ui/FormSearch.vue";
import AuthActions from "@/components/user/AuthActions.vue";
import {useUserStore} from "@/stores/User";

const authStore = useUserStore();
</script>