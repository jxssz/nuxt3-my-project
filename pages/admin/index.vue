<template>
  <div>
    <ClientOnly>
      <!-- <Editor /> -->
      <WangEditor />
    </ClientOnly>
  </div>
</template>
<script setup>
// import Editor from "../components/editor.vue";
import WangEditor from "../components/wangeditor.vue";
// import { defineAsyncComponent } from "vue";

// const WangEditor = defineAsyncComponent(() =>
//   import("../components/wangeditor.vue")
// );
</script>
