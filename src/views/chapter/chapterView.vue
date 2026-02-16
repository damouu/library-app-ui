=
<template>
  <div class="container py-5">
    <div v-if="chapterStore.isLoading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <ChapterGrid
        :seriesUuid="props.seriesUuid"
        :page="0"
        :size="12"
        sort="publicationDate"
        direction="desc"
    />
  </div>

  <div>
    <Pagination
        v-if="chapterStore.pagination"
        :total-pages="chapterStore.pagination.totalPages"
        :current-page="chapterStore.pagination.currentPage"
        :is-first="chapterStore.pagination.isFirst"
        :is-last="chapterStore.pagination.isLast"
        @change-page="handlePageChange"
    />
  </div>
</template>


<script lang="ts" setup>
import ChapterGrid from "../../components/ui/CardGrid.vue"
import Pagination from "../../components/common/Pagination.vue"
import {useChapterStore} from "@/stores/Chapter";
import {onMounted} from "vue";
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();

const chapterStore = useChapterStore();

const props = defineProps<{
  seriesUuid: string
}>();

async function handlePageChange(newPage: number) {

  await router.push({query: {...route.query, page: newPage + 1}});

  await chapterStore.getSeriesChapters(newPage, 12, 'publicationDate', 'asc', props.seriesUuid);
}

onMounted(async () => {
  const pageFromUrl = route.query.page ? Number(route.query.page) : 1;

  if (!route.query.page) {
    await router.replace({query: {...route.query, page: 1}});
  }

  await chapterStore.getSeriesChapters(pageFromUrl - 1, 12, "publicationDate", "desc", props.seriesUuid);

});


async function handleFilterApply(newFilters: any) {
  await router.push({
    query: {
      ...newFilters,
      page: 1
    }
  });

  await fetchSeriesData(null);
}

</script>