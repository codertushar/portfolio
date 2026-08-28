// Resolves the site's own base URL without hardcoding a domain we don't
// control. On Vercel, VERCEL_PROJECT_PRODUCTION_URL always reflects whatever
// domain is actually attached to production (a custom domain if one's set,
// otherwise the *.vercel.app one), so this stays correct even if the domain
// changes later. NEXT_PUBLIC_SITE_URL is an escape hatch if that's ever not
// what's wanted; localhost is the dev fallback.
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
