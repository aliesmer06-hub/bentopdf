/* ============================================================
   Kelebek PDF Araçları — kelebek.js
   1) Kelebek Sistemi'nin içinde (çerçevede) açıldıysa işaret koyar
      (kelebek.css o zaman BentoPDF'in kendi üst şeridini gizler).
   2) BentoPDF'te Türkçeye çevrilmemiş kalan yazıları çevirir.
   3) Kelebek üyelerine "Favori Araçlarım" bölümü: kartlardaki ☆ ile seçilir,
      liste Kelebek hesabında saklanır (başka bilgisayarda da gelir).
   ============================================================ */
(function () {
  'use strict';
  var KELEBEK = ['https://kelebeksinav.org', 'https://www.kelebeksinav.org'];
  var gomulu = true;
  try { gomulu = window.top !== window.self; } catch (e) { gomulu = true; }
  if (gomulu) document.documentElement.classList.add('kb-gomulu');

  /* ---------------- 2) Çeviri ---------------- */
  var SOZ = {
"Add More Files": "Daha Fazla Dosya Ekle",
"Clear All": "Tümünü Temizle",
"150 (Default)": "150 (Varsayılan)",
"Total Pages:": "Toplam sayfa:",
"Total pages:": "Toplam sayfa:",
"Processing...": "İşleniyor...",
"Alert": "Uyarı",
"OK": "Tamam",
"Convert to PDF": "PDF'e Dönüştür",
"How it works:": "Nasıl çalışır:",
"Page Range": "Sayfa Aralığı",
"Page Range (optional)": "Sayfa Aralığı (isteğe bağlı)",
"Orientation": "Yön",
"Left": "Sol",
"Right": "Sağ",
"Apply Rotations": "Döndürmeleri Uygula",
"Owner Password (Optional)": "Sahip Şifresi (isteğe bağlı)",
"What will be removed:": "Neler kaldırılacak:",
"Position": "Konum",
"Bottom Left": "Sol Alt",
"Bottom Right": "Sağ Alt",
"Bottom Center": "Orta Alt",
"Top Left": "Sol Üst",
"Top Right": "Sağ Üst",
"Top Center": "Orta Üst",
"Top": "Üst",
"Center": "Orta",
"Bottom": "Alt",
"Format": "Biçim",
"Font Size": "Yazı Boyutu",
"Font Color": "Yazı Rengi",
"Color": "Renk",
"Background Color": "Arka Plan Rengi",
"FAQ": "SSS",
"Close": "Kapat",
"Close FAQ": "SSS'yi kapat",
"Compression Algorithm": "Sıkıştırma Yöntemi",
"Condense (Recommended)": "Yoğun (Önerilen)",
"Photon (For Photo-Heavy PDFs)": "Foton (Fotoğraf ağırlıklı PDF'ler için)",
"Condense": "Yoğun",
"uses advanced compression: removes dead-weight, optimizes images, subsets fonts. Best for most PDFs.": "gelişmiş sıkıştırma kullanır: gereksiz verileri siler, görselleri iyileştirir, yazı tiplerini küçültür. Çoğu PDF için en iyisi.",
"Photon": "Foton",
"converts pages to images. Use for photo-heavy/scanned PDFs.": "sayfaları görsele çevirir. Fotoğraf ağırlıklı ya da taranmış PDF'ler için kullanın.",
"⚠️ Warning: Text will become non-selectable and links will stop working.": "⚠️ Uyarı: Metin seçilemez olur ve bağlantılar çalışmaz.",
"Compression Level": "Sıkıştırma Düzeyi",
"Light (Preserve Quality)": "Hafif (Kaliteyi korur)",
"Balanced (Recommended)": "Dengeli (Önerilen)",
"Aggressive (Smaller Files)": "Güçlü (Daha küçük dosya)",
"Extreme (Maximum Compression)": "En yüksek (Azami sıkıştırma)",
"Convert to Grayscale": "Gri Tonlamaya Çevir",
"Reduces file size by removing color information": "Renk bilgisini kaldırarak dosya boyutunu küçültür",
"Custom Settings": "Özel Ayarlar",
"Fine-tune compression parameters:": "Sıkıştırma ayarlarını ince ayarlayın:",
"Output Quality": "Çıktı Kalitesi",
"Resize Images To": "Görselleri Şu Boyuta Getir",
"Only Process Above": "Yalnızca Şunun Üstündekileri İşle",
"Remove metadata": "Üst verileri kaldır",
"Subset fonts (remove unused glyphs)": "Yazı tiplerini küçült (kullanılmayan karakterleri kaldır)",
"Remove embedded thumbnails": "Gömülü küçük resimleri kaldır",
"Compress PDF": "PDF'i Sıkıştır",
"Inches": "İnç",
"Portrait": "Dikey",
"Landscape": "Yatay",
"Content Scaling": "İçerik Ölçekleme",
"Fit": "Sığdır",
"Preserves all content, may add margins.": "Bütün içeriği korur, kenar boşluğu ekleyebilir.",
"Fill (Crop)": "Doldur (Kırp)",
"Fills the page, may crop content.": "Sayfayı doldurur, içeriği kırpabilir.",
"PDF Quality": "PDF Kalitesi",
"High Quality (Larger file)": "Yüksek Kalite (Daha büyük dosya)",
"Medium Quality (Balanced)": "Orta Kalite (Dengeli)",
"Low Quality (Smaller file)": "Düşük Kalite (Daha küçük dosya)",
"Controls image compression when embedding into PDF": "PDF'e eklenirken görsellerin sıkıştırılmasını ayarlar",
"Header Center": "Üst Bilgi Orta",
"Header Left": "Üst Bilgi Sol",
"Header Right": "Üst Bilgi Sağ",
"Footer Center": "Alt Bilgi Orta",
"Footer Left": "Alt Bilgi Sol",
"Footer Right": "Alt Bilgi Sağ",
"Remove Annotations": "Açıklamaları Kaldır",
"Reset": "Sıfırla",
"e.g., 1-3, 5": "örn. 1-3, 5",
"e.g., 2, 4-6, 9": "örn. 2, 4-6, 9",
"e.g. 1-5, 8, 11-13": "örn. 1-5, 8, 11-13",
"e.g., 3,1,4,2": "örn. 3,1,4,2",
"Page Size": "Sayfa Boyutu",
"Letter": "Letter (ABD)",
"Text": "Metin",
"Image": "Görsel",
"Opacity:": "Saydamlık:",
"Angle:": "Açı:",
"Export": "Dışa Aktar",
"Import": "İçe Aktar",
"Modified": "Değiştirildi",
"Page 1 of 1": "Sayfa 1 / 1",
"Go to:": "Git:",
"Go": "Git",
"Bookmarks": "Yer İmleri",
"Cancel": "Vazgeç",
"Save": "Kaydet",
"Add Layer": "Katman Ekle",
"File Mode": "Dosya Modu",
"Page Mode": "Sayfa Modu",
"Click and drag the": "Dosyaların sırasını değiştirmek için",
"icon to change the order of the files.": "simgesini tutup sürükleyin.",
"In the \"Pages\" box for each file, you can specify ranges (e.g., \"1-3, 5\") to merge only those pages.": "Her dosyanın \"Sayfalar\" kutusuna aralık yazarak (örn. \"1-3, 5\") yalnızca o sayfaları birleştirebilirsiniz.",
"Leave the \"Pages\" box blank to include all pages from that file.": "Dosyanın bütün sayfalarını almak için \"Sayfalar\" kutusunu boş bırakın.",
"All pages from your uploaded PDFs are shown below.": "Yüklediğiniz PDF'lerin bütün sayfaları aşağıda.",
"Simply drag and drop the individual page thumbnails to create the exact order you want for your new file.": "Yeni dosyanızda istediğiniz sırayı oluşturmak için sayfaları sürükleyip bırakın.",
"Merge PDFs": "PDF'leri Birleştir",
"Split Mode": "Bölme Şekli",
"Extract by Page Range (Default)": "Sayfa aralığına göre ayır (Varsayılan)",
"Split by Even/Odd Pages": "Tek/Çift sayfalara göre böl",
"Split All Pages into Separate Files": "Her sayfayı ayrı dosya yap",
"Select Pages Visually": "Sayfaları görerek seç",
"Split by Bookmarks": "Yer imlerine göre böl",
"Split N Times": "Her N sayfada böl",
"Enter page numbers separated by commas (e.g., 2, 8, 14).": "Sayfa numaralarını virgülle ayırarak yazın (örn. 2, 8, 14).",
"Enter page ranges using a hyphen (e.g., 5-10).": "Aralıkları kısa çizgiyle yazın (örn. 5-10).",
"Combine them for complex selections (e.g., 1-3, 7, 12-15).": "İkisini birlikte de kullanabilirsiniz (örn. 1-3, 7, 12-15).",
"Extract all even pages (2, 4, 6...) or all odd pages (1, 3, 5...) into a new PDF.": "Bütün çift sayfaları (2, 4, 6...) ya da tek sayfaları (1, 3, 5...) yeni bir PDF'e ayırır.",
"Even Pages": "Çift Sayfalar",
"Odd Pages": "Tek Sayfalar",
"Every single page of the PDF will be saved as a separate PDF file.": "PDF'in her sayfası ayrı bir PDF dosyası olarak kaydedilir.",
"The result will be downloaded as a ZIP file containing all the pages.": "Sonuç, bütün sayfaları içeren bir ZIP dosyası olarak iner.",
"Click on the page thumbnails below to select the pages you want to extract.": "Ayırmak istediğiniz sayfaları aşağıdan tıklayarak seçin.",
"Selected pages will be highlighted.": "Seçilen sayfalar vurgulanır.",
"Split the PDF based on its bookmarks (outline).": "PDF'i yer imlerine (ana hatlarına) göre böler.",
"Select the bookmark level to split at.": "Bölünecek yer imi düzeyini seçin.",
"Bookmark Level": "Yer İmi Düzeyi",
"All Levels": "Bütün Düzeyler",
"Level 0 (Top Level Only)": "Düzey 0 (yalnızca en üst)",
"Level 1": "Düzey 1",
"Level 2": "Düzey 2",
"Level 3": "Düzey 3",
"Split the PDF into multiple files, each containing N pages.": "PDF'i her biri N sayfalık dosyalara böler.",
"Pages per file (N)": "Dosya başına sayfa (N)",
"Output": "Çıktı",
"Single combined PDF": "Tek birleşik PDF",
"One PDF per range": "Her aralık için bir PDF",
"Multiple files are downloaded together as a ZIP.": "Birden fazla dosya birlikte ZIP olarak iner.",
"Split PDF": "PDF'i Böl",
"Enter pages to delete (e.g., 2, 4-6, 9):": "Silinecek sayfaları yazın (örn. 2, 4-6, 9):",
"Delete Pages & Download": "Sayfaları Sil ve İndir",
"Batch Actions": "Toplu İşlemler",
"Rotate by Custom Degrees": "Özel Açıyla Döndür",
"Advanced Settings": "Gelişmiş Ayarlar",
"Page Order (comma-separated)": "Sayfa Sırası (virgülle)",
"Apply Order": "Sırayı Uygula",
"Flatten PDF (use the Save button below)": "PDF'i düzleştir (aşağıdaki Kaydet düğmesini kullanın)",
"Save & Download Signed PDF": "İmzalı PDF'i Kaydet ve İndir",
"Change File": "Dosyayı Değiştir",
"Preview": "Önizleme",
"Drag watermark to position": "Filigranı sürükleyerek yerleştirin",
"CONFIDENTIAL": "GİZLİ",
"Layout": "Yerleşim",
"Single": "Tek",
"Tiled": "Döşeli",
"Tiled repeats the watermark across the whole page.": "Döşeli, filigranı bütün sayfaya tekrar tekrar yayar.",
"all or 1-3, 5, 7-9": "tümü ya da 1-3, 5, 7-9",
"Use \"all\" or specify pages, e.g. 1-3, 5, 7-9": "Bütün sayfalar için \"all\" yazın ya da sayfaları belirtin, örn. 1-3, 5, 7-9",
"Watermark Image": "Filigran Görseli",
"Scale:": "Ölçek:",
"Horizontal gap:": "Yatay aralık:",
"Vertical gap:": "Dikey aralık:",
"Flatten watermark": "Filigranı sabitle",
"Bakes the watermark into page pixels, making it tamper-resistant. Text will no longer be selectable.": "Filigranı sayfaya kalıcı olarak işler, silinemez hale getirir. Metin artık seçilemez.",
"Add Watermark": "Filigran Ekle",
"Add Page Numbers": "Sayfa Numarası Ekle",
"Convert to DOCX": "Word'e (DOCX) Dönüştür",
"Convert to Excel": "Excel'e Dönüştür",
"User Password (Required)": "Açılış Şifresi (zorunlu)",
"Enter password to open PDF": "PDF'i açmak için şifre girin",
"This password will be required to open the PDF.": "PDF'i açmak için bu şifre istenecek.",
"Enter password for permissions (optional)": "İzinler için şifre girin (isteğe bağlı)",
"If provided, usage restrictions will be applied. Leave empty for no restrictions.": "Yazarsanız kullanım kısıtlamaları uygulanır. Kısıtlama istemiyorsanız boş bırakın.",
"Encryption Details:": "Şifreleme ayrıntıları:",
"256-bit AES encryption (highest security)": "256 bit AES şifreleme (en yüksek güvenlik)",
"User password required to open PDF": "PDF'i açmak için açılış şifresi gerekir",
"Owner password enables usage restrictions": "Sahip şifresi kullanım kısıtlamalarını açar",
"Without owner password: no restrictions applied": "Sahip şifresi yoksa kısıtlama uygulanmaz",
"Encrypt PDF": "PDF'i Şifrele",
"PDF Password": "PDF Şifresi",
"Enter the PDF password": "PDF şifresini girin",
"Enter the password used to protect this PDF.": "Bu PDF'i korumak için kullanılan şifreyi girin.",
"Decrypt PDF": "PDF Şifresini Kaldır",
"Enter pages to extract (e.g., 2, 4-6, 9):": "Ayrılacak sayfaları yazın (örn. 2, 4-6, 9):",
"Extract & Download ZIP": "Ayır ve ZIP İndir",
"Previous Page": "Önceki Sayfa",
"Next Page": "Sonraki Sayfa",
"Flattening Crop (converts pages to images)": "Kalıcı kırpma (sayfaları görsele çevirir)",
"Apply to all pages": "Bütün sayfalara uygula",
"Crop & Download": "Kırp ve İndir",
"Formatting Options": "Biçim Seçenekleri",
"Add Header & Footer": "Üst ve Alt Bilgi Ekle",
"What will be flattened:": "Neler düzleştirilecek:",
"Form fields (text fields, checkboxes, radio buttons, etc.)": "Form alanları (metin kutuları, onay kutuları, seçenek düğmeleri vb.)",
"Annotations and comments": "Açıklamalar ve yorumlar",
"Interactive elements": "Etkileşimli ögeler",
"Note: Flattened content cannot be edited or filled out.": "Not: Düzleştirilen içerik düzenlenemez ve doldurulamaz.",
"Flatten PDF(s)": "PDF'leri Düzleştir",
"Specify the position where blank pages should be inserted.": "Boş sayfaların ekleneceği yeri belirtin.",
"Position 0 inserts at the beginning, position equal to page count inserts at the end.": "0 yazarsanız başa, sayfa sayısını yazarsanız sona eklenir.",
"Blank pages will match the size of the first page in your document.": "Boş sayfalar belgenizin ilk sayfasıyla aynı boyutta olur.",
"Insert after page": "Şu sayfadan sonra ekle",
"Enter 0 to insert at the beginning.": "Başa eklemek için 0 yazın.",
"Number of blank pages": "Boş sayfa sayısı",
"Add Blank Pages": "Boş Sayfa Ekle",
"All pages will be reversed (first becomes last, last becomes first).": "Bütün sayfaların sırası ters çevrilir (ilk sayfa sona, son sayfa başa geçer).",
"If you upload multiple PDFs, each will be reversed and downloaded as a ZIP file.": "Birden fazla PDF yüklerseniz her biri ters çevrilir ve ZIP olarak iner.",
"Reverse Pages": "Sayfaları Ters Çevir",
"Download": "İndir",
"Upload File": "Dosya Yükle",
"Upload PDFs": "PDF Yükle",
"Process": "İşle",
"Extract Pages": "Sayfaları Ayır",
"Delete Pages": "Sayfaları Sil",
"Rotate PDF": "PDF'i Döndür",
"Merge PDF": "PDF Birleştir",
"Edit PDF": "PDF Düzenle",
"OCR PDF": "PDF'te Metin Tanıma (OCR)",
"Protect PDF": "PDF'i Koru",
"Flatten PDF": "PDF'i Düzleştir",
"PDF to JPG": "PDF'ten JPG'ye",
"PDF to PNG": "PDF'ten PNG'ye",
"Word to PDF": "Word'den PDF'e",
"Fix Page Size": "Sayfa Boyutunu Düzelt",
"Download selected": "Seçilenleri indir",
"Select All": "Tümünü Seç",
"Deselect All": "Seçimi Kaldır",
"Undo": "Geri Al",
"Redo": "Yinele",
"Rotate Left": "Sola Döndür",
"Rotate Right": "Sağa Döndür",
"Apply": "Uygula",
"Done": "Bitti",
"Next": "İleri",
"Back": "Geri",
"Loading...": "Yükleniyor...",
"Error": "Hata",
"Success": "Başarılı",
"Warning": "Uyarı",
"Pages": "Sayfalar",
"Page": "Sayfa",
"Width": "Genişlik",
"Height": "Yükseklik",
"Margin": "Kenar Boşluğu",
"Quality": "Kalite",
"Language": "Dil",
"Settings": "Ayarlar",
"Options": "Seçenekler"
};
  var ATTR = ['placeholder', 'title', 'aria-label'];
  function cevirMetin(n) {
    var v = n.nodeValue; if (!v) return;
    var t = v.replace(/\s+/g, ' ').trim(); if (!t || !SOZ.hasOwnProperty(t)) return;
    var bas = v.match(/^\s*/)[0], son = v.match(/\s*$/)[0];
    n.nodeValue = bas + SOZ[t] + son;
  }
  function cevirOge(el) {
    for (var i = 0; i < ATTR.length; i++) {
      var a = el.getAttribute && el.getAttribute(ATTR[i]);
      if (a) { var t = a.replace(/\s+/g, ' ').trim(); if (SOZ.hasOwnProperty(t)) el.setAttribute(ATTR[i], SOZ[t]); }
    }
  }
  function cevirAgac(kok) {
    if (!kok) return;
    if (kok.nodeType === 3) { cevirMetin(kok); return; }
    if (kok.nodeType !== 1) return;
    var tag = kok.tagName; if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return;
    cevirOge(kok);
    var w = document.createTreeWalker(kok, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) {
        var p = n.parentNode && n.parentNode.tagName;
        if (p !== 'SCRIPT' && p !== 'STYLE' && p !== 'TEXTAREA') cevirMetin(n);
      } else cevirOge(n);
    }
  }
  var calisiyor = false;
  function gozle() {
    cevirAgac(document.body);
    new MutationObserver(function (kayitlar) {
      if (calisiyor) return; calisiyor = true;
      try {
        for (var i = 0; i < kayitlar.length; i++) {
          var k = kayitlar[i];
          if (k.type === 'childList') for (var j = 0; j < k.addedNodes.length; j++) cevirAgac(k.addedNodes[j]);
          else if (k.type === 'characterData') cevirMetin(k.target);
          else if (k.type === 'attributes') cevirOge(k.target);
        }
        favoriKartlari();
      } finally { calisiyor = false; }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTR });
  }

  /* ---------------- 3) Favori araçlar (yalnızca Kelebek üyeleri) ---------------- */
  var uye = false, favoriler = [], favoriHazir = false;
  function ebeveyneGonder(mesaj) {
    if (!gomulu) return;
    for (var i = 0; i < KELEBEK.length; i++) { try { window.parent.postMessage(mesaj, KELEBEK[i]); } catch (e) {} }
  }
  function aracKimlik(kart) {
    if (kart.dataset && kart.dataset.toolId) return kart.dataset.toolId;
    var h = kart.getAttribute && kart.getAttribute('href'); if (!h) return null;
    var m = h.split('?')[0].split('#')[0].replace(/\/+$/, '').split('/').pop();
    return m ? m.replace(/\.html$/, '') : null;
  }
  function yildizSvg(dolu) {
    return '<svg viewBox="0 0 24 24" width="18" height="18" fill="' + (dolu ? '#f5b301' : 'none') + '" stroke="' +
      (dolu ? '#f5b301' : 'currentColor') + '" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z"/></svg>';
  }
  function kaydet() { ebeveyneGonder({ kb: 'favoriKaydet', liste: favoriler.slice(0, 40) }); }
  function favoriKartlari() {
    var izgara = document.getElementById('tool-grid');
    if (!izgara || !uye) return;
    var kartlar = izgara.querySelectorAll('.category-group .tool-card');
    for (var i = 0; i < kartlar.length; i++) {
      var k = kartlar[i];
      if (k.querySelector('.kb-yildiz')) continue;
      var id = aracKimlik(k); if (!id) continue;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'kb-yildiz'; b.setAttribute('data-arac', id);
      k.style.position = 'relative'; k.appendChild(b);
      b.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var a = this.getAttribute('data-arac'), yer = favoriler.indexOf(a);
        if (yer >= 0) favoriler.splice(yer, 1); else favoriler.push(a);
        kaydet(); favoriCiz();
      });
    }
    yildizlariGuncelle();
    if (!document.getElementById('kb-favori')) favoriCiz();
  }
  function yildizlariGuncelle() {
    var y = document.querySelectorAll('.kb-yildiz');
    for (var i = 0; i < y.length; i++) {
      var dolu = favoriler.indexOf(y[i].getAttribute('data-arac')) >= 0;
      if (y[i].firstChild && y[i].classList.contains('dolu') === dolu) continue;   /* değişmediyse dokunma (gözlemci döngüsü olmasın) */
      y[i].innerHTML = yildizSvg(dolu);
      y[i].title = dolu ? 'Favorilerden çıkar' : 'Favorilere ekle';
      y[i].setAttribute('aria-label', y[i].title);
      y[i].classList.toggle('dolu', dolu);
    }
  }
  function favoriCiz() {
    var izgara = document.getElementById('tool-grid'); if (!izgara || !uye) return;
    var bolum = document.getElementById('kb-favori');
    if (!bolum) {
      bolum = document.createElement('div'); bolum.id = 'kb-favori'; bolum.className = 'col-span-full';
      var ilkGrup = izgara.querySelector('.category-group');
      izgara.insertBefore(bolum, ilkGrup || null);
    }
    var kaynak = {}, kartlar = izgara.querySelectorAll('.category-group .tool-card');
    for (var i = 0; i < kartlar.length; i++) { var id = aracKimlik(kartlar[i]); if (id && !kaynak[id]) kaynak[id] = kartlar[i]; }
    var html = '<div class="kb-favori-bas"><span>' + yildizSvg(true) + ' Favori Araçlarım</span></div>';
    bolum.innerHTML = html;
    var kap = document.createElement('div');
    kap.className = 'kb-favori-kartlar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6';
    var sayi = 0;
    favoriler.forEach(function (id) {
      var asil = kaynak[id]; if (!asil) return;
      var kopya = asil.cloneNode(true);
      var y = kopya.querySelector('.kb-yildiz'); if (y) y.remove();
      var cik = document.createElement('button'); cik.type = 'button'; cik.className = 'kb-yildiz dolu';
      cik.setAttribute('data-arac', id); cik.innerHTML = yildizSvg(true); cik.title = 'Favorilerden çıkar'; cik.setAttribute('aria-label', cik.title);
      cik.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        favoriler = favoriler.filter(function (x) { return x !== id; }); kaydet(); favoriCiz();
      });
      kopya.appendChild(cik);
      if (kopya.tagName !== 'A') kopya.addEventListener('click', function () { asil.click(); });
      kap.appendChild(kopya); sayi++;
    });
    if (!sayi) {
      var bos = document.createElement('p'); bos.className = 'kb-favori-bos';
      bos.textContent = 'Sık kullandığınız araçları, kartların sağ üstündeki ☆ işaretine basarak buraya ekleyin.';
      bolum.appendChild(bos);
    } else bolum.appendChild(kap);
    yildizlariGuncelle();
  }
  window.addEventListener('message', function (e) {
    if (KELEBEK.indexOf(e.origin) < 0 || !e.data || e.data.kb !== 'favori') return;
    uye = !!e.data.uye;
    favoriler = Array.isArray(e.data.liste) ? e.data.liste.filter(function (x) { return typeof x === 'string'; }).slice(0, 40) : [];
    favoriHazir = true;
    if (document.body) { favoriKartlari(); favoriCiz(); }
  });

  /* ---------------- 4) Kategori aç/kapa okları ----------------
     BentoPDF kapatırken yüksekliği bir sonraki kareye (requestAnimationFrame) bırakıyor;
     bazı tarayıcılarda çerçeve içinde o kare gecikince bölüm kapanmıyordu. Kısa süre
     sonra durumu denetleyip yarım kalan kapanmayı/açılmayı tamamlıyoruz. */
  document.addEventListener('click', function (e) {
    var bas = e.target && e.target.closest && e.target.closest('.category-header'); if (!bas) return;
    var grup = bas.closest('.category-group'), kap = grup && grup.querySelector('.category-tools'); if (!kap) return;
    setTimeout(function () {
      if (grup.classList.contains('collapsed')) {
        if (kap.style.maxHeight !== '0px') { kap.style.overflow = 'hidden'; kap.style.maxHeight = '0px'; }
      } else if (kap.style.maxHeight === '0px' || (kap.style.maxHeight && kap.style.maxHeight !== 'none')) {
        kap.style.maxHeight = kap.scrollHeight + 'px';
        setTimeout(function () { if (!grup.classList.contains('collapsed')) { kap.style.maxHeight = 'none'; kap.style.overflow = 'visible'; } }, 450);
      }
    }, 120);
  }, true);

  function basla() {
    gozle();
    ebeveyneGonder({ kb: 'hazir' });
    /* arama yapılırken favori bölümünü gizle (BentoPDF kategorileri gizlediği gibi) */
    document.addEventListener('input', function (e) {
      if (!e.target || e.target.id !== 'search-bar') return;
      var b = document.getElementById('kb-favori');
      if (b) b.style.display = e.target.value.trim() ? 'none' : '';
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', basla);
  else basla();
})();
