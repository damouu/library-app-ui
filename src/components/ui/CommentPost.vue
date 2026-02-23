<template>
  <div class=" border-0 shadow-sm mb-4">
    <div class="card-body p-3 p-md-4">

      <div class="d-flex align-items-center mb-3">
        <i class="bi bi-pencil-square text-primary me-2 fs-5"></i>
        <h6 class="fw-bold text-secondary mb-0">コメントを追加する</h6>
      </div>

      <textarea
          v-model="commentText"
          class="form-control mb-3 bg-light border-0 shadow-none"
          rows="3"
          placeholder="あなたの感想をシェアしましょう... (Share your thoughts...)"
          :disabled="isSubmitting"
      ></textarea>

      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">
          {{ commentText.length }} / 500
        </small>

        <button
            class="btn btn-primary px-4 rounded-pill fw-semibold shadow-sm"
            :disabled="!isValid || isSubmitting"
            @click="submitComment"
        >
          <span
              v-if="isSubmitting"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
          ></span>
          {{ isSubmitting ? '送信中...' : '送信する' }}
        </button>
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

// Emitting an event lets the parent component know it's time to refresh the list
const emit = defineEmits(['comment-added']);

const commentStore = useCommentStore();

// State
const commentText = ref('');
const isSubmitting = ref(false);

// Computed property to ensure they don't submit empty spaces
const isValid = computed(() => {
  return commentText.value.trim().length > 0 && commentText.value.length <= 500;
});

const submitComment = async () => {
  if (!isValid.value) return;

  isSubmitting.value = true;

  try {
    // Replace this with your actual store action method for posting

    await commentStore.postComment(props.chapterUuid, commentText.value.trim());

    // Success! Clear the box
    commentText.value = '';

    // Tell the parent to re-fetch the comments so the new one appears instantly
    emit('comment-added');

  } catch (error) {
    console.error("Failed to post comment", error);
    // Optional: Add a toast notification here if it fails
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* A tiny touch of CSS to prevent the browser's default blue glow when clicking the textarea */
.form-control:focus {
  box-shadow: inset 0 0 0 1px #0d6efd;
}
</style>