import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Container size="md" className="text-center">
        <span className="mb-4 block text-8xl font-bold tracking-tighter text-foreground/10">
          404
        </span>
        <h1 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
          Page not found
        </h1>
        <p className="mb-8 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </Container>
    </main>
  );
}
