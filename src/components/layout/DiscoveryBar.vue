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
          @keydown="handleKeydown"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  isOpen?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];

  search: [query: string];
  submit: [query: string];

  clear: [];
  focus: [];

  navigate: [direction: "up" | "down"];
  escape: [];
}>();

const query = ref(props.modelValue);
const isFocused = ref(false);

watch(
    () => props.modelValue,
    (value) => {
      query.value = value;
    }
);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(query, (value) => {
  emit("update:modelValue", value);

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    emit("clear");
    return;
  }

  debounceTimer = setTimeout(() => {
    emit("search", trimmedValue);
  }, 500);
});

const handleFocus = () => {
  isFocused.value = true;
  emit("focus");
};

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {

    case "ArrowDown":
      event.preventDefault();
      emit("navigate", "down");
      break;

    case "ArrowUp":
      event.preventDefault();
      emit("navigate", "up");
      break;

    case "Escape":
      event.preventDefault();
      emit("escape");
      break;

    case "Enter": {
      event.preventDefault();

      const trimmedValue = query.value.trim();

      if (!trimmedValue) {
        return;
      }

      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }

      emit("submit", trimmedValue);
      break;
    }
  }
};

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>

<style scoped>
.discovery-bar {
  width: 400px;
  flex-shrink: 0;
}

.search-group {
  background-color: #ffffff;
  border-radius: 1.25rem;
  border: 2px solid transparent;

  transition:
      border-radius 0.2s ease,
      box-shadow 0.2s ease;

  width: 100%;
}

.form-control {
  min-height: 42px;
  height: 42px;

  font-size: 0.9rem;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 2.5rem;
}

.input-group-text {
  padding-top: 0;
  padding-bottom: 0;
}

.form-control::placeholder {
  color: #94a3b8;
  font-weight: 500;
}

.search-group.has-dropdown {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

@media (max-width: 768px) {
  .discovery-bar {
    width: 100%;
  }
}
</style>