"use strict";(self.webpackChunkocr_ai_tool=self.webpackChunkocr_ai_tool||[]).push([["815"],{4806:function(e,t,r){r.r(t),r.d(t,{getContentByFile:()=>i});var a=r(6775),o=r(6486),s=r(6595);let c=async e=>{let t=await fetch(e);if(!t.ok)throw console.error(`Failed to fetch the file: ${e}`),Error("Failed to fetch the file");let r=t.headers.get("content-type");return s.Z.getExtension(r)},l=new a.Mistral({apiKey:""}),n=async e=>{let t=await c(e);switch(t){case"pdf":return{type:"document_url",documentUrl:e};case"png":case"jpg":case"jpeg":return{type:"image_url",imageUrl:e};default:throw Error(`Unsupported file type - ${t}`)}},i=async e=>{let{context:t,file:r}=e,a=await n(r);try{let e=await l.chat.complete({model:"mistral-small-latest",messages:[{role:"user",content:[{type:"text",text:t},a]}]});return(0,o.get)(e,"choices[0].message.content")}catch(e){throw Error(`Error processing image: ${e.message}`)}}}}]);