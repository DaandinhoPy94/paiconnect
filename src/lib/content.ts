import React from "react";

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  author?: string;
  summary?: string;
  image?: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number; // 2 of 3
}

function extractHeadings(rawMdx: string): HeadingItem[] {
  const lines = rawMdx.split("\n");
  const headings: HeadingItem[] = [];
  for (const rawLine of lines) {
    const line = rawLine.trim();
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const level = match[1].length;
    const textWithOptionalId = match[2];
    const text = textWithOptionalId.replace(/\s*{#([^}]+)}\s*$/, "").trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\u00C0-\u017F]+/g, "-")
      .replace(/^-+|-+$/g, "");
    headings.push({ id: slug, text, level });
  }
  return headings;
}

// Blog content imports
const blogEager = import.meta.glob("/src/content/blog/*.mdx", { eager: true }) as Record<string, any>;
const blogRaw = import.meta.glob("/src/content/blog/*.mdx", { as: "raw", eager: true }) as Record<string, string>;
const blogLazy = import.meta.glob("/src/content/blog/*.mdx");

export function getAllPosts(): Array<PostMeta & { path: string }> {
  const items = Object.entries(blogEager).map(([path, mod]) => {
    const front = (mod as any).frontmatter || {};
    const slug = front.slug || path.split("/").pop()!.replace(/\.mdx?$/, "");
    return {
      title: front.title || slug,
      slug,
      date: front.date || "",
      updated: front.updated,
      author: front.author,
      summary: front.summary,
      image: front.image,
      path,
    } as PostMeta & { path: string };
  });
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<{
  meta: PostMeta;
  Content: React.ComponentType<any> | null;
  headings: HeadingItem[];
}> {
  const entry = Object.entries(blogEager).find(([p, m]) => {
    const front = (m as any).frontmatter || {};
    const s = front.slug || p.split("/").pop()!.replace(/\.mdx?$/, "");
    return s === slug;
  });
  if (!entry) return { meta: { title: "", slug, date: "" }, Content: null, headings: [] };

  const [path, mod] = entry;
  const front = (mod as any).frontmatter || {};
  const raw = blogRaw[path] || "";
  const headings = extractHeadings(raw);
  const importer = Object.entries(blogLazy).find(([p]) => p === path)?.[1];
  const loaded = importer ? await importer() : mod;

  return {
    meta: {
      title: front.title || slug,
      slug,
      date: front.date || "",
      updated: front.updated,
      author: front.author,
      summary: front.summary,
      image: front.image,
    },
    Content: (loaded as any).default,
    headings,
  };
}

// Services content imports
const serviceEager = import.meta.glob("/src/content/diensten/*.mdx", { eager: true }) as Record<string, any>;
const serviceLazy = import.meta.glob("/src/content/diensten/*.mdx");

export function getAllServices(): Array<{
  slug: string;
  title: string;
  description?: string;
  priceFrom?: number;
  currency?: string;
  path: string;
}> {
  return Object.entries(serviceEager).map(([path, mod]) => {
    const front = (mod as any).frontmatter || {};
    const slug = front.slug || path.split("/").pop()!.replace(/\.mdx?$/, "");
    return {
      slug,
      title: front.title || slug,
      description: front.description,
      priceFrom: front.priceFrom,
      currency: front.currency,
      path,
    };
  });
}

export async function getServiceBySlug(slug: string): Promise<{
  meta: { slug: string; title: string; description?: string; priceFrom?: number; currency?: string; unitText?: string };
  Content: React.ComponentType<any> | null;
}> {
  const entry = Object.entries(serviceEager).find(([p, m]) => {
    const front = (m as any).frontmatter || {};
    const s = front.slug || p.split("/").pop()!.replace(/\.mdx?$/, "");
    return s === slug;
  });
  if (!entry) return { meta: { slug, title: slug }, Content: null };

  const [path, mod] = entry;
  const front = (mod as any).frontmatter || {};
  const importer = Object.entries(serviceLazy).find(([p]) => p === path)?.[1];
  const loaded = importer ? await importer() : mod;

  return {
    meta: {
      slug,
      title: front.title || slug,
      description: front.description,
      priceFrom: front.priceFrom,
      currency: front.currency,
      unitText: front.unitText,
    },
    Content: (loaded as any).default,
  };
}


