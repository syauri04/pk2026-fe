import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative flex-1 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/banner-web.mp4" type="video/mp4" />
        </video>

        {/* <div className="absolute inset-0 bg-black/50" /> */}
      </section>
    </main>
  );
}
