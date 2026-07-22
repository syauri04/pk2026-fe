import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#004180]">
        <div className="container mx-auto flex  flex-col gap-8 px-6 py-10 md:flex-row md:items-start md:justify-between">
          <div className="shrink-0">
            <Image
              src="/logo.png"
              alt="Pasar Kolaboraya"
              width={417}
              height={158}
            />
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <div>
              <h3 className="mb-3 text-base font-bold text-white">Kontak</h3>

              <Link
                href="mailto:kolaboraya@roemahinspiratif.id"
                className="flex items-center gap-2 text-base text-white/90 transition-opacity hover:opacity-80"
              >
                <MdEmail size={20} />
                <span>kolaboraya@roemahinspiratif.id</span>
              </Link>
            </div>

            <div>
              <h3 className="mb-3 text-base font-bold text-white">
                Social Media
              </h3>

              <div className="flex flex-col gap-3">
                <Link
                  href="#"
                  target="_blank"
                  className="flex items-center gap-2 text-base text-white/90 transition-opacity hover:opacity-80"
                >
                  <FaInstagram size={18} />
                  <span>Instagram</span>
                </Link>

                <Link
                  href="#"
                  target="_blank"
                  className="flex items-center gap-2 text-base text-white/90 transition-opacity hover:opacity-80"
                >
                  <FaFacebookF size={16} />
                  <span>Facebook</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-[#042647] py-3 text-left text-base text-white">
        <div className="container mx-auto  px-6">
          © 2026 Kolaboraya All rights reserved.
        </div>
      </div>
    </>
  );
}
