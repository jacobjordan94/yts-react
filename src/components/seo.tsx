interface SeoProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  type?: 'website' | 'article';
  creator?: string;
  schema?: object;
}

const DEFAULT_TITLE = 'YTS Movie Browser';
const DEFAULT_DESCRIPTION = 'Browse, search, and discover movies with a beautiful, performant interface. Find high-quality torrents for your favorite films.';
const BASE_URL = 'yts-react.jacob-jordan.me';

const DEFAULT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "YTS Movie Browser",
  url: BASE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/list?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  pathname = '/',
  image,
  type = 'website',
  creator,
  schema,
}: SeoProps) {
  const url = `${BASE_URL}${pathname}`;

  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content={DEFAULT_TITLE} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {creator && <meta name="twitter:creator" content={creator} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(schema || DEFAULT_SCHEMA)}}
      />
    </>
  );
}
