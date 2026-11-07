(()=>{
const E=(id,year,group,title,prompt,steps,answer,source,kind='archive',tags=[])=>({id,year,group,title,prompt,steps,answer,source,kind,tags});
window.GFX_EXAMS=[
E('25-1','2025','Vize','Düğüm vektörü','2025 çıkmış notunda belirtilen soru tipi: “Kontrol noktası sayısı ve derece verilince düğüm vektörü kur.” Buradaki sayılar ÇALIŞMA ÖRNEĞİDİR; orijinal sorunun sayısal değerleri notta yoktur.',[
'Örnek: N=6 kontrol noktası, d=3, açık eğri. Önce hangi notasyonla hesaplayacağını açıkça yaz.',
'Yüklenen raporun slayt usulü: N+d=9 değer; uçlarda d=3 sıfır ve 3 son değer; içte N−d=3 düğüm.',
'Slayt örneği: [0,0,0,1,2,3,4,4,4].',
'Standart clamped B-spline: N+d+1=10; uçlarda d+1=4 tekrar; [0,0,0,0,1,2,3,3,3,3].',
'Sınavda iki kavramı karıştırma. Hocanın istediği konvansiyonu açıkça belirt.'
],'Slayt usulü: 9 değer. Standart açık clamped: 10 değer.','2025_vize_notu.txt','topic',['2025','B-spline']),
E('25-2','2025','Vize','Projeksiyon hesabı','2025 notunda “Projeksiyon” çıkmış başlığı var. Aşağıdaki örnek öğretici olarak üretilmiştir; geçmiş sorunun birebir metni değildir. P=(2,1,2), J(p=1/2,q=0,r=0) için z=0 perspektif izdüşümünü bul.',[
'Dersin özel J matrisi için H=px+qy+rz+1.',
'H=(1/2)·2+1=2.',
'X=2, Y=1, Z=0.',
'Homojen böl: x′=2/2=1, y′=1/2=0.5.'], '(1, 0.5, 0).','2025_vize_notu.txt','topic',['2025','projeksiyon']),
E('25-3','2025','Vize','Bézier uç türevleri','2025 notunda verilen soru tipi. Örnek kontrol noktaları: P₀=(0,0), P₁=(2,4), P₂=(4,4), P₃=(6,0). Başlangıç ve bitiş birinci türevlerini bul.',[
'4 kontrol noktası ⇒ n=3 (kübik).',
'B′(0)=n(P₁−P₀)=3((2,4)−(0,0))=3(2,4).',
'B′(1)=n(P₃−P₂)=3((6,0)−(4,4))=3(2,−4).',
'Türevler konum değil vektördür.'], 'B′(0)=(6,12), B′(1)=(6,−12).','2025_vize_notu.txt','topic',['2025','Bézier']),
E('25-4','2025','Vize','3 kontrol noktasını 4 yap','2025 notunda belirtilen eğriyi değiştirmeden derece yükseltme sorusu. Öğretici örnek: P₀=(0,0), P₁=(3,6), P₂=(6,0). Eğrinin şeklini bozmadan 4 kontrol noktasıyla yaz.',[
'Başlangıç n=2; yeni n+1=3. Yeni uç noktalar korunur.',
'Q₀=P₀, Q₃=P₂.',
'Q₁=(1/3)P₀+(2/3)P₁=(2,4).',
'Q₂=(2/3)P₁+(1/3)P₂=(4,4).',
'Eski/yeni t=1/2 noktaları (3,3) çıkmalı.'], 'Q₀=(0,0), Q₁=(2,4), Q₂=(4,4), Q₃=(6,0).','2025_vize_notu.txt','topic',['2025','degree elevation']),
E('21-1','2021','Vize','2B bileşke dönüşüm','A(1,1), B(4,1), C(4,3), D(1,3); önce M(2,1) etrafında (2,3) ölçekleme, sonra x eksenine göre yansıma, son olarak (1,2) etrafında +90° dönme.',[
'Merkezli ölçekleme: T₁=[2 0 0; 0 3 0; −2 −2 1].',
'x ekseni yansıması: T₂=[1 0 0; 0 −1 0; 0 0 1].',
'+90° merkezli dönme matrisi: T₃=[0 1 0; −1 0 0; 3 1 1].',
'Toplam: T=T₁T₂T₃=[0 2 0; 3 0 0; 1 −1 1].',
'(x,y)→(3y+1,2x−1), dört köşeye uygula.',
'Bileşke alan değişimi 6, işaret yön değiştiriyor.'], 'A′=(4,1), B′=(4,7), C′=(10,7), D′=(10,1).','GENEL.pdf#page=13','archive',['matris','dönüşüm']),
E('21-2','2021','Vize','Hermite eğrisi t=1/2','İki uç P₀=(1,2), P₁=(4,5); teğetler V₀=(2,1), V₁=(1,3). t=0.5 noktasını bul.',[
'H(t)=h₀₀P₀+h₀₁P₁+h₁₀V₀+h₁₁V₁.',
'h₀₀=h₀₁=0.5, h₁₀=0.125, h₁₁=−0.125.',
'x=0.5·1+0.5·4+0.125·2−0.125·1=2.625.',
'y=0.5·2+0.5·5+0.125·1−0.125·3=3.25.',
'Sağlama: iki konum ağırlığı toplamı 1; iki teğet ağırlığı toplamı 0.'], '(2.625,3.25).','GENEL.pdf#page=15','archive',['Hermite']),
E('20-1','2020','Vize','3B dönüşüm + 3 noktalı perspektif','(x,y,z) noktasını x yönünde 2, y yönünde 3 kat büyüt; z yönünde +4 ötele; ardından p=1/2, q=1/3, r=1/4 özel perspektifi uygula.',[
'Model dönüşümü: (X,Y,Z)=(2x,3y,z+4).',
'J perspektifi sonrası homojen payda H=(1/2)X+(1/3)Y+(1/4)Z+1.',
'H=x+y+z/4+2.',
'x′=2x/H ve y′=3y/H.',
'Örnek (2,1,1) için H=5.25; x′≈0.7619, y′≈0.5714.'], '(2x/(x+y+z/4+2), 3y/(x+y+z/4+2), 0).','GENEL.pdf#page=15','archive',['perspektif','3B']),
E('20-2','2020','Vize','Beş noktalı Bézier','P₀=(1,1), P₁=(2,3), P₂=(4,4), P₃=(6,3), P₄=(7,1) için B(0.5) noktasını hesapla.',[
'5 nokta ⇒ n=4, Bernstein satırı 1,4,6,4,1.',
'0.5 için tüm ağırlıkların paydası 16.',
'x=(1+4·2+6·4+4·6+7)/16=64/16=4.',
'y=(1+4·3+6·4+4·3+1)/16=50/16=3.125.',
'Casteljau üçgeninde son tek nokta da (4,3.125) verir.'], 'B(0.5)=(4,3.125).','GENEL.pdf#page=16','archive',['Bézier']),
E('19-1','2019','Vize','3B dönme, öteleme ve perspektif','P=(0.5,0.5,0.5); x çevresinde 30°, y çevresinde 60° dön; 2 ile ölçekle, x yönünde +2 ötele; sonra q=1,r=1,p=0 perspektifle z=0 düzlemine yansıt.',[
'Rₓ(30°) ardından nokta yaklaşık (0.5,0.1830,0.6830).',
'Rᵧ(60°) ardından yaklaşık (0.8415,0.1830,−0.0915).',
'Ölçek ve x ötelemesi: (3.6830,0.3660,−0.1830).',
'H=1+y+z ≈ 1.1830.',
'x′≈3.6830/1.1830=3.113; y′≈0.3660/1.1830=0.3094.'], 'P′≈(3.113,0.3094,0).','GENEL.pdf#page=17','archive',['perspektif']),
E('19-2','2019','Vize','İkinci derece eğri ve C¹ uyumu','B(t)=at²+bt+c; B(0)=(−1.5,0), B(1)=(−0.5,0.5), B′(0)=(0,0). a,b,c vektörlerini bul.',[
't=0: c=(−1.5,0).',
'B′(t)=2at+b, dolayısıyla B′(0)=b=(0,0).',
'B(1)=a+b+c=(−0.5,0.5) ⇒ a=(1,0.5).',
'B′(1)=2a+b=(2,1) sonraki parçanın teğeti olabilir.',
'Kaynak raporu bu sorunun üçüncü noktası için yorum belirsizliği bulunduğunu ayrıca belirtiyor.'], 'a=(1,0.5), b=(0,0), c=(−1.5,0).','GENEL.pdf#page=18','archive',['polinom','spline']),
E('19-3','2019','Vize','Bézier ile polinom katsayıları','Kübik Bézier P₀,P₁,P₂,P₃ için B(t)=at³+bt²+ct+d katsayılarını kontrol noktalarına göre yaz.',[
'Kübik Bernstein açılımını yap: (1−t)³P₀+3t(1−t)²P₁+3t²(1−t)P₂+t³P₃.',
'Sabit terim d=P₀.',
't katsayısı c=3(P₁−P₀).',
't² katsayısı b=3(P₂−2P₁+P₀).',
't³ katsayısı a=P₃−3P₂+3P₁−P₀.'], 'a=−P₀+3P₁−3P₂+P₃; b=3P₀−6P₁+3P₂; c=−3P₀+3P₁; d=P₀.','GENEL.pdf#page=19','archive',['Bézier']),
E('19-4','2019','Vize','Açık B-spline düğüm vektörü','6 kontrol noktası, 3. derece: kaynak raporunun slayt usulüne göre düğüm vektörünü oluştur ve standart tanımla karşılaştır.',[
'Slayt konvansiyonu: N+d=9 düğüm, uçlarda 3 tekrar, içte 3 farklı değer.',
'Slayt vektörü [0,0,0,1,2,3,4,4,4].',
'Standart kenetlenmiş B-spline, N+d+1=10 değer ve uçlarda 4 tekrar kullanır.',
'Standart vektör [0,0,0,0,1,2,3,3,3,3].',
'Kullanılan konvansiyon belirtildiğinde sonuç karışmaz.'], 'Slayt: 9 düğüm; standart: 10 düğüm.','GENEL.pdf#page=20','archive',['düğüm','b-spline']),
E('19-5','2019','Vize','Tekrarlı kontrol noktalı düğüm vektörü','11 kontrol noktası, 4. derece; bir kontrol noktası 3 kez, bir başkası 2 kez tekrar ediyor. Kaynak rapordaki özel slayt konvansiyonuna göre çoklukları göster.',[
'Raporda toplam N=11, d=4, hedef slayt uzunluğu 15.',
'Farklı nokta sayısı 8; iç düğüm değerleri tekrarların bulunduğu yerlerde çoklanır.',
'Uçlarda 4 adet 0 ve 4 adet 5.',
'İç dizi: 1,1,1,2,2,3,4.',
'Birleştir: [0,0,0,0,1,1,1,2,2,3,4,5,5,5,5].',
'Not: Kontrol noktası tekrarı ile düğüm çokluğu genel teoride otomatik aynı olgu değildir; bu eşleme burada kaynak sorunun özel varsayımıdır.'], '[0,0,0,0,1,1,1,2,2,3,4,5,5,5,5] — kaynak raporu slayt usulü.','GENEL.pdf#page=21','archive',['tekrar','düğüm']),
E('18-1','2018','Vize','Üçgen dönüşümü','A=(1,1), B=(3,1), C=(1,3); (3,3) etrafında 180° dön, (2,2) etrafında (3,2) ölçekle ve y eksenine göre yansıt.',[
'Merkezli 180° dönüş: T₁=[−1 0 0;0 −1 0;6 6 1].',
'Merkezli ölçek: T₂=[3 0 0;0 2 0;−4 −2 1].',
'y ekseni yansıması T₃=[−1 0 0;0 1 0;0 0 1].',
'Bileşke T=T₁T₂T₃=[3 0 0;0 −2 0;−14 10 1].',
'(x,y)→(3x−14, −2y+10).'], 'A′=(−11,8), B′=(−5,8), C′=(−11,4).','GENEL.pdf#page=22','archive',['dönüşüm']),
E('18-2','2018','Vize','Bézier ilk çeyrek alt bölme','Kübik P₀,P₁,P₂,P₃ eğrisinin [0,1/4] aralığındaki ilk alt parçanın kontrol noktalarını ana kontrol noktaları cinsinden yaz.',[
'Yeni parametre u∈[0,1] için t=u/4.',
'De Casteljau ile λ=1/4 ağırlığını kullan.',
'Q₀=P₀; Q₁=3/4P₀+1/4P₁.',
'Q₂=9/16P₀+6/16P₁+1/16P₂.',
'Q₃=27/64P₀+27/64P₁+9/64P₂+1/64P₃.',
'Sağlama Q₃=B(1/4).'], 'Q₀=P₀, Q₁=(3P₀+P₁)/4, Q₂=(9P₀+6P₁+P₂)/16, Q₃=(27P₀+27P₁+9P₂+P₃)/64.','GENEL.pdf#page=23','archive',['alt bölme']),
E('18-3','2018','Vize','Relaxed kübik spline teğetleri','P₁=(1,1), P₂=(1,3), P₃=(2,3), eşit parametre aralığı 1. Relaxed koşulla V₁,V₂,V₃ birinci türevlerini bul.',[
'Başlangıç doğal: 2V₁+V₂=3(P₂−P₁)=(0,6).',
'İç C²: V₁+4V₂+V₃=3(P₃−P₁)=(3,6).',
'Bitiş doğal: V₂+2V₃=3(P₃−P₂)=(3,0).',
'İki uçtan V₁=(0,3)−V₂/2; V₃=(1.5,0)−V₂/2.',
'Ortaya yerleştir: 3V₂=(1.5,3) ⇒ V₂=(0.5,1).',
'Geri hesap: V₁=(−0.25,2.5), V₃=(1.25,−0.5).'], 'V₁=(−0.25,2.5), V₂=(0.5,1), V₃=(1.25,−0.5).','GENEL.pdf#page=24','archive',['relaxed','spline']),
E('21-b1','2021','Bütünleme','Bézier sağ yarı alt bölme','4. derece beş kontrol noktalı Bézier t=1/2’de bölünüyor. İKİNCİ alt parçanın noktalarını ana P₀,…,P₄ cinsinden yaz.',[
'De Casteljau üçgenini λ=1/2 ile kur.',
'Sağ parçayı piramidin bölme noktasından sağ kenara doğru oku.',
'Q₀=(P₀+4P₁+6P₂+4P₃+P₄)/16.',
'Q₁=(P₁+3P₂+3P₃+P₄)/8.',
'Q₂=(P₂+2P₃+P₄)/4; Q₃=(P₃+P₄)/2; Q₄=P₄.',
'Sağlamalar: Q₀=B(1/2), Q₄=P₄.'], 'Q₀=(P₀+4P₁+6P₂+4P₃+P₄)/16; Q₁=(P₁+3P₂+3P₃+P₄)/8; Q₂=(P₂+2P₃+P₄)/4; Q₃=(P₃+P₄)/2; Q₄=P₄.','GENEL.pdf#page=41','archive',['Bézier','final']),
E('21-b2','2021','Bütünleme','Döngüsel spline teğet sistemi','Kaynak raporu: P₁=(5,6), P₂=(5,9), P₃=(7,9); kiriş uzunlukları 3 ve 2. Rapordaki cyclic koşul kurulumuna göre teğetleri hesapla.',[
'İç süreklilik: 2V₁+10V₂+3V₃=(9,6).',
'Kaynak cyclic uç eşitliği: V₃=V₁.',
'Böylece V₁+2V₂=(1.8,1.2).',
'Kaynak uç ikinci türev eşitliğinden 2V₁+V₂=(1.8,1.2).',
'İki denklemi çöz: V₁=V₂=(0.6,0.4); V₃=V₁.',
'Bu, raporda verilen denklem şablonunun çözümüdür; fiziksel kapalı eğri için ayrıca P₁=P₃ konum kapanışı aranır.'], 'Kaynak denklem sistemine göre V₁=V₂=V₃=(0.6,0.4).','GENEL.pdf#page=39','archive',['cyclic']),
E('21-f1','2021','Final','Tekrarlı noktalı B-spline vektörü','4. derece, 10 kontrol noktası. P₁–P₃ aynı konumda üç kez, P₅–P₆ iki kez tekrar ediyor. Kaynak özel sayımına göre düğüm vektörünü yaz.',[
'N=10, d=4, slayt usulü düğüm sayısı N+d=14.',
'Uçlarda d=4 adet 0 ve 4 adet 4.',
'İçte kaynak sorudaki çokluk yerleşimi: 1,1,1,2,3,3.',
'Vektör=[0,0,0,0,1,1,1,2,3,3,4,4,4,4].',
'Kontrol: 4+6+4=14.'], '[0,0,0,0,1,1,1,2,3,3,4,4,4,4].','GENEL.pdf#page=43','archive',['B-spline']),
E('x-1','Karma','Çalışma','İki kübik Bézier’i C¹ birleştir','A₂=(2,3), A₃=(4,4). B₀=A₃ olduğuna göre C¹ süreklilik için B₁?',[
'C⁰: B₀=A₃=(4,4).',
'C¹: 3(A₃−A₂)=3(B₁−B₀).',
'Fark A₃−A₂=(2,1).',
'B₁=(4,4)+(2,1).'], 'B₁=(6,5).','BEZIER_BSPLINE_MATEMATIK_REHBERI.pdf#page=16','practice',['C1']),
E('x-2','Karma','Çalışma','OpenGL line stipple maskesi','16-bit kesikli çizgi maskesi oluştururken OpenGL donanımında ilk çizilen segment hangi bit ile temsil edilir?',[
'Sabit işlevli OpenGL line stipple 16 bitlik pattern kullanır.',
'Piksel/segment yürüyüşünde en düşük anlamlı bit (LSB, bit 0) önce okunur.',
'Desen görsel soldan sağa yazıldıysa bit konumları ters yöne çevrilmelidir.'], 'LSB-first, bit 0.','GENEL.pdf#page=38','practice',['OpenGL'])
];
})();