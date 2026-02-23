<template>
  <div class="row mt-5">

    <div>

      <ResourceDataShow :chapterUuid="props.chapterUuid"/>

      <div class="mt-3">
        <div v-if="inventoryStore.isLoading" class="spinner-border text-primary"/>

        <div v-else>

          <div v-if="inventoryStore.currentChapter">
            <div v-if="cartStore.items.some(item => item.chapter.chapter_uuid === props.chapterUuid)">
              <h4 class="text-warning ">カートに入りました
                <i class="bi-check-circle"/>
              </h4>
            </div>
            <div v-else>
              <CopiesAvailable/>
            </div>
          </div>

          <div v-else>
            <NoCopiesAvailable/>
          </div>

        </div>
      </div>

    </div>

    <div class="mt-5">

      <Comments
          :chapterUuid="props.chapterUuid"
          :page="page"
          :size="5"
      />

      <template v-if="!commentStore.isLoading">

        <div v-if="commentStore.pagination.totalPages > 1" class="mt-4">

          <Pagination
              :total-pages="commentStore.pagination.totalPages"
              :current-page="commentStore.pagination.currentPage"
              :is-first="commentStore.pagination.isFirst"
              :is-last="commentStore.pagination.isLast"
              @change-page="handlePageChange"
          />

        </div>

        <div
            v-else-if="commentStore.commentsList?.length === 0"
            class="text-center py-5 border rounded-3 bg-light mt-4"
        >
          <i class="bi bi-chat-left-dots text-muted fs-1"></i>
          <p class="mt-2 text-secondary fw-semibold">まだコメントはありません</p>
          <p class="small text-muted">最初の感想をシェアしませんか？</p>
        </div>

      </template>
    </div>

    <div class="mt-4">
      <CommentInput
          v-if="userStore.currentUser?.name"
          :chapterUuid="props.chapterUuid"
      />

      <div v-else class="p-4 border rounded-3 bg-light text-center">
        <p class="text-muted mb-3">コメントを投稿するにはログインが必要です</p>
        <router-link to="/login" class="btn btn-outline-primary">
          <i class="bi bi-box-arrow-in-right me-2"></i>ログインする
        </router-link>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import ResourceDataShow from "@/components/book/RessourceDataShow.vue";
import Comments from "@/components/ui/Comment.vue";
import CommentInput from "@/components/ui/CommentPost.vue";
import Pagination from "../../components/common/Pagination.vue"
import {useCommentStore} from "@/stores/Comment";
import {useUserStore} from "@/stores/User";
import {useInventoryStore} from "@/stores/Inventory";
import {useCartStore} from "@/stores/Cart";
import {onMounted, onUnmounted, ref} from "vue";
import CopiesAvailable from "@/components/book/CopieAvailable.vue";
import NoCopiesAvailable from "@/components/book/NoCopieAvailable.vue";

const commentStore = useCommentStore();
const inventoryStore = useInventoryStore();
const userStore = useUserStore();
const cartStore = useCartStore();
const page = ref<number>(0);

const props = defineProps<{
  chapterUuid: string
}>();


async function handlePageChange(newPage: number) {
  page.value = newPage;

  await commentStore.getChapter(newPage + 1, 5, props.chapterUuid);
}

onMounted(() => {
  inventoryStore.checkAvailability(props.chapterUuid);
});

onUnmounted(() => {
  inventoryStore.currentChapter = null;
})

</script>