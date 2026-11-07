/* BZ303 özgün kaynak okuma ve derin öğrenme arayüzü.
 * Konular.pdf içindeki numaralı örneklerin kaynak metnini değişiklik yapmadan gösterir.
 * Matematiksel düzeltme/ek bilgi gerekiyorsa özgün ustalık dersleri ayrı tutulur.
 */
(()=>{
'use strict';
const book=window.GFX_COMPENDIUM||[];
const guides=window.GFX_MASTERCLASSES||{};
const ui={week:'all',search:'',page:0,pageSize:24,shown:{},deepShown:{},onlyMarked:false};
const $=(s)=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const normal=s=>String(s??'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
const fmt=s=>esc(s).replace(/\n/g,'<br>');
const excerpts={
 'nokta-ve-vektor':['nokta','vektör','satır','koordinat'],
 'homojen':['homojen','h=','öteleme','normalleştir'],
 'donusumler-2b':['esnet','yansı','kesme','shear','dönüşüm matrisi'],
 'dogrular-afin':['doğru','orta nokta','paralel','eğim'],
 'bileske':['ardışık','sıra','birleşik','matris'],
 'keyfi-merkez':['merkez','döndür','keyfî','keyfi'],
 'uc-boyut':['3b','3d','ekseni','lokal ölçek','z yönü'],
 'izdusumler':['izdüşüm','projeksiyon','küp','perde'],
 'perspektif':['perspektif','homojen','projeksiyon','h='],
 'yuzey':['yüzey','3b geri','ters perspektif','düzlem'],
 'parametrik-egriler':['parametrik','yay','çember','eğri'],
 'dairenin-parametresi':['çember','parametrik','elips','parabol'],
 'sinav-yontemi':['matris','doğru','hesapla']
};
const usefulByTopic={
 'nokta-ve-vektor':[1,2], 'homojen':[2], 'donusumler-2b':[1,2], 'dogrular-afin':[1,2,3],
 'bileske':[2,3],'keyfi-merkez':[2,3], 'uc-boyut':[3], 'izdusumler':[4,5],
 'perspektif':[4,5,6,7], 'yuzey':[6,7], 'parametrik-egriler':[7], 'dairenin-parametresi':[7]
};
function matchedExamples(lesson,limit=6){
 const ws=usefulByTopic[lesson.id]||[];const words=excerpts[lesson.id]||[];
 if(!ws.length && !words.length)return [];
 let ranked=book.map(e=>{
  let wordsIn=normal([e.title,e.question,e.teacher].join(' '));
  let match=words.filter(w=>wordsIn.includes(normal(w))).length;
  let weekScore=ws.includes(e.week)?3:0;
  return {e,score:match*3+weekScore};
 }).filter(x=>x.score>=6).sort((a,b)=>b.score-a.score||a.e.page-b.e.page);
 const seen=new Set();return ranked.map(x=>x.e).filter(x=>{if(seen.has(x.title))return false;seen.add(x.title);return true}).slice(0,limit);
}
function bookDone(){try{return JSON.parse(localStorage.getItem('gfx-example-done')||'{}')}catch(e){return {}}}
function setBookDone(id,value){let o=bookDone();if(value)o[id]=1;else delete o[id];try{localStorage.setItem('gfx-example-done',JSON.stringify(o))}catch(e){}}
function filterBook(){let q=normal(ui.search.trim());return book.filter(e=>(ui.week==='all'||e.week===Number(ui.week))&&(!ui.onlyMarked||bookDone()[e.id])&&(!q||normal([e.title,e.question,e.teacher,e.sourceLine,e.steps].join(' ')).includes(q)))}
function bookCards(items){const done=bookDone();return `<div class="source-work-grid">${items.map(e=>`<a class="source-work-card" href="#/ornek/${e.page}"><span class="example-capsule">${e.week}. HAFTA · ${e.lecture}. DERS · E${e.no}</span><h3>${esc(e.title)}</h3><p>${esc(e.question||e.teacher).slice(0,205)}</p><div class="source-work-bottom"><span>${done[e.id]?'✓ Tamamlandı':'Çözümü adım adım aç'}</span><b>PDF s. ${e.page} ↗</b></div></a>`).join('')}</div>`}
function paintCatalog(){let filtered=filterBook(),p=ui.page,per=ui.pageSize,host=$('#bookResults');if(!host)return;const start=p*per,shown=filtered.slice(start,start+per);host.innerHTML=`<div class="book-result-count"><span><b>${filtered.length}</b> eşleşen kaynak örneği</span><span>Sayfa ${Math.min(p+1,Math.max(1,Math.ceil(filtered.length/per)))} / ${Math.max(1,Math.ceil(filtered.length/per))}</span></div>`+(shown.length?bookCards(shown):`<div class="panel"><p>Bu filtreyle örnek bulunamadı. Başka bir terim veya hafta seç.</p></div>`)+`<div class="book-pages"><button type="button" class="btn btn-small btn-ghost" data-book-page="prev" ${p===0?'disabled':''}>← Önceki</button><span>${start+1}–${Math.min(start+per,filtered.length)} / ${filtered.length}</span><button type="button" class="btn btn-small btn-ghost" data-book-page="next" ${(p+1)*per>=filtered.length?'disabled':''}>Sonraki →</button></div>`;
 document.querySelectorAll('[data-book-week]').forEach(b=>b.classList.toggle('active',b.dataset.bookWeek===ui.week));
}
function renderCatalog(){
 const counts=Array.from({length:7},(_,i)=>book.filter(e=>e.week===i+1).length);
 return `<div class="coursebook-hero"><div class="eyebrow">ORİJİNAL DERS KAYNAĞINDAN · 7 HAFTA</div><h1>Gerçek bir <span class="grad-text">çözüm kitabı.</span></h1><p>Sadece özet değil. Hocanın anlattığı, verilenler, satır satır işlemler, sonuç, sağlama ve “nasıl düşünmelisin” açıklaması. Tamamı yüklediğin <b>Konular.pdf</b> içindeki numaralandırılmış çözümlerden düzenlenmiştir.</p><div class="intro-actions"><a class="btn btn-primary" href="#/ornek/${book[0]?.page||3}">İlk örnekten başla ↗</a><a class="btn btn-ghost" href="${window.GFX_PDF_LINK('Konular.pdf',1)}" target="_blank" rel="noopener">Orijinal 730 sayfa ↗</a></div></div>
 <div class="book-info-row"><div><b>${book.length}</b><span>Ayrıştırılmış tam çözüm</span></div><div><b>7</b><span>Hafta</span></div><div><b>${Object.keys(guides).length}</b><span>Derin öğrenme konusu</span></div><div><b id="bookCompleteCount">${Object.keys(bookDone()).length}</b><span>Çalışılan çözüm</span></div></div>
 <div class="book-why"><strong>Nasıl çalış?</strong> <span>Örneği aç → soruyu oku → kâğıtta kendin çöz → <em>bir sonraki adımı göster</em> → sonucu karşılaştır → sağlamasını yap. Dersin asıl öğrenme süreci burada.</span></div>
 <div class="book-toolbar"><label class="book-search-label">Örneklerde ara<input id="bookQuery" type="search" autocomplete="off" placeholder="Örneğin: kesme, matris, perspektif, çember, dönüşüm..." value="${esc(ui.search)}"></label><label class="bookmark-toggle"><input id="bookMarkedOnly" type="checkbox" ${ui.onlyMarked?'checked':''}> Yalnız çalıştıklarım</label></div>
 <div class="filter-row coursebook-weeks"><button class="chip ${ui.week==='all'?'active':''}" data-book-week="all">Tümü · ${book.length}</button>${counts.map((n,i)=>`<button class="chip ${ui.week===String(i+1)?'active':''}" data-book-week="${i+1}">${i+1}. hafta · ${n}</button>`).join('')}</div><div id="bookResults"></div>`;
}
function sourceText(t){return `<div class="source-pre">${fmt(t||'Kaynakta ayrı metin bulunmuyor.')}</div>`}
function splitSteps(t){const s=String(t||'');let a=s.split(/(?=^\d+\.\s+)/m).map(x=>x.trim()).filter(Boolean);return a.length?a:[s]}
function renderExample(pageStr){const page=Number(pageStr),e=book.find(x=>x.page===page);if(!e)return `<div class="panel"><h1>Örnek bulunamadı.</h1><a href="#/derslik">Kütüphaneye dön</a></div>`;
 const i=book.indexOf(e),steps=splitSteps(e.steps),shown=Math.min(steps.length,ui.shown[e.id]||0),finished=!!bookDone()[e.id];
 return `<div class="example-head"><div><div class="eyebrow"><a href="#/derslik">‹ ÇÖZÜM KÜTÜPHANESİ</a> / ${e.week}. HAFTA · ${e.lecture}. DERS · E${e.no}</div><h1>${esc(e.title)}</h1><p>Kaynak: Konular.pdf, gerçek dosya sayfası ${e.page}. İçerik orijinal çözümün öğretim düzenini ve ifadelerini korur; PDF'ye bağlı görüntüler gerektiğinde aşağıdan açılır.</p></div><button class="btn ${finished?'btn-mint':'btn-ghost'}" data-book-done="${e.id}">${finished?'✓ Çalışıldı · geri al':'✓ Çözümü çalıştım'}</button></div>
 <div class="example-layout"><article class="example-main"><section class="example-section teacher-card"><div class="eyebrow">HOCANIN ANLATTIĞI</div><h2>Konuyu anlamadan işleme geçme</h2>${sourceText(e.teacher)}</section>
 <section class="example-section prompt-card"><div class="eyebrow">SORU</div><h2>${esc(e.question)}</h2><p>İşlemleri kâğıt üzerinde kendin denemeden adımları açma.</p></section>
 <div class="example-pair"><section class="example-section"><h3>Verilenler ve şekil bilgisi</h3>${sourceText(e.given)}</section><section class="example-section"><h3>Sembollerin anlamı</h3>${sourceText(e.symbols)}</section></div>
 <section class="example-section worked-card" id="work-solution"><div class="eyebrow">KADEMELİ ÇÖZÜM · ${shown}/${steps.length} ADIM AÇILDI</div><h2>Bir adımı gör, devamını sen yap.</h2><div class="step-hint">İlk başta çözüm gizlidir; kontrolü sende. Bir adım daha aç veya yeniden başla.</div><ol class="work-steps">${steps.map((st,j)=>`<li class="${j<shown?'step-unlocked':'step-locked'}"><span class="step-count">${j+1}</span><div>${j<shown?`<div class="source-pre">${fmt(st)}</div>`:`<span>${j+1}. adımı görmek için aşağıdaki düğmeye bas</span>`}</div></li>`).join('')}</ol><div class="stepper-actions"><button class="btn btn-primary" data-work-step="${e.id}" ${shown>=steps.length?'disabled':''}>${shown===0?'İlk çözüm adımını göster':shown<steps.length?'Sonraki adımı göster →':'Bütün adımlar açık ✓'}</button><button class="btn btn-ghost" data-work-reset="${e.id}">Sıfırla ↺</button><button class="btn btn-ghost" data-work-all="${e.id}">Hepsini aç</button></div></section>
 ${shown>=steps.length?`<section class="example-section result-card"><div class="eyebrow">ÇÖZÜM TAMAMLANDI</div><h2>Sonuç</h2>${sourceText(e.result)}<h3>Sağlama / kontrol</h3>${sourceText(e.check)}</section>`:`<section class="result-hidden"><span>🔒</span><div><b>Sonuç ve sağlama henüz gizli</b><p>Önce çözüm adımlarını bitir, ardından sonuca ulaş.</p></div></section>`}
 <section class="example-section thinking-card"><div class="eyebrow">MANTIĞI KAVRA</div><h2>Nasıl düşünmelisin?</h2>${sourceText(e.thinking)}${e.sourceNote?`<h3>Kaynak notu</h3>${sourceText(e.sourceNote)}`:''}</section>
 <div class="example-pagination">${i>0?`<a class="btn btn-ghost" href="#/ornek/${book[i-1].page}">← Önceki örnek</a>`:''}<a class="btn btn-ghost" href="#/derslik">Tüm örnekler</a>${i<book.length-1?`<a class="btn btn-primary" href="#/ornek/${book[i+1].page}">Sonraki örnek →</a>`:''}</div>
 </article><aside class="example-aside"><div class="aside-box"><strong>KAYNAĞA DÖN</strong><p>${esc(e.sourceLine)}</p><a class="btn btn-small btn-ghost" href="${window.GFX_PDF_LINK('Konular.pdf',e.page)}" target="_blank" rel="noopener">Orijinal sayfa ${e.page} ↗</a></div><div class="aside-box"><strong>ÇALIŞMA YÖNTEMİ</strong><p>1. Soruyu sesli anlat.<br>2. Verilenleri yaz.<br>3. Bir adım aç.<br>4. Sonrakini tahmin et.<br>5. Sonuç ve sağlamayı karşılaştır.</p></div><details class="pdf-preview"><summary>Orijinal şekli burada gör</summary><iframe loading="lazy" title="Konular PDF sayfa ${e.page}" src="${window.GFX_PDF_LINK('Konular.pdf',e.page)}&view=FitH"></iframe><p>PDF tarayıcıda gösterilemiyorsa yukarıdaki bağlantıyı kullan.</p></details></aside></div>`;
}
function renderDeep(id){
 const l=window.GFX_LESSONS?.find(x=>x.id===id),g=guides[id];if(!g)return `<div class="panel"><h1>Bu konu için derin çalışma bulunamadı.</h1><a href="#/konular">Konu listesi</a></div>`;
 const lessonName=l?.title||'Derin öğretim', parts=g.units;
 return `<div class="coursebook-hero masterclass-hero"><div class="eyebrow">ADIM ADIM USTALIK DERSİ · ${parts.length} AYRINTILI KONU</div><h1>${esc(lessonName)}</h1><p>${esc(g.intro)}</p><div class="intro-actions"><a class="btn btn-ghost" href="#/ders/${id}">← Kısa ders notlarına dön</a><a class="btn btn-ghost" href="#/derslik">625 çözümlü örnek ↗</a></div></div><div class="masterclass-layout"><div class="masterclass-body"><div class="learning-direction"><strong>Bu sayfayı bir kitap gibi kullan.</strong><span>Her başlıkta önce “neden?” sorusunu oku. Ardından formülü kendin kur, örneği kâğıda çöz ve adımları birer birer aç. Son olarak sağlama ve en sık hatayı karşılaştır.</span></div>
 ${parts.map((u,i)=>{let key=id+'-'+i,count=Math.min(u.steps.length,ui.deepShown[key]||0);return `<section id="derin-${i}" class="masterclass-unit"><div class="unit-number">${String(i+1).padStart(2,'0')} / ${String(parts.length).padStart(2,'0')}</div><h2>${esc(u.title)}</h2><div class="why-card"><strong>NEDEN BÖYLE?</strong><p>${esc(u.why)}</p></div><div class="formula-explainer"><span>ÖĞRENECEĞİN BAĞINTI</span><code>${esc(u.formula)}</code></div><h3>İşlem adımlarını sen yönet</h3><ol class="master-steps">${u.steps.map((st,j)=>`<li class="${j<count?'revealed':''}"><b>${j+1}</b><span>${j<count?esc(st):'Önce sen hesapla, sonra bu adımı aç.'}</span></li>`).join('')}</ol><div class="stepper-actions"><button class="btn btn-primary btn-small" data-master-next="${esc(key)}" ${count>=u.steps.length?'disabled':''}>${count===0?'İlk adımı aç':'Sonraki adım →'}</button><button class="btn btn-ghost btn-small" data-master-all="${esc(key)}">Tümünü göster</button><button class="btn btn-ghost btn-small" data-master-reset="${esc(key)}">Tekrar çöz</button></div>${count===u.steps.length?`<div class="check-card"><b>✓ Sağlama</b><p>${esc(u.check)}</p></div><div class="trap-card"><b>⚠ Sınavda karıştırma</b><p>${esc(u.trap)}</p></div>`:`<div class="after-lock">Sağlama ve sınav tuzağı, bütün adımlar açıldıktan sonra görünür.</div>`}</section>`}).join('')}
 <div class="panel deep-bottom"><h2>Bir sonraki aşama: kaynaktaki sorular</h2><p>Artık kuralları yeniden üretebiliyorsan, konuyla eşleşen özgün ders çözümlerine veya denemeye geç.</p><div class="intro-actions"><a class="btn btn-primary" href="#/deneme">Kendimi sınayayım ↗</a><a class="btn btn-ghost" href="#/derslik">Ders çözüm arşivi ↗</a><a class="btn btn-ghost" href="#/formuller">Formül kartları ↗</a></div></div></div><aside class="master-toc"><strong>BU USTALIK DERSİNDE</strong>${parts.map((u,i)=>`<a href="#derin-${i}" data-master-scroll="derin-${i}">${String(i+1).padStart(2,'0')} · ${esc(u.title)}</a>`).join('')}</aside></div>`;
}
function lessonAddon(lesson){const g=guides[lesson.id],examples=matchedExamples(lesson,6);let html='';if(g){html+=`<div class="lesson-addon deep-promo"><div><span class="eyebrow">DERS BURADA BİTMİYOR</span><h2>Konuyu gerçekten anlamak için ${g.units.length} ayrıntılı uygulama</h2><p>Formülün nereden geldiğini, çözümün her adımını ve sağlamasını öğren. Adımlar başlangıçta gizli; önce kendin deniyorsun.</p></div><a class="btn btn-primary" href="#/derin/${lesson.id}">Ayrıntılı ders kitabını aç ↗</a></div>`}if(examples.length){html+=`<div class="lesson-addon"><div class="section-header"><div><h2>Bu konuyla ilgili orijinal çözümler</h2><p>Konular.pdf içinden başlık ve ders haftasına göre eşleştirilen örnekler. Açıklamalar doğrudan kaynak metinden.</p></div><a href="#/derslik">Tüm kaynak çözümleri ↗</a></div>${bookCards(examples)}</div>`}else if(['bezier','bspline','spline'].includes(lesson.unit)){html+=`<div class="lesson-addon deep-promo"><div><h2>Bézier ve spline için 39 sayfalık matematiksel rehber</h2><p>Bu konunun detaylı türetimleri, çözüm stratejileri ve farklı gösterim uyarıları ayrı kaynakta. PDF açarak matematiksel ispatları tam hâliyle incele.</p></div><a class="btn btn-ghost" href="kaynaklar/BEZIER_BSPLINE_MATEMATIK_REHBERI.pdf" target="_blank" rel="noopener">39 sayfalık özgün rehber ↗</a></div>`}return html}
function bind(){
 document.addEventListener('input',ev=>{if(ev.target.id==='bookQuery'){ui.search=ev.target.value;ui.page=0;paintCatalog()}});
 document.addEventListener('change',ev=>{if(ev.target.id==='bookMarkedOnly'){ui.onlyMarked=ev.target.checked;ui.page=0;paintCatalog()}});
 document.addEventListener('click',ev=>{let b=ev.target.closest('[data-book-week],[data-book-page],[data-book-done],[data-work-step],[data-work-reset],[data-work-all],[data-master-next],[data-master-all],[data-master-reset],[data-master-scroll]');if(!b)return;
  if(b.dataset.bookWeek){ui.week=b.dataset.bookWeek;ui.page=0;paintCatalog();return}
  if(b.dataset.bookPage){ui.page=Math.max(0,ui.page+(b.dataset.bookPage==='next'?1:-1));paintCatalog();$('#bookResults')?.scrollIntoView({block:'start',behavior:'smooth'});return}
  if(b.dataset.bookDone){let id=b.dataset.bookDone;setBookDone(id,!bookDone()[id]);window.GFX_APP_RENDER?.();return}
  if(b.dataset.workStep||b.dataset.workReset||b.dataset.workAll){let id=b.dataset.workStep||b.dataset.workReset||b.dataset.workAll,e=book.find(x=>x.id===id);if(!e)return;const n=splitSteps(e.steps).length;
   ui.shown[id]=b.dataset.workStep?Math.min(n,(ui.shown[id]||0)+1):b.dataset.workAll?n:0;
   let scroll=$('#work-solution')?.getBoundingClientRect().top;window.GFX_APP_RENDER?.();if(Number.isFinite(scroll))document.getElementById('work-solution')?.scrollIntoView({block:'center'});return}
  if(b.dataset.masterNext||b.dataset.masterAll||b.dataset.masterReset){let key=b.dataset.masterNext||b.dataset.masterAll||b.dataset.masterReset,split=key.lastIndexOf('-'),id=key.slice(0,split),i=Number(key.slice(split+1)),g=guides[id];if(!g)return;let n=g.units[i]?.steps.length||0;ui.deepShown[key]=b.dataset.masterNext?Math.min(n,(ui.deepShown[key]||0)+1):b.dataset.masterAll?n:0;let target='derin-'+i;window.GFX_APP_RENDER?.();document.getElementById(target)?.scrollIntoView({block:'start'});return}
  if(b.dataset.masterScroll){ev.preventDefault();document.getElementById(b.dataset.masterScroll)?.scrollIntoView({behavior:'smooth',block:'start'})}
 });
}
bind();
window.GFX_BOOK={book,renderCatalog,renderExample,renderDeep,lessonAddon,paintCatalog,match:matchedExamples,meta:window.GFX_COURSEBOOK_META};
})();