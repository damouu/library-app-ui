<template>

  <div class="container py-5">

    <Transition name="fade-slide" mode="out-in">

      <div v-if="chapterStore.isLoading" key="loading" class="row g-4">

        <div v-for="i in 12" :key="i" class="col-6 col-sm-4 col-md-3 col-lg-2">

          <div class="card h-100 shadow-sm border-2 placeholder-glow overflow-hidden">

            <div
                class="placeholder w-100"
                style="height:260px;">
            </div>

            <div class="card-body text-center">

              <div class="placeholder col-10 mx-auto mb-2"></div>

              <div class="placeholder col-7 mx-auto mb-2"></div>

              <div class="placeholder col-5 mx-auto"></div>

            </div>

          </div>

        </div>

      </div>

      <div v-else key="content">
        <ChapterGrid
            :key="chapterStore.pagination?.currentPage"
            :seriesUuid="props.seriesUuid"
            :page="Number(route.query.page || 1) - 1"
            :size="12"
            sort="publicationDate,desc"
        />
      </div>
    </Transition>

    <div class="pagination-wrapper mt-5 pt-4 border-top">
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


<script lang="ts" setup>
import ChapterGrid from "../../components/ui/CardGrid.vue"
import Pagination from "../../components/common/Pagination.vue"
import {useChapterStore} from "@/stores/Chapter";
import {onMounted, watch} from "vue";
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();

const chapterStore = useChapterStore();

const props = defineProps<{
  seriesUuid: string
}>();

const fetchData = async () => {
  const page = route.query.page ? Number(route.query.page) - 1 : 0;
  await chapterStore.getSeriesChapters(page, 12, "publicationDate,desc", props.seriesUuid);
};

watch(
    () => route.query.page,
    () => {
      fetchData();
    }
);

async function handlePageChange(newPage: number) {
  window.scrollTo({top: 0, behavior: 'smooth'});
  await router.push({query: {...route.query, page: newPage + 1}});
}

onMounted(async () => {
  if (!route.query.page) {
    await router.replace({
      query: {
        ...route.query,
        page: 1
      }
    });
  }
  await fetchData();
});

</script>