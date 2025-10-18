import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import BlogLayout from "@/components/blog/BlogLayout";
import { getPostBySlug } from "@/lib/content";

const BlogPost: React.FC = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const [loaded, setLoaded] = React.useState<{ meta: any; Content: any; headings: any[] } | null>(null);

  React.useEffect(() => {
    let active = true;
    (async () => {
      const { meta, Content, headings } = await getPostBySlug(slug);
      if (active) setLoaded({ meta, Content, headings });
    })();
    return () => { active = false; };
  }, [slug]);

  if (!loaded) {
    return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (!loaded.Content) {
    return <div className="container py-12">Artikel niet gevonden.</div>;
  }

  const { meta, Content, headings } = loaded;
  return (
    <BlogLayout meta={meta} headings={headings}>
      <Suspense fallback={<div>Bezig met laden…</div>}>
        <Content />
      </Suspense>
    </BlogLayout>
  );
};

export default BlogPost;


