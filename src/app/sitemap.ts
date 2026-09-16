import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PROGRAMS } from "@/lib/programs";
import { getOpenJobs } from "@/lib/jobs";

const STATIC_ROUTES = ["/", "/about", "/capabilities", "/projects", "/internships", "/careers", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const programEntries: MetadataRoute.Sitemap = PROGRAMS.map((program) => ({
    url: `${SITE_URL}/internships/${program.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const jobEntries: MetadataRoute.Sitemap = getOpenJobs().map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified: new Date(job.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...programEntries, ...jobEntries];
}
