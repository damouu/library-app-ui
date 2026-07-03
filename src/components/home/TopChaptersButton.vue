<template>
  <div class="row justify-content-center mt-4">
    <div class="col-3"></div>

    <div class="col-6 text-center">
      <h2 class="m-0">
        <i class="bi bi-trophy-fill"> 順位</i>
      </h2>
    </div>

    <div class="col-3 d-flex justify-content-end">
      <div class="btn-group" role="group">
        <button
            type="button"
            class="btn btn-outline-primary"
            :class="{ active: period === 'CURRENT_WEEK' }"
            @click="updatePeriod('CURRENT_WEEK')"
        >
          今週
        </button>
        <button
            type="button"
            class="btn btn-outline-primary"
            :class="{ active: period === 'LAST_WEEK' }"
            @click="updatePeriod('LAST_WEEK')"
        >
          先週
        </button>
        <button
            type="button"
            class="btn btn-outline-primary"
            :class="{ active: period === 'LAST_MONTH' }"
            @click="updatePeriod('LAST_MONTH')"
        >
          先月
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue';
import type {PeriodKey} from "@/types/analytics/PeriodKey";

const period = ref<PeriodKey>('CURRENT_WEEK');

const emit = defineEmits<{
  (e: 'period', value: PeriodKey): void
}>();

function updatePeriod(newPeriod: PeriodKey) {
  period.value = newPeriod;
  emit('period', newPeriod);
}


</script>
