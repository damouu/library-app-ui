<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: isFirst }">
        <a
            class="page-link"
            href="#"
            @click.prevent="(e) => {
            $emit('changePage', currentPage - 1);
            (e.target as HTMLElement).blur(); }">
          前へ
        </a>
      </li>

      <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: (page - 1) === currentPage }"
      >
        <a
            class="page-link"
            href="#"
            @click.prevent="(e) => {
            $emit('changePage', page - 1);
            (e.target as HTMLElement).blur();}">
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: isLast }">
        <a class="page-link" href="#" @click.prevent="(e) => {
            $emit('changePage', currentPage + 1);
            (e.target as HTMLElement).blur(); }">
          次へ
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalPages: number,
  currentPage: number,
  isLast: boolean,
  isFirst: boolean,
}>();

defineEmits(['changePage']);

</script>