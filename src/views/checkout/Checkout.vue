<template>
  <div class="container py-4">

    <div class="row">
<!--      <div>-->
<!--        <h3 class="h4 text-center mb-2">Checkout Page</h3>-->
<!--      </div>-->
      <div>
        <CheckoutInfo class="mt-3 text-center"/>
      </div>
      <div class="col-12 mb-5 offset-1 mt-5">
        <CheckoutGrid/>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-2 offset-5 mt-4">
        <BorrowButton/>
      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import CheckoutGrid from "@/components/ui/CheckoutGrid.vue";
import BorrowButton from "@/components/ui/BorrowButton2.vue";
import CheckoutInfo from "@/components/ui/CheckoutInfo.vue";
</script>