import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto — IRYA",
  description: contactPage.description,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main
        data-nav-theme="light"
        className="flex w-full justify-center px-6 pt-36 pb-24 tablet:px-10 tablet:pt-40"
      >
        <div className="flex w-full max-w-128 flex-col items-center gap-10">
          <SectionHeading
            badge={contactPage.badge}
            title={contactPage.title}
            description={contactPage.description}
          />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
