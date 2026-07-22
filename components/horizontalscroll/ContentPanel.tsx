import Image from "next/image";
import type { ContentPanelData } from "./types";

const ctaVariantClasses: Record<ContentPanelData["ctaVariant"], string> = {
  blue: "bg-[#2451C7] hover:bg-[#3562DE] text-white",
  teal: "bg-[#B73A2E] hover:bg-[#B73A2E] text-white",
};

export default function ContentPanel({ data }: { data: ContentPanelData }) {
  const isLight = data.tone === "light";
  const isCenter = data.position === "center";
  const isRight = data.position === "right";

  // Urutan/posisi kolom teks vs foto CUMA berlaku dari md ke atas. Di bawah
  // itu semua elemen ditumpuk vertikal secara natural (urutan DOM apa
  // adanya), jadi tidak perlu row-reverse dsb di mobile.
  const containerClass = isCenter
    ? "md:justify-center"
    : isRight
      ? "md:flex-row-reverse"
      : "md:flex-row";

  const textWidthClass = isCenter
    ? "md:mx-auto md:w-[56%] md:max-w-4xl"
    : "md:w-[45%] md:max-w-xl";

  const textAlignClass = isCenter ? "text-center" : "text-center md:text-left";

  const renderOrnaments = (ornaments?: ContentPanelData["ornaments"]) =>
    ornaments?.map((orn) => (
      <div
        key={orn.src}
        className={`absolute z-40 animate-float drop-shadow-xl ${orn.className ?? ""}`}
        style={{
          animationDelay: `${orn.floatDelay ?? 0}s`,
          animationDuration: `${orn.floatDuration ?? 6}s`,
        }}
      >
        <Image
          src={orn.src}
          alt={orn.alt}
          width={640}
          height={480}
          className="h-full w-full object-cover"
        />
      </div>
    ));

  return (
    <div
      className={`relative w-full overflow-hidden py-12 sm:py-14 md:h-full md:py-0 ${data.bgClassName}`}
    >
      {/* Ornamen kiri/kanan (khusus layout "center", mis. 2026) -- murni
          dekoratif & posisinya px-based lebar (mis. w-[500px]) yang cuma
          masuk akal di layar lebar, jadi disembunyikan di bawah md supaya
          tidak overflow/menutupi konten di layar sempit. */}
      {isCenter && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-[22%] md:block">
            {renderOrnaments(data.leftOrnaments)}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[22%] md:block">
            {renderOrnaments(data.rightOrnaments)}
          </div>
        </>
      )}

      <div
        className={`relative z-30 flex h-full w-full flex-col items-center gap-8 px-6 sm:px-8 md:items-center md:gap-0 md:px-[6%] ${containerClass}`}
      >
        {/* ===========================
            TEKS
        ============================ */}
        <div className={`w-full ${textAlignClass} ${textWidthClass}`}>
          {data.imgYear && (
            <div
              className="mx-auto w-24 animate-float drop-shadow-xl sm:w-28 md:mx-0 md:w-32 lg:w-[190px]"
              style={{ animationDelay: "0.6s", animationDuration: "6s" }}
            >
              <Image
                src={data.imgYear}
                alt={`Tahun ${data.year}`}
                width={280}
                height={280}
                className="h-auto w-full"
              />
            </div>
          )}

          {data.imgYear2 && (
            <div
              className="mx-auto mb-6 w-32 animate-float drop-shadow-xl sm:w-40 md:mb-8 md:w-48 lg:w-[330px]"
              style={{ animationDelay: "0s", animationDuration: "6s" }}
            >
              <Image
                src={data.imgYear2}
                alt={`Tahun ${data.year}`}
                width={330}
                height={330}
                className="h-auto w-full"
              />
            </div>
          )}

          <h2
            className={`mb-4 text-2xl font-bold leading-[22px] ${
              isLight ? "text-white" : "text-[#1B2340]"
            }`}
          >
            {data.title}
          </h2>

          <p
            className={`mb-6 whitespace-pre-line text-base leading-[19px] text-justify ${
              isLight ? "text-white/80" : "text-[#1B2340]/75"
            }`}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          {data.ctaLabel && (
            <a
              href={data.ctaHref ?? "#"}
              target="_blank"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium
                transition-colors duration-200 sm:px-6 sm:py-3 ${ctaVariantClasses[data.ctaVariant]}`}
            >
              {data.ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>

        {/* ===========================
            FOTO (layout "left"/"right" saja -- "center" tidak punya grid foto)
        ============================ */}
        {!isCenter && data.images.length > 0 && (
          <>
            {/* Mobile & tablet: grid rapi 2 kolom, TANPA absolute-position
                & TANPA ornamen di atasnya -- kolase artistik yang dirancang
                lewat koordinat % cuma masuk akal di kanvas lebar (desktop);
                dipaksakan di layar sempit hasilnya numpuk/berantakan. */}
            <div className="grid w-full grid-cols-2 gap-3 md:hidden">
              {data.images.map((img, idx) => {
                const isLastOdd =
                  data.images.length % 2 !== 0 &&
                  idx === data.images.length - 1;
                return (
                  <div
                    key={img.id}
                    className={`overflow-hidden rounded-md bg-white p-1.5 shadow-lg ${
                      isLastOdd ? "col-span-2" : ""
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={640}
                      height={480}
                      className="h-36 w-full rounded-sm object-cover sm:h-48"
                    />
                  </div>
                );
              })}
            </div>

            {/* Desktop (>= md): kolase artistik absolut seperti desain asli,
                lengkap dengan background collage image, ornamen, & sticker. */}
            <div className="relative hidden h-full w-full md:block md:w-[56%]">
              {data.bgcolageimage && (
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <Image
                    src={data.bgcolageimage}
                    alt=""
                    width={900}
                    height={900}
                    className="h-auto w-[90%] object-contain"
                  />
                </div>
              )}

              {data.images.map((img) => (
                <div
                  key={img.id}
                  className={`absolute overflow-hidden shadow-2xl ring-1 ring-black/10 ${img.className ?? ""}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={640}
                    height={480}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}

              {renderOrnaments(data.ornaments)}

              {data.stickerText && (
                <div className="absolute bottom-[6%] left-[4%] z-40 max-w-[55%] rotate-[-2deg] rounded-sm bg-white px-4 py-3 text-sm font-medium italic text-[#1B2340] shadow-xl">
                  &ldquo;{data.stickerText}&rdquo;
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
