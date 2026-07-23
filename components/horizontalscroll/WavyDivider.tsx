"use client";

import { forwardRef, useId, useMemo } from "react";

interface WavyDividerProps {
  className?: string;
  /** warna garis, default krem seperti di desain */
  color?: string;
  /** "horizontal" = garis mendatar sepanjang track (desktop), "vertical" = garis menurun (mobile/tablet, natural scroll) */
  orientation?: "horizontal" | "vertical";
  /** WAJIB utk orientation "horizontal": jumlah panel (tiap panel dianggap sama lebar) */
  panelCount?: number;
  /**
   * WAJIB utk orientation "vertical": tinggi asli (px, hasil ukur lewat ref)
   * tiap panel, urut sesuai urutan panel di layar. Dipakai supaya batas
   * gelombang PERSIS jatuh di batas antar-panel yang sebenarnya -- karena di
   * mobile tinggi tiap panel beda-beda (panel teks vs panel ornamen strip),
   * tidak bisa diasumsikan sama rata seperti mode horizontal.
   */
  panelSizes?: number[];
  /**
   * Posisi di sumbu silang (0-1) pada SETIAP batas panel, termasuk ujung
   * awal & akhir -- panjang array harus `panelCount + 1` (horizontal) atau
   * `panelSizes.length + 1` (vertical). Utk horizontal ini posisi vertikal
   * (0=atas, 1=bawah); utk vertical ini posisi horizontal (0=kiri, 1=kanan).
   * Kalau tidak diisi, dipakai pola selang-seling default.
   */
  waypoints?: number[];
  /** tinggi gelombang lokal (ripple) di sumbu silang, fraksi 0-1. Makin besar makin "liar" gelombangnya. */
  amplitude?: number;
  /** berapa banyak gelombang kecil (ripple) per 1 panel */
  ripplesPerPanel?: number;
  /** tebal garis dalam unit viewBox (bukan px layar -- lihat vectorEffect di bawah) */
  strokeWidth?: number;
  strokeOpacity?: number;
  /** pola dash "panjang-dash gap", format sama seperti CSS stroke-dasharray */
  dashArray?: string;
}

// Unit internal viewBox per 1 panel utk mode horizontal. Harus dipakai
// konsisten di parent (HorizontalScrollSection) saat menghitung target
// `width` animasi GSAP.
export const WAVY_PANEL_UNIT = 1000;
// Ukuran sumbu silang (tinggi utk horizontal, lebar utk vertical) dalam unit viewBox.
const CROSS_AXIS_SIZE = 1000;

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
 *  patah-patah antar titik sampel. Sama dipakai utk kedua orientasi, karena
 *  cuma bekerja di ruang x/y generik. */
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
 * Garis putus-putus bergelombang TUNGGAL yang membentang dari panel pertama
 * sampai panel terakhir -- meliuk terus-menerus melewati semua panel, bukan
 * potongan-potongan per transisi.
 *
 * Dua orientasi:
 * - "horizontal" (desktop): sumbu utama = X (lebar track), tiap panel diberi
 *   jatah lebar SAMA (`WAVY_PANEL_UNIT`) karena semua panel memang selebar
 *   1 layar penuh.
 * - "vertical" (mobile/tablet): sumbu utama = Y (tinggi track), tiap panel
 *   diberi jatah tinggi SESUAI `panelSizes` (hasil ukur langsung dari DOM),
 *   karena tinggi tiap panel beda-beda tergantung isinya.
 *
 * Cara kerja "animasi digambar" sama utk keduanya: seluruh path digambar
 * penuh & dashed dari awal (statis), lalu di-clip lewat sebuah <rect> yang
 * ukurannya (width utk horizontal, height utk vertical) diawali 0. Ref yang
 * di-forward mengarah ke <rect> itu, supaya parent bisa meng-animate-nya
 * lewat GSAP ScrollTrigger sampai ukuran penuh, sinkron dengan progres scroll.
 */
const WavyDivider = forwardRef<SVGRectElement, WavyDividerProps>(
  function WavyDivider(
    {
      className = "",
      color = "#F1EDE2",
      orientation = "horizontal",
      panelCount,
      panelSizes,
      waypoints,
      amplitude = 0.12,
      ripplesPerPanel = 1.5,
      strokeWidth = 8,
      dashArray = "14 18",
      strokeOpacity = 0.4,
    },
    ref,
  ) {
    const clipId = useId();
    const isVertical = orientation === "vertical";

    // Jatah "panjang" tiap panel di sumbu utama, dalam unit viewBox.
    const segments = useMemo(() => {
      if (isVertical) {
        return panelSizes && panelSizes.length > 0 ? panelSizes : [1];
      }
      return Array.from(
        { length: Math.max(panelCount ?? 1, 1) },
        () => WAVY_PANEL_UNIT,
      );
    }, [isVertical, panelSizes, panelCount]);

    const segmentCount = segments.length;
    const mainAxisTotal = useMemo(
      () => segments.reduce((sum, s) => sum + s, 0),
      [segments],
    );

    const viewBoxWidth = isVertical ? CROSS_AXIS_SIZE : mainAxisTotal;
    const viewBoxHeight = isVertical ? mainAxisTotal : CROSS_AXIS_SIZE;

    const resolvedWaypoints = useMemo(() => {
      if (waypoints && waypoints.length === segmentCount + 1) return waypoints;
      return Array.from({ length: segmentCount + 1 }, (_, i) =>
        i % 2 === 0 ? 0.56 : 0.44,
      );
    }, [waypoints, segmentCount]);

    const path = useMemo(() => {
      const samplesPerSegment = 16;
      const points: Point[] = [];
      let cursor = 0;
      for (let p = 0; p < segmentCount; p++) {
        const size = segments[p];
        const crossStart = resolvedWaypoints[p];
        const crossEnd = resolvedWaypoints[p + 1];
        for (let s = 0; s <= samplesPerSegment; s++) {
          if (p > 0 && s === 0) continue; // hindari titik dobel di sambungan
          const t = s / samplesPerSegment;
          const mainAxisPos = cursor + t * size;
          const baseline = crossStart + (crossEnd - crossStart) * smoothstep(t);
          const ripple =
            Math.sin(t * ripplesPerPanel * Math.PI * 2) * amplitude;
          const crossAxisPos =
            Math.min(0.97, Math.max(0.03, baseline + ripple)) * CROSS_AXIS_SIZE;
          points.push(
            isVertical
              ? { x: crossAxisPos, y: mainAxisPos }
              : { x: mainAxisPos, y: crossAxisPos },
          );
        }
        cursor += size;
      }
      return smoothPath(points);
    }, [
      segments,
      segmentCount,
      resolvedWaypoints,
      amplitude,
      ripplesPerPanel,
      isVertical,
    ]);

    return (
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            {/* Horizontal: width diawali 0, di-animate ke penuh (kiri -> kanan).
              Vertical: height diawali 0, di-animate ke penuh (atas -> bawah). */}
            {isVertical ? (
              <rect ref={ref} x={0} y={0} width={viewBoxWidth} height={0} />
            ) : (
              <rect ref={ref} x={0} y={0} width={0} height={viewBoxHeight} />
            )}
          </clipPath>
        </defs>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeOpacity={strokeOpacity}
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
