import Head from "next/head";

export const OpenGraph = ({ metadata = {} }) => {
  const SEO = {
    title: metadata.title || "Kevin Hierro - Wolfremium",
    description:
      metadata.description ||
      "Blog personal",
    slug: metadata.slug || "",
    image: '/assets/default-image.jpg',
    date: metadata.date || new Date().toISOString(),
  };

  return (
    <Head>
      <title>{SEO.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={SEO.description} name="description" />
      <meta
        property="og:url"
        content={`https://wolfremium.dev/${SEO.slug}`}
      />
      <link rel="canonical" href={`https://wolfremium.dev/${SEO.slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kevin Hierro" />
      <meta property="og:description" content={SEO.description} />
      <meta property="og:title" content={SEO.title} />
      <meta property="og:image" content={SEO.image} />
      <meta property="article:published_time" content={SEO.date} />
    </Head>
  );
};