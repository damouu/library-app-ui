<template>
  <div class="container py-5">

    <div class="row align-items-center position-relative mb-4">
      <div class="col-12 text-center">
        <h1>Chapter View</h1>
      </div>

      <div class="position-absolute end-0 w-auto">
        <FilterButton @confirm="handleFilterApply"/>
      </div>

    </div>

    <div class="mt-3">
      <div v-if="chapterStore.isLoading" class="spinner-border text-primary"/>

      <ChapterGrid
          :page="0"
          :size="12"
          sort="publicationDate"
          direction="desc"
      />

    </div>

    <div class="d-flex justify-content-center mt-5">
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
  const page =  1;
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
  await router.push({
    query: {
      ...route.query,
      page: newPage + 1
    }
  });

  await fetchChaptersData(12);
}

</script>
