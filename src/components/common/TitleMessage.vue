<template>
  <H2 class="text-primary-emphasis text-center mb-5 mt-5">{{ props.title }}</H2>

  <table>
    <tr>
      <th>Avatar</th>
      <th><img src="https://avatar.iran.liara.run/username?username=test123456+test123456" width="50" height="50">
      </th>
      <th><img src="https://avatar.iran.liara.run/username?username=test123456+test123456" width="50" height="60">
      </th>
      <th><img src="https://avatar.iran.liara.run/username?username=test123456+test123456" width="50" height="60">
      </th>
      <th><img src="https://avatar.iran.liara.run/username?username=test123456+test123456" width="50" height="60">
      </th>
    </tr>
    <tr>
      <td>Ugur</td>
      <td>Damso</td>
      <td>Bilal</td>
    </tr>
    <tr>
      <td>でで</td>
      <td>いい札でした</td>
      <td>つまらない</td>
    </tr>
  </table>
</template>

<script setup lang="ts">

const props = defineProps({
  title: {type: String, required: true},
});
</script>