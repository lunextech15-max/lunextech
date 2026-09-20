// Single place to wire real audio into LunexReel once it exists. Every
// path is a Remotion staticFile() path (relative to /public) and stays
// `null` — meaning silent, no <Audio> tag rendered for it — until a real
// file is dropped in and the path is filled in here. This is the only file
// that needs editing to add voice-over or music; no scene code changes.
//
// STILL NEEDED (as of this build):
//   - 8 voice-over clips (see remotion/audio/reel-script.ts for the exact
//     text of each, and reel-audio-config.ts must fall back to the
//     estimateSpeechFrames() estimate in reel-script.ts, which is what
//     the scenes currently use)
//   - 1 background music bed (instrumental, cinematic electronic — see
//     project brief). Must be royalty-free/licensed; do not add a
//     commercial track without a license.
//   - Optional short SFX one-shots (logo impact, whoosh, UI click) — see
//     SFX_PATHS below.

export type ReelAudioConfig = {
  music: string | null;
  voiceOver: Record<string, string | null>;
  sfx: {
    logoImpact: string | null;
    whoosh: string | null;
    uiClick: string | null;
  };
};

export const REEL_AUDIO: ReelAudioConfig = {
  // e.g. "audio/lunex-reel-music.mp3" once sourced (public/audio/...).
  music: null,

  // e.g. { opening: "audio/vo/opening.mp3", ... } once generated.
  voiceOver: {
    opening: null,
    "who-we-are": null,
    "what-we-do": null,
    services: null,
    process: null,
    delivery: null,
    "brand-statement": null,
    "end-cta": null,
  },

  sfx: {
    logoImpact: null,
    whoosh: null,
    uiClick: null,
  },
};

// Background music sits under the voice-over per the brief (~15-25% of VO
// level) and ducks further under it — but since ducking needs to know
// exactly when VO is playing, this stays a flat low level until real VO
// clips exist to duck against.
export const MUSIC_VOLUME = 0.2;
export const VOICE_OVER_VOLUME = 1;
export const SFX_VOLUME = 0.5;
