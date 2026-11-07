from pathlib import Path
root=Path(__file__).resolve().parents[1]
index=root/'index.html'; s=index.read_text()
# add menu link to complete source reader, dedicated interactive textbooks
s=s.replace('<a data-route="lab" href="#/laboratuvar">','<a data-route="coursebook" href="#/derslik"><span class="nav-ico">◧</span>625 çözümlü ders kitabı<span class="nav-arrow">›</span></a>\n          <a data-route="lab" href="#/laboratuvar">')
s=s.replace('<script src="data/search-index.js" defer></script>','<script src="data/search-index.js" defer></script>\n'+''.join(f'  <script src="data/search-part-{i:02d}.js" defer></script>\n' for i in range(20)).rstrip())
s=s.replace('<script src="assets/app.js" defer></script>',
'''<script>window.GFX_COMPENDIUM=[];</script>
  <script src="data/coursebook-meta.js" defer></script>
'''+''.join(f'  <script src="data/coursebook-{i:02d}.js" defer></script>\n' for i in range(23))+'''  <script src="data/masterclasses.js" defer></script>
  <script src="assets/coursebook.js" defer></script>
  <script src="assets/app.js" defer></script>''')
s=s.replace('26 ders:','26 ders:')
s=s.replace('858 sayfalık kaynak arşivi','730 sayfalık ders kitabı, 625 çözüm ve 858 sayfalık kaynak arşivi')
index.write_text(s)
app=root/'assets/app.js';a=app.read_text()
a=a.replace("'kaynaklar':'sources'","'kaynaklar':'sources','derslik':'coursebook','ornek':'example','derin':'masterclass'")
a=a.replace("sources:'Kaynak PDF’ler'","sources:'Kaynak PDF’ler',coursebook:'625 çözümlü kaynak kitabı',example:'Kaynaktan adım adım örnek',masterclass:'Derin öğretim'" )
a=a.replace("${l.blocks.map((b,i)=>`<section id=\"blok-${i}\"", "${l.blocks.map((b,i)=>`<section id=\"blok-${i}\"")
# insert after original cards, before single test and link the masterclass
needle='</section>`).join(\'\')}<div class="challenge-box">'
replace='</section>`).join(\'\')}${window.GFX_BOOK?.lessonAddon(l)||\'\'}<div class="challenge-box">'
if needle not in a:print('WARNING missing lesson point')
else:a=a.replace(needle,replace,1)
a=a.replace("${stat('858','Arşiv PDF sayfası'","${stat('858','Arşiv PDF sayfası'")
# homepage card link
old='<div class="section-header"><div><h2>Çalışma planı</h2>'
new='''<div class="section-header"><div><h2>625 tam çözümlü ders örneği</h2><p>Yüklediğin 730 sayfalık Konular.pdf üzerinden ayrıştırıldı</p></div><a href="#/derslik">Ders kitabını aç ↗</a></div><div class="panel source-book-banner"><div><span class="eyebrow">KAYNAK TEMELLİ ÖĞRETİM</span><h3>Hocanın çözümünü adım adım aç; cevabı görmeden önce sen düşün.</h3><p>7 hafta · Gerçek örnekler · Verilen → adımlar → sonuç → sağlama · Çalışma ilerlemesi.</p></div><a class="btn btn-primary" href="#/derslik">625 çözüme git ↗</a></div>
<div class="section-header"><div><h2>Çalışma planı</h2>'''
a=a.replace(old,new,1)
# Route processing
old="case 'sources':APP.innerHTML=renderSources();break;default:APP.innerHTML=renderHome()"
new="case 'sources':APP.innerHTML=renderSources();break;case 'coursebook':APP.innerHTML=window.GFX_BOOK.renderCatalog();break;case 'example':APP.innerHTML=window.GFX_BOOK.renderExample(currentLesson());break;case 'masterclass':APP.innerHTML=window.GFX_BOOK.renderDeep(currentLesson());break;default:APP.innerHTML=renderHome()"
assert old in a
# After updateSidebar run paintCatalog when render coursebook
old2="updateSidebar();if(route==='lab')paintLab()"
new2="updateSidebar();if(route==='lab')paintLab();if(route==='coursebook')window.GFX_BOOK.paintCatalog()"
a=a.replace(old,new).replace(old2,new2)
a=a.replace("window.addEventListener('hashchange',routeChanged);\nrender();","window.addEventListener('hashchange',routeChanged);\nwindow.GFX_APP_RENDER=render;\nrender();")
app.write_text(a)
print('index',len(s),'app',len(a),'scripts',len(list((root/'data').glob('coursebook-*.js'))),len(list((root/'data').glob('search-part-*.js'))))