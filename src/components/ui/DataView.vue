<template>
  <div>
    <p>{{ route }}</p>
  </div>
</template>

<script setup lang="ts">

import {inject, onMounted} from "vue";
import {useRoute} from "vue-router";

const axios = inject('axios');
const route = useRoute().params.uuid;


onMounted(() => {
  axios.get('/studentIdCard/' + useRoute().params.uuid).then(response => {
  });
})

</script>