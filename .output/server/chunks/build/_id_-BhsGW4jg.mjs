import { withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { u as useRoute, a as useRuntimeConfig, b as useHead } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import moment from 'moment';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'fs';
import 'path';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'hast-util-to-string';
import 'github-slugger';
import 'detab';
import 'remark-emoji';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'prismjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { result } = ([__temp, __restore] = withAsyncContext(() => $fetch(
      useRuntimeConfig().public.apiBase + "/api/posts/" + route.params.id
    )), __temp = await __temp, __restore(), __temp);
    result._updated_at = moment(result.updated_at).format("ll");
    console.log(route, result);
    useHead({
      title: "" + result.title,
      meta: [{ name: "description", content: result.title + "-\u8BE6\u60C5" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "article-main" }, _attrs))}><div class="max-w-3xl m-auto p-5"><div id="editor-content-view" class="editor-content-view"><h2 class="text-3xl">${ssrInterpolate(unref(result).title)}</h2><h5 class="text-xl">${ssrInterpolate(unref(result).description)}</h5><div class="flex justify-end items-center text-xs space-x-3"><span class="flex items-center text text-neutral-400"><span class="icon-[line-md--watch] mr-1"></span> ${ssrInterpolate(unref(result).view)}</span><time class="flex items-center text text-neutral-400"><span class="icon-[line-md--gauge] mr-1"></span>${ssrInterpolate(unref(result)._updated_at)}</time></div><hr class="border-t-1 border-gray-light my-4"><div class="content">${unref(result).content}</div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BhsGW4jg.mjs.map
