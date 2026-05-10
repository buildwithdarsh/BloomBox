import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/mock/products";
import { getFloristById } from "@/lib/mock/florists";
import { mockReviews } from "@/lib/mock/user";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductClient } from "./product-client";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const price = product.sizes[0].price;
  const title = `${product.name} — From ₹${price.toLocaleString("en-IN")}`;
  const description = `${product.shortDescription}. ${product.reviewCount} reviews, rated ${product.rating}/5. Fresh for ${product.freshnessDays} days. Same-day delivery in Bangalore.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://bloombox.in/shop/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bloombox.in/shop/${slug}`,
      images: product.images.map((img) => ({
        url: img,
        width: 800,
        height: 1000,
        alt: product.name,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const florist = getFloristById(product.floristId);
  const reviews = mockReviews.filter((r) => r.productId === product.id);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: {
      "@type": "Organization",
      name: "BloomBox",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: product.sizes[0].price,
      highPrice: product.sizes[product.sizes.length - 1].price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      offerCount: product.sizes.length,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Shop",
        item: "https://bloombox.in/shop",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: `https://bloombox.in/shop/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductClient product={product} florist={florist} reviews={reviews} />
    </>
  );
}
