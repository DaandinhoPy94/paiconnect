import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd());
const blogDir = path.join(root, "src/content/blog");
const publicDir = path.join(root, "public");
const site = "https://paiconnect.nl";
const now = new Date().toISOString();

function parseFrontmatter(src) {
  const m = /^---\n([\s\S]*?)\n---/u.exec(src);
  if (!m) return {};
  const lines = m[1].split("\n");
  const data = {};
  for (const line of lines) {
    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line.trim());
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2];
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    data[key] = val;
  }
  return data;
}

function listBlogFiles() {
  return fs.readdirSync(blogDir).filter(f => f.endsWith(".mdx"));
}

function buildRss(posts) {
  const items = posts.map(p => `\n    <item>\n      <title>${escapeXml(p.title)}</title>\n      <link>${site}/blog/${p.slug}</link>\n      <guid>${site}/blog/${p.slug}</guid>\n      <pubDate>${new Date(p.date || p.updated || now).toUTCString()}</pubDate>\n      <description>${escapeXml(p.summary || p.title)}</description>\n    </item>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>PAIConnect Blog</title>\n    <link>${site}/blog</link>\n    <description>Blogs over AI-implementatie en automatisering (MKB, Randstad/NL).</description>\n    <language>nl-nl</language>${items}\n  </channel>\n</rss>\n`;
}

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildSitemap(staticUrls, posts) {
  const urls = [
    ...staticUrls,
    { loc: `${site}/blog`, changefreq: "weekly", priority: 0.8, lastmod: today() },
    ...posts.map(p => ({ loc: `${site}/blog/${p.slug}`, lastmod: p.updated || p.date || today(), changefreq: "weekly", priority: 0.7 })),
    { loc: `${site}/diensten/ai-lezingen`, lastmod: today(), changefreq: "monthly", priority: 0.7 },
    { loc: `${site}/diensten/ai-workshops`, lastmod: today(), changefreq: "monthly", priority: 0.7 },
    { loc: `${site}/diensten/automatisering`, lastmod: today(), changefreq: "monthly", priority: 0.7 },
  ];

  const body = urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function readStaticExistingSitemap() {
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) return [];
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locs = [];
  const re = /<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g;
  let m;
  while ((m = re.exec(xml))) {
    const url = m[1];
    // filter later door buildSitemap waar we blog/diensten opnieuw toevoegen
    if (!/\/blog(\/|$)/.test(url) && !/\/diensten\//.test(url)) {
      locs.push({ loc: url, lastmod: today(), changefreq: "monthly", priority: 0.5 });
    }
  }
  return locs;
}

function main() {
  const files = listBlogFiles();
  const posts = files.map(f => {
    const src = fs.readFileSync(path.join(blogDir, f), "utf8");
    const fm = parseFrontmatter(src);
    return {
      title: fm.title || f.replace(/\.mdx$/, ""),
      slug: fm.slug || f.replace(/\.mdx$/, ""),
      date: fm.date,
      updated: fm.updated,
      summary: fm.summary,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));

  // RSS
  const rss = buildRss(posts);
  fs.writeFileSync(path.join(publicDir, "feed.xml"), rss, "utf8");

  // Sitemap
  const staticUrls = readStaticExistingSitemap();
  const sitemap = buildSitemap(staticUrls, posts);
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");

  console.log(`RSS en sitemap gegenereerd. Posts: ${posts.length}.`);
}

main();


