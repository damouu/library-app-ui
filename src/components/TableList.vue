<template>
  <table class="table table-dark table-hover">
    <thead>
    <tr>
      <th scope="col">uuid</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Birth date</th>
      <th scope="col">Icon</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="student in store.studentList" :key="student.uuid">
      <th scope="row">{{ student.uuid }}</th>
      <td>{{ student.name }}</td>
      <td>{{ student.email }}</td>
      <td> {{ student.dob }}</td>
      <td>
        <div v-if="student.studentIdCard">
          <router-link :to="{name: 'printData', params: {uuid: student.studentIdCard}}">
            <button class="btn btn-primary rounded  rounded-circle border border-primary">
              <i class="bi bi-person-circle"></i></button>
          </router-link>
        </div>
        <div v-else>
          <button class="rounded  rounded-circle border border-danger bg-danger">
            <i class="bi bi-ban"></i></button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {useStudentStore} from "@/stores/Student";
import {watch} from "vue";

const store = useStudentStore();
store.getStudents(props.page);

const props = defineProps({
  page: {type: Number, required: false}
});

watch(() => props.page, (first, second) => {
  store.getStudents(props.page);
});


</script>