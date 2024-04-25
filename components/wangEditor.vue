<template>
  <div>
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
import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick } from "vue";
import "@/static/editor/editor.js";
import { message } from "ant-design-vue";
const E = ref(window.wangEditor);
const data = ref({
  title: "",
  description: "",
  content: "",
});
const navClientHeight = ref(0);
nextTick(() => {
  navClientHeight.value = document.getElementById("nav").clientHeight || 48;
  const editorConfig = {
    placeholder: "请输入内容",
    scroll: false,
    MENU_CONF: {
      insertImage: {
        // async parseImageSrc(src) {
        //   // 创建一个Promise
        //   const loadImagePromise = new Promise((resolve, reject) => {
        //     // 创建一个新的Image对象
        //     var img = new Image();
        //     // 设置Image对象的src属性，加载Base64编码的图片
        //     img.src = src;
        //     // 当图片加载完成后执行以下操作
        //     img.onload = function () {
        //       // 获取图片的宽度和高度
        //       var width = this.width;
        //       var height = this.height;
        //       // 输出图片的宽度和高度
        //       var canvas = document.createElement("canvas");
        //       var ctx = canvas.getContext("2d");
        //       // 将图片绘制到Canvas上
        //       canvas.width = width;
        //       canvas.height = height;
        //       ctx.drawImage(img, 0, 0);
        //       // 压缩图片（这里可以调整压缩质量和尺寸）
        //       var compressedImageData = canvas.toDataURL("image/jpeg", 0.5); // 压缩质量为0.5
        //       // 将Data URI转换为Blob对象
        //       function dataURItoBlob(dataURI) {
        //         var byteString = atob(dataURI.split(",")[1]);
        //         var mimeString = dataURI
        //           .split(",")[0]
        //           .split(":")[1]
        //           .split(";")[0];
        //         var ab = new ArrayBuffer(byteString.length);
        //         var ia = new Uint8Array(ab);
        //         for (var i = 0; i < byteString.length; i++) {
        //           ia[i] = byteString.charCodeAt(i);
        //         }
        //         return new Blob([ab], { type: mimeString });
        //       }
        //       // 创建一个新的Blob对象，表示压缩后的图片数据
        //       var compressedImageBlob = dataURItoBlob(compressedImageData);
        //       var srcBlob = dataURItoBlob(src);
        //       // 计算压缩前后图片的内存大小
        //       var originalFileSize = srcBlob.size;
        //       var compressedFileSize = compressedImageBlob.size;
        //       canvas.toBlob(function (blob) {
        //         // 创建一个URL对象，表示生成的WebP图像
        //         var webpURL = URL.createObjectURL(blob);
        //         // 解决Promise并返回生成的WebP图像的URL
        //         resolve({ webpURL, compressedImageData });
        //       }, "image/webp");
        //     };
        //   });
        //   const { webpURL, compressedImageData } = await loadImagePromise;
        //   const result = await fetch(webpURL);
        //   // console.log(result.blob());

        //   const formData = new FormData();
        //   formData.append("image", await result.blob(), "image.webp");

        //   return await new Promise((res, rej) => {
        //     fetch(useRuntimeConfig().public.apiUpload, {
        //       method: "POST",
        //       body: formData,
        //     })
        //       .then((response) => response.json())
        //       .then((data) => {
        //         console.log("上传成功:", data);
        //         res(
        //           useRuntimeConfig().public.static + "/" + data.file.filename
        //         );
        //       })
        //       .catch((error) => {
        //         console.error("上传失败:", error);
        //         res(compressedImageData);
        //       });
        //   });
        // },
      },
      uploadImage: {
        fieldName: "like-yuque-fileName",
        base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
      },
    },
    uploadImgShowBase64: true,
  };

  // 先创建 editor
  const editor = E.value.createEditor({
    selector: "#editor-text-area",
    content: [],
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
  editor.on("change", (e) => {
    data.value.content = editor.getHtml() || "";
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
  overflow-y: auto;
  position: relative;
}

#editor-container {
  width: 100%;
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
