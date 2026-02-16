<template>
  <button class="btn btn-primary" type="button" @click="openFilterModal">
    <i class="bi bi-filter"> 検索条件</i>
  </button>

  <SeriesFilterModal
      v-if="showModal"
      @close="showModal = false"
      @confirm="emitFilter"
  />
</template>

<script lang="ts" setup>
import {ref} from "vue";
import SeriesFilterModal from "@/components/ui/SeriesFilterModal.vue";

const emit = defineEmits(['confirm']);
const showModal = ref(false);

const openFilterModal = () => {
  showModal.value = true;
};

const emitFilter = (filterData: any) => {
  emit('confirm', filterData);
  showModal.value = false;
};

</script>