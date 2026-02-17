<template>
  <div class="row">
    <section class="mb-4">
      <TitleMessage title="the given book UUID does not exist."/>
    </section>
  </div>
  <div class="row">
    <main class="col-12">
      <TableList :page="pageNumber"/>
    </main>
  </div>
  <div class="row">
    <section class="mt-4">
      <PaginationTable @pageNumberEmit="pageEmitReceived"/>
    </section>
  </div>
</template>

<script lang="ts" setup>
import TitleMessage from "@/components/common/TitleMessage.vue";
import TableList from "@/components/ui/TableList.vue";
import PaginationTable from "@/components/ui/PaginationTable.vue";
import {ref} from "vue";

const pageNumber: Number = ref(0);

function pageEmitReceived(page): void {
  pageNumber.value = page;
}
</script>