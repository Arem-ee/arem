import { personSchema, websiteSchema, jsonLd } from "@/lib/seo";

export function JsonLd() {
  const schemas = jsonLd(personSchema(), websiteSchema());

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={schema}
        />
      ))}
    </>
  );
}
