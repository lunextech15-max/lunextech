"use client";

const VIDEO_SRC = "/videos/hero-reel.mp4";

export default function HeroVideo() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        className="h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/75 to-carbon/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/80" />
    </div>
  );
}
