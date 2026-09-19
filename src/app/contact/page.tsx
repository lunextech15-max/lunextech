import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import "@/styles/contact.css";

export const metadata: Metadata = {
  title: "Contact — LUNEX TECH",
  description: "Start a project or talk to LUNEX TECH.",
};

const CHANNELS = [
  {
    label: "Email",
    value: "lunextech15@gmail.com",
    href: "mailto:lunextech15@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 91501 04102",
    href: "tel:+919150104102",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="contact-grid" aria-hidden />
        <div className="contact-grain" aria-hidden />
        <div className="contact-glow" aria-hidden />

        <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-28 pb-24 md:px-10 lg:px-16">
          {/* Section label */}
          <div className="contact-fade flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">
            <span className="font-display text-accent">→</span>
            <span aria-hidden className="h-px w-8 bg-accent/60" />
            <span>Start a project</span>
          </div>

          {/* Headline */}
          <h1 className="contact-fade mt-8 max-w-4xl font-display text-[13vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-12 lg:text-[5.6vw] xl:text-[5rem]">
            LET&apos;S TALK <span className="text-accent">ABOUT IT.</span>
          </h1>

          <p className="contact-fade mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
            Whether you&apos;re starting with an idea, improving an existing
            product, or just want to talk it through — reach out directly and
            we&apos;ll get back to you.
          </p>

          {/* Contact channels */}
          <div className="contact-fade mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16">
            {CHANNELS.map((channel) => (
              <div key={channel.label} className="contact-channel">
                <span className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">
                  {channel.label}
                </span>
                <a href={channel.href} className="contact-channel-link text-lg font-semibold tracking-wide sm:text-xl">
                  {channel.value}
                </a>
              </div>
            ))}
          </div>

          <p className="contact-fade mt-10 text-[11px] font-medium tracking-[0.25em] text-soft-white/55 uppercase">
            No idea is too early to start a conversation.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
