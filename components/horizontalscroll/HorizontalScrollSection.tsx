"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentPanel from "./ContentPanel";
import OrnamentPanel from "./OrnamentPanel";
import WavyDivider, { WAVY_PANEL_UNIT } from "./WavyDivider";
import { panels } from "./panels.data";

gsap.registerPlugin(ScrollTrigger);

// Breakpoint tempat mode horizontal-scroll-pin AKTIF. Di bawah ini, section
// jadi stacking vertikal biasa (scroll natural browser, tanpa GSAP sama
// sekali) -- pola pin-scroll horizontal memang desktop-first, dipaksakan ke
// layar sempit biasanya kerasa berat & janggal secara UX.
const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Section "Pasar Kolaboraya" — 5 frame (2024 -> ornamen -> 2025 -> ornamen
 * -> 2026).
 *
 * - Desktop (>= 768px): scroll VERTIKAL di-"translate" jadi pergeseran
 *   HORIZONTAL track panel lewat GSAP ScrollTrigger (`pin` + `scrub`). Satu
 *   garis wavy tunggal digambar 1:1 sinkron dengan progres scroll yang sama.
 * - Mobile/tablet (< 768px): TIDAK di-pin sama sekali. Panel di-stack
 *   vertikal & di-scroll natural oleh browser (lihat class `flex-col` pada
 *   track, dan `ContentPanel`/`OrnamentPanel` yang punya varian tampilan
 *   sendiri untuk mode ini).
 *
 * Pergantian breakpoint ditangani lewat `gsap.matchMedia()`: begitu lebar
 * layar melewati 768px (ke arah manapun), context GSAP di dalam `mm.add`
 * di-revert otomatis (semua ScrollTrigger & tween-nya dibersihkan), jadi
 * tidak ada state pin yang "nyangkut" saat resize.
 */
export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wavyRectRef = useRef<SVGRectElement | null>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_QUERY, () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const panelCount = panels.length;
      const getScrollDistance = () => track.scrollWidth - window.innerWidth;
      const unitDuration = panelCount - 1;
      const totalWavyWidth = panelCount * WAVY_PANEL_UNIT;

      // Set eksplisit lebar track sepanjang panelCount layar penuh -- ini
      // yang dulunya cuma dipasang lewat inline style tanpa syarat; sekarang
      // HANYA di-set saat mode desktop aktif (lihat cleanup di bawah untuk
      // kebalikannya saat mode mobile).
      gsap.set(track, { width: `${panelCount * 100}vw`, x: 0 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      master.to(
        track,
        { x: () => -getScrollDistance(), ease: "none", duration: unitDuration },
        0,
      );

      if (wavyRectRef.current) {
        gsap.set(wavyRectRef.current, { attr: { width: 0 } });
        master.to(
          wavyRectRef.current,
          {
            attr: { width: totalWavyWidth },
            ease: "none",
            duration: unitDuration,
          },
          0,
        );
      }

      ScrollTrigger.refresh();

      // Dijalankan otomatis oleh gsap.matchMedia() saat breakpoint berubah
      // (mis. resize ke < 768px) -- kembalikan track & garis wavy ke kondisi
      // netral supaya layout mobile (flex-col, scroll natural) tidak ketimpa
      // sisa width/transform dari mode desktop.
      return () => {
        gsap.set(track, { clearProps: "width,transform" });
        if (wavyRectRef.current) {
          gsap.set(wavyRectRef.current, { attr: { width: 0 } });
        }
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative"
      aria-label="Perjalanan Pasar Kolaboraya 2024-2026"
    >
      <div className="relative flex flex-col overflow-hidden bg-[#232A52] md:h-screen md:w-screen">
        <div
          ref={trackRef}
          className="relative flex w-full flex-col md:h-full md:flex-row md:will-change-transform"
        >
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="relative w-full flex-shrink-0 md:h-full md:w-screen"
            >
              {panel.type === "content" ? (
                <ContentPanel data={panel} />
              ) : (
                <OrnamentPanel data={panel} />
              )}
            </div>
          ))}

          {/* Garis wavy horizontal cuma relevan di mode desktop (horizontal
              scroll) -- di mobile (stacking vertikal) disembunyikan karena
              orientasinya sudah tidak cocok lagi. */}
          <WavyDivider
            ref={wavyRectRef}
            panelCount={panels.length}
            className="pointer-events-none absolute left-0  z-30 hidden h-full w-full md:block"
            color="#FFFFFF"
            amplitude={0.19}
            ripplesPerPanel={1}
            strokeWidth={6}
          />
        </div>
        {/* Indikator progress sederhana (opsional, hapus jika tidak perlu) */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
          {panels.map((panel) => (
            <span
              key={panel.id}
              className="h-1.5 w-6 rounded-full bg-white/90"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
