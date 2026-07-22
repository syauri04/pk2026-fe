"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useId, useState, type ReactNode } from "react";
import { motion, type MotionProps, useReducedMotion } from "framer-motion";

type OrnamentBase = {
  id: number;
  image: string | StaticImageData;
  classImage?: string;
  position: { x: number; y: number };
  width: number;
};

type InteractiveEcosystemItem = OrnamentBase & {
  /** Default status; this ornament has a number badge and opens a tooltip. */
  kind?: "interactive";
  title: string;
  summary: string;
  badgePosition?: { x: number; y: number };
  badgeColour?: "black" | "blue";
  popupSide?: "top" | "right" | "bottom" | "left";
  popupPosition?: { x: number; y: number };
};

type StaticEcosystemItem = OrnamentBase & {
  /** Display-only ornament: no badge, tooltip, or click action. */
  kind: "static";
};

export type EcosystemItem = InteractiveEcosystemItem | StaticEcosystemItem;

type EcosystemBuilderProps = {
  items: EcosystemItem[];
  title?: ReactNode;
  className?: string;
};

const popupPlacement = {
  top: "bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2",
  right: "left-[calc(100%+1rem)] top-1/2 -translate-y-1/2",
  bottom: "left-1/2 top-[calc(100%+1rem)] -translate-x-1/2",
  left: "right-[calc(100%+1rem)] top-1/2 -translate-y-1/2",
} as const;

const badgeColors = {
  black: "bg-black text-white",
  blue: "bg-[#175EA1] text-white",
} as const;

function isInteractive(item: EcosystemItem): item is InteractiveEcosystemItem {
  return item.kind !== "static";
}

export function EcosystemBuilder({
  items,
  title = (
    <>
      Mengenal Peran
      <br />
      Ecosystem Builder
    </>
  ),
  className = "",
}: EcosystemBuilderProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const titleId = useId();
  const shouldReduceMotion = useReducedMotion();
  const activeItem =
    items.filter(isInteractive).find((item) => item.id === activeId) ?? null;

  const itemMotion = (index: number): MotionProps => ({
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 22,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      delay: shouldReduceMotion ? 0 : index * 0.09,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <section
      id="builder"
      aria-labelledby={titleId}
      className={`overflow-hidden bg-[#EBE6E5] ${className}`}
    >
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="relative mx-auto aspect-[16/10] min-h-[370px] w-full">
          <motion.h2
            {...itemMotion(0)}
            id={titleId}
            className={`absolute left-[3%] top-[4%] z-20 font-serif text-[clamp(1.9rem,4vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.035em] text-[#1260A8] transition duration-300 ${activeItem ? "scale-[1.015] blur-[5px] opacity-35" : ""}`}
          >
            {title}
          </motion.h2>

          <div
            aria-hidden={activeItem ? true : undefined}
            className={`absolute inset-0 transition duration-300 ${activeItem ? "scale-[1.015] blur-[5px] opacity-35" : ""}`}
          >
            {items.map((item, index) =>
              isInteractive(item) ? (
                <OrnamentButton
                  key={item.id}
                  item={item}
                  disabled={Boolean(activeItem)}
                  onOpen={setActiveId}
                  motionProps={itemMotion(index + 1)}
                />
              ) : (
                <StaticOrnament
                  key={item.id}
                  item={item}
                  motionProps={itemMotion(index + 1)}
                />
              ),
            )}
          </div>

          {activeItem && (
            <FocusedOrnament
              item={activeItem}
              onClose={() => setActiveId(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function OrnamentButton({
  item,
  disabled,
  onOpen,
  motionProps,
}: {
  item: InteractiveEcosystemItem;
  disabled: boolean;
  onOpen: (id: number) => void;
  motionProps: MotionProps;
}) {
  return (
    <motion.button
      {...motionProps}
      type="button"
      disabled={disabled}
      onClick={() => onOpen(item.id)}
      aria-label={`Lihat ${item.title}`}
      className="group absolute z-10 block cursor-pointer rounded-full outline-none disabled:pointer-events-none focus-visible:ring-4 focus-visible:ring-[#1260A8]/40"
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
        width: `${item.width}%`,
      }}
    >
      <Image
        src={item.image}
        alt=""
        width={600}
        height={600}
        priority
        className={`h-auto w-full select-none ${item.classImage ?? ""}`}
      />
      <NumberBadge
        number={item.id}
        position={item.badgePosition}
        colour={item.badgeColour}
      />
    </motion.button>
  );
}

function StaticOrnament({
  item,
  motionProps,
}: {
  item: StaticEcosystemItem;
  motionProps: MotionProps;
}) {
  return (
    <motion.div
      {...motionProps}
      aria-hidden="true"
      className="pointer-events-none absolute z-10"
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
        width: `${item.width}%`,
      }}
    >
      <Image
        src={item.image}
        alt=""
        width={600}
        height={600}
        priority
        className={`h-auto w-full select-none ${item.classImage ?? ""}`}
      />
    </motion.div>
  );
}

function FocusedOrnament({
  item,
  onClose,
}: {
  item: InteractiveEcosystemItem;
  onClose: () => void;
}) {
  const side = item.popupSide ?? "right";
  const customPopupPosition = item.popupPosition
    ? { left: `${item.popupPosition.x}%`, top: `${item.popupPosition.y}%` }
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute z-30"
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
        width: `${item.width}%`,
      }}
    >
      <Image
        src={item.image}
        alt=""
        width={600}
        height={600}
        priority
        className={`h-auto w-full select-none ${item.classImage ?? ""}`}
      />
      <NumberBadge
        number={item.id}
        position={item.badgePosition}
        colour={item.badgeColour}
      />

      <aside
        role="dialog"
        aria-label={item.title}
        className={`absolute z-40 w-[min(16rem,calc(100vw-2rem))] rounded-xl bg-[#1260A8] p-4 pr-10 text-white shadow-[0_14px_30px_rgba(10,53,92,0.28)] sm:w-64 sm:p-5 sm:pr-12 ${item.popupPosition ? "-translate-x-1/2 -translate-y-1/2" : popupPlacement[side]}`}
        style={customPopupPosition}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup informasi"
          className="absolute right-3 top-3 inline-grid size-7 place-items-center rounded-full text-lg leading-none transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          ×
        </button>
        <h3 className="font-serif text-base font-bold leading-tight sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 text-xs leading-[110%] text-white/90 sm:text-sm">
          {item.summary}
        </p>
      </aside>
    </motion.div>
  );
}

function NumberBadge({
  number,
  position = { x: 42, y: 0 },
  colour = "black",
}: {
  number: number;
  position?: { x: number; y: number };
  colour?: keyof typeof badgeColors;
}) {
  return (
    <span
      className={`absolute inline-grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11px] font-bold shadow-sm transition group-hover:scale-110 group-focus-visible:scale-110 sm:size-7 sm:text-xs ${badgeColors[colour]}`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      {number}
    </span>
  );
}
