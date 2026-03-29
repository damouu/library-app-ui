<template>
  <div class="container py-4">
    <div class="row g-2">
      <div class="col-12">
        <Calculator/>
      </div>

      <div class="col-12">
        <CheckoutInfo class="text-center"/>
      </div>

      <div class="col-12">
        <CheckoutGrid/>
      </div>
    </div>

    <div class="row mt-1">
      <div class="col-12 d-flex justify-content-center mt-5">
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