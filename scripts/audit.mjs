import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';

// Integration audit of actual generated files, independent of Astro components.
const root = path.resolve('dist');
async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(path.join(directory, entry.name))
    : path.join(directory, entry.name)))).flat();
}
const files = await walk(root);
const fileSet = new Set(files);
const pages = files.filter(file => file.endsWith('.html'));
const documents = new Map(await Promise.all(pages.map(async file => [file, await fs.readFile(file, 'utf8')])));
const asset = url => path.join(root, decodeURIComponent(url.split('?')[0]).replace(/^\//, ''));
const resolvePage = pathname => {
  const direct = asset(pathname);
  return fileSet.has(direct) ? direct : path.join(direct, 'index.html');
};
let links = 0, images = 0;
for (const [file, html] of documents) {
  const label = path.relative(root, file);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${label}: exactly one H1`);
  assert.match(html, /<html[^>]+lang="fr"/, `${label}: French language`);
  assert.match(html, /<title>[^<]+<\/title>/, `${label}: title`);
  assert.match(html, /name="description"[^>]+content="[^"]+"/, `${label}: meta description`);
  assert.match(html, /rel="canonical"/, `${label}: canonical`);
  assert.match(html, /property="og:image"/, `${label}: OpenGraph image`);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    assert(href && href !== '#', `${label}: non-empty CTA`);
    if (/^(tel:|mailto:|https?:)/.test(href)) continue;
    links++;
    const url = new URL(href, 'https://maison-ardent.example');
    const target = href.startsWith('#') ? file : resolvePage(url.pathname);
    assert(fileSet.has(target), `${label}: missing target ${href}`);
    if (url.hash) {
      const targetHtml = documents.get(target) || '';
      assert(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${label}: missing anchor ${href}`);
    }
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    images++;
    assert(/\salt(?:="[^"]*")?(?=\s|\/?>)/.test(match[0]), `${label}: image alt attribute`);
    assert(/\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]), `${label}: intrinsic dimensions`);
    const src = match[0].match(/\bsrc="([^"]+)"/)?.[1];
    if (src?.startsWith('/')) assert(fileSet.has(asset(src)), `${label}: missing image ${src}`);
  }
}
assert(fileSet.has(path.join(root,'robots.txt')), 'robots.txt exists');
assert(fileSet.has(path.join(root,'sitemap.xml')), 'sitemap.xml exists');
assert(fileSet.has(path.join(root,'og-maison-ardent.jpg')), 'OpenGraph image exists');
const javascript = files.filter(file => file.endsWith('.js'));
const css = files.filter(file => file.endsWith('.css'));
async function sizes(list) {
  const buffers = await Promise.all(list.map(file => fs.readFile(file)));
  return { files: list.length, bytes: buffers.reduce((n,b) => n+b.length,0), gzipBytes: buffers.reduce((n,b) => n+gzipSync(b).length,0) };
}
const jsSize = await sizes(javascript);
assert(jsSize.gzipBytes < 12000, 'Client JavaScript budget < 12 kB gzip');
const report = { pages: pages.length, internalLinksChecked: links, imageInstancesChecked: images, javascript: jsSize, css: await sizes(css), status: 'PASS' };
console.log(JSON.stringify(report,null,2));
await fs.mkdir('docs', {recursive:true});
await fs.writeFile('docs/build-audit.json', JSON.stringify(report,null,2)+'\n');
