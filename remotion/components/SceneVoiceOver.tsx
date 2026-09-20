import { Audio, staticFile } from "remotion";
import { REEL_AUDIO, VOICE_OVER_VOLUME } from "../audio/reel-audio-config";

/** Renders this scene's voice-over clip if one has been wired into
 * reel-audio-config.ts, otherwise nothing — every reel scene stays silent
 * (not broken) until real VO audio exists. `id` must match a key in
 * REEL_AUDIO.voiceOver and a reel-script.ts entry id. */
export const SceneVoiceOver = ({ id }: { id: string }) => {
  const path = REEL_AUDIO.voiceOver[id];
  if (!path) return null;
  return <Audio src={staticFile(path)} volume={VOICE_OVER_VOLUME} />;
};
