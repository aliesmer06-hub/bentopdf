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

# 5) Kelebek görünümü: her sayfaya açık tema ve "çerçeve içinde" betiği
SURUM=$(date +%s)
find dist -name '*.html' -print0 | xargs -0 sed -i "s#</head>#<link rel=\"stylesheet\" href=\"/kelebek.css?v=$SURUM\"><script src=\"/kelebek.js?v=$SURUM\"></script></head>#"
echo "Kelebek görünümü $(grep -rl 'kelebek.css' dist --include='*.html' | wc -l) sayfaya eklendi."
