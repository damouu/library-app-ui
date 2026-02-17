<template>
  <div class="container py-5">

    <div class="row align-items-center position-relative mb-4">
      <div class="col-12 text-center">
        <h1>Series View</h1>
      </div>

      <div class="position-absolute end-0 w-auto">
        <FilterButton @confirm="handleFilterApply"/>
      </div>
    </div>

    <div class="mt-3">
      <div v-if="seriesStore.isLoading" class="spinner-border text-primary"/>

      <SeriesCardGrid
          :page="0"
          :size="6"
          sort="firstPrintPublicationDate"
          direction="desc" v-else
          @change-page="handlePageChange"
      />
    </div>

    <div class="d-flex justify-content-center mt-5">
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
</template>

<script setup lang="ts">
import SeriesCardGrid from '../../components/ui/seriesCardGrid.vue'
import {useSeriesStore} from "@/stores/Series";
import {onMounted} from "vue";
import {useRoute, useRouter} from 'vue-router';
import FilterButton from "@/components/ui/FilterButton.vue";
import Pagination from "@/components/common/Pagination.vue";

const router = useRouter();
const route = useRoute();
const seriesStore = useSeriesStore();

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

  await fetchSeriesData(12);
});


async function fetchSeriesData(size: number) {
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
      size || null,
      sortField,
      sortDir,
      filters
  );
}


async function handleFilterApply(newFilters: any) {
  await router.push({
    query: {
      ...newFilters,
      page: 1
    }
  });

  await fetchSeriesData(null);
}


async function handlePageChange(newPage: number) {
  await router.push({
    query: {
      ...route.query,
      page: newPage + 1
    }
  });

  await fetchSeriesData(12);
}

</script>
