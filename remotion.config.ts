import path from "path";
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Compositions import shared data (services, projects) straight from the
// Next.js app via the same "@/*" alias as tsconfig.json, so the video and
// the site can never drift apart — but Remotion's bundler doesn't read
// tsconfig paths on its own, so it's mirrored here.
Config.overrideWebpackConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve?.alias,
      "@": path.join(process.cwd(), "src"),
    },
  },
}));
