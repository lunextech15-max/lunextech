// Canonical site URL — set NEXT_PUBLIC_SITE_URL once the production domain
// is live (Vercel project settings or .env.local). Falls back to the
// Vercel preview URL Next injects automatically, or localhost in dev, so
// metadataBase/sitemap/JSON-LD never point at a fabricated domain.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
