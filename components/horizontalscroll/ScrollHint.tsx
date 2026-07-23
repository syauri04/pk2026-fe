"use client";

import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { BsMouse } from "react-icons/bs";

interface ScrollHintProps {
  /** id section tujuan saat panah ATAS diklik (tanpa "#") */
  prevSectionId?: string;
  /** id section tujuan saat panah BAWAH diklik (tanpa "#") */
  nextSectionId?: string;
  /** teks di bawah/ samping icon mouse */
  label?: string;
}

function jumpToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ScrollHint({
  prevSectionId = "perjalanan",
  nextSectionId = "builder",
  label = "Scroll untuk melihat perjalanan selengkapnya",
}: ScrollHintProps) {
  return (
    <div className="pointer-events-none absolute bottom-6 right-6 z-50 hidden flex-row items-center gap-3 md:flex">
      <a
        href={`#${prevSectionId}`}
        onClick={(e) => {
          e.preventDefault();
          jumpToSection(prevSectionId);
        }}
        aria-label="Kembali ke bagian sebelumnya"
        className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full
          border border-white/40 text-white/80 backdrop-blur-sm transition-colors duration-200
          hover:border-white hover:text-white"
      >
        <FiChevronUp size={18} />
      </a>

      <div
        className="pointer-events-auto flex flex-col items-center gap-2 rounded-2xl
          border border-white/25 bg-white/5 px-3 py-4 backdrop-blur-sm"
      >
        <BsMouse
          aria-hidden="true"
          size={20}
          className="animate-bounce-slow text-white/85"
        />
        <span className="max-w-[9.5rem] text-center text-[12px]  leading-tight tracking-wide text-white/70">
          {label}
        </span>
      </div>

      <a
        href={`#${nextSectionId}`}
        onClick={(e) => {
          e.preventDefault();
          jumpToSection(nextSectionId);
        }}
        aria-label="Lanjut ke bagian berikutnya"
        className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full
          border border-white/40 text-white/80 backdrop-blur-sm transition-colors duration-200
          hover:border-white hover:text-white"
      >
        <FiChevronDown size={18} />
      </a>
    </div>
  );
}
