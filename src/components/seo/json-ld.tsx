type JsonLdProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={JSON.stringify(schema)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
