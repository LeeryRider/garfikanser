/* Large original PDFs are split without altering their pages to fit repository-upload limits.
   All page references use the *original* page numbers in the user supplied document. */
window.GFX_PDF_LINK=function(file,page){
 const n=Number(page)||1;
 if(file==='Konular.pdf'){
  const start=Math.floor((n-1)/50)*50+1;
  const end=Math.min(730,start+49);
  return 'kaynaklar/parcalar/Konular-'+String(start).padStart(3,'0')+'-'+String(end).padStart(3,'0')+'.pdf#page='+(n-start+1);
 }
 if(file==='sorular.pdf'){
  const start=Math.floor((n-1)/2)*2+1;
  const end=Math.min(21,start+1);
  return 'kaynaklar/parcalar/sorular-'+String(start).padStart(3,'0')+'-'+String(end).padStart(3,'0')+'.pdf#page='+(n-start+1);
 }
 return 'kaynaklar/'+encodeURI(file)+'#page='+n;
};
window.GFX_PDF_PARTS=function(file){
 if(file!=='Konular.pdf' && file!=='sorular.pdf')return [];
 const total=file==='Konular.pdf'?730:21;
 const step=file==='Konular.pdf'?50:2;
 const parts=[];
 for(let start=1;start<=total;start+=step){
  parts.push({start,end:Math.min(total,start+step-1),href:window.GFX_PDF_LINK(file,start)});
 }
 return parts;
};
window.GFX_PDF_REF=function(reference){
 const ref=String(reference||'');
 const i=ref.indexOf('#page=');
 const filename=i<0?ref:ref.slice(0,i);
 const page=i<0?1:Number(ref.slice(i+6))||1;
 if(!/\.pdf$/i.test(filename))return 'kaynaklar/'+encodeURI(filename);
 return window.GFX_PDF_LINK(filename,page);
};