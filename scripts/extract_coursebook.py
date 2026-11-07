"""Extract the original BZ303 lecture book's worked-example pages without changing mathematical content.
Run: python scripts/extract_coursebook.py
Requires PyMuPDF. Verbatim source prose is stored with page attribution and labels.
"""
import fitz,re,json, pathlib,unicodedata
ROOT=pathlib.Path(__file__).resolve().parents[1]
source=fitz.open(ROOT/'kaynaklar'/'Konular.pdf')
sections={
 'teacher':r'^Hocanın anlattığı\s*$',
 'question':r'^Soru(?:\s+|\s*$)',
 'given':r'^Verilenler ve (?:matris|formül|şekil|model|girdi|dönüşüm|denklem|noktalar|koordinatlar)\s*$',
 'symbols':r'^Bu örneğin sembolleri\s*$',
 'steps':r'^Çözüm adımları\s*$',
 'result':r'^Sonuç\s*$',
 'check':r'^Kontrol(?:\s+|\s*$)',
 'thinking':r'^Nasıl düşünmelisin\s*·?\s*Açıklama\s*$',
 'sourceNote':r'^Kaynak notu(?:\s+|\s*$)',
}
mark=re.compile('|'.join('(?P<'+k+'>'+v+')' for k,v in sections.items()),re.M)
entries=[]
week_rx=re.compile(r'BZ303\s*·\s*(\d+)\. hafta\s*(\d+)\. ders')
for page_i,page in enumerate(source):
 raw=page.get_text().strip()
 match=re.search(r'^\s*E(\d{2,3})\s+(.+)',raw)
 if not match:continue
 start=match.start(); after=raw[match.end():]
 title=match.group(2).strip()
 # Multiline titles end at the source marker (typically Slayt/Uygulama/Kaynak)
 start_source=re.search(r'^(?:Slayt|Uygulama|Kaynak|Dersteki)\s',after)
 if start_source:
  pfx=after[:start_source.start()].strip()
  if pfx and len(pfx)<110 and '\n' in pfx: title += ' '+pfx.replace('\n',' ')
  after=after[start_source.start():]
 footer=week_rx.search(raw)
 week=int(footer.group(1)) if footer else 0
 lecture=int(footer.group(2)) if footer else 0
 # split source text from body via actual structural section labels
 hits=list(mark.finditer(after))
 fields={}; intro=after[:hits[0].start()].strip() if hits else after.strip()
 for n,h in enumerate(hits):
  text=after[h.end():(hits[n+1].start() if n+1<len(hits) else len(after))].strip()
  k=h.lastgroup
  if k=='thinking':text=re.sub(r'\n?BZ303\s*·.*$', '',text,flags=re.S).strip()
  fields[k]=(fields.get(k,'')+'\n'+text).strip()
 # clean final page footer, preserve all substantive text
 for k in list(fields):fields[k]=re.sub(r'\nBZ303\s*·.*$', '',fields[k], flags=re.S).strip()
 # ensure only substantive, avoid capturing page footer for oddly parsed
 item={'id':f'p{page_i+1}','page':page_i+1,'no':match.group(1),'week':week,'lecture':lecture,'title':title,
       'sourceLine':intro[:320]}
 item.update({k:fields.get(k,'') for k in sections})
 if not item['question'] and not item['teacher'] and not item['steps']:
  # preserve rare irregular pages as plain text instead of silently dropping content
  item['given']=after[:2000]
 entries.append(item)
print('pages',len(source),'examples',len(entries),'with complete steps',sum(bool(x['steps']) for x in entries),'with question',sum(bool(x['question']) for x in entries))
# Chunk for GitHub content API and local page performance.
for old in (ROOT/'data').glob('coursebook-*.js'):old.unlink()
for i in range(0,len(entries),28):
 chunk=entries[i:i+28]
 name=ROOT/'data'/f'coursebook-{i//28:02d}.js'
 output='window.GFX_COMPENDIUM.push(...'+json.dumps(chunk,ensure_ascii=False,separators=(',',':'))+');\n'
 name.write_text(output,encoding='utf-8')
 print(name.name,len(output))
meta={'pdfPages':len(source),'examples':len(entries),'source':'Konular.pdf',
 'weeks':sorted(set(x['week'] for x in entries))}
(ROOT/'data'/'coursebook-meta.js').write_text('window.GFX_COURSEBOOK_META='+json.dumps(meta,ensure_ascii=False)+';\n',encoding='utf-8')