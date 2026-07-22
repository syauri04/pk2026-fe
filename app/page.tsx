import {
  EcosystemBuilder,
  type EcosystemItem,
} from "@/components/ecosystem/EcosystemBuilder";
import Hero from "@/components/Hero";
import HorizontalScrollSection from "@/components/horizontalscroll/HorizontalScrollSection";
import JourneySection from "@/components/JourneySection";

const ecosystemItems: EcosystemItem[] = [
  {
    id: 11,
    kind: "static",
    image: "/assets/ecosystem/ubur.png",
    position: { x: 45, y: -4 },
    width: 22,
  },
  {
    id: 12,
    kind: "static",
    image: "/assets/ecosystem/eco-1.png",
    position: { x: 63, y: 9 },
    width: 20,
  },
  {
    id: 13,
    kind: "static",
    image: "/assets/ecosystem/butterlfyblue.png",
    position: { x: 75, y: 20 },
    width: 25,
  },
  {
    id: 1,
    title: "Community Spark Plug",
    summary:
      "Memantik gairah, mengidentifikasi keresahan bersama di tingkat akar rumput, dan memicu aksi kolektif awal",
    image: "/assets/ecosystem/eco-1.png",
    position: { x: 53, y: 25 },
    width: 30,
    badgePosition: { x: 20, y: 26 },
    badgeColour: "blue",
    popupSide: "top",
    popupPosition: { x: 66, y: 14 },
  },
  {
    id: 2,
    title: "Network Weaver",
    summary:
      "Merobohkan sekat-sekat antar-sektor, menghubungkan para aktor lintas sektor, dan merawat hubungan yang bertumpu pada kepercayaan.",
    image: "/assets/ecosystem/eco-2.png",
    position: { x: 25, y: 15 },
    width: 31,
    badgePosition: { x: 35, y: 22 },
    badgeColour: "black",
    popupSide: "right",
    popupPosition: { x: 97, y: 28 },
  },
  {
    id: 3,
    title: "Adaptive Ecosystem Leader",
    summary:
      "Membaca pola makro, berani mengambil keputusan sulit di tengah krisis, dan melakukan perubahan arah strategi umum.",
    image: "/assets/ecosystem/eco-3n.png",
    position: { x: -5, y: 20 },
    width: 39,
    badgePosition: { x: 38, y: 30 },
    badgeColour: "black",
    popupSide: "right",
    popupPosition: { x: 109, y: 28 },
  },
  {
    id: 4,
    title: "Collaborator Conductor",
    summary:
      "Mengatur ritme kerja kolektif, menjaga komitmen agenda bersama, serta mengelola dan memediasi konflik agar tetap produktif.",
    image: "/assets/ecosystem/eco-4.png",
    position: { x: 23, y: 61 },
    width: 25,
    badgePosition: { x: 44, y: 20 },
    badgeColour: "blue",
    popupSide: "top",
    popupPosition: { x: 115, y: 25 },
  },
  {
    id: 5,
    title: "Wellbeing Caregiver",
    summary:
      "Menciptakan ruang aman (safe space) bagi para penggerak, memitigasi kejenuhan ekstrem (burnout), serta merawat kesehatan mental gerakan.",
    image: "/assets/ecosystem/eco-5.png",
    position: { x: 36, y: 63 },
    width: 29,
    badgePosition: { x: 43, y: 30 },
    badgeColour: "black",
    popupSide: "top",
    popupPosition: { x: 105, y: 18 },
  },
  {
    id: 10,
    kind: "static",
    image: "/assets/ecosystem/eco-8.png",
    position: { x: 87, y: 62 },
    width: 15,
    classImage: "scale-x-[-1] ",
  },
  {
    id: 6,
    title: "Movement Connector",
    summary:
      "Mengamplifikasi inisiatif lokal ke tingkat kebijakan nasional atau regional, membangun koalisi taktis, dan menjembatani aksi ke ruang media.",
    image: "/assets/ecosystem/eco-6.png",
    position: { x: 65, y: 64 },
    width: 29,
    badgePosition: { x: 38, y: 44 },
    badgeColour: "black",
    popupSide: "left",

    popupPosition: { x: 0, y: 28 },
  },
  {
    id: 7,
    title: "Resource Ecosystem Orchestrator",
    summary:
      "Memetakan aset lokal tersembunyi, mendistribusikan aliran modal atau barang secara adil, serta merancang model keberlanjutan mandiri.",
    image: "/assets/ecosystem/eco-3n.png",
    classImage: "scale-x-[-1] rotate-[45deg]",
    position: { x: 70, y: -15 },
    width: 39,
    badgePosition: { x: 40, y: 54 },
    badgeColour: "black",
    popupSide: "left",
    popupPosition: { x: 0, y: 75 },
  },
  {
    id: 9,
    kind: "static",
    image: "/assets/ecosystem/eco-6.png",
    position: { x: 3, y: 67 },
    width: 27,
    classImage: "scale-x-[-1] ",
  },
  {
    id: 8,
    title: "Narrative Weaver dan Sensemaker",
    summary:
      "Menangkap saripati pembelajaran, merajut identitas kolektif gerakan, serta menuliskan cerita perubahan yang jujur.",
    image: "/assets/ecosystem/eco-8.png",

    classImage: "z-10",
    position: { x: 0, y: 62 },
    width: 15,
    badgePosition: { x: 25, y: 30 },
    badgeColour: "blue",
    popupSide: "right",

    popupPosition: { x: 130, y: 28 },
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <JourneySection />
      <HorizontalScrollSection />
      <EcosystemBuilder items={ecosystemItems} />
    </main>
  );
}
