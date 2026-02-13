<template>
  <h3 class="text-primary">User Card data </h3>
  <br>


  <h5 class="text-success">{{ bookStore.book.studentIdCard }}</h5>
</template>

<script lang="ts" setup>
import {useBookStore} from "@/stores/Book";

const bookStore = useBookStore();

</script>