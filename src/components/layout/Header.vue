<template>
  <div class="row">
    <nav class="navbar navbar-expand-lg navbar-light bg-warning position-fixed fixed-top border border-primary p-2">

      <BorrowButton/>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto d-flex flex-row justify-content-center gap-5 mt-2">

          <li class="nav-item d-flex flex-column align-items-center">
            <i class="bi bi-book-fill fs-4"></i>
            <RouterLink aria-current="page" class="nav-link active p-0" to="/series">
              シリーズ
            </RouterLink>
          </li>

          <li class="nav-item d-flex flex-column align-items-center">
            <i class="bi bi-journal-bookmark-fill fs-4"></i>
            <RouterLink aria-current="page" class="nav-link active p-0" to="/chapter">
              コミックス
            </RouterLink>
          </li>

        </ul>
      </div>


      <div class="d-flex align-items-center gap-3 me-3">
        <FormSearch/>

        <div v-if="!authStore.isAuthenticated">
          <AuthActions/>
        </div>

        <div v-else class="d-flex align-items-center">
          <button class="btn rounded ms-2">

            <RouterLink aria-current="page" class="nav-link active p-0" to="/profile">
            <img
                :src="authStore.currentUser?.avatar_img_url"
                alt="Profile Picture"
                referrerpolicy="no-referrer"
                class="rounded-circle border border-2 border-white shadow-sm"
                style="width: 40px; height: 40px; object-fit: cover;"
            >
            </RouterLink>
          </button>
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