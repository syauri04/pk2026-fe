"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { href: "#perjalanan", label: "Perjalanan Pasar Kolaboraya" },
  { href: "#builder", label: "Peran Ekosistem Builder" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="relative z-50 bg-[#F1F0EE]">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          <Image
            src="/assets/logo-blue.png"
            alt="Pasar Kolaboraya"
            width={211}
            height={80}
            priority
            className="h-auto w-[150px] md:w-[180px] lg:w-[211px]"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-souvenir text-lg font-bold leading-[22px] text-[#185DA2] transition-opacity hover:opacity-75"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop button */}
        <Link
          href="https://www.kolaboraya.id/"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-md bg-[#185DA2] px-5 py-2 font-souvenir text-lg font-bold text-[#F1F0EE] transition hover:bg-[#104d8a] md:block"
        >
          Kolaboraya
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center rounded-md text-[#185DA2] transition hover:bg-[#185DA2]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185DA2] md:hidden"
        >
          <span className="sr-only">Menu</span>

          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-current transition duration-300 ${
                isOpen ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[9px] block h-0.5 w-6 rounded-full bg-current transition duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-0.5 w-6 rounded-full bg-current transition duration-300 ${
                isOpen ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[#185DA2]/10 md:hidden"
          >
            <nav className="container mx-auto flex flex-col px-4 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-[#185DA2]/10 py-4 font-souvenir text-lg font-bold text-[#185DA2] transition hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="https://www.kolaboraya.id/"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="mt-5 rounded-md bg-[#185DA2] px-5 py-3 text-center font-souvenir text-lg font-bold text-[#F1F0EE] transition hover:bg-[#104d8a]"
              >
                Kolaboraya
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
