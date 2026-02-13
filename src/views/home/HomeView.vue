<template>
  <main class="mt-4">
    <top-chapters-button @period="handlePeriodChange"/>
    <TopChapters :displayedBooks="displayedBooks"/>

    <NewChaptersGric/>

    <div class="mt-5">

      <Pagination
          v-if="chapterStore.pagination"
          :total-pages="chapterStore.pagination.totalPages"
          :current-page="chapterStore.pagination.currentPage"
          :is-first="chapterStore.pagination.isFirst"
          :is-last="chapterStore.pagination.isLast"
          @change-page="(newPage) => chapterStore.getNews(newPage, 12, 'publicationDate', 'desc')"
      />

    </div>
  </main>
</template>

<script setup lang="ts">
import {useChapterStore} from "@/stores/Chapter";
import {computed, onMounted, ref} from "vue";
import TopChapters from "@/components/home/TopChapters.vue";
import TopChaptersButton from "@/components/home/TopChaptersButton.vue";
import Pagination from "@/components/common/Pagination.vue";
import NewChaptersGric from "@/components/home/NewChaptersGric.vue";

const chapterStore = useChapterStore();

const period = ref<string>('week');

type PeriodKey = 'week' | 'lastweek' | 'lastmonth';

async function handlePeriodChange(newPeriod: PeriodKey) {
  period.value = newPeriod;
  await chapterStore.getTop(newPeriod, 0, 6);
}

const displayedBooks = computed(() => {
  return chapterStore.rankings[period.value];
});

onMounted(() => {
  chapterStore.getTop("week", 0, 6);
  chapterStore.getNews(0, 12, "publicationDate", "desc")
})

</script>