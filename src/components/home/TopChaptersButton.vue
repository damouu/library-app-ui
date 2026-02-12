<template>
  <div class="row justify-content-center mt-4">
    <div class="col-3"></div>

    <div class="col-6 text-center">
      <h2 class="m-0">
        <i class="bi bi-trophy-fill"> ランキング</i>
      </h2>
    </div>

    <div class="col-3 d-flex justify-content-end">
      <div class="btn-group" role="group">
        <button
            type="button"
            class="btn btn-outline-primary"
            :class="{ active: period === 'week' }"
            @click="updatePeriod('week')"
        >
          今週
        </button>
        <button
            type="button"
            class="btn btn-outline-primary"
            :class="{ active: period === 'lastweek' }"
            @click="updatePeriod('lastweek')"
        >
          先週
        </button>
        <button
            type="button"
            class="btn btn-outline-primary"
            :class="{ active: period === 'lastmonth' }"
            @click="updatePeriod('lastmonth')"
        >
          先月
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue';

type PeriodKey = 'week' | 'lastweek' | 'lastmonth';

const period = ref<PeriodKey>('week');

const emit = defineEmits<{
  (e: 'period', value: PeriodKey): void
}>();

function updatePeriod(newPeriod: PeriodKey) {
  period.value = newPeriod;
  emit('period', newPeriod);
}


</script>
