import "../../styles/luxury.css";
import "../../styles/essentials.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductOrder from "@/components/ProductOrder";
import ProductSpecs from "@/components/ProductSpecs";
import ScrollReveal from "@/components/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { ESSENTIALS } from "@/data/essentials";
import { specForProduct } from "@/data/specs";
import { SITE_NAME, abs } from "@/lib/site";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return ESSENTIALS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = ESSENTIALS.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found", robots: { index: false, follow: false } };

  const path = `/essentials/${id}`;
  const description = `Order the ${product.name} from Cash Culture Essentials — ${product.category.toLowerCase()}, made to order and shipped worldwide. $${product.price.toFixed(2)}.`;
  return {
    title: product.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${product.name} | Cash Culture`,
      description,
      url: path,
      type: "website",
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: { card: "summary_large_image", title: product.name, description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = ESSENTIALS.find((p) => p.id === id);
  if (!product) notFound();

  const path = `/essentials/${id}`;
  const images = [product.image, ...(product.colors?.map((c) => c.image) ?? [])]
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(abs);

  const spec = specForProduct(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images,
    description: `Premium Cash Culture ${product.category.toLowerCase()}, made to order and shipped worldwide.`,
    category: product.category,
    ...(spec ? { material: spec.fabric } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: abs(path),
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: "Essentials", item: abs("/essentials") },
      { "@type": "ListItem", position: 3, name: product.name, item: abs(path) },
    ],
  };

  return (
    <main className="cc-lux">
      <JsonLd data={[productJsonLd, breadcrumbJsonLd]} />
      <ScrollReveal selector=".cc-lux .featured" />

      <section className="section" id="order">
        <div className="section-header">
          <p className="section-label">
            <Link href="/essentials" className="lux-back">Essentials</Link> / {product.category}
          </p>
          <h2 className="section-title">ORDER</h2>
          <p className="section-sub">Choose your size and color, then check out securely.</p>
        </div>
      </section>

      <ProductOrder product={product} />

      {spec && <ProductSpecs spec={spec} />}

      <div className="gold-divider" />
    </main>
  );
}
