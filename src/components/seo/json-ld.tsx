/**
 * Reusable JSON-LD structured data component for SEO.
 * Renders a <script type="application/ld+json"> block in the page head.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
