"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function JourneySection() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.16,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };
  return (
    <section id="perjalanan" className="bg-[#F1F0EE] py-16 md:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-6"
      >
        <div className="mx-auto max-w-7xl text-center">
          <motion.h2
            variants={item}
            className="font-souvenir text-4xl font-bold leading-[100%] text-[#1A5FA3] md:text-[64px]"
          >
            Perjalanan Pasar Kolaboraya
          </motion.h2>

          <motion.h3
            variants={item}
            className="mt-8 text-xl font-bold leading-[25px] text-[#1A5FA3] md:text-xl"
          >
            Mengapa Kolaboraya Lahir?
          </motion.h3>

          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-6xl text-lg leading-[25px] text-[#1A5FA3] md:text-xl"
          >
            Perubahan sosial tidak pernah lahir dari satu individu atau
            organisasi. Di tengah persoalan yang semakin kompleks, mulai dari
            krisis iklim, ketimpangan sosial, hingga menyempitnya ruang sipil,
            dibutuhkan cara kerja yang mampu menghubungkan berbagai aktor lintas
            isu, sektor, dan wilayah.
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-6xl text-lg leading-[25px] text-[#1A5FA3] md:text-xl md:leading-[25px]"
          >
            Berangkat dari kesadaran tersebut, <strong>Roemah Inspirit</strong>{" "}
            mengembangkan <strong>Kolaborasi Raya (Kolaboraya),</strong> sebuah
            pendekatan berbasis ekosistem yang memandang perubahan sebagai hasil
            dari kolaborasi yang saling terhubung dan saling menguatkan.{" "}
            <strong>Pasar Kolaboraya</strong> kemudian hadir sebagai ruang bagi
            para penggerak perubahan untuk belajar bersama, membangun
            kepercayaan, dan merancang aksi kolektif demi gerakan yang lebih
            lestari dan adil.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
