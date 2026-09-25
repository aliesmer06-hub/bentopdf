/* Kelebek PDF Araçları: Kelebek Sistemi'nin içinde (çerçevede) açıldıysa
   işaret koy; kelebek.css o zaman BentoPDF'in kendi üst şeridini gizler. */
(function () {
  var gomulu = true;
  try { gomulu = window.top !== window.self; } catch (e) { gomulu = true; }
  if (gomulu) document.documentElement.classList.add('kb-gomulu');
})();
