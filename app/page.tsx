import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DownloadCta } from "@/components/sections/DownloadCta";
import { Features } from "@/components/sections/features/Features";
import { Hero } from "@/components/sections/hero/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* 80px entre hero y funciones dejan ver la franja Primary/50 del fondo */}
      <main className="flex flex-col items-center gap-20">
        <Hero />
        <Features />
      </main>
      <DownloadCta />

      <Footer />
    </>
  );
}
