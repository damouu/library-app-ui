<template>
  <H2 class="text-primary-emphasis text-center mb-5 mt-5">{{ props.title }}</H2>
</template>

<script setup lang="ts">

const props = defineProps({
  title: {type: String, required: true},
});
</script>