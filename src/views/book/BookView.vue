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

    <div>
      <Comments :chapterUuid="props.chapterUuid" , :page="0" :size="5" class="mt-5"/>
    </div>

    <div v-if="commentStore.commentsList?.length > 0" class="mt-4">

      <Pagination
          :total-pages="commentStore.pagination.totalPages"
          :current-page="commentStore.pagination.currentPage"
          :is-first="commentStore.pagination.isFirst"
          :is-last="commentStore.pagination.isLast"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import ResourceDataShow from "@/components/book/RessourceDataShow.vue";
import Comments from "@/components/ui/Comment.vue";
import Pagination from "../../components/common/Pagination.vue"
import {useCommentStore} from "@/stores/Comment";
import {useInventoryStore} from "@/stores/Inventory";
import {useCartStore} from "@/stores/Cart";
import {onMounted, onUnmounted} from "vue";
import CopiesAvailable from "@/components/book/CopieAvailable.vue";
import NoCopiesAvailable from "@/components/book/NoCopieAvailable.vue";

const commentStore = useCommentStore();
const inventoryStore = useInventoryStore();
const cartStore = useCartStore();

const props = defineProps<{
  chapterUuid: string
}>();

onMounted(() => {
  inventoryStore.checkAvailability(props.chapterUuid);
});

onUnmounted(() => {
  inventoryStore.currentChapter = null;
})

</script>