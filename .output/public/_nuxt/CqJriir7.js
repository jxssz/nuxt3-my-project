import{a as r,g as _,h as d,i as u,c as m,j as t,t as n,u as s,k as l,l as h,m as p,o as x}from"./4xUEgPPT.js";import{h as f}from"./mhuT-0qX.js";const g={class:"article-main"},v={class:"max-w-3xl m-auto p-5"},w={id:"editor-content-view",class:"editor-content-view"},y={class:"text-3xl"},k={class:"text-xl"},B={class:"flex justify-end items-center text-xs space-x-3"},b={class:"flex items-center text text-neutral-400"},A=t("span",{class:"icon-[line-md--watch] mr-1"},null,-1),H={class:"flex items-center text text-neutral-400"},M=t("span",{class:"icon-[line-md--gauge] mr-1"},null,-1),N=t("hr",{class:"border-t-1 border-gray-light my-4"},null,-1),T=["innerHTML"],V={__name:"[id]",async setup(j){let o,a;r(()=>{const{$Prism:c}=h();c.highlightAll()});const i=_(),{result:e}=([o,a]=d(()=>$fetch(p().public.apiBase+"/api/posts/"+i.params.id)),o=await o,a(),o);return e._updated_at=f(e.updated_at).format("ll"),console.log(i,e),u({title:""+e.title,meta:[{name:"description",content:e.title+"-详情"}]}),(c,C)=>(x(),m("section",g,[t("div",v,[t("div",w,[t("h2",y,n(s(e).title),1),t("h5",k,n(s(e).description),1),t("div",B,[t("span",b,[A,l(" "+n(s(e).view),1)]),t("time",H,[M,l(n(s(e)._updated_at),1)])]),N,t("div",{class:"content",innerHTML:s(e).content},null,8,T)])])]))}};export{V as default};