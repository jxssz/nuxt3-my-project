<template>
  <section>
    <div class="ql-snow max-w-3xl m-auto px-3">
      <div class="ql-editor px-0">
        <div>{{ result.title }}</div>
        <div class="" v-html="result.content"></div>
      </div>
    </div>
  </section>
</template>
<script setup>
// import "quill/dist/quill.core.css";
const route = useRoute();
const { result } = await $fetch(
  useRuntimeConfig().public.apiBase  + "/api/posts/" + route.params.id
);
console.log(route, result);
useHead({
  title: '' + result.title,
  meta: [
    { name: 'description', content: result.title + '-详情' }
  ]
})
</script>
<style scoped>
.ql-snow {
}
</style>
