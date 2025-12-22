# Struktur Proyek Recommended

```
markupless-framework/
│
├── src/
│   ├── core/
│   │   ├── app.ts           # Inti framework utama
│   │   ├── state.ts         # Manajemen state
│   │   ├── logic.ts         # Logika dan event handling
│   │   ├── rendering.ts     # Mekanisme rendering
│   │   └── types.ts         # Tambahan: Define style types
│   │
│   ├── elements/
│   │   ├── base-element.ts  # Kelas dasar untuk semua elemen
│   │   ├── text-elements.ts # h1, h2, p, dll
│   │   ├── container.ts     # section, div, dll
│   │   ├── interactive.ts   # button, input, dll
│   │   └── types.ts         # Tambahan: Define style types
│   │
│   ├── styles/
│   │   ├── base-style.ts    # Style dasar
│   │   ├── style-manager.ts # Manajemen styling dinamis
│   │   └── types.ts         # Tambahan: Define style types
│   │
│   ├── utils/
│   │   ├── helpers.ts       # Fungsi utilitas umum
│   │   ├── validators.ts    # Validasi input/state
│   │   └── types.ts         # Tambahan: Define style types
│   │
│   ├── index.ts             # Entry point export
│   └── types.ts             # Global type definitions
│
├── package.json
└── README.md
```

# TODO Pengembangan Framework Markupless (Fase & Sub-Tugas)

## Fase 1: Arsitektur Dasar
1. Merancang Arsitektur Inti
   - [x] Buat struktur direktori sesuai rancangan
   - [x] Setup project dengan module bundler (misalnya Webpack/Rollup)
   - [x] Konfigurasi build system
   - [x] Setup testing framework (Vitest)

2. Implementasi Core Application
   - [x] Buat `app.ts` sebagai entry point
   - [x] Implementasi method `.setTitle()`
   - [x] Implementasi method `.addStyle()`
   - [x] Implementasi method `.state()`
   - [x] Implementasi method `.logic()`
   - [x] Implementasi method `.add()`
   - [x] Implementasi method `.render()`

## Fase 2: Manajemen Elemen
3. Bangun Sistem Elemen
   - [x] Buat base class `BaseElement`
   - [x] Implementasi text elements (h1, h2, p)
   - [x] Implementasi container elements (section, div)
   - [x] Implementasi interactive elements (button)
   - [x] Tambahkan method `.with()` untuk komposisi
   - [x] Tambahkan method `.style()` untuk styling
   - [x] Tambahkan method `.onClick()` untuk event handling

## Fase 3: State Management
4. Kembangkan State Management
   - [x] Buat mekanisme state reaktif
   - [x] Implementasi pelacakan perubahan state
   - [x] Buat sistem binding state ke DOM
   - [x] Implementasi logika update otomatis

## Fase 4: Style & Theming
5. Sistem Styling Dinamis
   - [ ] Buat mekanisme style inline
   - [ ] Implementasi hover styles
   - [ ] Buat sistem tema/preset
   - [ ] Tambahkan dukungan CSS-in-JS

## Fase 5: Advanced Features
6. Fitur Lanjutan
   - [ ] Routing sederhana
   - [ ] Validasi input
   - [ ] Plugin system
   - [ ] Performance optimization
   - [ ] Server-side rendering support

## Fase 6: Dokumentasi & Testing
7. Dokumentasi
   - [ ] Buat README komprehensif
   - [ ] Tulis dokumentasi API
   - [ ] Buat contoh penggunaan

8. Testing
   - [ ] Unit test untuk setiap modul
   - [ ] Integration test
   - [ ] Performance benchmark
   - [ ] Uji kompatibilitas browser

## Fase 7: Publikasi
9. Persiapan Rilis
   - [ ] Optimize bundle size
   - [ ] Buat script build
   - [ ] Publikasi ke npm
   - [ ] Setup CI/CD
