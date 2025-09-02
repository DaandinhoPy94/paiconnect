import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  structuredData?: object;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  canonical = "https://paiconnect.nl",
  structuredData,
  ogDescription,
  ogImage = "https://paiconnect.nl/og-default.jpg",
  noindex = false
}) => {
  const ogDesc = ogDescription || description.substring(0, 110);
  const ogTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />
      
      {/* Performance hints for LCP optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Optimize font loading and critical CSS for LCP */}
      <style>{`
        @font-face {
          font-family: 'Inter';
          font-display: swap;
          src: local('Inter');
        }
        /* Critical CSS for LCP and initial render */
        .text-primary { color: hsl(200 100% 50%); }
        h1 { font-weight: 700; line-height: 1.1; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .min-h-screen { min-height: 100vh; }
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .text-center { text-align: center; }
        .mb-6 { margin-bottom: 1.5rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .font-bold { font-weight: 700; }
        .gradient-text { background: linear-gradient(135deg, hsl(200 100% 50%), hsl(240 100% 70%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @media (min-width: 768px) {
          .md\\:text-5xl { font-size: 3rem; line-height: 1; }
          .md\\:py-24 { padding-top: 6rem; padding-bottom: 6rem; }
        }
      `}</style>
      
      {/* Defer non-critical CSS loading */}
      <link 
        rel="preload" 
        href="/assets/index-BwzcmeCr.css" 
        as="style" 
        onLoad={(e) => {
          const target = e.target as HTMLLinkElement;
          target.onload = null;
          target.rel = 'stylesheet';
        }}
      />
      <noscript>
        <link rel="stylesheet" href="/assets/index-BwzcmeCr.css" />
      </noscript>
      
      {/* Indexing control */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="PaiConnect" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@paiconnect" />
      
      {/* Additional meta tags for social sharing */}
      <meta property="og:locale" content="nl_NL" />
      <meta property="article:author" content="PaiConnect" />
      
      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;