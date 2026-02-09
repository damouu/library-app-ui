<template>
  <h3>以下の{{ cartStore.items.length }}冊を貸し出しで宜しでしょうか</h3>
</template>

<script lang="ts" setup>

import {useCartStore} from "@/stores/Cart";

const cartStore = useCartStore();

</script>