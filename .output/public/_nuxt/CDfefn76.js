function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./C7P7evRX.js","./Cerq-9ur.js","./entry.CgFNXu8l.css","./wangeditor.aXhE73JQ.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{d as i,r as d,e as p,p as s,c,f as r,w as m,o as b,u as h,g as k,h as g}from"./Cerq-9ur.js";const y=Symbol.for("nuxt:client-only"),v=i({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(u,{slots:e,attrs:t}){const n=d(!1);return p(()=>{n.value=!0}),s(y,!0),a=>{var o;if(n.value)return(o=e.default)==null?void 0:o.call(e);const l=e.fallback||e.placeholder;if(l)return l();const _=a.fallback||a.placeholder||"",f=a.fallbackTag||a.placeholderTag||"span";return c(f,t,_)}}}),T={__name:"index",setup(u){const e=k(()=>g(()=>import("./C7P7evRX.js"),__vite__mapDeps([0,1,2,3]),import.meta.url));return(t,n)=>{const a=v;return b(),c("div",null,[r(a,null,{default:m(()=>[r(h(e))]),_:1})])}}};export{T as default};
