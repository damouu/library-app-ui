<template>
  <div class="container-fluid p-4">
    <div v-if="chapterStore.currentChapter" class="row g-4 align-items-start">

      <div class="col-md-3">
        <div class="cover-container position-relative overflow-hidden rounded-4 shadow-lg">
          <img
              :src="chapterStore.currentChapter.coverArtworkUrl"
              alt="Cover"
              class="img-fluid main-cover"
          >

          <div class="cover-shine"></div>

          <div class="position-absolute top-0 start-0 m-3">
            <span class="badge bg-primary shadow-sm px-3">Official</span>
          </div>
        </div>

        <p class="text-muted small mt-3 text-center">
          <i class="bi bi-zoom-in me-1"></i> ホバーで拡大
        </p>
      </div>

      <div class="col-md-9 d-flex flex-column align-items-center text-center">
        <h2 class="mb-5 text-primary fw-bold">作品情報</h2>

        <div class="d-flex align-items-stretch justify-content-center w-100 mt-4">

          <div class="info-block text-center px-5 flex-shrink-0 d-flex flex-column justify-content-center h-100"
               style="width: 450px;">

            <h4 class="text-muted mb-4 fw-bold text-uppercase" style="letter-spacing: 0.1em;">作品詳細</h4>

            <div class="d-flex justify-content-center">
              <div class="d-flex flex-column gap-3 text-start">

                <router-link
                    :to="{ name: 'series-details', params: { seriesUuid: chapterStore.currentChapter.series.uuid, page: 1}}"
                    class="text-decoration-none d-flex align-items-center"
                >
                  <i class="bi bi-book-half text-primary fs-5 text-center" style="width: 40px;"></i>
                  <h5 class="text-primary mb-0 fw-bold">{{ chapterStore.currentChapter.title }}</h5>
                </router-link>

                <div class="d-flex align-items-center">
                  <i class="bi bi-bookmark-star text-muted fs-5 text-center" style="width: 40px;"></i>
                  <h5 class="h6 mb-0 text-secondary">{{ chapterStore.currentChapter.secondTitle }}</h5>
                </div>

                <div class="d-flex align-items-center">
                  <i class="bi bi-journals text-primary fs-5 text-center" style="width: 40px;"></i>
                  <div class="d-flex align-items-baseline">
                    <span class="text-muted small me-2">巻:</span>
                    <h5 class="mb-0 text-dark fw-bold">{{ chapterStore.currentChapter.chapterNumber }}</h5>
                  </div>
                </div>

                <div class="d-flex align-items-center">
                  <i class="bi bi-calendar-check text-primary fs-5 text-center" style="width: 40px;"></i>
                  <div class="d-flex align-items-baseline">
                    <span class="text-muted small me-2">出版:</span>
                    <h5 class="mb-0 text-dark">{{ chapterStore.currentChapter.publicationDate }}</h5>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="vr mx-4 text-muted opacity-25" style="width: 2px;"></div>

          <div class="info-block px-5 flex-shrink-0 d-flex flex-column justify-content-center text-start h-100"
               style="width: 450px;">
            <h4 class="text-muted mb-3 fw-bold text-uppercase" style="letter-spacing: 0.1em;">書誌情報</h4>

            <div class="d-flex flex-column gap-3">
              <div class="d-flex align-items-center">
                <i class="bi bi-person-fill text-primary fs-4 text-center" style="width: 40px;"></i>
                <div class="d-flex align-items-baseline">
                  <span class="text-muted small me-2">作者:</span>
                  <router-link
                      :to="{ name: 'series', query: { author: chapterStore.currentChapter.series.author, page: 1}}"
                      class="text-decoration-none d-flex align-items-center">
                    <h5 class="text-primary mb-0 fw-bold">{{ chapterStore.currentChapter.series.author }}</h5>
                  </router-link>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-brush text-primary fs-5 text-center" style="width: 40px;"></i>
                <div class="d-flex align-items-baseline">
                  <span class="text-muted small me-2">作画:</span>
                  <router-link
                      :to="{ name: 'series', query: { illustrator: chapterStore.currentChapter.series.illustrator, page: 1}}"
                      class="text-decoration-none d-flex align-items-center">
                    <h5 class="mb-0 text-primary fw-bold">{{ chapterStore.currentChapter.series.illustrator }}</h5>
                  </router-link>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-tag text-primary fs-5 text-center" style="width: 40px;"></i>
                <div class="d-flex align-items-baseline">
                  <span class="text-muted small me-2">ジャンル:</span>
                  <router-link
                      :to="{ name: 'series', query: { genre: chapterStore.currentChapter.series.genre, page: 1}}"
                      class="text-decoration-none d-flex align-items-center">
                    <h5 class="mb-0 text-primary fw-bold">{{ chapterStore.currentChapter.series.genre }}</h5>
                  </router-link>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-building text-primary fs-5 text-center" style="width: 40px;"></i>
                <div class="d-flex align-items-baseline">
                  <span class="text-muted small me-2">出版社:</span>
                  <router-link
                      :to="{ name: 'series', query: { publisher: chapterStore.currentChapter.series.publisher, page: 1}}"
                      class="text-decoration-none d-flex align-items-center">
                    <h5 class="mb-0 text-primary fw-bold">{{ chapterStore.currentChapter.series.publisher }}</h5>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="w-100 py-5 my-2 d-flex justify-content-center align-items-center mt-4">
          <div class="action-slot-wrapper" style="transform: scale(1.25); transform-origin: center;">
            <slot name="action-button"></slot>
          </div>
        </div>

        <div class="col-md-11 px-4 pt-5 border-top position-relative mt-3">
          <div class="position-absolute top-0 start-50 translate-middle bg-white px-4">
            <i class="bi bi-stars text-primary me-1"></i>
            <span class="fw-bold text-primary">あらすじ</span>
          </div>

          <div class="summary-box" style="max-height: 300px; overflow-y: auto;">
            <p class="text-secondary px-lg-5" style="text-align: justify; line-height: 2.0; font-size: 1.1rem;">
              {{ chapterStore.currentChapter.summary || 'あらすじはまだ登録されていません。' }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, watch} from "vue";
import {useChapterStore} from "@/stores/Chapter";

const chapterStore = useChapterStore();
const props = defineProps<{
  chapterUuid: string,
}>();


const fullLoad = async (uuid: string) => {
  chapterStore.currentChapter = null;
  chapterStore.newChapters = null;

  await chapterStore.getChapters(uuid);

  if (chapterStore.currentChapter) {
    await chapterStore.getNextThreeChapters(
        chapterStore.currentChapter.chapterNumber,
        chapterStore.currentChapter.series.uuid
    );
  }
};

onMounted(() => {
  fullLoad(props.chapterUuid);
});


watch(
    () => props.chapterUuid,
    async (newUuid) => {
      if (newUuid) {
        await fullLoad(newUuid);
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    }
);

onUnmounted(() => {
  chapterStore.currentChapter = null;
  chapterStore.newChapters = null;
});
</script>