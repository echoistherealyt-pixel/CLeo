"use client";

import { useState } from "react";
import "@/i18n";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <Navbar />
          <Hero />
          <Services />
          <Work />
          <Pricing />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}