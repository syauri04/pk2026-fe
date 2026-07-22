import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#F1F0EE]">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4  md:flex-row md:items-center md:justify-between md:px-6">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/logo-blue.png"
            alt="Pasar Kolaboraya"
            width={211}
            height={80}
            priority
            className="h-auto w-[160px] md:w-[180px] lg:w-[211px]"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-3 md:flex-row md:gap-8">
          <Link
            href="#perjalanan"
            className="font-souvenir text-lg leading-[22px] font-bold text-[#185DA2] transition-opacity hover:opacity-80"
          >
            Perjalanan Pasar Kolaboraya
          </Link>

          <Link
            href="#builder"
            className="font-souvenir text-lg leading-[22px] font-bold text-[#185DA2] transition-opacity hover:opacity-80"
          >
            Peran Ekosistem Builder
          </Link>
        </nav>

        {/* Button */}
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-4">
          <Link
            href="https://www.kolaboraya.id/"
            target="_blank"
            className="
              rounded-md
              bg-[#185DA2]
              px-5
              py-2
              text-center
              font-souvenir
              text-base
              font-bold
              text-[#F1F0EE]
              transition-opacity
              hover:opacity-90
              md:text-lg
            "
          >
            Kolaboraya
          </Link>
        </div>
      </div>
    </header>
  );
}
