import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — BloomBox",
  description: "The page you are looking for does not exist. Browse our flower collection or return to the homepage.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-light text-foreground mb-4">404</h1>
        <h2 className="text-xl font-medium text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/home"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
