<template>
  <main>
    <h1>Series View</h1>
    <div class="mt-3">
      <div v-if="seriesStore.isLoading" class="spinner-border text-primary"/>
      <SeriesCardGrid
          :page="0"
          :size="6"
          sort="firstPrintPublicationDate"
          direction="desc" v-else/>
    </div>
  </main>
</template>

<script setup lang="ts">
import SeriesCardGrid from '../../components/ui/seriesCardGrid.vue'
import {useSeriesStore} from "@/stores/Series";
import {onMounted} from "vue";

const seriesStore = useSeriesStore();

onMounted(async () => {
  await seriesStore.getSeries(0, 6, "firstPrintPublicationDate", "desc");
});

</script>
