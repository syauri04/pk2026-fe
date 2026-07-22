// Tipe data untuk setiap panel di section horizontal scroll "Pasar Kolaboraya".
// Ada 2 jenis panel:
//  - "content"  => panel tahun (2024 / 2025 / 2026) dengan judul, deskripsi, foto, CTA
//  - "ornament" => panel transisi berisi ilustrasi PNG (bunga, siluet, dll) sebagai jeda visual

export interface CollageImage {
  /** path relatif ke /public, mis. "/photos/2024-1.png" */
  id?: string;
  src: string;
  alt: string;
  /** utility class tailwind untuk posisi & rotasi (top/left/right/bottom, rotate-*, w-*, dst) */
  className?: string;
}

export interface OrnamentImage {
  id?: string;
  src: string;
  alt: string;
  className?: string;
  /** delay animasi float (detik), biar tiap elemen tidak bergerak serentak */
  floatDelay?: number;
  /** durasi 1 siklus float (detik) */
  floatDuration?: number;
}

interface BasePanel {
  id: string;
  /** kelas tailwind untuk background (gradient) panel */
  bgClassName: string;
}

export interface ContentPanelData extends BasePanel {
  type: "content";
  year: string;
  imgYear?: string;
  imgYear2?: string;
  title: string;
  position: "left" | "right" | "center";
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** warna teks utama: "light" di atas bg gelap, "dark" di atas bg terang */
  tone: "light" | "dark";
  /** warna tombol CTA */
  ctaVariant: "blue" | "teal";
  stickerText?: string;
  bgcolageimage?: string;
  images: CollageImage[];
  leftOrnaments?: OrnamentImage[];
  rightOrnaments?: OrnamentImage[];
  /**
   * Ornamen dekoratif (bunga, badge, flame, dll) yang unik untuk frame ini.
   * Sama seperti OrnamentPanelData.ornaments -- dipakai berbeda-beda tiap
   * panel lewat data, bukan lewat komponen terpisah.
   */
  ornaments?: OrnamentImage[];
}

export interface OrnamentPanelData extends BasePanel {
  type: "ornament";
  ornaments: OrnamentImage[];
}

export type PanelData = ContentPanelData | OrnamentPanelData;
