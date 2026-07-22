"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);

      // Memberitahu ScrollTrigger posisi scroll terbaru
      ScrollTrigger.update();

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sinkronkan ketika ScrollTrigger refresh
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
