import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // These already carry `robots: {index: false}` page metadata — belt
      // and suspenders so crawlers never even fetch them.
      disallow: ["/staff", "/staff/", "/intern", "/intern/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
