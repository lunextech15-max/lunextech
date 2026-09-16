import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/home/Hero";
import WhoWeAre from "@/components/home/WhoWeAre";
import WhatWeDo from "@/components/home/WhatWeDo";
import WhatWeBuild from "@/components/home/WhatWeBuild";
import HowWeWork from "@/components/home/HowWeWork";
import SelectedWork from "@/components/home/SelectedWork";
import WhyLunexTech from "@/components/home/WhyLunexTech";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/layout/Footer";
import LoadingProvider from "@/components/loading/LoadingProvider";

export const metadata: Metadata = {
  title: "LUNEX TECH — Technology & Product Studio",
  description:
    "From idea to impact. LUNEX TECH designs, builds, and ships digital products, web apps, and AI systems for ambitious teams.",
};

export default function Home() {
  return (
    <LoadingProvider>
      <div className="flex flex-1 flex-col bg-carbon">
        <Nav />
        <Hero />
        <WhoWeAre />
        <WhatWeDo />
        <WhatWeBuild />
        <HowWeWork />
        <SelectedWork />
        <WhyLunexTech />
        <FinalCTA />
        <Footer />
      </div>
    </LoadingProvider>
  );
}
