import{j as m,r as h,c as a,b as t,F as x,n as f,u as _,o,f as g,w as y,t as n,a as d,q as w,m as k,s as v}from"./Cerq-9ur.js";import{u as b}from"./BRMxWwpd.js";import{h as N}from"./mhuT-0qX.js";const B={class:"max-w-3xl m-auto overflow-hidden p-5"},C={class:"text-lg transition duration-500 transform hover:translate-x-2 hover:text-blue py-3"},V={class:"flex items-center text-xs space-x-3"},$={class:"flex items-center text text-neutral-400"},A=t("span",{class:"icon-[line-md--watch] mr-1"},null,-1),D={class:"flex items-center text text-neutral-400"},E=t("span",{class:"icon-[line-md--gauge] mr-1"},null,-1),F={class:"line-clamp-3"},L={key:0,class:"border-t-1 border-gray-light my-4"},z={__name:"index",async setup(j){let s,c;const{data:u,pending:q,error:M,refresh:R}=([s,c]=m(()=>b(()=>$fetch(k().public.apiBase+"/api/posts"),"$MZm6k2Xuih")),s=await s,c(),s),r=h(u.value.result||[]);return r.value.forEach(l=>{l._updated_at=N(l.updated_at).format("ll")}),(l,S)=>{const p=v;return o(),a("section",null,[t("ul",B,[(o(!0),a(x,null,f(_(r),(e,i)=>(o(),a("li",{class:"leading-10",key:i},[t("article",null,[g(p,{to:`/article/detail/${e.id}`},{default:y(()=>[t("h3",C,n(e.title),1)]),_:2},1032,["to"]),t("div",V,[t("span",$,[A,d(" "+n(e.view),1)]),t("time",D,[E,d(n(e._updated_at),1)])]),t("section",F,n(e.description||""),1)]),_(r).length>i+1?(o(),a("hr",L)):w("",!0)]))),128))])])}}};export{z as default};
