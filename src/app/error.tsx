"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Container size="md" className="text-center">
        <span className="mb-4 block text-8xl font-bold tracking-tighter text-foreground/10">
          500
        </span>
        <h1 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
          Something went wrong
        </h1>
        <p className="mb-8 text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </Container>
    </main>
  );
}
