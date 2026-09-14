import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const orbitron = loadOrbitron("normal", { weights: ["500", "700", "900"], subsets: ["latin"] });
export const inter = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

export const displayFont = orbitron.fontFamily;
export const bodyFont = inter.fontFamily;
