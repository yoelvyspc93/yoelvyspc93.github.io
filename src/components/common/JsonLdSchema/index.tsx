import Script from 'next/script';

interface JsonLdSchemaProps {
  schemaData: Record<string, unknown>;
}

export const JsonLdSchema = ({ schemaData }: JsonLdSchemaProps) => {
  return (
    <Script
      type="application/ld+json"
      id="yoelvys-schema"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
