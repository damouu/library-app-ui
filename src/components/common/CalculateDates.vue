<template>
  <div class="text-center mb-4">
    <h3 class="m-0 fw-bold"> 現在の日付: {{ currentDateFormated }} &nbsp;&nbsp;
      予想返却期限日: {{ dedeFormated }}
    </h3>
  </div>
</template>

<script setup lang="ts">


const formatDate = (date: any): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


const currentDate = new Date();
const currentDateFormated = formatDate(currentDate);

const dede = currentDate;
dede.setDate(dede.getDate() + 14);

const dedeFormated = formatDate(dede);


</script>

