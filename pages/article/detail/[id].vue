<template>
  <section class="article-main">
    <div class="max-w-3xl m-auto p-5">
      <div id="editor-content-view" class="editor-content-view">
        <h2 class="text-3xl">{{ result.title }}</h2>
        <h5 class="text-xl">{{ result.description }}</h5>
        <div class="flex justify-end items-center text-xs space-x-3">
          <span class="flex items-center text text-neutral-400">
            <span class="icon-[line-md--watch] mr-1"></span>
            {{ result.view }}
          </span>
          <time class="flex items-center text text-neutral-400">
            <span class="icon-[line-md--gauge] mr-1"></span
            >{{ result._updated_at }}
          </time>
        </div>
        <hr class="border-t-1 border-gray-light my-4" />
        <div class="content" v-html="result.content"></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import moment from "@static/js/moment";
onMounted(() => {
  const { $Prism } = useNuxtApp();
  $Prism.highlightAll();
});
const route = useRoute();
const { result } = await $fetch(
  useRuntimeConfig().public.apiBase + "/api/posts/" + route.params.id
);
result._updated_at = moment(result.updated_at).format("ll");
console.log(route, result);
useHead({
  title: "" + result.title,
  meta: [{ name: "description", content: result.title + "-详情" }],
});
</script>
<style lang="scss">
.article-main {
  .content {
    blockquote,
    dl,
    dd,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    figure,
    p,
    pre {
      margin: revert;
    }
  }
}
.ql-snow {
}
</style>
