<template>
  <div class="container-fluid border border-danger-subtle">
    <div v-if="chapterStore.currentChapter" class="row g-4 align-items-start">

      <div class="col-md-3">
        <img :src="chapterStore.currentChapter.coverArtworkUrl" alt="Cover" class="img-fluid">
      </div>

      <div class="col-md-2 border border-danger-subtle text-wrap">
        <h3 class="text-primary">この本について： </h3>
        <h4>タイトル : {{ chapterStore.currentChapter.title }}</h4>
        <h4>サブタイトル : {{ chapterStore.currentChapter.secondTitle }}</h4>
        <h4>ページ数 : {{ chapterStore.currentChapter.totalPages }}</h4>
        <h4>巻 : {{ chapterStore.currentChapter.chapterNumber }}</h4>
        <h4>出版 : {{ chapterStore.currentChapter.publicationDate }}</h4>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, onUnmounted} from "vue";
import {useChapterStore} from "@/stores/Chapter";

const chapterStore = useChapterStore();

const props = defineProps<{
  chapterUuid: string,
}>();

onMounted(async () => {
  await chapterStore.getChapters(
      props.chapterUuid
  );
});

onUnmounted(() => {
  chapterStore.currentChapter = null;
});

</script>