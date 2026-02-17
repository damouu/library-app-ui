<template>
  <div class="container-fluid">
    <div class="row g-4">
      <div
          v-for="series in seriesStore.seriesList"
          :key="series.uuid"
          class="col-6 col-sm-4 col-md-3 col-lg-2 mt-4"
      >
        <router-link
            :to="{ name: 'series-details', params: { seriesUuid: series.uuid }}"
            class="text-decoration-none text-reset"
        >
          <div class="card h-100">
            <img :src="series.coverArtworkUrl" class="card-img-top" alt="Cover">
            <div class="card-body">
              <h5 class="card-title text-primary">{{ series.title }} </h5>
              <p class="card-text mb-1 small">{{ series.author }}</p>
              <p class="card-text mb-1 small"> {{ series.illustrator }}</p>
              <p class="card-text text-muted small">{{ series.genre }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSeriesStore} from "@/stores/Series";

const seriesStore = useSeriesStore();


</script>