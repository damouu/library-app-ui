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
                v-model="currentSearchQuery"
                :is-open="isSearchDropdownVisible"

                @search="handleSearch"
                @submit="handleSearchSubmit"

                @navigate="handleSearchNavigate"
                @escape="handleSearchEscape"

                @clear="handleSearchClear"
                @focus="handleSearchFocus"
            />

            <Transition name="search-menu">
              <SearchResultsDropdown
                  v-if="isSearchDropdownVisible"
                  :query="currentSearchQuery"
                  :results="discoverySearchStore.results"
                  :history="discoverySearchStore.history"
                  :is-loading="discoverySearchStore.isLoading"
                  :highlighted-index="highlightedResultIndex"
                  @select-history="handleHistorySearch"
                  @clear-history="discoverySearchStore.clearHistory"
                  @view-all="handleViewAllResults"
                  @select-result="closeSearchDropdown"
              />
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
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

import LogoComponent from "@/components/ui/LogoComponent.vue";
import DiscoveryBar from "@/components/layout/DiscoveryBar.vue";
import FormSearch from "@/components/ui/FormSearch.vue";
import AuthActions from "@/components/user/AuthActions.vue";
import SearchResultsDropdown from "@/components/layout/SearchResultsDropdown.vue";

import {useUserStore} from "@/stores/User";
import {useDiscoverySearchStore} from "@/stores/DiscoverySearch";

const authStore = useUserStore();
const discoverySearchStore = useDiscoverySearchStore();

const route = useRoute();
const router = useRouter();

const searchContainer = ref<HTMLElement | null>(null);

const isSearchDropdownVisible = ref(false);

const currentSearchQuery = ref(
    String(route.query.q ?? "").trim()
);

const highlightedResultIndex = ref(-1);


const handleSearch = (query: string) => {
  currentSearchQuery.value = query;

  isSearchDropdownVisible.value = true;
  highlightedResultIndex.value = -1;

  discoverySearchStore.search(query);
};


const handleSearchFocus = () => {
  if (
      currentSearchQuery.value ||
      discoverySearchStore.history.length > 0
  ) {
    isSearchDropdownVisible.value = true;
  }
};


const handleViewAllResults = async () => {
  const query = currentSearchQuery.value.trim();

  if (!query) {
    return;
  }

  discoverySearchStore.addToHistory(query);

  closeSearchDropdown();

  await router.push({
    name: "search-results",
    query: {
      q: query,
    },
  });
};

const handleHistorySearch = async (query: string) => {
  currentSearchQuery.value = query;
  highlightedResultIndex.value = -1;

  isSearchDropdownVisible.value = true;

  await discoverySearchStore.search(query);
};

const closeSearchDropdown = () => {
  isSearchDropdownVisible.value = false;
  highlightedResultIndex.value = -1;
};


const handleSearchClear = () => {
  isSearchDropdownVisible.value = false;
  highlightedResultIndex.value = -1;

  discoverySearchStore.clearResults();
};


const handleSearchEscape = () => {
  closeSearchDropdown();
};

const handleSearchNavigate = (
    direction: "up" | "down"
) => {
  if (discoverySearchStore.results.length === 0) {
    return;
  }

  if (!isSearchDropdownVisible.value) {
    isSearchDropdownVisible.value = true;
  }

  const totalResults =
      discoverySearchStore.results.length;

  if (direction === "down") {
    highlightedResultIndex.value =
        highlightedResultIndex.value >= totalResults - 1
            ? 0
            : highlightedResultIndex.value + 1;
  }

  if (direction === "up") {
    highlightedResultIndex.value =
        highlightedResultIndex.value <= 0
            ? totalResults - 1
            : highlightedResultIndex.value - 1;
  }
};

const handleSearchSubmit = async (
    query: string
) => {

  if (highlightedResultIndex.value >= 0) {

    const selectedChapter =
        discoverySearchStore.results[
            highlightedResultIndex.value
            ];

    if (selectedChapter) {

      closeSearchDropdown();

      await router.push({
        name: "chapter-details",
        params: {
          chapterUuid: selectedChapter.uuid
        },
      });

      return;
    }
  }

  discoverySearchStore.addToHistory(query);

  closeSearchDropdown();

  await router.push({
    name: "search-results",
    query: {
      q: query
    },
  });
};

const handleClickOutside = (
    event: MouseEvent
) => {

  const target = event.target;

  if (
      target instanceof Node &&
      !searchContainer.value?.contains(target)
  ) {
    closeSearchDropdown();
  }
};

watch(
    () => route.query.q,
    (newQuery) => {

      currentSearchQuery.value =
          String(newQuery ?? "").trim();

    },
    {
      immediate: true,
    }
);

onMounted(() => {
  document.addEventListener(
      "click",
      handleClickOutside
  );
});

onBeforeUnmount(() => {
  document.removeEventListener(
      "click",
      handleClickOutside
  );
});
</script>