<template>
  <div class="discovery-bar">
    <div
        class="input-group search-group shadow-sm position-relative"
        :class="{ 'has-dropdown': isOpen }"
    >

      <span class="input-group-text bg-transparent border-0 ps-4 pe-2 z-1">
        <i class="bi bi-search text-muted"></i>
      </span>

      <input
          v-model="query"
          type="search"
          class="form-control border-0 shadow-none bg-transparent align-items-center text-center"
          :placeholder="isFocused ? '' : '作品名で検索'"
          aria-label="Search"
          @focus="handleFocus"
          @blur="isFocused = false"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, ref, watch} from 'vue';

defineProps<{
  isOpen?: boolean;
}>();

const query = ref('');
const isFocused = ref(false);

const emit = defineEmits<{
  search: [query: string];
  clear: [];
  focus: [];
}>();

const handleFocus = () => {
  isFocused.value = true;
  emit('focus');
};

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(query, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer);

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    emit('clear');
    return;
  }

  debounceTimer = setTimeout(() => {
    emit('search', trimmedValue);
  }, 500);
});

const clearSearch = () => {
  query.value = '';
  emit('clear');
};

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

<style scoped>
.discovery-bar {
  width: 450px;
  flex-shrink: 0;
}

.search-group {
  background-color: #ffffff;
  border-radius: 1.5rem;
  border: 2px solid transparent;
  transition: border-radius 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}


.search-group.has-dropdown {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

.form-control {
  min-height: 52px;
  font-size: 1rem;
  padding-right: 3rem;
}

.form-control::placeholder {
  color: #94a3b8;
  font-weight: 500;
}

@media (max-width: 768px) {
  .discovery-bar {
    width: 100%;
  }
}
</style>