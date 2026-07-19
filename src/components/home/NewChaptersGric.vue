<template>
  <div class="container-fluid mt-5" ref="sectionRef">

    <div class="text-center mb-5">
      <h2><i class="bi bi-fire"> 最新リリース</i></h2>
    </div>

    <div v-if="chapterStore.newsLoading" class="row gy-5">

      <div v-for="i in 12" :key="i" class="col-6 col-sm-4 col-md-3 col-lg-2">

        <div class="card h-100 shadow-sm border-2 placeholder-glow">

          <div class="image-container overflow-hidden rounded-top">
            <div class="placeholder w-100 ranking-img"></div>
          </div>

          <div class="card-body p-2 text-center">
            <span class="placeholder col-10 d-block mx-auto mb-2"></span>
            <span class="placeholder col-5 d-block mx-auto mb-2"></span>
            <span class="placeholder col-7 d-block mx-auto"></span>
          </div>

        </div>
      </div>
    </div>


    <TransitionGroup v-else name="fade-classic" tag="div" class="row gy-5">

      <div v-for="chapter in chapterStore.Chapters" :key="chapter.uuid" class="col-6 col-sm-4 col-md-3 col-lg-2">

        <router-link
            :to="{ name: 'chapter-details', params: { chapterUuid: chapter.uuid }}"
            class="text-decoration-none text-reset text-center"
        >
          <div class="card h-100 shadow-sm border-2">

            <div class="image-container overflow-hidden rounded-top">
              <img :src="chapter.coverArtworkUrl" class="card-img-top ranking-img" alt="Cover">
            </div>

            <div class="card-body p-2 d-flex flex-column align-items-center justify-content-center text-center">
              <h6 class="card-title text-primary mb-1 text-truncate w-100">
                {{ chapter.title }}
              </h6>
              <p class="card-text mb-0 text-body-secondary text-muted w-100">
                巻 {{ chapter.chapterNumber }}
              </p>
              <p class="card-text mb-0 text-body-secondary text-muted w-100">
                出版 {{ chapter.publicationDate }}
              </p>
            </div>

          </div>
        </router-link>
      </div>
    </TransitionGroup>

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useChapterStore} from "@/stores/Chapter";

const chapterStore = useChapterStore();

const sectionRef = ref<HTMLElement | null>(null);

const scrollToTop = () => {
  if (sectionRef.value) {
    sectionRef.value.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
};

defineExpose({scrollToTop});
</script>