<template>
  <div>
    <!-- <Sidebar /> -->
    <a-form layout="vertical">
      <a-form-item>
        <a-input
          placeholder="输入标题（必填）"
          type="text"
          v-model:value="data.title" />
      </a-form-item>
      <a-form-item>
        <a-textarea
          placeholder="输入概述，用于展示概述"
          :rows="5"
          v-model:value="data.description" />
      </a-form-item>
    </a-form>

    <!-- <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode" />
        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="data.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated" />
      </div> -->
    <div id="editor"></div>
    <div class="flex justify-end p-5">
      <a-button type="primary" @click="save">保存</a-button>
    </div>
  </div>
</template>
<script setup>
// import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick } from "vue";
// import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Quill from "quill";

window.hljs = hljs;

let quill = null;
const toolbarOptions = {
  container: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1, class: "12312" }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ],
  handlers: {
  },
};
// const mode = "default"; // 或 'simple'

// 编辑器实例，必须用 shallowRef
// const editorRef = shallowRef();
// 内容 HTML
// const valueHtml = ref("<p>hello</p>");
const data = ref({
  title: "",
  description: "",
  content: "",
});
// watch(data, (val) => {
//   console.log(val);
// });
// 模拟 ajax 异步获取内容
onMounted(() => {
  quill = new Quill("#editor", {
    theme: "snow",
    modules: {
      syntax: { hljs },
      toolbar: toolbarOptions,
      table: false
      // "emoji-toolbar": true,
      // "emoji-textarea": false,
      // "emoji-shortname": true,
    },
  });
});

const save = () => {
  console.log(quill.root.innerHTML);
  const params = {
    title: data.value.title,
    description: data.value.description,
    content: quill.root.innerHTML,
    author_id: "1",
  };
  fetch(useRuntimeConfig().public.apiBase + "/api/save", {
    method: "post",
    headers: {
      "Content-Type": "application/json", // 设置请求头，表示请求体是 JSON 格式
    },
    body: JSON.stringify(params),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>
