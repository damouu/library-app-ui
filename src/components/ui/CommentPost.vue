<template>
  <div class="row justify-content-center mt-4">
    <div class="col-12 col-md-10 col-lg-9">

      <div class="comment-input-card p-4 rounded-4 shadow-sm border-0 bg-white">
        <div class="d-flex align-items-center mb-3">
          <div class="icon-circle bg-primary-subtle me-3">
            <i class="bi bi-chat-square-text-fill text-primary"></i>
          </div>
          <h6 class="fw-bold text-dark mb-0">感想を投稿する</h6>
        </div>

        <div class="position-relative">
          <textarea
              v-model="commentText"
              class="form-control custom-textarea mb-2"
              rows="3"
              placeholder="この巻の感想を共有しましょう..."
              :disabled="isSubmitting"
              maxlength="500"
          ></textarea>

          <div class="char-counter" :class="{ 'text-danger': commentText.length >= 500 }">
            {{ commentText.length }}/500
          </div>
        </div>

        <div class="d-flex justify-content-end align-items-center mt-2">
          <button
              class="btn btn-primary px-4 rounded-pill fw-bold shadow-sm btn-submit"
              :disabled="!isValid || isSubmitting"
              @click="submitComment"
          >
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
            {{ isSubmitting ? '送信中...' : 'コメントを投稿' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useCommentStore} from '@/stores/Comment';

const props = defineProps<{
  chapterUuid: string
}>();

const emit = defineEmits(['comment-added']);

const commentStore = useCommentStore();


const commentText = ref('');
const isSubmitting = ref(false);


const isValid = computed(() => {
  return commentText.value.trim().length > 0 && commentText.value.length <= 500;
});

const submitComment = async () => {
  if (!isValid.value) return;

  isSubmitting.value = true;

  try {

    await commentStore.postComment(props.chapterUuid, commentText.value.trim());

    commentText.value = '';

    emit('comment-added');

  } catch (error) {
    console.error("Failed to post comment", error);

  } finally {
    isSubmitting.value = false;
  }
};
</script>