"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentPanel from "./ContentPanel";
import OrnamentPanel from "./OrnamentPanel";
import WavyDivider, { WAVY_PANEL_UNIT } from "./WavyDivider";
import ScrollHint from "./ScrollHint";
import { panels } from "./panels.data";

gsap.registerPlugin(ScrollTrigger);

// Breakpoint tempat mode horizontal-scroll-pin AKTIF (desktop). Di bawah
// ini, panel tetap di-stack vertikal & di-scroll NATURAL oleh browser --
// TIDAK di-pin, TIDAK di-translateY paksa, karena stacking vertikal memang
// sudah "gratis" dari document flow biasa. GSAP di mode ini cuma dipakai
// buat men-sinkronkan reveal WavyDivider vertikal dengan progres scroll asli.
const DESKTOP_QUERY = "(min-width: 768px)";
const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Section "Pasar Kolaboraya" — 5 frame (2024 -> ornamen -> 2025 -> ornamen
 * -> 2026).
 *
 * - Desktop (>= 768px): scroll VERTIKAL di-"translate" jadi pergeseran
 *   HORIZONTAL track panel lewat GSAP ScrollTrigger (`pin` + `scrub`). Garis
 *   wavy horizontal digambar 1:1 sinkron dengan progres pergeseran itu.
 * - Mobile/tablet (< 768px): panel TETAP di-stack vertikal & di-scroll
 *   NATURAL (tanpa pin/translate palsu -- fisika touch-scroll asli utuh).
 *   GSAP cuma dipakai untuk menggambar garis wavy VERTIKAL, sinkron dengan
 *   progres scroll dari section mulai terlihat (top masuk ke atas layar)
 *   sampai section selesai terlewati (bottom keluar dari bawah layar).
 *
 * Tinggi tiap panel di mobile diukur LANGSUNG dari DOM (bukan diasumsikan
 * seragam h-screen), karena panel teks vs panel ornamen-strip memang beda
 * tinggi -- WavyDivider mode "vertical" memakai ukuran itu (`panelSizes`)
 * supaya proporsi liuknya PERSIS mengikuti batas panel yang sesungguhnya.
 */
export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wavyRectRef = useRef<SVGRectElement | null>(null); // desktop (horizontal)
  const wavyRectMobileRef = useRef<SVGRectElement | null>(null); // mobile (vertical)

  const [panelSizes, setPanelSizes] = useState<number[]>([]);

  // Ukur tinggi asli tiap panel & pantau perubahannya (font selesai load,
  // gambar selesai load, orientasi device berubah, dst) lewat ResizeObserver.
  useLayoutEffect(() => {
    const measure = () => {
      setPanelSizes(panelRefs.current.map((el) => el?.offsetHeight ?? 0));
    };
    measure();

    const ro = new ResizeObserver(() => measure());
    panelRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // ------------------------------------------------------------------
    // DESKTOP (>= 768px): pin + translateX horizontal (seperti sebelumnya).
    // ------------------------------------------------------------------
    mm.add(DESKTOP_QUERY, () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const panelCount = panels.length;
      const getScrollDistance = () => track.scrollWidth - window.innerWidth;
      const unitDuration = panelCount - 1;
      const totalWavyWidth = panelCount * WAVY_PANEL_UNIT;

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

      return () => {
        gsap.set(track, { clearProps: "width,transform" });
        if (wavyRectRef.current)
          gsap.set(wavyRectRef.current, { attr: { width: 0 } });
      };
    });

    // ------------------------------------------------------------------
    // MOBILE/TABLET (< 768px): TIDAK di-pin, TIDAK di-translate. Cuma
    // menyinkronkan tinggi clip-rect WavyDivider vertikal dengan progres
    // scroll natural dari section (top top -> bottom bottom).
    // ------------------------------------------------------------------
    mm.add(MOBILE_QUERY, () => {
      const container = containerRef.current;
      if (!container) return;
      // Tunggu sampai tinggi panel terukur betulan -- kalau masih [],
      // WavyDivider juga masih pakai viewBox placeholder (lihat fallback
      // [1] di WavyDivider), jadi jangan sinkronkan dulu ke angka yang
      // belum matching supaya tidak ada kedipan/reveal instan yang salah.
      if (panelSizes.length === 0) return;

      const totalWavyHeight = panelSizes.reduce((sum, s) => sum + s, 0);

      if (wavyRectMobileRef.current) {
        gsap.set(wavyRectMobileRef.current, { attr: { height: 0 } });
      }

      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (wavyRectMobileRef.current) {
            gsap.set(wavyRectMobileRef.current, {
              attr: { height: self.progress * totalWavyHeight },
            });
          }
        },
      });

      ScrollTrigger.refresh();

      return () => {
        st.kill();
        if (wavyRectMobileRef.current)
          gsap.set(wavyRectMobileRef.current, { attr: { height: 0 } });
      };
    });

    return () => mm.revert();
  }, [panelSizes]);

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
          {panels.map((panel, i) => (
            <div
              key={panel.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="relative w-full flex-shrink-0 md:h-full md:w-screen"
            >
              {panel.type === "content" ? (
                <ContentPanel data={panel} />
              ) : (
                <OrnamentPanel data={panel} />
              )}
            </div>
          ))}

          {/* Desktop: garis wavy HORIZONTAL, ikut bergeser bareng track
              (ditaruh di dalam trackRef, sama seperti sebelumnya). */}
          <WavyDivider
            ref={wavyRectRef}
            orientation="horizontal"
            panelCount={panels.length}
            className="pointer-events-none absolute left-0 top-0 z-30 hidden h-full w-full md:block"
            color="#F1EDE2"
            amplitude={0.2}
            ripplesPerPanel={1}
            strokeWidth={8}
            strokeOpacity={0.4}
          />
        </div>

        {/* Mobile: garis wavy VERTIKAL. Ditaruh di LUAR trackRef (sebagai
            overlay biasa yang ikut ter-scroll natural bareng halaman,
            BUKAN di-translate lewat GSAP) -- tingginya otomatis mengikuti
            tinggi total track karena wrapper ini tidak dikasih tinggi
            manual di mobile (auto = tinggi konten). */}
        <WavyDivider
          ref={wavyRectMobileRef}
          orientation="vertical"
          panelSizes={panelSizes.length > 0 ? panelSizes : undefined}
          className="pointer-events-none absolute left-0 top-0 z-30 block h-full w-full md:hidden"
          color="#FFFFFF"
          amplitude={0.12}
          ripplesPerPanel={1.5}
          strokeWidth={6}
          strokeOpacity={0.9}
        />

        {/* Info scroll + navigasi cepat (panah atas/bawah), pojok kanan
            bawah, DESKTOP SAJA -- lihat komentar di dalam ScrollHint. */}
        <ScrollHint prevSectionId="perjalanan" nextSectionId="builder" />
      </div>
    </section>
  );
}
