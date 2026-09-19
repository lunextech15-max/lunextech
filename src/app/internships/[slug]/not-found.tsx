import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function ProgramNotFound() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />
      <main className="flex flex-1 flex-col justify-center px-6 py-24 md:px-10 lg:px-16">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">
          06 <span className="text-accent">/ Internships</span>
        </p>
        <h1 className="mt-6 font-display text-4xl font-black tracking-tight text-soft-white uppercase">
          Program not found.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-soft-white/50">
          The requested internship program could not be found.
        </p>
        <Link
          href="/internships"
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white uppercase transition-colors hover:text-accent"
        >
          ← All programs
        </Link>
      </main>
      <Footer />
    </div>
  );
}
