<template>
  <h3>User data :</h3>
  <h4>UUID : {{ studentStore.student.uuid }}</h4>
  <h4>Name : {{ studentStore.student.name }}</h4>
  <h4>Email address : {{ studentStore.student.email }}</h4>
  <h4>Date of Birth :{{ studentStore.student.dob }}</h4>
</template>

<script lang="ts" setup>
import useStudentStore from "@/stores/User";

const studentStore = useStudentStore();

</script>