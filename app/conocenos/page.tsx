import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DownloadCta } from "@/components/sections/DownloadCta";
import { AboutFeatures } from "@/components/sections/about/AboutFeatures";
import { Faq } from "@/components/sections/about/Faq";

export const metadata: Metadata = {
  title: "Conócenos — IRYA",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center">
        <AboutFeatures />
        <Faq />
      </main>
      <DownloadCta />
      <Footer />
    </>
  );
}
