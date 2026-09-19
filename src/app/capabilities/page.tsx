import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/shared/SectionHeader";
import { SERVICES } from "@/lib/services";
import { CAPABILITIES } from "@/lib/capabilities";
import "@/styles/page-hero.css";

export const metadata: Metadata = {
  title: "Capabilities — LUNEX TECH",
  description: "What LUNEX TECH does and what we build — services and product categories.",
};

export default function CapabilitiesPage() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 px-6 pt-32 pb-20 md:px-10 lg:px-16 lg:pt-40">
          <SectionHeader number="→" label="Capabilities" className="page-fade" />

          <h1 className="page-fade mt-8 max-w-4xl font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-12 lg:text-[5.6vw] xl:text-[5rem]">
            WHAT WE <span className="text-accent">DO & BUILD.</span>
          </h1>

          <p className="page-fade mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
            From strategy and design to product engineering and AI — here is
            the full range of what LUNEX TECH does, and the kinds of digital
            products we build.
          </p>
        </div>
      </main>

      {/* Services */}
      <section aria-labelledby="services-heading" className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="01" label="What we do" />
        <h2 id="services-heading" className="sr-only">
          Services
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <div key={service.id} className="bg-carbon p-7 sm:p-8">
              <span className="font-display text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-black tracking-tight text-soft-white uppercase">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-soft-white/55">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we build */}
      <section aria-labelledby="build-heading" className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="02" label="What we build" />
        <h2 id="build-heading" className="sr-only">
          Build categories
        </h2>

        <div className="mt-12 flex flex-col lg:mt-16">
          {CAPABILITIES.map((category) => (
            <div key={category.id} className="border-t border-line py-10 first:border-t-0 lg:py-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-14">
                <div className="lg:w-80 lg:shrink-0">
                  <span className="font-display text-xs tracking-[0.25em] text-soft-white/55">
                    {category.number}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-black tracking-tight text-soft-white uppercase">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-soft-white/55">{category.description}</p>
                </div>

                <ul className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                  {category.examples.map((example) => (
                    <li key={example.title} className="page-card">
                      <p className="text-sm font-semibold text-soft-white">{example.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-soft-white/50">{example.useCase}</p>
                      <p className="mt-2 text-[10px] font-medium tracking-[0.15em] text-soft-white/55 uppercase">
                        {example.audience.join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
