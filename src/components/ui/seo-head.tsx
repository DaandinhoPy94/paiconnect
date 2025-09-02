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