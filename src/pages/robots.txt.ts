import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = ({ site: url }) => new Response(`User-agent: *\n${site.demo ? 'Disallow: /' : 'Allow: /'}\n\nSitemap: ${new URL('/sitemap.xml', url)}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
