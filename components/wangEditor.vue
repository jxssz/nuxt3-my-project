<template>
  <div>
    <!-- <Sidebar /> -->
    <!-- <a-form layout="vertical">
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
    </a-form> -->

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
    <!-- class="flex flex-col items-center w-full" -->

    <!-- <div class="flex flex-col items-center w-full  min-h-screen">
      <Toolbar
        class="w-full"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc" />
      <Editor
        class="w-full max-w-3xl min-h-96 bg-white shadow-md"
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueHtml"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste" />
    </div> -->
    <!-- <a-affix :offset-top="0"> -->
    <a-affix :offset-top="navClientHeight">
      <div style="border-bottom: 1px solid #e8e8e8">
        <div id="editor-toolbar" class="bg-gray-light bg-opacity-5"></div>
      </div>
    </a-affix>
    <!-- </a-affix> -->
    <div id="content" class="max-w-3xl mx-auto">
      <div id="editor-container" class="mt-16 mb-8">
        <div id="title-container">
          <a-input
            v-model:value="data.title"
            :bordered="false"
            placeholder="标题" />
        </div>
        <div id="description-container">
          <a-textarea
            v-model:value="data.description"
            :bordered="false"
            placeholder="概述"
            :rows="4" />
        </div>
        <div id="editor-text-area" class="grid"></div>
      </div>
    </div>
    <div class="flex justify-end p-5 max-w-3xl mx-auto">
      <a-button type="primary" @click="save">保存</a-button>
    </div>
  </div>
</template>
<script setup>
// import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick } from "vue";
// import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// import "quill/dist/quill.bubble.css";
// import "quill/dist/quill.snow.css";
// import hljs from "highlight.js";
// import "highlight.js/styles/monokai-sublime.css";
// import Quill from "quill";
// import "@wangeditor/editor/dist/css/style.css";
// import Editor from "@wangeditor/editor-for-vue";
import "@/static/editor/editor.js";
import { message } from "ant-design-vue";
// const mode = ref("default");
const E = ref(window.wangEditor);
const data = ref({
  title: "",
  description: "",
  content: "",
});
const navClientHeight = ref(0);
// // 模拟 ajax 异步获取内容
// onMounted(() => {});
// // 编辑器实例，必须用 shallowRef，重要！
// const editorRef = shallowRef();

// // 内容 HTML
// const valueHtml = ref("<p>hello</p>");
nextTick(() => {
  navClientHeight.value = document.getElementById("nav").clientHeight || 48;
  const editorConfig = {
    placeholder: "请输入内容",
    scroll: false,
    MENU_CONF: {
      uploadImage: {
        fieldName: "like-yuque-fileName",
        base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
      },
    },
    uploadImgShowBase64: true
  };
  // editorConfig.placeholder = "请输入内容";
  // editorConfig.scroll = false; // 禁止编辑器滚动
  // editorConfig.MENU_CONF["uploadImage"] = {
  //   fieldName: "like-yuque-fileName",
  //   base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
  // };
  editorConfig.onChange = (editor) => {
    // console.log('content', editor.children)
  };

  // 先创建 editor
  const editor = E.value.createEditor({
    selector: "#editor-text-area",
    content: [],
    // html: '',
    config: editorConfig,
  });

  // 创建 toolbar
  const toolbar = E.value.createToolbar({
    editor,
    selector: "#editor-toolbar",
    config: {
      excludeKeys: "fullScreen",
    },
  });

  // 点击空白处 focus 编辑器
  document.getElementById("editor-text-area").addEventListener("click", (e) => {
    if (e.target.id === "editor-text-area") {
      editor.blur();
      editor.focus(true); // focus 到末尾
    }
  });
  setTimeout(() => {
    // valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
  editor.on("change", (e) => {
    console.log(editor.getHtml());
    data.value.content = editor.getHtml() || "";
  });
});
// 模拟 ajax 异步获取内容
onMounted(() => {});

// const toolbarConfig = {
//   excludeKeys: "fullScreen",
// };
// const editorConfig = {
//   placeholder: "请输入内容...",
//   MENU_CONF: {
//     uploadImage: {
//       base64LimitSize: 10 * 1024 * 1024, //10兆
//     },
//   },
// };

// // 组件销毁时，也及时销毁编辑器，重要！
// onBeforeUnmount(() => {
//   const editor = editorRef.value;
//   if (editor == null) return;

//   editor.destroy();
// });

// // 编辑器回调函数
// const handleCreated = (editor) => {
//   console.log("created", editor);
//   editorRef.value = editor; // 记录 editor 实例，重要！
// };
// const handleChange = (editor) => {
//   console.log("change:", editor.getHtml());
// };
// const handleDestroyed = (editor) => {
//   console.log("destroyed", editor);
// };
// const handleFocus = (editor) => {
//   console.log("focus", editor);
// };
// const handleBlur = (editor) => {
//   console.log("blur", editor);
// };
// const customAlert = (info, type) => {
//   alert(`【自定义提示】${type} - ${info}`);
// };
// const customPaste = (editor, event, callback) => {
//   console.log("ClipboardEvent 粘贴事件对象", event);

//   // 自定义插入内容
//   // editor.insertText("xxx");

//   // 返回值（注意，vue 事件的返回值，不能用 return）
//   // callback(false); // 返回 false ，阻止默认粘贴行为
//   callback(true); // 返回 true ，继续默认的粘贴行为
// };

// const insertText = () => {
//   const editor = editorRef.value;
//   if (editor == null) return;

//   editor.insertText("hello world");
// };

// const printHtml = () => {
//   const editor = editorRef.value;
//   if (editor == null) return;
//   console.log(editor.getHtml());
// };

// const disable = () => {
//   const editor = editorRef.value;
//   if (editor == null) return;
//   editor.disable();
// };

const save = () => {
  const params = {
    title: data.value.title,
    description: data.value.description,
    content: data.value.content,
    author_id: "1",
  };
  fetch(useRuntimeConfig().public.apiBase + "/api/save", {
    method: "post",
    headers: {
      "Content-Type": "application/json", // 设置请求头，表示请求体是 JSON 格式
    },
    body: JSON.stringify(params),
  })
    .then(async (res) => {
      // console.log(res.json());
      const result = await res.json();
      if (result.status != 200) {
        return message.error(result.message);
      }
      message.success("新增成功");
    })
    .catch((e) => {
      console.log(e);
      message.error(e);
    });
};
</script>
<style>
#top-container {
  border-bottom: 1px solid #e8e8e8;
  padding-left: 30px;
}

#editor-toolbar {
  width: 100%;
  background-color: #fcfcfc;
  margin: 0 auto;
}

#content {
  height: calc(100% - 40px);
  /* background-color: rgb(245, 245, 245); */
  overflow-y: auto;
  position: relative;
}

#editor-container {
  width: 100%;
  /* margin: 30px auto 150px auto; */
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}

#title-container {
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

#title-container input {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}

#description-container {
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

#description-container input {
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
  font-weight: bold;
}

#editor-text-area {
  min-height: 900px;
  margin-top: 20px;
}
</style>
