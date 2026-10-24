/* Vanilla JS tanpa library. Empat fitur: tema, navigasi aktif, filter proyek, salin email. */
(function () {
  "use strict";

  const root = document.documentElement;

  /* ===== 1. Tema terang / gelap ===== */
  const tombolTema = document.getElementById("tema");
  const KUNCI_TEMA = "tema-pilihan";

  function bacaTema() {
    try { return localStorage.getItem(KUNCI_TEMA); } catch (e) { return null; }
  }
  function simpanTema(nilai) {
    try { localStorage.setItem(KUNCI_TEMA, nilai); } catch (e) { /* abaikan */ }
  }
  function temaSaatIni() {
    const diatur = root.getAttribute("data-tema");
    if (diatur) return diatur;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "gelap" : "terang";
  }
  function terapkanTema(tema) {
    root.setAttribute("data-tema", tema);
    tombolTema.textContent = tema === "gelap" ? "Mode terang" : "Mode gelap";
    tombolTema.setAttribute("aria-pressed", String(tema === "gelap"));
  }

  const tersimpan = bacaTema();
  if (tersimpan === "gelap" || tersimpan === "terang") root.setAttribute("data-tema", tersimpan);
  terapkanTema(temaSaatIni());

  tombolTema.addEventListener("click", function () {
    const baru = temaSaatIni() === "gelap" ? "terang" : "gelap";
    terapkanTema(baru);
    simpanTema(baru);
  });

  /* ===== 2. Tandai menu sesuai bagian yang sedang dibaca ===== */
  const tautan = Array.from(document.querySelectorAll(".nav a"));
  const bagian = tautan
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function tandai(id) {
    tautan.forEach(function (a) {
      const aktif = a.getAttribute("href") === "#" + id;
      a.classList.toggle("aktif", aktif);
      if (aktif) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    const pengamat = new IntersectionObserver(function (entri) {
      entri.forEach(function (e) { if (e.isIntersecting) tandai(e.target.id); });
    }, { rootMargin: "-35% 0px -55% 0px" });
    bagian.forEach(function (s) { pengamat.observe(s); });
  }
  tandai("beranda");

  /* ===== 3. Filter proyek ===== */
  const tombolFilter = Array.from(document.querySelectorAll(".filter button"));
  const itemProyek = Array.from(document.querySelectorAll(".proyek .item"));

  tombolFilter.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      const pilih = tombol.dataset.filter;
      tombolFilter.forEach(function (t) {
        const aktif = t === tombol;
        t.classList.toggle("aktif", aktif);
        t.setAttribute("aria-pressed", String(aktif));
      });
      itemProyek.forEach(function (item) {
        item.hidden = !(pilih === "semua" || item.dataset.kategori === pilih);
      });
    });
  });

  /* ===== 4. Salin email ke clipboard ===== */
  const tombolSalin = document.getElementById("salin");
  const linkEmail = document.getElementById("email-link");
  const status = document.getElementById("salin-status");
  let timer;

  function tampilStatus(teks) {
    status.textContent = teks;
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ""; }, 2500);
  }

  tombolSalin.addEventListener("click", function () {
    const email = linkEmail.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(function () { tampilStatus("Email disalin."); })
        .catch(function () { tampilStatus("Gagal menyalin. Salin manual ya."); });
    } else {
      tampilStatus("Browser tidak mendukung. Salin manual ya.");
    }
  });

  /* ===== Tahun otomatis di footer ===== */
  document.getElementById("tahun").textContent = new Date().getFullYear();
})();
