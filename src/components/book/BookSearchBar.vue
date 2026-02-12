<template>
  <div class="input-group ps-1">
    <i class="input-group-text bi bi-search "></i>
    <input id="search-input" v-model="input" aria-describedby="basic-addon1" aria-label="Username" class="form-control"
           placeholder="Search a Book"
           type="text" @input="onInput">
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import debounce from "lodash/debounce"

let input = ref<String>("");

const emit = defineEmits<{ (e: 'inputEmit', userInput: String) }>()

const onInput = debounce(() => {
  if (input.value) {
    emit('inputEmit', input.value);
  } else if (input.value == "") {
    emit('inputEmit', null);
  }
}, 1000)


</script>