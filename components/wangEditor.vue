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
      insertImage: {
        async parseImageSrc(src) {
          // console.log("转换图片链接", src);
          // 创建一个Promise
          const loadImagePromise = new Promise((resolve, reject) => {
            // 创建一个新的Image对象
            var img = new Image();
            // 设置Image对象的src属性，加载Base64编码的图片
            img.src = src;
            // 当图片加载完成后执行以下操作
            img.onload = function () {
              // 获取图片的宽度和高度
              var width = this.width;
              var height = this.height;
              // 输出图片的宽度和高度
              // console.log("Width:", width);
              // console.log("Height:", height); // 创建一个Canvas元素
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              // 将图片绘制到Canvas上
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0);
              // 压缩图片（这里可以调整压缩质量和尺寸）
              var compressedImageData = canvas.toDataURL("image/jpeg", 0.5); // 压缩质量为0.5
              // 将Data URI转换为Blob对象
              function dataURItoBlob(dataURI) {
                var byteString = atob(dataURI.split(",")[1]);
                var mimeString = dataURI
                  .split(",")[0]
                  .split(":")[1]
                  .split(";")[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                  ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], { type: mimeString });
              }
              // 创建一个新的Blob对象，表示压缩后的图片数据
              var compressedImageBlob = dataURItoBlob(compressedImageData);
              var srcBlob = dataURItoBlob(src);
              // 计算压缩前后图片的内存大小
              var originalFileSize = srcBlob.size;
              var compressedFileSize = compressedImageBlob.size;
              // console.log("原始图片大小:", originalFileSize / 1024, "kb");
              // console.log("压缩后图片大小:", compressedFileSize / 1024, "kb");
              // console.log("-----------------------------------------");
              // 将Canvas中的图像转换为WebP格式
              canvas.toBlob(function (blob) {
                // 创建一个URL对象，表示生成的WebP图像
                var webpURL = URL.createObjectURL(blob);

                // 解决Promise并返回生成的WebP图像的URL
                resolve({ webpURL, compressedImageData });
              }, "image/webp");
              // 解决Promise并返回修改后的file对象
              // resolve(compressedImageData);
            };
          });
          const { webpURL, compressedImageData } = await loadImagePromise;
          const result = await fetch(webpURL);
          // console.log(result.blob());

          const formData = new FormData();
          formData.append("image", await result.blob(), "image.webp");

          return await new Promise((res, rej) => {
            fetch(useRuntimeConfig().public.apiUpload, {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("上传成功:", data);
                res(
                  useRuntimeConfig().public.static + "/" + data.file.filename
                );
              })
              .catch((error) => {
                console.error("上传失败:", error);
                res(compressedImageData);
              });
          });

          // const uploadedJson = uploaded.json();
          // console.log(uploadedJson);
          // if (uploadedJson.file) {
          //   // 等待Promise执行完成并返回结果
          //   return (
          //     useRuntimeConfig().public.static + uploadedJson.file.filename
          //   );
          // }
        },
        async onInsertedImage(file) {
          // console.log("插入之前", file);
        },
      },
      uploadImage: {
        fieldName: "like-yuque-fileName",
        base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
        onBeforeUpload(file) {
          console.log("更新图片之前", file);
        },
        customInsert(file) {
          console.log("插入图片customInsert", file);
        },
      },
    },
    uploadImgShowBase64: true,
  };
  // editorConfig.placeholder = "请输入内容";
  // editorConfig.scroll = false; // 禁止编辑器滚动
  // editorConfig.MENU_CONF["uploadImage"] = {
  //   fieldName: "like-yuque-fileName",
  //   base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
  // };
  // editorConfig.onChange = (editor) => {
  //   console.log('content', editor.children)
  //   // data.value.content = 
  // };

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
    // console.log(editor.getHtml());
    data.value.content = editor.getHtml() || "";
    // 定义正则表达式来匹配base64图片的完整字符串
    // const regex = /data:image\/\w+;base64,([^"]+)/g;
    // // 用正则表达式匹配所有base64图片的完整字符串，并打印出来
    // let match;
    // const promises = [];
    // while ((match = regex.exec(data.value.content)) !== null) {
    //   // 使用闭包来捕获每次迭代的match[0]值
    //   (function (match) {
    //     // 压缩base64图片并保存promise
    //     promises.push(
    //       compressBase64Image(match[0], 0.5) // quality设置为0.5，表示压缩质量为50%
    //         .then((compressedBase64) => {
    //           // 将压缩后的base64字符串替换原有位置
    //           data.value.content = data.value.content.replace(
    //             match[0],
    //             compressedBase64
    //           );
    //           // 打印压缩前后的结果
    //           console.log("原始base64图片：", match[0]);
    //           console.log("压缩后的base64图片：", compressedBase64);
    //           console.log(
    //             "--------------------------------------",
    //             data.value.content
    //           );
    //         })
    //     );
    //   })(match);
    // }
    // // 等待所有压缩操作完成
    // Promise.all(promises)
    //   .then(() => {
    //     console.log("所有图片压缩完成");
    //   })
    //   .catch((error) => {
    //     console.error("压缩base64图片时出错：", error);
    //   });
  });
});
// 压缩base64图片的函数
function compressBase64Image(base64String, quality) {
  const canvas = document.createElement("canvas");
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // 将画布上的图像转换为base64格式
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedBase64);
    };

    img.onerror = reject;
    img.src = base64String;
  });
}
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
