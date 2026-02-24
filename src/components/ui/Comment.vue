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

                <div class="flex-grow-1">
                  <p v-if="editingUuid !== comment.commentUuid"
                     class="card-text mb-0 text-dark"
                     style="white-space: pre-line;">
                    {{ comment.content }}
                  </p>

                  <div v-else class="pe-3">
                    <textarea
                        v-model="editBuffer"
                        class="form-control form-control-sm"
                        rows="2">
                    </textarea>
                  </div>
                </div>

                <div v-if="userStore.currentUser?.name === comment.userName" class="ms-auto ps-3 d-flex gap-2">

                  <template v-if="editingUuid !== comment.commentUuid">
                    <button type="button" class="btn btn-sm btn-outline-info" @click="startEdit(comment)">編集</button>
                    <button type="button" class="btn btn-sm btn-outline-danger"
                            @click="deleteComment(comment.commentUuid)">削除
                    </button>
                  </template>

                  <template v-else>
                    <button type="button" class="btn btn-sm btn-success" @click="handleUpdate(comment.commentUuid)">
                      保存
                    </button>
                    <button type="button" class="btn btn-sm btn-secondary" @click="cancelEdit">キャンセル</button>
                  </template>

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
import {onMounted, onUnmounted, ref} from "vue";
import {useCommentStore} from "@/stores/Comment";
import {useUserStore} from "@/stores/User";

const commentStore = useCommentStore();
const userStore = useUserStore();

const editingUuid = ref<string | null>(null);
const editBuffer = ref<string>("");

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


function startEdit(comment: any) {
  editingUuid.value = comment.commentUuid;
  editBuffer.value = comment.content;
}

function cancelEdit() {
  editingUuid.value = null;
  editBuffer.value = "";
}

async function handleUpdate(uuid: string) {
  const success = await commentStore.updateComment(uuid, editBuffer.value);
  if (success) {
    const index = commentStore.commentsList.findIndex(c => c.commentUuid === uuid);
    if (index !== -1) {
      commentStore.commentsList[index].content = editBuffer.value;
    }
    editingUuid.value = null;
  }
}

async function deleteComment(commentUuid: string) {
  await commentStore.deleteComment(commentUuid);
}


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