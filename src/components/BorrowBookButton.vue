<template>
  <button @click="borrowBook" class="btn btn-success btn-lg" type="button"><i class="bi bi-journal-bookmark-fill">&nbsp;&nbsp;Borrow</i>
  </button>
</template>

<script lang="ts" setup>

import {useBookStore} from "@/stores/Book";
import {inject} from "vue";

const axios: any = inject('axios');

function borrowBook(): void {
  const bookStore = useBookStore();
  axios.post('/book/' + bookStore.book.uuid + '/studentCard/e1ff5d63-c8fb-4411-876d-dabafcfc4b7d');
}
</script>