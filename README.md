# Berpikir Komputasional Kelas VII

Aplikasi web pembelajaran interaktif untuk **Informatika SMP/MTs Kelas VII** dengan fokus pada:

- Dekomposisi
- Pengenalan pola
- Abstraksi
- Algoritma
- Penerapan terpadu
- Evaluasi akhir

Aplikasi dibuat **mobile-first**, tanpa backend, dan siap dijalankan sebagai static website di GitHub Pages.

## Fitur

- Definisi interaktif empat fondasi berpikir komputasional
- Aktivitas memasangkan pernyataan dengan fondasi tanpa mengetik
- Latihan pilihan ganda 10 soal berbasis kartu
- Identifikasi fondasi dari 8 peristiwa sehari-hari
- Sequence builder “Menyiapkan Tas Sekolah”
- Aktivitas Benar/Salah 8 pernyataan

- Eksplorasi awal berbasis robot grid
- Progression dan unlock modul
- LocalStorage untuk menyimpan progress
- Aktivitas dekomposisi
- Pengenalan pola
- Abstraksi melalui pemilahan informasi
- Sequence builder untuk algoritma
- Simulasi robot
- Tantangan terpadu
- Evaluasi acak dari bank soal JSON
- Breakdown hasil berdasarkan kompetensi
- Reset progress
- Responsive untuk HP dan laptop
- Fallback soal jika `questions.json` gagal dimuat

## Struktur

```text
berpikir-komputasional-kelas7/
├── index.html
├── .nojekyll
├── README.md
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animation.css
├── js/
│   ├── app.js
│   ├── navigation.js
│   ├── interactions.js
│   ├── quiz.js
│   ├── progress.js
│   ├── foundations.js
│   ├── foundation-activities.js
│   ├── decomposition.js
│   ├── patterns.js
│   ├── abstraction.js
│   ├── algorithms.js
│   └── robot.js
├── data/
│   └── questions.json
└── assets/
    ├── images/
    └── icons/
```

## Menjalankan secara lokal

Karena bank soal dimuat memakai `fetch()`, sebaiknya jalankan melalui local server.

### Python

```bash
python -m http.server 8000
```

Kemudian buka:

```text
http://localhost:8000
```

### VS Code

Gunakan ekstensi Live Server lalu buka `index.html`.

## GitHub Pages

1. Buat repository baru di GitHub.
2. Salin seluruh isi folder ini ke root repository.
3. Commit dan push.
4. Buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih `Deploy from a branch`.
6. Pilih branch `main` dan folder `/ (root)`.
7. Simpan.

File `.nojekyll` sudah disediakan.

## Mengubah Materi

Konten dan logika modul terdapat di:

- `js/decomposition.js`
- `js/patterns.js`
- `js/abstraction.js`
- `js/algorithms.js`
- `js/robot.js`
- `js/app.js`

Untuk mengganti judul dan urutan modul, ubah `AppData.modules` di `js/app.js`.

## Menambah Soal

Edit:

```text
data/questions.json
```

Format minimal:

```json
{
  "id": "q13",
  "type": "mc",
  "competency": "decomposition",
  "difficulty": "application",
  "question": "Teks soal",
  "options": ["A", "B", "C", "D"],
  "answer": 0,
  "feedback": "Petunjuk jika jawaban belum tepat."
}
```

`answer` menggunakan indeks mulai dari `0`.

Tag `competency` yang disarankan:

- `decomposition`
- `pattern`
- `abstraction`
- `algorithm`
- `integrated`

## LocalStorage

Namespace utama:

```text
ctGrade7_state_v1
```

Data yang disimpan meliputi:

- modul selesai
- modul terbuka
- posisi modul terakhir
- nilai evaluasi
- breakdown kompetensi
- refleksi jika dikembangkan lebih lanjut

## Menambah Level Robot

Edit `js/robot.js`.

Bagian utama:

```js
const start={r:0,c:0};
const goal={r:4,c:4};
const blocks=new Set(["0,2","1,2","2,2","3,1"]);
```

Koordinat menggunakan format:

```text
baris,kolom
```

Indeks dimulai dari `0`.

## Catatan Pengembangan

Versi ini adalah fondasi repository yang sudah dapat dijalankan. Untuk produksi pembelajaran sekolah, isi aktivitas dan evaluasi sebaiknya disesuaikan lagi dengan modul, LKPD, atau tujuan pembelajaran resmi yang digunakan guru.
