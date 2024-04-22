<template>
  <nav class="h-12 w-full">
    <div
      id="nav"
      class="w-full"
      style="z-index: 999">
      <ul
        class="mx-auto max-w-3xl flex justify-end space-x-5 px-5 h-12 items-center">
        <li class="flex space-x-28" v-for="item in list" :key="item">
          <NuxtLink :to="item.url" class="active:text-blue">{{
            item.title
          }}</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
const list = [
  {
    title: "首页",
    url: "/",
  },
  {
    title: "日志",
    url: "/article",
  },
  {
    title: "发布",
    url: "/admin",
  },
  {
    title: "关于",
    url: "/about",
  },
  {
    title: 'test',
    url: '/test'
  }
];
onMounted(() => {
  const navbar = document.getElementById("nav");
  console.log(window.scrollY);
  const scrollThreshold = 400; // 设置触发渐入和吸顶效果的滚动阈值
  // 检查当前滚动距离
  if (window.scrollY > scrollThreshold) {
    // 滚动距离大于阈值，添加样式类
    navbar.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "shadow-md",
      "bg-white"
    );
    // 添加动画效果
    // navbar.classList.remove("opacity-0", "-translate-y-full");
  }
  document.addEventListener("scroll", function () {
    // 检查当前滚动距离
    if (window.scrollY > scrollThreshold) {
      // 滚动距离大于阈值，添加样式类
      navbar.classList.add(
        "fixed",
        "top-0",
        "left-0",
        "shadow-md",
        "bg-white"
      );
      // 添加动画效果
      // navbar.classList.remove("opacity-0", "-translate-y-full");
    } else {
      // 滚动距离小于或等于阈值，移除样式类
      navbar.classList.remove(
        "fixed",
        "top-0",
        "left-0",
        "shadow-md",
        "bg-white"
      );
      // 添加隐藏动画效果
      // navbar.classList.remove("transition-transform", "transition-opacity", "duration-300", "opacity-1", "-translate-y-full");
      // navbar.classList.add("opacity-1", "-translate-y-full");
    }
  });
});
</script>
