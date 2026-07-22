import type { PanelData } from "./types";

// CATATAN:
// - Semua path gambar di bawah ini adalah PLACEHOLDER. Ganti dengan file PNG asli
//   kamu di /public/ornaments/*.png dan /public/photos/*.png (nama bebas, tinggal
//   sesuaikan path-nya di sini).
// - Copy/teks di bawah ini adalah hasil pembacaan saya dari file desain yang kamu
//   kirim -> silakan cek ulang & ganti dengan copy final, terutama paragraf deskripsi.

export const panels: PanelData[] = [
  // 1. PANEL 2024 -----------------------------------------------------------
  {
    id: "2024",
    type: "content",
    year: "",
    tone: "light",
    position: "right",
    ctaVariant: "blue",
    bgClassName: "bg-[#363D66]",
    title: "Pasar Kolaboraya 2024: Memperkenalkan Pendekatan Ekosistem",
    description: `Terinspirasi dari cara alam bekerja, Pasar Kolaboraya 2024 menggunakan metafora <strong>Ekosistem Hutan Hujan Tropis.</strong> Merepresentasikan keberagaman yang saling terhubung dan saling menyokong, di mana setiap aktor memiliki peran penting dalam menjaga keberlangsungan ekosistem.

Diselenggarakan pada Oktober 2024 di Jakarta, Pasar Kolaboraya pertama mempertemukan lebih dari 120 Kreator Perubahan Sosial dari berbagai wilayah di Indonesia. Peserta diajak merefleksikan kembali cara membangun perubahan, melepaskan pola pikir lama, dan mengembangkan cara kerja yang lebih kolaboratif melalui pendekatan berbasis ekosistem.

Pendekatan ini bahkan disebut sebagai "sebuah langkah revolusioner" oleh Direktur Regional Ford Foundation Indonesia. Pasar Kolaboraya 2024 pun menjadi titik awal tumbuhnya jejaring Kolaboraya yang mempertemukan para penggerak perubahan untuk membangun gerakan masyarakat sipil yang semakin terhubung, kolaboratif, dan saling menguatkan.

<strong>Simak cerita para Kreator Perubahan Sosial dalam Catatan Kolektif Pasar Kolaboraya 2024 melalui tombol di bawah ini.</strong> 

`,
    ctaLabel: "Catatan Kolektif",
    ctaHref:
      "https://drive.google.com/file/d/1jrtERrlEYoAo3m0RntEwBk33qtivJLsQ/view",
    images: [
      {
        id: "2024-1",
        src: "/assets/2024-2.png",
        alt: "Dokumentasi Pasar Kolaboraya 2024 - panggung utama",
        className: " top-[20%] w-[30%] rotate-[-2deg] z-10 p-2 bg-white",
      },
      {
        id: "2024-2",
        src: "/assets/2024-1.png",
        alt: "Dokumentasi Pasar Kolaboraya 2024 - suasana peserta",
        className: "top-[35%] w-[55%]  z-5 p-4 bg-white",
      },
      {
        id: "2024-3",
        src: "/assets/2024-3.png",
        alt: "Dokumentasi Pasar Kolaboraya 2024 - foto bersama",
        className: "left-[30%] top-[60%] w-[44%]  z-30 p-3 bg-white",
      },
    ],
    // Ornamen khas frame 2024: rumpun bunga tropis di pojok kiri-bawah
    // kolase, dan bentuk flame/daun oranye di dekat foto atas.
    ornaments: [
      {
        id: "ora-1",
        src: "/assets/2024.png",
        alt: "Bentuk daun api oranye",
        className: "left-[35%] top-[6%] w-[35%] ",
        floatDelay: 0.5,
        floatDuration: 8,
      },
      {
        id: "ora-2",
        src: "/assets/2024-orna-2.png",
        alt: "Rumpun bunga tropis pink-oranye-biru",
        className: "-left-[12%] top-[45%] w-[60%]",
        floatDuration: 7,
      },
      {
        id: "ora-3",
        src: "/assets/2024-orna-1.png",
        alt: "Bentuk daun api oranye",
        className: "left-[35%] top-[28%] w-[50%] ",
        floatDelay: 0.5,
        floatDuration: 6,
      },
    ],
  },

  // 2. PANEL ORNAMEN (2024 -> 2025) ------------------------------------------
  {
    id: "ornament-1",
    type: "ornament",
    bgClassName:
      "bg-linear-to-r from-[#363D66] via-[#C3C3CA] via-[70%] to-[#F1EDE3]",
    ornaments: [
      {
        id: "ornament-1-1",
        src: "/assets/sayap-blue.png",
        alt: "Ilustrasi bunga tropis merah muda",
        className: "left-[15%] top-[0%] w-[35%]",
        floatDelay: 0,
        floatDuration: 3,
      },
      {
        id: "ornament-1-2",
        src: "/assets/flower-pink.png",
        alt: "Ilustrasi kelompok daun warna-warni",
        className: "left-[35%] top-[0%] w-[40%]",
        floatDelay: 0.4,
        floatDuration: 5,
      },

      {
        id: "ornament-1-3",
        src: "/assets/flower-colours.png",
        alt: "Ilustrasi ulat biru bersegmen",
        className: "left-[15%] top-[50%] w-[30%]",
        floatDelay: 0.6,
        floatDuration: 6,
      },
      {
        id: "ornament-1-4",
        src: "/assets/leaf-pink.png",
        alt: "Ilustrasi daun tunggal",
        className: "left-[75%] top-[15%] w-[18%]",
        floatDelay: 0,
        floatDuration: 3,
      },
      {
        id: "ornament-1-5",
        src: "/assets/leaf-green.png",
        alt: "Ilustrasi daun tunggal",
        className: "left-[75%] top-[35%] w-[20%]",

        floatDuration: 4,
      },
      {
        id: "ornament-1-6",
        src: "/assets/leaf-pink.png",
        alt: "Ilustrasi daun tunggal",
        className: "left-[75%] top-[48%] w-[18%] rotate-[35deg]",
        floatDelay: 0.4,
        floatDuration: 6.5,
      },
      {
        id: "ornament-1-7",
        src: "/assets/sayap-blue.png",
        alt: "Ilustrasi bunga tropis merah muda",
        className: "left-[45%] top-[40%] w-[35%] rotate-[120deg] scale-x-[-1]",
        floatDelay: 0,
        floatDuration: 6,
      },
    ],
  },

  // 3. PANEL 2025 -------------------------------------------------------------
  {
    id: "2025",
    type: "content",
    year: "2025",
    imgYear: "/assets/2025.png",
    position: "left",
    tone: "dark",
    ctaVariant: "teal",
    bgClassName: "bg-[#F1EDE3]",
    title: "Pasar Kolaboraya 2025: Menumbuhkan Jejaring dan Aksi Kolektif",
    description: `Melalui konsep Jejaring Miselium Raya dalam Ekosistem Jamur, Pasar Kolaboraya 2025 mengajak para ecosystem builder dan kreator perubahan sosial mengeksplorasi pendekatan ekosistem untuk membangun ketahanan bersama. 

    Seperti miselium yang menghubungkan pepohonan di bawah permukaan, kolaborasi menjadi fondasi yang memperkuat gerakan sosial di tengah tekanan terhadap ruang sipil, dinamika politik, krisis iklim, dan berbagai tantangan global.

    Diselenggarakan di Yogyakarta pada November 2025, Pasar Kolaboraya 2025 mempertemukan sekitar 700 peserta, termasuk 82 Ecosystem Builders dari 26 ekosistem gerakan sosial di Indonesia. Selama dua hari, ruang ini menjadi laboratorium kolaborasi bagi para peserta untuk membangun kolaborasi lintas isu dan merancang aksi kolektif melalui pendekatan Connect, Collaborate, dan Collective Action.

<strong>Simak perjalanan para Ecosystem Builders dalam Senarai Cerita Pasar Kolaboraya 2025 melalui tombol di bawah ini.</strong>
`,
    ctaLabel: "Senarai Cerita",
    ctaHref: "https://www.kolaboraya.id/senarai-cerita",
    bgcolageimage: "/assets/2025-bggrid.png",
    images: [
      {
        id: "2025-1",
        src: "/assets/2025-1.png",
        alt: "Dokumentasi Pasar Kolaboraya 2025 - sesi diskusi",
        className: "left-[34%] top-[11%] w-[55%]  z-10 p-3 bg-white",
      },
      {
        id: "2025-2",
        src: "/assets/2025-2.png",
        alt: "Dokumentasi Pasar Kolaboraya 2025 - suasana panggung",
        className:
          "left-[15%] top-[30%] w-[40%] rotate-[-1deg] z-20 p-3 bg-white",
      },
      {
        id: "2025-3",
        src: "/assets/2025-3.png",
        alt: "Dokumentasi Pasar Kolaboraya 2025 - suasana panggung",
        className: "left-[34%] top-[49%] w-[55%]  z-10 p-3 bg-white",
      },
    ],
    // Ornamen khas frame 2025: elemen kertas potong (paper-cutout) di
    // sekitar kolase foto -- beda bentuk & warna dari ornamen 2024.
    ornaments: [
      {
        id: "ora-1",
        src: "/assets/2025-orna-1.png",
        alt: "Elemen kertas potong bentuk pusaran biru-oranye",
        className: "left-[25%] top-[4%] w-[30%] rotate-[-4deg]",
        floatDuration: 6.5,
      },
      {
        id: "ora-2",
        src: "/assets/2025-orna-2.png",
        alt: "Elemen kertas potong bunga hijau-toska-ungu",
        className: "right-[6%] top-[30%] w-[35%]",
        floatDelay: 0.6,
        floatDuration: 7,
      },
      {
        id: "ora-3",
        src: "/assets/2025-orna-3.png",
        alt: "Elemen kertas potong lingkaran merah bertotol",
        className: "right-[20%] bottom-[1%] w-[30%]",
        floatDelay: 1,
        floatDuration: 6,
      },
    ],
  },

  // 4. PANEL ORNAMEN (2025 -> 2026) --------------------------------------------
  {
    id: "ornament-2",
    type: "ornament",
    bgClassName:
      "bg-[linear-gradient(90deg,_#F1EDE3_0%,_#C3C3CA_32.21%,_#085AA8_100%)]",
    ornaments: [
      {
        id: "ora-1",
        src: "/assets/orna-bullet.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "left-[5%] top-[16%] w-[24%]",
        floatDelay: 0,
        floatDuration: 4,
      },
      {
        id: "ora-2",
        src: "/assets/orna-flower-green.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "left-[14%] top-[26%] w-[15%] z-15",
        floatDelay: 0.3,
        floatDuration: 4,
      },
      {
        id: "ora-3",
        src: "/assets/orna-ranting-orange.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "left-[19%] top-[6%] w-[22%] z-10",
        floatDelay: 0.6,
        floatDuration: 4,
      },
      {
        id: "ora-4",
        src: "/assets/orna-flower-cream.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "left-[28%] -top-[3%] w-[27%] z-5",
        floatDelay: 0.6,
        floatDuration: 5,
      },
      {
        id: "ora-5",
        src: "/assets/orna-flower-cream.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "left-[10%] -bottom-[28%] w-[27%] z-5",
        floatDelay: 0.6,
        floatDuration: 5,
      },
      {
        id: "ora-6",
        src: "/assets/orna-ranting-green.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "left-[30%] -bottom-[1%] w-[27%] z-5",
        floatDelay: 0.6,
        floatDuration: 6,
      },
      {
        id: "ora-7",
        src: "/assets/orna-purple.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "left-[40%] bottom-[9%] w-[14%] z-10",
        floatDelay: 0.6,
        floatDuration: 6,
      },
      {
        id: "ora-8",
        src: "/assets/orna-bullet.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "right-[14%] -bottom-[36%] w-[27%] z-5",
        floatDelay: 0.6,
        floatDuration: 6,
      },
      {
        id: "ora-9",
        src: "/assets/orna-flower-cream.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "right-[13%] top-[2%] w-[27%] scale-x-[-1] z-5",
        floatDelay: 0.6,
        floatDuration: 6,
      },
      {
        id: "ora-10",
        src: "/assets/orna-maroon.png",
        alt: "Ilustrasi bunga berlapis warna-warni",
        className: "right-[17%] top-[22%] w-[23%] ] z-5",
        floatDelay: 0.6,
        floatDuration: 6,
      },
    ],
  },

  // 5. PANEL 2026 ---------------------------------------------------------------
  {
    id: "2026",
    type: "content",
    year: "2026",
    imgYear2: "/assets/2026.png",
    position: "center",
    tone: "light",
    ctaVariant: "blue",
    bgClassName: `
bg-[linear-gradient(to_right,#085AA8_0%,#085AA8_12%,rgba(8,90,168,0.9)_20%,rgba(8,90,168,0.5)_35%,transparent_55%),url('/assets/bg-culture-blue.png')]
bg-no-repeat
bg-right
bg-[length:100%_100%,90%_100%]
`,
    title: "Pasar Kolaboraya 2026: Deep Dive Pendekatan Ekosistem",
    description: `Berangkat dari pembelajaran dua penyelenggaraan sebelumnya, <strong>Pasar Kolaboraya 2026 mengajak para Ecosystem Builders untuk deep dive dalam pendekatan ekosistem.</strong> Setelah memperkenalkan perspektif ekosistem pada 2024 dan membangun jejaring serta aksi kolektif pada 2025, tahun ini sekitar 50 Ecosystem Builders dari berbagai wilayah di Indonesia akan memperluas cara pandang terhadap kolaborasi melalui kacamata ekosistem. Bersama-sama mendalami praktik merawat, memperkuat, dan mengembangkan ekosistem perubahan sosial, sekaligus mengeksplorasi beragam peran yang dibutuhkan agar aksi kolektif dapat terwujud.

Diselenggarakan pada 1–3 September 2026 di Jakarta, di Pasar Kolaboraya 2026 peserta akan saling belajar, berbagi pengalaman, mengembangkan kepemimpinan, serta merefleksikan dan berbagi praktik kolaborasi guna membangun ekosistem perubahan sosial yang lebih berdampak dan berkelanjutan.
`,

    ctaHref: "#",
    images: [
      {
        id: "img-1",
        src: "/assets/2024-1.png",
        alt: "Dokumentasi Pasar Kolaboraya 2026 - forum diskusi",
        className: "left-[8%] top-[12%] w-[46%] rotate-[-3deg] z-10",
      },
      {
        id: "img-2",
        src: "/assets/2024-2.png",
        alt: "Dokumentasi Pasar Kolaboraya 2026 - foto bersama peserta",
        className: "left-[32%] top-[40%] w-[46%] rotate-[3deg] z-20",
      },
    ],
    // Ornamen khas frame 2026: siluet pari & motif karang putih di tepi
    // layar, mengikuti metafora "Ekosistem Laut".
    leftOrnaments: [
      {
        src: "/assets/2026-orna-left-top.png",
        alt: "",
        className: "left-0 -top-[25%] w-[500px]",

        floatDuration: 6,
      },
      {
        src: "/assets/2026-orna-left-1.png",
        alt: "",
        className: "-left-[38%] -bottom-[8%] w-[600px]",
      },
      {
        src: "/assets/2026-orna-left-2.png",
        alt: "",
        className: "-left-[20%] -bottom-[35%] w-[500px] z-50",
      },
    ],

    rightOrnaments: [
      {
        src: "/assets/2026-right-1.png",
        alt: "",
        className: "right-0 top-0 w-[500px]",
      },
      {
        src: "/assets/2026-right-2.png",
        alt: "",
        className: "right-0 -bottom-[10%] w-[520px]",
      },
    ],
  },
];
