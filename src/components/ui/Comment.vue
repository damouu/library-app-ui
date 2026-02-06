<template>
  <div class="container-fluid">
    <div class="row g-4">

      <div
          v-for="comment in commentStore.commentsList"
          :key="comment.commentUuid"
          class="col-6 col-sm-4 col-md-3 col-lg-2 mt-4"
      >

        <div class="card mb-3">
          <div class="row g-0 align-items-center">
            <div class="col-2 ms-2">
              <img :src="comment.avatar_URL" class="img-fluid rounded-circle" alt="Avatar">
            </div>
            <div class="col">
              <div class="card-body py-2">
                <p class="card-text mb-0 small text-muted">{{ comment.userName }}</p>
                <h5 class="card-title mb-0 text-primary">{{ comment.content }}</h5>
                <p class="card-text mb-0 small text-muted">{{ comment.createdAt }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, onUnmounted} from "vue";
import {useCommentStore} from "@/stores/Comment";

const commentStore = useCommentStore();

const props = defineProps<{
  chapterUuid: string,
  page: number,
  size: number,
}>();

onMounted(async () => {
  await commentStore.getChapter(
      props.page,
      props.size,
      props.chapterUuid,
  );
});

onUnmounted(() => {
  commentStore.commentsList = null;
});

</script>