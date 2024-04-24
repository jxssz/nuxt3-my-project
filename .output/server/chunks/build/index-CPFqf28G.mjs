import { a as useRuntimeConfig, c as __nuxt_component_0 } from './server.mjs';
import { u as useAsyncData } from './asyncData-CGfrYuKk.mjs';
import { withAsyncContext, ref, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      () => $fetch(useRuntimeConfig().public.apiBase + "/api/posts"),
      "$MZm6k2Xuih"
    )), __temp = await __temp, __restore(), __temp);
    const list = ref(data.value.result || []);
    list.value.forEach((item) => {
      item._updated_at = moment(item.updated_at).format("ll");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(_attrs)}><ul class="max-w-3xl m-auto overflow-hidden p-5"><!--[-->`);
      ssrRenderList(unref(list), (item, index) => {
        _push(`<li class="leading-10"><article>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/article/detail/${item.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="text-lg transition duration-500 transform hover:translate-x-2 hover:text-blue py-3"${_scopeId}>${ssrInterpolate(item.title)}</h3>`);
            } else {
              return [
                createVNode("h3", { class: "text-lg transition duration-500 transform hover:translate-x-2 hover:text-blue py-3" }, toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="flex items-center text-xs space-x-3"><span class="flex items-center text text-neutral-400"><span class="icon-[line-md--watch] mr-1"></span> ${ssrInterpolate(item.view)}</span><time class="flex items-center text text-neutral-400"><span class="icon-[line-md--gauge] mr-1"></span>${ssrInterpolate(item._updated_at)}</time></div><section class="line-clamp-3">${ssrInterpolate(item.description || "")}</section></article>`);
        if (unref(list).length > index + 1) {
          _push(`<hr class="border-t-1 border-gray-light my-4">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CPFqf28G.mjs.map
