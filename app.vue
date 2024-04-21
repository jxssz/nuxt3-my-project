<template>
  <section class="bg-gray-light bg-opacity-5 min-h-screen">
    <section class="container mx-auto">
      <Header class="mx-auto max-w-xl" />
      <section class="">
        <NuxtPage />
      </section>
    </section>
  </section>
  <a-back-top :visibility-height="500" />
</template>
<script setup>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
onMounted(() => {
  $fetch(useRuntimeConfig().public.apiBase + "/api/log");
});

useHead({
  title: '金潇的天空之城',
  meta: [
    { name: 'description', content: '一个普通的前端工程师,憧憬美好的生活！' },
    { name: 'keyword', content: 'java node javascript mysql tailtindcss 全栈 技术 博客 日志' }
  ]
})
</script>
<style>
/* .page-enter-active,
.page-leave-active {
  transition: opacity 2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
} */
</style>
