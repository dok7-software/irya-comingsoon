import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DownloadCta } from "@/components/sections/DownloadCta";
import { Features } from "@/components/sections/features/Features";
import { Hero } from "@/components/sections/hero/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DownloadCta />
      </main>
      <Footer />
    </>
  );
}
