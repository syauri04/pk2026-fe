"use client";

import { forwardRef, useId, useMemo } from "react";

interface WavyDividerProps {
  className?: string;
  /** warna garis, default krem seperti di desain */
  color?: string;
  /** jumlah panel yang dilewati garis (dipakai buat lebar total & default waypoint) */
  panelCount: number;
  /**
   * Posisi vertikal (0 = paling atas, 1 = paling bawah) garis di SETIAP batas
   * panel, termasuk ujung paling kiri & kanan -- jadi panjang array harus
   * `panelCount + 1`. Ini yang menentukan "arah besar" garis meliuk naik/turun
   * per frame (macro trend), supaya bisa disesuaikan persis ke desain kamu,
   * mis. turun di frame 2024 (dekat tombol CTA), naik di frame ornamen, dst.
   * Kalau tidak diisi, dipakai pola selang-seling default.
   */
  waypoints?: number[];
  /** tinggi gelombang lokal (ripple), sebagai fraksi tinggi viewBox (0-1). Makin besar makin tinggi gelombangnya. */
  amplitude?: number;
  /** berapa banyak gelombang kecil (ripple) per 1 lebar panel */
  ripplesPerPanel?: number;
  /** tebal garis dalam unit viewBox (bukan px layar -- lihat vectorEffect di bawah) */
  strokeWidth?: number;
  /** pola dash "panjang-dash gap", format sama seperti CSS stroke-dasharray */
  dashArray?: string;
}

// Unit internal viewBox per 1 panel. Harus dipakai konsisten di parent
// (HorizontalScrollSection) saat menghitung target `width` animasi GSAP.
export const WAVY_PANEL_UNIT = 1000;
const VIEW_HEIGHT = 1000;

interface Point {
  x: number;
  y: number;
}

/** Ease in/out (smoothstep) -- dipakai supaya transisi antar-waypoint
 *  melandai di kedua ujungnya (slope -> 0 di setiap batas panel), bukan
 *  garis lurus yang berbalik arah tiba-tiba di titik sambung (itu yang
 *  bikin efek "menukik"/patah di setiap batas panel). */
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/** Ubah kumpulan titik jadi path SVG melengkung mulus (Catmull-Rom -> cubic
 *  Bezier), supaya hasilnya benar-benar melengkung, bukan garis lurus
 *  patah-patah antar titik sampel. */
function smoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

/**
 * Garis putus-putus bergelombang TUNGGAL yang membentang dari frame pertama
 * sampai frame terakhir (bukan potongan-potongan per transisi) -- sesuai
 * desain aslinya, di mana garis ini meliuk terus-menerus melewati semua
 * frame.
 *
 * Cara kerja "animasi digambar":
 * - Seluruh path (sepanjang total lebar track) digambar penuh & bergaya
 *   dashed dari awal (statis).
 * - Path itu di-clip oleh sebuah <rect> (lewat clipPath) yang lebar awalnya 0.
 * - Ref yang di-forward mengarah ke <rect> tsb, supaya parent
 *   (HorizontalScrollSection) bisa meng-animate atribut `width`-nya dari 0
 *   sampai lebar penuh lewat GSAP, PERSIS di timeline & durasi yang sama
 *   dengan pergeseran horizontal track -- jadi garis tergambar mulai dari
 *   frame 1 sampai frame terakhir, 1:1 mengikuti posisi scroll.
 *
 * Kenapa tidak "menukik"/patah di batas panel:
 * 1. Baseline (macro naik-turun dari `waypoints`) di-ease pakai smoothstep,
 *    jadi slope-nya melandai ke 0 persis di titik sambung setiap panel.
 * 2. Titik-titik sampel dirangkai jadi kurva Catmull-Rom -> Bezier (bukan
 *    garis lurus antar titik), jadi hasilnya melengkung mulus.
 */
const WavyDivider = forwardRef<SVGRectElement, WavyDividerProps>(
  function WavyDivider(
    {
      className = "",
      color = "#F1EDE2",
      panelCount,
      waypoints,
      amplitude = 0.12,
      ripplesPerPanel = 1.5,
      strokeWidth = 6,
      dashArray = "14 18",
    },
    ref,
  ) {
    const clipId = useId();
    const totalWidth = panelCount * WAVY_PANEL_UNIT;

    const resolvedWaypoints = useMemo(() => {
      if (waypoints && waypoints.length === panelCount + 1) return waypoints;
      // Default: naik-turun selang-seling landai. Ganti lewat prop `waypoints`
      // untuk menyamakan persis ke posisi garis di desain kamu per frame.
      return Array.from({ length: panelCount + 1 }, (_, i) =>
        i % 2 === 0 ? 0.56 : 0.44,
      );
    }, [waypoints, panelCount]);

    const path = useMemo(() => {
      const samplesPerPanel = 16;
      const points: Point[] = [];
      for (let p = 0; p < panelCount; p++) {
        const yStart = resolvedWaypoints[p];
        const yEnd = resolvedWaypoints[p + 1];
        for (let s = 0; s <= samplesPerPanel; s++) {
          if (p > 0 && s === 0) continue; // hindari titik dobel di sambungan
          const t = s / samplesPerPanel;
          const x = p * WAVY_PANEL_UNIT + t * WAVY_PANEL_UNIT;
          const baseline = yStart + (yEnd - yStart) * smoothstep(t);
          const ripple =
            Math.sin(t * ripplesPerPanel * Math.PI * 2) * amplitude;
          const y =
            Math.min(0.97, Math.max(0.03, baseline + ripple)) * VIEW_HEIGHT;
          points.push({ x, y });
        }
      }
      return smoothPath(points);
    }, [panelCount, resolvedWaypoints, amplitude, ripplesPerPanel]);

    return (
      <svg
        viewBox={`0 0 ${totalWidth} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            {/* width diawali 0, di-animate lewat GSAP dari parent, dari x=0
              (frame pertama) sampai x=totalWidth (frame terakhir). */}
            <rect ref={ref} x={0} y={0} width={0} height={VIEW_HEIGHT} />
          </clipPath>
        </defs>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeOpacity={0.3}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          clipPath={`url(#${clipId})`}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  },
);

export default WavyDivider;
