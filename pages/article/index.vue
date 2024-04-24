<template>
  <section>
    <ul class="max-w-3xl m-auto overflow-hidden p-5">
      <li class="leading-10" v-for="(item, index) in list" :key="index">
        <article>
          <NuxtLink :to="`/article/detail/${item.id}`">
            <h3
              class="text-lg transition duration-500 transform hover:translate-x-2 hover:text-blue py-3">
              {{ item.title }}
            </h3>
          </NuxtLink>
          <div class="flex items-center text-xs space-x-3">
            <span class="flex items-center text text-neutral-400">
              <span class="icon-[line-md--watch] mr-1"></span>
              {{ item.view }}
            </span>
            <time class="flex items-center text text-neutral-400">
              <span class="icon-[line-md--gauge]  mr-1"></span>{{ item._updated_at }}
            </time>
          </div>

          <section class="line-clamp-3">{{ item.description || '' }}</section>
        </article>

        <!-- 一条横向分割线 -->
        <hr
          v-if="list.length > index + 1"
          class="border-t-1 border-gray-light my-4" />
      </li>
    </ul>
  </section>
</template>
<script setup>
import moment from "@static/js/moment";
// console.log(moment)
const { data, pending, error, refresh } = await useAsyncData(() =>
  $fetch(useRuntimeConfig().public.apiBase + "/api/posts")
);
const list = ref(data.value.result || []);
list.value.forEach((item) => {
  item._updated_at = moment(item.updated_at).format("ll");
});
// const result = ref(data.result)
// const { result } = await $fetch("http://localhost:8080/api/posts");
// console.log(result);
// console.log(data)
</script>
