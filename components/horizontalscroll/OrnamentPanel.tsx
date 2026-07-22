import Image from "next/image";
import type { OrnamentPanelData } from "./types";

/**
 * Panel transisi berisi ilustrasi PNG (bunga, daun, siluet, dll) yang
 * mengambang pelan (idle float) secara independen dari scroll -- animasi
 * yang terikat scroll (garis putus bergelombang) dirender terpisah oleh
 * <WavyDivider /> di HorizontalScrollSection.
 *
 * Responsif: di mobile/tablet panel ini jadi strip pendek (bukan penuh
 * 1 layar) karena posisinya cuma jeda visual antar 2 panel konten yang
 * di-stack vertikal -- kalau dipaksa setinggi layar penuh, jaraknya
 * kerasa kepanjangan & kosong. Di desktop (>= md) tetap h-full seperti
 * semula karena jadi bagian dari track horizontal.
 */
export default function OrnamentPanel({ data }: { data: OrnamentPanelData }) {
  return (
    <div
      className={`relative h-56 w-full overflow-hidden sm:h-72 md:h-full ${data.bgClassName ?? ""}`}
    >
      {data.ornaments.map((orn) => (
        <div
          key={orn.id}
          className={`absolute animate-float ${orn.className ?? ""}`}
          style={{
            animationDelay: `${orn.floatDelay ?? 0}s`,
            animationDuration: `${orn.floatDuration ?? 6}s`,
          }}
        >
          <Image
            src={orn.src}
            alt={orn.alt}
            width={400}
            height={400}
            className="h-auto w-full drop-shadow-xl"
          />
        </div>
      ))}
    </div>
  );
}
