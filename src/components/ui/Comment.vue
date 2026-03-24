<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-9">

        <div class="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
          <h5 class="fw-bold text-dark mb-0">
            <i class="bi bi-chat-right-dots-fill text-primary me-2"></i>
            コメント <span class="badge bg-light text-primary ms-2 shadow-sm border">{{
              commentStore.commentsList?.length || 0
            }}</span>
          </h5>
        </div>

        <div v-if="commentStore.commentsList && commentStore.commentsList.length > 0">
          <div
              v-for="comment in commentStore.commentsList"
              :key="comment.commentUuid"
              class="comment-item mb-4 animate-fade-in"
          >
            <div class="d-flex align-items-start">
              <div class="avatar-wrapper me-3">
                <img
                    :src="comment.avatar_URL || '/default-avatar.png'"
                    class="rounded-circle comment-avatar shadow-sm"
                    alt="Avatar"
                >
              </div>

              <div class="flex-grow-1">
                <div class="d-flex align-items-center mb-2">
                  <span class="fw-bold text-dark me-2">{{ comment.userName }}</span>
                  <span class="x-small text-muted bg-light px-2 py-1 rounded">
                    {{ formatDate(comment.createdAt) }}
                  </span>

                  <span v-if="userStore.currentUser?.name === comment.userName"
                        class="badge rounded-pill bg-primary-subtle text-primary ms-2 x-small border border-primary-subtle">
                    あなた
                  </span>
                </div>

                <div class="content-bubble p-3 rounded-4 shadow-sm mb-2"
                     :class="{ 'editing-mode': editingUuid === comment.commentUuid }">

                  <p v-if="editingUuid !== comment.commentUuid"
                     class="mb-0 comment-text"
                     style="white-space: pre-line;">
                    {{ comment.content }}
                  </p>

                  <div v-else>
                    <textarea
                        v-model="editBuffer"
                        class="form-control border-0 bg-transparent p-0 edit-textarea"
                        rows="3"
                        placeholder="コメントを編集..."
                        ref="editField">
                    </textarea>
                    <div class="d-flex justify-content-end gap-2 mt-2 pt-2 border-top border-secondary-subtle">
                      <button class="btn btn-sm btn-link text-secondary text-decoration-none" @click="cancelEdit">
                        キャンセル
                      </button>
                      <button class="btn btn-sm btn-primary rounded-pill px-3"
                              @click="handleUpdate(comment.commentUuid)">保存する
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="userStore.currentUser?.name === comment.userName && editingUuid !== comment.commentUuid"
                     class="d-flex gap-3 ms-2">
                  <button @click="startEdit(comment)" class="btn-action">
                    <i class="bi bi-pencil-square me-1"></i> 編集
                  </button>
                  <button @click="deleteComment(comment.commentUuid)" class="btn-action text-danger">
                    <i class="bi bi-trash3 me-1"></i> 削除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5 opacity-75">
          <i class="bi bi-chat-dots display-6 text-muted"></i>
          <p class="mt-3 text-muted">まだコメントはありません。最初の一歩を踏み出しませんか？</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from "vue";
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

const loadComments = async () => {
  await commentStore.getChapter(
      props.page,
      props.size,
      props.chapterUuid,
  );
};

onMounted(() => {
  loadComments();
});

watch(() => props.chapterUuid, async (newUuid) => {
  if (newUuid) {
    commentStore.commentsList = null;
    await loadComments();
  }
});


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