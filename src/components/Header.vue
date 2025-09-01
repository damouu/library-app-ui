<template>
  <div class="row">
    <nav class="navbar navbar-expand-lg navbar-light bg-success position-fixed fixed-top">
      <BorrowButton/>
      <div class="gx-3 mx-auto" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 text-center mt-2">
          <li class="nav-item me-3">
            <i class="bi bi-book-fill h4"></i>
            <RouterLink aria-current="page" class="nav-link active" to="/book">Books</RouterLink>
          </li>
          <li class="nav-item me-3">
            <i class="bi bi-newspaper h4"></i>
            <RouterLink aria-current="page" class="nav-link active" to="/news">Gallery</RouterLink>
          </li>
          <li class="nav-item dropdown me-3">
            <i class="bi bi-backpack2-fill h4"></i>
            <RouterLink aria-current="page" class="nav-link active" to="/student">Students</RouterLink>
          </li>
          <li class="nav-item dropdown me-3">
            <i class="bi bi-journal-bookmark-fill h4"></i>
            <RouterLink aria-current="page" class="nav-link active" to="/coures">Courses</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <i class="bi bi-mortarboard-fill h4"></i>
            <RouterLink aria-current="page" class="nav-link active" to="/teachers">Teachers</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <FormSearch/>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import BorrowButton from "@/components/BorrowButton.vue";
import FormSearch from "@/components/FormSearch.vue";
</script>