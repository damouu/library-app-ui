<template>
  <main>
    <h1>Series View</h1>
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
  </main>
</template>

<script setup lang="ts">
import SeriesCardGrid from '../../components/ui/seriesCardGrid.vue'
import {useSeriesStore} from "@/stores/Series";
import {onMounted} from "vue";
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();
const seriesStore = useSeriesStore();

async function handlePageChange(newPage: number) {

  await router.push({query: {...route.query, page: newPage + 1}});

  await seriesStore.getSeries(newPage, 12, 'firstPrintPublicationDate', 'desc');
}

onMounted(async () => {
  const pageFromUrl = route.query.page ? Number(route.query.page) : 1;

  if (!route.query.page) {
    await router.replace({query: {...route.query, page: 1}});
  }

  await seriesStore.getSeries(pageFromUrl - 1, 12, "firstPrintPublicationDate", "desc");
});


</script>
