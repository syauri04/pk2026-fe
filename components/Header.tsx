import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#4F86A6]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 md:flex-row md:justify-between md:px-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Pasar Kolaboraya"
            width={211}
            height={80}
            priority
            className="h-auto w-[160px] md:w-[180px] lg:w-[211px]"
          />
        </Link>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-4">
          <Link
            href="https://www.kolaboraya.id/"
            target="_blank"
            className="
              rounded-md
              bg-[#F4E6C1]
              px-5
              py-2
              text-center
              font-souvenir
              text-base
              font-bold
              text-[#4F86A6]
              transition-opacity
              hover:opacity-90
              md:text-lg
            "
          >
            Kolaboraya
          </Link>

          <Link
            href="https://www.roemahinspirit.id/"
            target="_blank"
            className="
              rounded-md
              bg-[#F4E6C1]
              px-5
              py-2
              text-center
              font-souvenir
              text-base
              font-bold
              text-[#4F86A6]
              transition-opacity
              hover:opacity-90
              md:text-lg
            "
          >
            Rumah Inspiratif
          </Link>
        </div>
      </div>
    </header>
  );
}
