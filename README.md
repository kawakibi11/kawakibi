# Website Pribadi

Website personal satu halaman, dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework, tanpa proses build).

## Isi folder

```
website-pribadi/
├── index.html   # struktur dan isi konten
├── style.css    # tampilan, warna, dan layout
├── script.js    # interaksi
└── README.md    # panduan ini
```

## Menjalankan

Buka `index.html` langsung di browser (klik dua kali). Selesai.

Kalau ingin memakai server lokal:

```bash
# Python
python -m http.server 8000

# atau Node.js
npx serve .
```

Lalu buka `http://localhost:8000`.

## Mengisi konten

Semua teks ada di `index.html`. Cari dan ganti hal-hal berikut:

| Yang diganti | Lokasi |
| --- | --- |
| Nama dan inisial avatar | Sidebar (`.id`), juga `<title>` dan footer |
| Profesi | `.id-role` di sidebar |
| Kalimat pembuka | `<h1>` dan `.lead` di bagian Beranda |
| Cerita tentang kamu | Bagian `#tentang` |
| Keahlian | Daftar `.chips` di bagian `#keahlian` |
| Proyek | Item `.item` di bagian `#proyek` |
| Riwayat | Daftar `.waktu` di bagian `#perjalanan` |
| Email dan media sosial | Bagian `#kontak` |

Tips:

- **Menambah proyek:** salin satu `<li class="item">`, ubah isinya, dan pilih `data-kategori` yang sesuai (`web`, `desain`, atau `lainnya`).
- **Menambah kategori filter:** tambahkan `<button data-filter="nama-baru">` di `.filter`, lalu pakai nama yang sama di `data-kategori` proyek.
- **Menghapus bagian:** hapus `<section>` terkait dan tautannya di `<nav class="nav">`.

## Mengubah tampilan

Warna dan font diatur di bagian atas `style.css`, di blok `:root`:

```css
:root {
  --bg: #eef1f4;       /* latar */
  --ink: #101828;      /* teks */
  --accent: #2a45f0;   /* warna aksen */
}
```

Ada dua set warna: terang (default) dan gelap (`:root[data-tema="gelap"]`). Ubah keduanya agar tetap serasi.

Font dimuat dari Google Fonts (Bricolage Grotesque dan Source Serif 4). Kalau ingin mengganti, ubah tautan `<link>` di `<head>` dan variabel `--font-head` serta `--font-body`. Jika offline, website otomatis memakai font bawaan sistem.

## Fitur

- Mode terang/gelap. Mengikuti pengaturan perangkat, dan pilihan manual tersimpan di browser.
- Menu menandai bagian yang sedang dibaca.
- Filter proyek berdasarkan kategori.
- Tombol salin email.
- Responsif sampai layar ponsel, ada tautan "Langsung ke konten", dan mendukung pengaturan *reduced motion*.

## Deploy gratis

Karena hanya file statis, kamu bisa mengunggahnya ke:

- **GitHub Pages:** push folder ke repository, lalu aktifkan Pages di *Settings > Pages*.
- **Netlify:** seret-dan-lepas folder ke [app.netlify.com/drop](https://app.netlify.com/drop).
- **Cloudflare Pages** atau **Vercel:** hubungkan repository dan pilih tanpa build command.

## Lisensi

Bebas dipakai dan dimodifikasi untuk website pribadimu.
