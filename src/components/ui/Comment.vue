<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">

        <h5 class="mb-4 fw-bold text-secondary">
          <i class="bi bi-chat-left-text me-2"></i> コメント
        </h5>

        <div
            v-for="comment in commentStore.commentsList"
            :key="comment.commentUuid"
            class=" border-0 shadow-sm mb-3"
        >
          <div class="card-body d-flex align-items-start p-3 p-md-4">

            <img
                :src="comment.avatar_URL"
                class="rounded-circle shadow-sm me-3"
                alt="Avatar"
                style="width: 48px; height: 48px; object-fit: cover;"
            >

            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fw-bold text-dark">{{ comment.userName }}</span>
                <span class="small text-muted">{{ formatDate(comment.createdAt) }}</span>
              </div>

              <div class="d-flex align-items-end justify-content-between">

                <p class="card-text mb-0 text-dark flex-grow-1" style="white-space: pre-line;">
                  {{ comment.content }}
                </p>

                <div
                    v-if="userStore.currentUser?.name === comment.userName"
                    class="ms-auto ps-3 d-flex gap-2">
                  <button type="button" class="btn btn-sm btn-outline-info">編集</button>
                  <button type="button" class="btn btn-sm btn-outline-danger">削除</button>
                </div>

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
import {useUserStore} from "@/stores/User";

const commentStore = useCommentStore();
const userStore = useUserStore();

const props = defineProps<{
  chapterUuid: string,
  page: number,
  size: number,
}>();


const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};


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