# BZ303 Grafik Akademisi — Bilgisayar Grafikleri

> **Sıfırdan öğren → kâğıtta kendin çöz → adımları tek tek aç → sağlamasını yap.**

BZ303 Bilgisayar Grafikleri için Türkçe, ücretsiz, çevrimdışı çalışabilen kapsamlı ders ve sınav hazırlık platformu. Kullanıcının sağladığı orijinal notlardan hazırlanmıştır. Önceki sürümdeki kısa ders özetlerinin yerine kaynak temelli, öğretim odaklı bir kütüphane eklenmiştir.

## Neler var?

| Alan | İçerik |
|---|---|
| **625 kaynak çözümü** | 730 sayfalık `Konular.pdf` içindeki 625 tam ve yapılandırılmış örnek: *Hocanın anlattığı → soru → verilenler → semboller → adım adım çözüm → sonuç → kontrol → nasıl düşünmelisin*. Kaynak PDF sayfasına bağlantılıdır. |
| **7 adet derin öğrenme dersi** | 2B dönüşüm, perspektif, Bézier/Bernstein, türev, derece yükseltme, B-spline düğüm vektörleri ve de Casteljau. Formülün nedeni, aşamalı sayısal çözüm, kontrol ve sınav hataları vardır. |
| **26 kısa konu özeti** | 2B/3B dönüşümler, kamera, projeksiyon, Bézier, B-spline, spline, OpenGL ve tekrar konuları. İlgili uzun derse ve kaynak çözümlerine bağlantılıdır. |
| **75 soruluk deneme** | Konuya göre test, cevabın açıklaması, puan ve yanlış incelemesi. |
| **21 sınav sorusu/çalışma uygulaması** | 2018–2021 kaynak raporlarından seçilen çözümler; 2025 için yalnızca konular verildiğinden açıkça etiketlenmiş yeni **çalışma örnekleri**. |
| **5 etkileşimli laboratuvar** | Bézier kontrol noktalarını sürükleme, 2B dönüşümler, perspektif H hesabı, B-spline düğümleri, Bernstein ağırlıkları. |
| **Formüller ve kartlar** | 26 tekrar kartı, formül kütüphanesi ve Ctrl+K ile çok kaynaklı arama. |
| **PDF kaynakları** | `Konular.pdf`, `GENEL.pdf`, `VIZE.pdf`, `BEZIER_BSPLINE_MATEMATIK_REHBERI.pdf`, `sorular.pdf`. PDF'lerin toplamı **858 sayfa**. |

## Açmak

İndirilen ZIP dosyasını çıkarıp `index.html` dosyasına çift tıklayın. Giriş, veritabanı, üyelik veya internet gerekmiyor. Kayıtlar tarayıcının `localStorage` bölümünde tutulur. Yerel PDF gösterimi bazı tarayıcılarda kısıtlanıyorsa dosyaları tarayıcıda ayrı açın veya kök dizinde `python -m http.server 8000` kullanın.

### GitHub Pages yayını

Depo dosyaları doğrudan kök dizinde durmalıdır. **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.** Dağıtım aktif olduğunda URL GitHub tarafından üretilir. Bağlı GitHub hesabındaki Pages ayarlarını bu uygulama kendiliğinden değiştirmez.

## Dersin notasyon uyarıları

- **Satır vektörü kullanılır:** `[x y 1] · T`. İşlem sırası soldan sağa. Pozitif +90° dönüş matrisine ve gerçek çarpıma göre `(1,0) → (0,1)` olur. Notların bir açıklamasında bulunan çelişkili sözel ifade düzeltilmeden taşınmaz.
- **Standart B-spline:** `N` kontrol noktası, `d` derece ⇒ düğüm sayısı `N+d+1`, uçlarda `d+1` tekrar.
- **Yüklenen raporun slayt kuralı:** `N+k` düğüm, uçlarda `k` tekrar, `t_max=N-k+1`. Bu, standart clamped gösterimle birebir aynı sayım değildir; arayüzde iki seçenek açıkça ayrılmıştır.
- **2025 vize notu** yalnızca dört konu başlığını veriyor: düğüm vektörü, projeksiyon, Bézier uç türevleri, derece yükseltme. 2025 için hayalî sınav rakamları sunulmaz; çalışma amaçlı sayısal örnekler ayrıca belirtilir.

## Dosya yapısı

```
index.html                Sayfa kabuğu ve menü
assets/style.css          Responsive tasarım
assets/app.js             Ders, sınav, kartlar, laboratuvar, arama
assets/coursebook.js      625 çözümün adım adım görüntülenmesi, derin dersler
assets/favicon.svg        Uygulama simgesi
data/lessons.js            26 ders özeti
data/masterclasses.js     Uzun, öğretici problem akışları
data/coursebook-*.js      Konular.pdf kaynak örnekleri (23 parça)
data/coursebook-meta.js   Kaynak sayımı
data/exams.js              Çıkmışlar ve işaretlenmiş çalışma soruları
data/quiz.js               75 açıklamalı test
/data/search*.js          PDF arama dizini (20 bölüme ayrıldı)
kaynaklar/                Orijinal ders materyalleri
scripts/                  Kaynak çıkarım ve arama indeksleme
/tests/                   Matematik, gezinme, mobil ve etkileşim testleri
```

## Kontrol

- Kullanıcı arayüzü Chromium/Playwright ile denendi: ana sayfa, konu anlatımı, 625 örnek araması, hafta filtresi, çözümü kademeli açma, PDF sayfasına link, derin ders adımları, 75 soruluk test, 5 laboratuvar, mobil taşma.
- 720 rastgele Bézier/de Casteljau/derece yükseltme sınaması: hesaplamalar matematiksel referanslarla karşılaştırıldı.
- Tüm kaynak metinleri *matematiksel olarak bağımsız yeniden doğrulanmış* sayılmaz. Orijinal kaynakta hata veya görünüm farkı bulunabileceği için PDF sayfa numarası her örnekte yer alır.

**Kullanılan kaynak:** Kullanıcının sağladığı `Konular.pdf` (730 s.), `GENEL.pdf` (46 s.), `VIZE.pdf` (22 s.), `BEZIER_BSPLINE_MATEMATIK_REHBERI.pdf` (39 s.), `sorular.pdf` (21 s.) ve 2025 konu notu. Referans BZ205 sitesinin gezinme/çalışma fikrinden esinlenilmiştir; içerik ve kod bu projeye özeldir.

## GitHub Pages için PDF sayfaları

GitHub yükleme sınırları nedeniyle `Konular.pdf` ve `sorular.pdf` kaynakları, **sayfa içerikleri değiştirilmeden** `kaynaklar/parcalar/` klasöründe sırasıyla 50 ve 2 sayfalık küçük PDF dosyalarına ayrılmıştır. Sitedeki kaynak bağlantıları özgün sayfa numarasını otomatik olarak ilgili PDF parçasına çevirir. Kaynak kütüphanesinde tüm parçalara doğrudan ulaşılabilir. Bu dağıtımın amacı metin veya görseli özetlemek değil, orijinal sayfaları eksiksiz sunmaktır. İndirilebilir ZIP içerisinde orijinal bütün PDF dosyaları da saklanabilir.