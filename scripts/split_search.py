from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1];p=root/'data/search-index.js'
s=p.read_text()
if s.startswith('window.GFX_SOURCE_INDEX='):
 items=json.loads(s[len('window.GFX_SOURCE_INDEX='):-2])
else:
 print('Already split');exit()
p.write_text('window.GFX_SOURCE_INDEX=[];\n')
for i in range(0,len(items),43):
 out='window.GFX_SOURCE_INDEX.push(...'+json.dumps(items[i:i+43],ensure_ascii=False,separators=(',',':'))+');\n'
 (root/'data'/f'search-part-{i//43:02d}.js').write_text(out)
 print(i//43,len(out))