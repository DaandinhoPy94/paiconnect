import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd());
const contentPath = path.join(root, "src/content/content.md");
const blogDir = path.join(root, "src/content/blog");

/** Map van titel -> slug (8 kernblogs) */
const posts = [
  { title: "AI voor het MKB: 5 snelle wins die direct tijd besparen", slug: "ai-wins-mkb" },
  { title: "Wat kost een AI-workshop? Kosten, ROI en formats (½ dag, in-company)", slug: "ai-workshop-kosten" },
  { title: "Stappenplan: starten met AI in jouw bedrijf (van pilot tot schaal)", slug: "starten-met-ai-stappenplan" },
  { title: "Veelgemaakte fouten bij AI-implementatie (en hoe je ze voorkomt)", slug: "ai-implementatie-fouten-voorkomen" },
  { title: "AI-tools voor MKB in 2025: selectie en inzet per team (sales / finance / ops)", slug: "ai-tools-mkb-2025" },
  { title: "Case: Voorbeeldcase – 20% tijdwinst met AI-automatisering (Administratiekantoor XYZ)", slug: "case-20-procent-tijdwinst" },
  { title: "AI-automatisering vs. Excel-macro’s/RPA: wat kies je wanneer?", slug: "ai-automatisering-vs-excel-rpa" },
  { title: "AI in Amsterdam en Randstad: lokaal aanbod lezingen, workshops, implementatie", slug: "ai-in-amsterdam-randstad" },
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function summarize(md, maxLen = 180) {
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen - 1) + "…" : text;
}

function extractSections(full) {
  const indices = posts.map(p => {
    const re = new RegExp(`(^|\n)${p.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\s*\n`, "u");
    const m = re.exec(full);
    if (!m) return { ...p, start: -1 };
    return { ...p, start: m.index + (m[1] ? m[1].length : 0) };
  });

  // Filter die we gevonden hebben en sorteren op start
  const found = indices.filter(i => i.start >= 0).sort((a, b) => a.start - b.start);

  // Bepaal end per sectie als start van volgende, anders EOF
  for (let i = 0; i < found.length; i++) {
    const start = found[i].start;
    const end = i < found.length - 1 ? found[i + 1].start : full.length;
    found[i].content = full.slice(start, end).trim();
  }

  return found;
}

function buildFrontmatter({ title, slug, body }) {
  const today = new Date().toISOString().slice(0, 10);
  const summary = summarize(body);
  return `---\n` +
    `title: "${title.replace(/"/g, '\\"')}"\n` +
    `slug: "${slug}"\n` +
    `date: "${today}"\n` +
    `updated: "${today}"\n` +
    `author: "Daan van der Ster"\n` +
    `summary: "${summary.replace(/"/g, '\\"')}"\n` +
    `---\n\n`;
}

function normalizeBody(md) {
  // Zorg dat hoofdtitle als H1 staat als die in de bron niet met # staat
  // Voeg H1 in op basis van eerste regel (titel), als eerste non-empty regel geen # is
  const lines = md.split(/\r?\n/);
  if (lines.length > 0) {
    const first = lines[0].trim();
    if (!first.startsWith("#")) {
      lines[0] = `# ${first}`;
    }
  }
  return lines.join("\n");
}

function main() {
  if (!fs.existsSync(contentPath)) {
    console.error("Kon content.md niet vinden op:", contentPath);
    process.exit(1);
  }
  const full = fs.readFileSync(contentPath, "utf8");
  ensureDir(blogDir);

  const sections = extractSections(full);
  if (sections.length === 0) {
    console.error("Geen secties gevonden. Controleer de titels in content.md.");
    process.exit(1);
  }

  let written = 0;
  for (const s of sections) {
    const body = normalizeBody(s.content);
    const fm = buildFrontmatter({ title: s.title, slug: s.slug, body });
    const out = fm + body + "\n";
    const outPath = path.join(blogDir, `${s.slug}.mdx`);
    fs.writeFileSync(outPath, out, "utf8");
    written++;
  }

  console.log(`Klaar. ${written} MDX-bestanden geschreven naar src/content/blog/`);
}

main();


