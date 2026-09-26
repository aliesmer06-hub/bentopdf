// Kelebek PDF Araçları — derleme sonrası Türkçeleştirme
// BentoPDF sayfaları önce İngilizce açılıp, dil dosyası indirilince Türkçeye dönüyordu
// (ekranda bir an "PDF Tools" görünüyordu). Bu betik derlenmiş sayfalardaki
// data-i18n metinlerini daha sunucuda Türkçe yazar; tarayıcı ilk anda Türkçe görür.
// Ayrıca dil dosyaları ve config.json için "önden yükle" satırı ekler (daha hızlı açılış).
// Kullanım: node kelebek-cevir.mjs dist
import fs from 'node:fs';
import path from 'node:path';

const kok = process.argv[2] || 'dist';
const oku = (p) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return {}; } };
const tr = { common: oku(path.join(kok, 'locales/tr/common.json')), tools: oku(path.join(kok, 'locales/tr/tools.json')) };
const en = { common: oku(path.join(kok, 'locales/en/common.json')), tools: oku(path.join(kok, 'locales/en/tools.json')) };

function bul(sozluk, anahtar) {
  let ns = 'common', yol = anahtar;
  const i = anahtar.indexOf(':');
  if (i > 0) { ns = anahtar.slice(0, i); yol = anahtar.slice(i + 1); }
  let d = sozluk[ns];
  for (const p of yol.split('.')) { if (d && typeof d === 'object' && p in d) d = d[p]; else return null; }
  return typeof d === 'string' ? d : null;
}
function ceviri(anahtar) {
  const t = bul(tr, anahtar);
  if (!t || t.includes('{{')) return null;
  return t;
}
const kacir = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const kacirOz = (s) => kacir(s).replace(/"/g, '&quot;');

function sayfalar(dizin) {
  const l = [];
  for (const g of fs.readdirSync(dizin, { withFileTypes: true })) {
    const p = path.join(dizin, g.name);
    if (g.isDirectory()) { if (!['locales', 'assets'].includes(g.name)) l.push(...sayfalar(p)); }
    else if (g.name.endsWith('.html')) l.push(p);
  }
  return l;
}

let toplamSayfa = 0, toplamMetin = 0;
for (const dosya of sayfalar(kok)) {
  let h = fs.readFileSync(dosya, 'utf8'), n = 0;
  // 1) <etiket ... data-i18n="anahtar" ...>metin</etiket>  (içinde başka etiket olmayanlar)
  h = h.replace(/(<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2\s*>)/g, (tum, ac, etiket, k, ic, kap) => {
    const t = ceviri(k); if (!t) return tum;
    n++; const bas = ic.match(/^\s*/)[0], son = ic.match(/\s*$/)[0];
    return ac + bas + kacir(t) + son + kap;
  });
  // 2) placeholder ve title öznitelikleri
  for (const [oz, veri] of [['placeholder', 'data-i18n-placeholder'], ['title', 'data-i18n-title']]) {
    h = h.replace(new RegExp('<[a-zA-Z][^>]*\\s' + veri + '="([^"]+)"[^>]*>', 'g'), (etiket, k) => {
      const t = ceviri(k); if (!t) return etiket;
      n++;
      const re = new RegExp('\\s' + oz + '="[^"]*"');
      return re.test(etiket) ? etiket.replace(re, ' ' + oz + '="' + kacirOz(t) + '"')
                             : etiket.replace(/\s*\/?>$/, (m) => ' ' + oz + '="' + kacirOz(t) + '"' + m);
    });
  }
  // 3) dil ve sekme başlığı
  h = h.replace(/<html\b([^>]*)\slang="[^"]*"/, '<html$1 lang="tr"');
  const arac = h.match(/data-i18n="(tools:[A-Za-z0-9]+)\.name"/);
  const marka = process.env.VITE_BRAND_NAME || 'Kelebek PDF Araçları';
  const baslik = arac && ceviri(arac[1] + '.name') ? ceviri(arac[1] + '.name') + ' - ' + marka : marka;
  h = h.replace(/<title>[^<]*<\/title>/, '<title>' + kacir(baslik) + '</title>');
  // 4) dil dosyalarını HTML okunurken indirmeye başla (JS'in açılmasını beklemeden)
  if (!h.includes('locales/tr/common.json')) {
    const on = ['locales/tr/common.json', 'locales/tr/tools.json', 'config.json']
      .map((u) => '<link rel="preload" href="/' + u + '" as="fetch" crossorigin="anonymous">').join('');
    h = h.replace(/<head>/i, '<head>' + on);
  }
  fs.writeFileSync(dosya, h);
  toplamSayfa++; toplamMetin += n;
}
console.log('Türkçeleştirme: ' + toplamSayfa + ' sayfa, ' + toplamMetin + ' metin önceden çevrildi.');
