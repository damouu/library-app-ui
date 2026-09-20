<template>
  <nav
      class="navbar navbar-expand-lg fixed-top shadow-sm border-bottom border-primary"
      style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%);"
  >
    <div class="container-fluid px-4 py-2">

      <div class="d-flex align-items-center" style="flex: 1;">
        <LogoComponent/>
      </div>

      <div
          class="collapse navbar-collapse justify-content-center flex-grow-0"
          id="navbarNav"
      >
        <ul class="navbar-nav d-flex flex-row gap-4 align-items-center">

          <li class="nav-item d-flex flex-column align-items-center">
            <i class="bi bi-book-fill fs-4 text-white"></i>

            <RouterLink
                class="nav-link text-white fw-semibold p-0 mt-1"
                style="font-size: 0.9rem;"
                to="/series"
            >
              シリーズ
            </RouterLink>
          </li>


          <li
              ref="searchContainer"
              class="nav-item mx-4 position-relative"
          >
            <DiscoveryBar
                :is-open="isSearchDropdownVisible"
                @search="handleSearch"
                @clear="handleSearchClear"
                @focus="handleSearchFocus"
            />


            <Transition name="search-menu">
              <div
                  v-if="isSearchDropdownVisible"
                  class="search-results-dropdown d-flex flex-column"
              >
                <div v-if="searchStore.isLoading"
                     class="d-flex justify-content-center align-items-center py-5 text-primary">
                  <div class="spinner-border" role="status" style="width: 2rem; height: 2rem;">
                    <span class="visually-hidden">書き込み中</span>
                  </div>
                </div>


                <div v-else-if="searchStore.results.length === 0"
                     class="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
                  <i class="bi bi-search text-secondary opacity-50 mb-3" style="font-size: 2.5rem;"></i>
                  <h6 class="fw-semibold text-dark">検索結果が見つかりませんでした</h6>
                  <p class="small mb-0">別のキーワードでお試しください。</p>
                </div>

                <template v-else>
                  <div class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                    <span class="text-secondary small fw-bold">章の検索結果</span>

                    <RouterLink
                        :to="`/search?q=${currentSearchQuery}`"
                        class="text-primary small text-decoration-none fw-semibold"
                        @click="closeSearchDropdown"
                    >
                      <i class="bi bi-caret-right-fill">すべての結果を見る</i>
                    </RouterLink>
                  </div>

                  <div class="search-results-list overflow-y-auto">
                    <RouterLink
                        v-for="chapter in searchStore.results"
                        :key="chapter.uuid"
                        :to="`/chapter/${chapter.uuid}`"
                        class="search-result-item text-decoration-none"
                        @click="closeSearchDropdown"
                    >
                      <img
                          :src="chapter.coverArtworkUrl"
                          :alt="chapter.title"
                          class="search-result-cover"
                      />

                      <div class="search-result-content">
                        <div class="fw-bold text-dark text-truncate mb-2">
                          {{ chapter.title }}
                          <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-2 py-1 fw-semibold">
                        第{{ chapter.chapterNumber }}話
                      </span>
                        </div>

                        <div class="mb-2">
                        <span class="text-secondary ms-2">
                        {{ chapter.secondTitle }}
                          </span>
                        </div>

                        <div class="text-secondary small summary mt-1">
                          {{ chapter.summary }}
                        </div>

                      </div>
                    </RouterLink>
                  </div>

                </template>
              </div>
            </Transition>
          </li>

          <li class="nav-item d-flex flex-column align-items-center">
            <i class="bi bi-journal-bookmark-fill fs-4 text-white"></i>

            <RouterLink
                class="nav-link text-white fw-semibold p-0 mt-1"
                style="font-size: 0.9rem;"
                to="/chapter"
            >
              コミックス
            </RouterLink>
          </li>

        </ul>
      </div>


      <div
          class="d-flex align-items-center gap-3"
          style="flex: 1; justify-content: flex-end;"
      >
        <FormSearch/>

        <div v-if="!authStore.isAuthenticated">
          <AuthActions/>
        </div>

        <div v-else>
          <RouterLink
              to="/profile"
              class="profile-link"
          >
            <img
                :src="authStore.currentUser?.avatar_img_url"
                class="avatar"
                alt="Profile"
            />
          </RouterLink>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";

import LogoComponent from "@/components/ui/LogoComponent.vue";
import DiscoveryBar from "@/components/layout/DiscoveryBar.vue";
import FormSearch from "@/components/ui/FormSearch.vue";
import AuthActions from "@/components/user/AuthActions.vue";

import {useUserStore} from "@/stores/User";
import {useSearchStore} from "@/stores/Search";

const authStore = useUserStore();
const searchStore = useSearchStore();

const searchContainer = ref<HTMLElement | null>(null);
const isSearchDropdownVisible = ref(false);


const handleSearchFocus = () => {
  if (searchStore.results.length > 0) {
    isSearchDropdownVisible.value = true;
  }
};

const handleSearchClear = () => {
  isSearchDropdownVisible.value = false;
  searchStore.clearResults();
};

const closeSearchDropdown = () => {
  isSearchDropdownVisible.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target;

  if (
      target instanceof Node &&
      !searchContainer.value?.contains(target)
  ) {
    closeSearchDropdown();
  }
};

const currentSearchQuery = ref('');

const handleSearch = (query: string) => {
  currentSearchQuery.value = query;
  isSearchDropdownVisible.value = true;
  searchStore.search(query);
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>