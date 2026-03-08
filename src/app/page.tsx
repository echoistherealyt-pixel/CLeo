"use client";
import { useState } from "react";
import "@/i18n";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import { ScrollToTop } from "@/hooks/useReveal";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { StatsSection, ProcessSection, ToolsSection } from "@/components/sections/NewSections";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={() => setLoaded(true)} />
      <main
        style={{
          background: "#0a0a0f",
          minHeight: "100vh",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease 0.2s",
        }}
      >
        <Navbar />
        <Hero />
        <Services />
        <StatsSection />
        <Work />
        <ProcessSection />
        <Testimonials />
        <ToolsSection />
        <Pricing />
        <Contact />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
}