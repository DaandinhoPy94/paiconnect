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
      
      {/* Performance hints for LCP optimization and external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://app.posthog.com" />
      <link rel="preconnect" href="https://us.i.posthog.com" />
      <link rel="preconnect" href="https://us-assets.i.posthog.com" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Cache control hints for static assets */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      <meta httpEquiv="Expires" content="Wed, 21 Oct 2025 07:28:00 GMT" />
      
      {/* Comprehensive critical CSS for faster initial render */}
      <style>{`
        @font-face {
          font-family: 'Inter';
          font-display: swap;
          src: local('Inter');
        }
        /* Reset and base styles */
        *, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
        html { line-height: 1.5; -webkit-text-size-adjust: 100%; -moz-tab-size: 4; tab-size: 4; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }
        body { margin: 0; line-height: inherit; }
        
        /* Critical layout styles */
        .min-h-screen { min-height: 100vh; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .inset-0 { top: 0px; right: 0px; bottom: 0px; left: 0px; }
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding-left: 1rem; padding-right: 1rem; }
        .text-center { text-align: center; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: 1rem; }
        
        /* Typography - optimized for LCP */
        .text-primary { color: hsl(200 100% 50%); }
        .text-white { color: rgb(255 255 255); }
        .text-muted-foreground { color: hsl(215.4 16.3% 46.9%); }
        .font-bold { font-weight: 700; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .leading-tight { line-height: 1.25; }
        .leading-relaxed { line-height: 1.625; }
        
        /* Critical styles for LCP paragraph element */
        p.text-lg.md\\:text-xl.text-muted-foreground.mb-8.leading-relaxed.max-w-2xl.mx-auto {
          font-size: 1.125rem;
          line-height: 1.625;
          color: hsl(215.4 16.3% 46.9%);
          margin-bottom: 2rem;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
          will-change: auto;
          contain: layout style;
        }
        
        /* Spacing */
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .px-8 { padding-left: 2rem; padding-right: 2rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .max-w-3xl { max-width: 48rem; }
        .max-w-2xl { max-width: 42rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        
        /* Background and gradients */
        .bg-cover { background-size: cover; }
        .bg-center { background-position: center; }
        .bg-no-repeat { background-repeat: no-repeat; }
        .gradient-text { 
          background: linear-gradient(135deg, hsl(200 100% 50%), hsl(240 100% 70%)); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          background-clip: text; 
        }
        
        /* Button styles */
        .inline-flex { display: inline-flex; }
        .h-10 { height: 2.5rem; }
        .rounded-md { border-radius: 0.375rem; }
        .border { border-width: 1px; }
        .bg-primary { background-color: hsl(200 100% 50%); }
        .text-primary-foreground { color: hsl(0 0% 100%); }
        .hover\\:bg-primary\\/90:hover { background-color: hsl(200 100% 45%); }
        .transition-colors { transition-property: color, background-color, border-color; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        
        /* Responsive design */
        @media (min-width: 768px) {
          .md\\:text-5xl { font-size: 3rem; line-height: 1; }
          .md\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .md\\:py-24 { padding-top: 6rem; padding-bottom: 6rem; }
        }
        @media (min-width: 1024px) {
          .lg\\:text-6xl { font-size: 3.75rem; line-height: 1; }
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