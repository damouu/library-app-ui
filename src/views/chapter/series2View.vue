<template>
  <div class="container py-5 min-vh-75">

    <div class="row align-items-center mb-5 pb-3 border-bottom">
      <div class="col-12">
        <div class="d-flex align-items-center justify-content-between">

          <div class="ps-3 border-start border-primary border-4">
            <h1 class="fw-bold text-dark mb-0 h2">
              全巻一覧
            </h1>
            <p class="text-muted small mb-0 mt-1 d-none d-sm-block">
              <i class="bi bi-book-half me-1"></i>
              すべての巻・エピソードを閲覧できます
            </p>
          </div>

          <div class="pe-2">
            <div class="filter-wrapper">
              <FilterButton @confirm="handleFilterApply"/>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="content-wrapper position-relative ">
      <Transition name="fade-classic" mode="out-in">

        <div v-if="chapterStore.isLoading" key="loading" class="loader-box">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else key="grid-content">
          <ChapterGrid
              :key="chapterStore.pagination?.currentPage"
              :page="0"
              :size="12"
              sort="publicationDate"
              direction="desc"
          />
        </div>
      </Transition>
    </div>

    <div class="pagination-container mt-5 pt-4 border-top">
      <div class="d-flex justify-content-center">
        <Pagination
            v-if="chapterStore.pagination"
            :total-pages="chapterStore.pagination.totalPages"
            :current-page="chapterStore.pagination.currentPage"
            :is-first="chapterStore.pagination.isFirst"
            :is-last="chapterStore.pagination.isLast"
            @change-page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useChapterStore} from "@/stores/Chapter";
import {onMounted} from "vue";
import ChapterGrid from "../../components/ui/ChapterGrid.vue"
import {useRoute, useRouter} from 'vue-router';
import FilterButton from "@/components/ui/FilterChapterButton.vue";
import Pagination from "@/components/common/Pagination.vue";

const router = useRouter();
const route = useRoute();
const chapterStore = useChapterStore();


onMounted(async () => {
  const query = {...route.query};
  let needsReplace = false;

  if (!query.page) {
    query.page = '1';
    needsReplace = true;
  }

  if (!query.sort) {
    query.sort = 'publicationDate';
    needsReplace = true;
  }

  if (!query.direction) {
    query.direction = 'desc';
    needsReplace = true;
  }

  if (needsReplace) {
    await router.replace({query});
  }

  await fetchChaptersData(12);
});


async function fetchChaptersData(size: number) {
  const page = route.query.page ? Number(route.query.page) - 1 : 0;

  const sortField = (route.query.sort as string) || 'publicationDate';
  const sortDir = (route.query.direction as string) || 'desc';

  const filters = {
    title: route.query.title as string || '',
    secondTitle: route.query.secondTitle as string || '',
    chapterNumber: route.query.chapterNumber as string || ''
  };

  await chapterStore.getChapter(
      page,
      size,
      sortField,
      sortDir,
      filters
  );
}


async function handleFilterApply(newFilters: any) {

  const sortField = (route.query.sort as string) || 'publicationDate';
  const sortDir = (route.query.direction as string) || 'asc';
  const page = 1;
  const size = (newFilters.chapterNumber && newFilters.chapterNumber !== '') ? 1 : 12;

  await router.push({
    query: {
      ...newFilters,
      page: page,
      sort: sortField,
      direction: sortDir,
      size: size
    }
  });
  await fetchChaptersData(size);
}


async function handlePageChange(newPage: number) {
  window.scrollTo({top: 0, behavior: 'smooth'});
  await router.push({
    query: {
      ...route.query,
      page: newPage + 1
    }
  });

  await fetchChaptersData(12);
}

</script>