<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <Calculator/>
      </div>
      <div class="col-12 mt-3">
        <CheckoutInfo class="mt-3 text-center"/>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-5 mt-5">
        <CheckoutGrid/>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-12 d-flex justify-content-center">
        <BorrowButton/>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import CheckoutGrid from "@/components/ui/CheckoutGrid.vue";
import BorrowButton from "@/components/ui/BorrowButton2.vue";
import CheckoutInfo from "@/components/ui/CheckoutInfo.vue";
import Calculator from "@/components/common/CalculateDates.vue";
</script>