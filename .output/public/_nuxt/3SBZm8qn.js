import{a as r,g as _,h as d,i as u,c as m,j as t,t as n,u as s,k as l,l as p,m as h,o as x}from"./BiCm84vq.js";import{h as f}from"./mhuT-0qX.js";const g={class:"max-w-3xl m-auto p-5"},v={id:"editor-content-view",class:"editor-content-view"},w={class:"text-3xl"},y={class:"text-xl"},k={class:"flex justify-end items-center text-xs space-x-3"},B={class:"flex items-center text text-neutral-400"},b=t("span",{class:"icon-[line-md--watch] mr-1"},null,-1),A={class:"flex items-center text text-neutral-400"},H=t("span",{class:"icon-[line-md--gauge] mr-1"},null,-1),M=t("hr",{class:"border-t-1 border-gray-light my-4"},null,-1),N=["innerHTML"],R={__name:"[id]",async setup(T){let o,a;r(()=>{const{$Prism:c}=p();c.highlightAll()});const i=_(),{result:e}=([o,a]=d(()=>$fetch(h().public.apiBase+"/api/posts/"+i.params.id)),o=await o,a(),o);return e._updated_at=f(e.updated_at).format("ll"),console.log(i,e),u({title:""+e.title,meta:[{name:"description",content:e.title+"-详情"}]}),(c,j)=>(x(),m("section",null,[t("div",g,[t("div",v,[t("h2",w,n(s(e).title),1),t("h5",y,n(s(e).description),1),t("div",k,[t("span",B,[b,l(" "+n(s(e).view),1)]),t("time",A,[H,l(n(s(e)._updated_at),1)])]),M,t("div",{class:"",innerHTML:s(e).content},null,8,N)])])]))}};export{R as default};
