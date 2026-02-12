<template xmlns="http://www.w3.org/1999/html">
  <div class="container text-center " v-if="cartStore.lastTransaction">
    <i class="bi bi-check-circle-fill text-success h1"></i>
    <h2 class="mt-2">貸出完了！</h2>

    <div class="mt-3 p-3 bg-light rounded">
      <h5><strong>注文番号:</strong> {{ cartStore.lastTransaction.borrow_UUID }}</h5>
      <div class="row justify-content-center mt-4">
        <div class="col-12 col-md-8">
          <div class="d-flex justify-content-center gap-4 text-center">
            <div>
              <h5><strong>貸出日:</strong> {{ cartStore.lastTransaction.start_borrow_date }} </h5>
            </div>
            <div class="text-danger">
              <h5><strong>返却期限:</strong> {{ cartStore.lastTransaction.end_borrow_date }} </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-3 mt-3">
          <h5 class="mb-3">お手数をおかけいたしますが、窓口までお越し頂き、図書をお受け取りください。</h5>
          <CartGrid/>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h5 class="text-danger mt-2">※返却期限を過ぎた場合、1日につき500円の延滞金が発生いたします。ご注意ください。</h5>
        </div>
      </div>
    </div>

    <router-link to="home" class="btn btn-warning mt-4">
      ホムページへ
    </router-link>
  </div>

  <div v-else class="text-center py-5">
    <p>取引データが見つかりません。</p>
    <router-link to="/">トップへ戻る</router-link>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "@/stores/Cart";
import CartGrid from "@/components/ui/CartGrid.vue";

const cartStore = useCartStore();
</script>