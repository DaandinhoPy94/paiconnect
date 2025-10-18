import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { getAllPosts } from "@/lib/content";

const BlogIndex: React.FC = () => {
  const posts = getAllPosts();
  // Eenvoudige filters: intentie tags op basis van slug/titel
  const categories = [
    { key: "informatief", match: (p: any) => /ai-wins|stappenplan|fouten|tools/i.test(`${p.slug} ${p.title}`) },
    { key: "transactioneel", match: (p: any) => /workshop|case/i.test(`${p.slug} ${p.title}`) },
    { key: "lokaal", match: (p: any) => /amsterdam|randstad/i.test(`${p.slug} ${p.title}`) },
  ];
  const tagged = posts.map(p => ({
    ...p,
    tag: categories.find(c => c.match(p))?.key || "informatief"
  }));
  const [activeTag, setActiveTag] = React.useState<string>("alle");
  const visible = activeTag === "alle" ? tagged : tagged.filter(p => p.tag === activeTag);

  return (
    <>
      <SEOHead
        title="Blog over AI voor MKB – PAIConnect"
        description="Praktische blogs over AI-implementatie, automatisering en cases voor MKB."
        canonical="https://paiconnect.nl/blog"
      />
      <div className="min-h-screen">
        <Navigation />
        <main className="container py-12">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <div className="mb-6 flex gap-2 flex-wrap">
            {[("alle"), ("informatief"), ("transactioneel"), ("lokaal")].map(t => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-3 py-1 rounded border text-sm ${activeTag === t ? "bg-primary text-white" : "hover:bg-muted"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="block border rounded-lg p-6 hover:shadow-sm">
                <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
                {p.date && (
                  <p className="text-sm text-muted-foreground mb-2">{new Date(p.date).toLocaleDateString("nl-NL")}</p>
                )}
                {p.summary && <p className="text-muted-foreground">{p.summary}</p>}
                <p className="mt-2 text-xs uppercase tracking-wide text-primary">{p.tag}</p>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;


