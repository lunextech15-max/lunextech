// Instagram Reels / YouTube Shorts UI overlays the top ~10-12% (camera
// controls, follow button) and bottom ~16-18% (caption, like/comment/share,
// audio pill) of a 1080x1920 vertical video. Every scene keeps essential
// text inside this band so the platform UI never covers it.

export const REEL_WIDTH = 1080;
export const REEL_HEIGHT = 1920;

export const SAFE_TOP = 200;
export const SAFE_BOTTOM = 300;
export const SAFE_SIDE = 72;

export const SAFE_HEIGHT = REEL_HEIGHT - SAFE_TOP - SAFE_BOTTOM;
