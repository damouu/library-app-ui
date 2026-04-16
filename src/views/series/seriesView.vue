<template>
  <div class="container py-5">

    <div class="row align-items-center mb-5 pb-3 border-bottom">
      <div class="col-12">
        <div class="d-flex align-items-center justify-content-between">

          <div class="ps-3 border-start border-primary border-5" style="min-width: 250px;">
            <h1 class="fw-black text-dark mb-0 h2">
              作品シリーズ一覧
            </h1>
            <div class="d-flex align-items-center mt-1">
              <span class="text-muted small">タイトル別に全巻をチェック</span>
            </div>
          </div>

          <div class="filter-chips-wrapper flex-grow-1 d-flex justify-content-center px-4">
            <div class="d-flex flex-wrap gap-2 align-items-center">

              <TransitionGroup name="fade-classic">
                <button
                    v-for="filter in activeFilters"
                    :key="filter.key"
                    @click="removeFilter(filter.key)"
                    class="btn-primary-subtle d-flex align-items-center"
                >
                  <span class="me-2 fw-bold text-uppercase opacity-75" style="font-size: 0.65rem;">{{
                      filter.key
                    }}:</span>
                  <span>{{ filter.label }}</span>
                  <i class="bi bi-x ms-2"></i>
                </button>
              </TransitionGroup>

              <div v-if="activeFilters.length > 1" class="d-flex align-items-center gap-2">
                <div class="vr mx-2 opacity-25" style="height: 1.5rem;"></div>
                <button
                    @click="clearAllFilters"
                    class="btn-clear-filters"
                >
                  <i class="bi bi-x-circle"></i>
                  <span>条件をすべてクリア</span>
                </button>
              </div>

            </div>
          </div>

          <div class="pe-2" style="min-width: 120px; text-align: right;">
            <FilterButton @confirm="handleFilterApply"/>
          </div>

        </div>
      </div>
    </div>

    <div class="mt-3">
      <Transition name="fade-classic" mode="out-in">

        <div v-if="seriesStore.isLoading" key="loading" class="loader-box">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else key="grid-content">
          <SeriesCardGrid
              :page="0"
              :size="6"
              sort="firstPrintPublicationDate"
              direction="desc"
              @change-page="handlePageChange"
          />
        </div>

      </Transition>
    </div>

    <div class="pagination-container mt-5 pt-4 border-top">
      <div class="d-flex justify-content-center">
        <Pagination
            v-if="seriesStore.pagination"
            :total-pages="seriesStore.pagination.totalPages"
            :current-page="seriesStore.pagination.currentPage"
            :is-first="seriesStore.pagination.isFirst"
            :is-last="seriesStore.pagination.isLast"
            @change-page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SeriesCardGrid from '../../components/ui/seriesCardGrid.vue'
import {useSeriesStore} from "@/stores/Series";
import {computed, onMounted, watch} from "vue";
import {useRoute, useRouter} from 'vue-router';
import FilterButton from "@/components/ui/FilterButton.vue";
import Pagination from "@/components/common/Pagination.vue";

const router = useRouter();
const route = useRoute();
const seriesStore = useSeriesStore();

watch(
    () => route.query,
    async () => {
      await fetchSeriesData(null);
    }
);

onMounted(async () => {
  const query = {...route.query};
  let needsReplace = false;

  if (!query.page) {
    query.page = '1';
    needsReplace = true;
  }
  if (!query.sort) {
    query.sort = 'firstPrintPublicationDate';
    needsReplace = true;
  }
  if (!query.direction) {
    query.direction = 'desc';
    needsReplace = true;
  }

  if (needsReplace) {
    await router.replace({query});
  }

  await fetchSeriesData(null);
});


async function fetchSeriesData(size: number | null) {
  const pageFromUrl = route.query.page ? Number(route.query.page) : 1;
  const apiPage = pageFromUrl - 1;

  const sortField = (route.query.sort as string) || 'firstPrintPublicationDate';
  const sortDir = (route.query.direction as string) || 'desc';

  const filters = {
    title: route.query.title as string || '',
    author: route.query.author as string || '',
    illustrator: route.query.illustrator as string || '',
    genre: route.query.genre as string || '',
    publisher: route.query.publisher as string || ''
  };

  await seriesStore.getSeries(
      apiPage,
      size,
      sortField,
      sortDir,
      filters
  );
}

async function handleFilterApply(newFilters: any) {
  await router.push({
    query: {
      ...newFilters,
      page: 1,
      sort: route.query.sort || 'firstPrintPublicationDate',
      direction: route.query.direction || 'desc'
    }
  });
}

async function handlePageChange(newPage: number) {
  await router.push({
    query: {
      ...route.query,
      page: newPage + 1
    }
  });
  await fetchSeriesData(null);
}

const activeFilters = computed(() => {
  const query = route.query;
  const skipKeys = ['page', 'sort', 'direction', 'size'];

  return Object.entries(query)
      .filter(([key, value]) => !skipKeys.includes(key) && value && value !== '')
      .map(([key, value]) => ({
        key,
        label: value as string
      }));
});

async function removeFilter(filterKey: string) {
  const newQuery = {...route.query};
  delete newQuery[filterKey];
  newQuery.page = '1';

  await router.push({query: newQuery});
}

async function clearAllFilters() {
  const defaultQuery = {
    page: '1',
    sort: 'firstPrintPublicationDate',
    direction: 'desc'
  };

  await router.push({
    query: defaultQuery
  });
  window.scrollTo({top: 0, behavior: 'smooth'});
}
</script>
