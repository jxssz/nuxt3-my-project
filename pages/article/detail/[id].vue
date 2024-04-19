<template>
  <section>
    <div class="ql-snow max-w-3xl m-auto px-3">
      <div class="ql-editor">
        <div>{{ result.title }}</div>
        <div class="" v-html="result.content"></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import "quill/dist/quill.core.css";
const route = useRoute();
const { result } = await $fetch(
  "http://localhost:8080/api/posts/" + route.params.id
);
console.log(route, result);
</script>
<style scoped>
</style>
