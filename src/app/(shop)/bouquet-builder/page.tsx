import type { Metadata } from "next";
import { BouquetBuilderClient } from "./builder-client";

export const metadata: Metadata = {
  title: "Build Your Own Bouquet — Custom Flower Arrangements",
  description:
    "Design a custom bouquet step by step — pick your flowers, choose wrapping, add a message card. Made just for you by Bangalore florists.",
  alternates: {
    canonical: "https://bloombox.in/bouquet-builder",
  },
  openGraph: {
    title: "Build Your Own Bouquet — BloomBox",
    description:
      "Design a custom bouquet step by step — pick flowers, choose wrapping, add a message card.",
    url: "https://bloombox.in/bouquet-builder",
  },
};

export default function BouquetBuilderPage() {
  return <BouquetBuilderClient />;
}
