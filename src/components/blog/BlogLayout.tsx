import React from "react";
import SEOHead from "@/components/ui/seo-head";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import StructuredData from "@/components/seo/StructuredData";
import type { HeadingItem, PostMeta } from "@/lib/content";

interface BlogLayoutProps {
  meta: PostMeta;
  headings: HeadingItem[];
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ meta, headings, children }) => {
  const canonical = `https://paiconnect.nl/blog/${meta.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "inLanguage": "nl-NL",
    "author": { "@type": "Person", "name": meta.author || "Daan van der Ster" },
    "publisher": { "@type": "Organization", "name": "PAIConnect", "logo": { "@type": "ImageObject", "url": "https://paiconnect.nl/logo.png" } },
    "datePublished": meta.date,
    "dateModified": meta.updated || meta.date,
    "mainEntityOfPage": canonical
  };

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.summary || meta.title}
        canonical={canonical}
        structuredData={articleLd}
        ogType="article"
        articlePublishedTime={meta.date}
        articleModifiedTime={meta.updated || meta.date}
        ogImage={meta.image}
      />
      <div className="min-h-screen">
        <Navigation />
        <main className="container py-12 grid lg:grid-cols-[minmax(0,1fr)_280px] gap-12">
          <article className="prose prose-neutral max-w-none">
            <h1>{meta.title}</h1>
            {children}
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-sm font-semibold mb-3">Inhoud</p>
              <nav className="space-y-2">
                {headings.map(h => (
                  <a key={h.id} href={`#${h.id}`} className={`block text-sm ${h.level === 3 ? "ml-3" : ""}`}>
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </main>
        <Footer />
      </div>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Blog", "item": "https://paiconnect.nl/blog" },
          { "@type": "ListItem", "position": 2, "name": meta.title, "item": canonical }
        ]
      }} />
    </>
  );
};

export default BlogLayout;


