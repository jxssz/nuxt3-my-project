function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./B7W9Nsiv.js","./DDYnbQT0.js","./pmdQZhsh.js","./DEIKd0dY.js","./BsYmvPZw.js","./Cpj98o6Y.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{u as m}from"./BvDeq1QV.js";import{aW as v,b5 as l,b6 as d,b7 as g,b8 as y,d as h,b9 as _,j as w,b2 as b,b4 as p,b1 as C}from"./DDYnbQT0.js";import{h as f,u as P}from"./DEIKd0dY.js";import{q as $,w as c,e as x,s as N,j,u as E}from"./pmdQZhsh.js";const T=async t=>{const{content:e}=v().public;typeof(t==null?void 0:t.params)!="function"&&(t=$(t));const n=t.params(),o=e.experimental.stripQueryParameters?c(`/navigation/${`${f(n)}.${e.integrity}`}/${x(n)}.json`):c(`/navigation/${f(n)}.${e.integrity}.json`);if(N())return(await l(()=>import("./B7W9Nsiv.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url).then(i=>i.generateNavigation))(n);const a=await $fetch(o,{method:"GET",responseType:"json",params:e.experimental.stripQueryParameters?void 0:{_params:j(n),previewToken:P().getPreviewToken()}});if(typeof a=="string"&&a.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return a},S="$s";function D(...t){const e=typeof t[t.length-1]=="string"?t.pop():void 0;typeof t[0]!="string"&&t.unshift(e);const[n,o]=t;if(!n||typeof n!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+n);if(o!==void 0&&typeof o!="function")throw new Error("[nuxt] [useState] init must be a function: "+o);const a=S+n,r=y(),i=d(r.payload.state,a);if(i.value===void 0&&o){const s=o();if(g(s))return r.payload.state[a]=s,s;i.value=s}return i}const R=h({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(t){const{query:e}=_(t),n=w(()=>{var a;return typeof((a=e.value)==null?void 0:a.params)=="function"?e.value.params():e.value});if(!n.value&&D("dd-navigation").value){const{navigation:a}=E();return{navigation:a}}const{data:o}=await m(`content-navigation-${f(n.value)}`,()=>T(n.value));return{navigation:o}},render(t){const e=b(),{navigation:n}=t,o=i=>p(C,{to:i._path},()=>i.title),a=(i,s)=>p("ul",s?{"data-level":s}:null,i.map(u=>u.children?p("li",null,[o(u),a(u.children,s+1)]):p("li",null,o(u)))),r=i=>a(i,0);return e!=null&&e.default?e.default({navigation:n,...this.$attrs}):r(n)}}),Q=R;export{Q as default};
