<template>
  <section class=" max-w-3xl m-auto">
    首页
    <!-- <a-button type="primary">Primary Button</a-button> -->
    <!-- <ul>
      <li v-for="(item, index) in result" :key="index">
        <article>
          <NuxtLink :to="`/article/${item.id}`">
            <h3>{{ item.title }}</h3>
          </NuxtLink>
          <section>{{ item.content }}</section>
        </article>
      </li>
    </ul> -->
  </section>
</template>
<script setup>
const config = useRuntimeConfig()
console.log(config)
// const { data, pending, error, refresh } = await useAsyncData(() =>
//   $fetch("http://localhost:8080/api/posts")
// );
// const {result} = await $fetch("http://localhost:8080/api/posts")
// console.log(result);
</script>
