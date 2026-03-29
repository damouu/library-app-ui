<template>
  <div class="row mt-5">
    <div>
      <ResourceDataShow :chapterUuid="props.chapterUuid">
        <template #action-button>
          <div v-if="inventoryStore.isLoading" class="spinner-border text-primary spinner-border-sm"/>

          <div v-else>
            <div v-if="userStore.isAuthenticated">


              <div v-if="userStore.hasUnreturnedBorrows"
                   class="unreturned-warning p-3 rounded-4 border bg-warning-subtle text-warning-emphasis shadow-sm">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>未返却の書籍があります</strong>
                <p class="x-small mb-0 mt-1">新しい本を借りる前に、返却手続きを完了してください。</p>
              </div>

              <div v-else-if="inventoryStore.currentChapter">
                <div v-if="cartStore.items.some(item => item.chapter.chapter_uuid === props.chapterUuid)">
                  <h4 class="text-warning h6 fw-bold">
                    カートに入りました <i class="bi bi-check-circle-fill ms-1"/>
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

            <div v-else>
              <router-link :to="{ name: 'login' }" class="btn btn-outline-primary rounded-pill px-4">
                <i class="bi bi-box-arrow-in-right me-2"></i>
                ログインして予約する
              </router-link>
              <p class="x-small text-muted mt-2">カートに入れるにはログインが必要です</p>
            </div>
          </div>
        </template>
      </ResourceDataShow>

      <div class="mt-5">
        <NextChapters/>
      </div>

      <div class="container py-4">
        <Comments :chapterUuid="props.chapterUuid" :page="page" :size="5"/>

        <Pagination
            v-if="commentStore.pagination.totalPages > 1"
            :totalPages="commentStore.pagination.totalPages"
            :currentPage="page"
            :isFirst="commentStore.pagination.isFirst"
            :isLast="commentStore.pagination.isLast"
            @changePage="handlePageChange"
        />

        <div class="mt-4">
          <CommentInput v-if="userStore.isAuthenticated" :chapterUuid="props.chapterUuid"/>

          <div v-else class="text-center p-5 bg-light rounded-4 border border-dashed">
            <i class="bi bi-chat-left-dots text-muted fs-2 mb-3 d-block"></i>
            <h6 class="fw-bold text-dark">コメントを投稿しませんか？</h6>
            <p class="small text-muted mb-4">感想を共有するにはログインが必要です。</p>
            <router-link
                :to="{ name: 'login' }"
                class="btn btn-primary rounded-pill px-4 shadow-sm"
            >
              ログインして参加する
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ResourceDataShow from "@/components/book/RessourceDataShow.vue";
import Comments from "@/components/ui/Comment.vue";
import NextChapters from "@/components/book/NextChapters.vue";
import CommentInput from "@/components/ui/CommentPost.vue";
import {useCommentStore} from "@/stores/Comment";
import {useInventoryStore} from "@/stores/Inventory";
import {useCartStore} from "@/stores/Cart";
import {useUserStore} from "@/stores/User";
import {onMounted, onUnmounted, ref, watch} from "vue";
import CopiesAvailable from "@/components/book/CopieAvailable.vue";
import NoCopiesAvailable from "@/components/book/NoCopieAvailable.vue";
import Pagination from "@/components/common/Pagination.vue";

const commentStore = useCommentStore();
const inventoryStore = useInventoryStore();
const cartStore = useCartStore();
const userStore = useUserStore();

const page = ref<number>(0);

const props = defineProps<{
  chapterUuid: string
}>();


async function handlePageChange(newPage: number) {
  page.value = newPage;
  await commentStore.getChapter(newPage + 1, 5, props.chapterUuid);
}


onUnmounted(() => {
  inventoryStore.currentChapter = null;
})


const loadPageData = async (uuid: string) => {
  inventoryStore.currentChapter = null;
  page.value = 0;
  await inventoryStore.checkAvailability(uuid);
  await commentStore.getChapter(1, 5, uuid);
};


onMounted(async () => {
  await loadPageData(props.chapterUuid);

  setTimeout(() => {
    window.scrollTo({top: 0, behavior: 'instant'});
  }, 50);
});

watch(
    () => props.chapterUuid,
    async (newUuid) => {
      if (newUuid) {
        await loadPageData(newUuid);

        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    }
);

onUnmounted(() => {
  inventoryStore.currentChapter = null;
});
</script>