// Renders a JSON-LD structured-data block. Server component — safe to drop
// into any server-rendered page or the root layout.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
