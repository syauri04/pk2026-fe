import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/bg-culture-blue.png')",
        }}
      />

      {/* Ornament */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/ornament-hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto flex md:min-h-[941px] flex-col items-center justify-center px-6 py-28 text-center">
        {/* Logo */}
        <Image
          src="/assets/logo-hero.png"
          alt="Pasar Kolaboraya"
          width={760}
          height={320}
          priority
          className="
            h-full
            w-[300px]
            sm:w-[360px]
            md:w-[360px]
            lg:w-[470px]
            xl:w-[760px]
          "
        />

        {/* Tagline */}
        <h2
          className="
            mt-6
            max-w-4xl
            font-souvenir
            text-2xl
            italic
            leading-snug
            text-white
            md:text-[34px]
          "
        >
          Menyelam Lebih Dalam bersama Pendekatan Ekosistem
        </h2>

        {/* Date */}
        <p
          className="
            mt-2
            font-souvenir
            text-2xl
            text-white
            md:text-[36px]
          "
        >
          Jakarta, 1–3 September 2026
        </p>

        {/* Description */}
        <p
          className="
            mt-10
            max-w-[760px]
            font-souvenir
            text-xl
            leading-8
            md:leading-10
            text-white/95
            md:text-[28px]
          "
        >
          Pasar Kolaboraya 2026 dirancang sebagai ruang temu yang intim bagi
          para Ecosystem Builder. Untuk menjaga kehangatan dan fokus pada
          pembelajaran bersama, pertemuan tahun ini diselenggarakan secara
          khusus untuk undangan terbatas.
        </p>
      </div>
    </section>
  );
}
