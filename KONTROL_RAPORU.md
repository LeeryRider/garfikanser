# BZ303 Grafik Akademisi — V2 kontrol raporu

## Kapsam
- Orijinal `Konular.pdf`: 730 sayfa.
- PDF dosyasındaki **625** adet E01/E02/... tipinde başlıklandırılmış, çözüm adımlarına sahip örnek sayfası programlı olarak ayrıştırıldı. Bazı özet sayfalarda örneklere atıf geçen E numaraları gerçek çözüm sayfası olarak sayılmadı.
- 7 uzun konu ustalık dersi, 26 kısa ders, 21 sınav uygulaması, 75 çoktan seçmeli test, 5 hesaplama laboratuvarı.
- 2025 notunda dört konu vardır, tam soru metinleri yoktur.

## Fonksiyonel kontroller
- Ders kitabı: 625 kart, 7 hafta filtresi, başlık/soru/öğretmen açıklaması araması, 24 öğeli sayfalandırma.
- Çözüm sayfası: öğretmen anlatımı, soru, verilenler, semboller, kapalı adımlar, ilerlemeli açma, tamamlanınca sonuç ve sağlama, orijinal PDF bağlantısı.
- Derin ders: 7 konu için neden + formül + sayısal işlemler + sağlama + sınav tuzağı, aşamalı gösterim.
- 26 dersten uzun derslere ve eşleşen kaynak örneklere geçiş.
- Quiz, flashcards, hesaplama laboratuvarı, gezinme, arama ve tema kontrolü.
- Mobil 390px ve masaüstü 1440px görünüm: yatay taşma yok, JS çalışma zamanı hatası yok.
- 720 rastgele Bézier matematik kontrolü: başarılı.

## Uyarılar
- 625 kaynak örneğinin her matematiksel sonucunu bağımsız yeniden hesaplayarak doğrulama iddiası yoktur: kaynak metin korunur, sayfa bağlantısı verilir.
- Özel karmaşık şekiller orijinal PDF üzerinden açılmalıdır; tekst ayrıştırması görselleri birebir yeniden çizmez.
- PDFlerin kaynak sayımları `Konular` 730 + `GENEL` 46 + `VIZE` 22 + `Bézier` 39 + `sorular` 21 = 858 sayfadır.
- 2025 için sitedeki yeni problemler **çalışma örneği**, gerçek sınav sorusu değildir.
- Sayısal örneklerin gösteriminde satır-vektörü, standart B-spline ve slayt kuralı ayrımı görünürdür.
- GitHub Pages görünümü sadece Pages dağıtımı aktive edildikten sonra açılır.