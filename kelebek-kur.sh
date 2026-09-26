#!/bin/bash
# Kelebek PDF Araçları — Cloudflare derleme betiği
# Cloudflare Pages "Build command":  bash kelebek-kur.sh
set -e

# 1) Word/Excel -> PDF motoru 48 MB; Cloudflare'in 25 MB dosya sınırını aşıyor
rm -rf public/libreoffice-wasm

# 2) Sayfa yalnızca kelebeksinav.org içinde çerçevelenebilsin
printf '/*\n  Content-Security-Policy: frame-ancestors https://kelebeksinav.org https://www.kelebeksinav.org\n' > public/_headers

# 3) Kelebek logosu
curl -fsSL https://kelebeksinav.org/amblem.png -o public/images/kelebek.png

# 4) BentoPDF'i derle (ayarlar Cloudflare'deki ortam değişkenlerinden gelir)
npm run build

# 5) Kelebek görünümü: her sayfaya açık tema ve "çerçeve içinde" betiği.
#    Dosya adına derleme zamanı eklenir (kb-1790000000.css). BentoPDF'in çevrimdışı
#    önbelleği (sw.js) dosyaları ADINA göre saklıyor; ad değişmezse tarayıcı eskisini
#    göstermeye devam ederdi. Böylece her güncelleme herkese kendiliğinden ulaşır.
SURUM=$(date +%s)
cp public/kelebek.css "dist/kb-$SURUM.css"
cp public/kelebek.js "dist/kb-$SURUM.js"
find dist -name '*.html' -print0 | xargs -0 sed -i "s#</head>#<link rel=\"stylesheet\" href=\"/kb-$SURUM.css\"><script src=\"/kb-$SURUM.js\"></script></head>#"
echo "Kelebek görünümü (kb-$SURUM) $(grep -rl "kb-$SURUM.css" dist --include='*.html' | wc -l) sayfaya eklendi."

# 6) Sayfaları sunucuda Türkçeleştir (ilk anda "PDF Tools" görünmesin) ve
#    dil dosyalarını önden indirmeye başla (daha hızlı açılış)
node kelebek-cevir.mjs dist
