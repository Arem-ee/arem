export const assets = {
  hero: "/images/profile-hero.png",
  ogImage: "/images/og.jpg",
  favicon: "/favicon.ico",

  projects: {
    "stripe-checkout-redesign": "/images/projects/stripe-checkout.jpg",
    "design-system-framework": "/images/projects/design-system.jpg",
    "real-time-sync-engine": "/images/projects/figma-sync.jpg",
    "nextjs-build-cache": "/images/projects/nextjs-cache.jpg",
    "plugin-platform-api": "/images/projects/plugin-platform.jpg",
    "accessibility-audit-tool": "/images/projects/a11y-tool.jpg",
    "performance-monitoring-cli": "/images/projects/perf-cli.jpg",
    "ecommerce-accelerator": "/images/projects/ecommerce.jpg",
    "redact": "https://picsum.photos/seed/redact-privacy/1200/630",
    "ergo-automotive": "https://picsum.photos/seed/ergo-automotive/1200/630",
    "mobile-landing-page": "https://picsum.photos/seed/mobile-landing/1200/630",
    "aremco": "https://picsum.photos/seed/aremco-business/1200/630",
  } as Record<string, string>,

  blog: {
    "cutting-checkout-abandonment": "https://picsum.photos/seed/payment-checkout/1200/630",
    "building-real-time-sync-crdts": "https://picsum.photos/seed/network-sync/1200/630",
    "performance-budgets-that-work": "https://picsum.photos/seed/speed-performance/1200/630",
    "designing-apis-frontend-developers-love": "https://picsum.photos/seed/code-developer/1200/630",
    "architecture-checkout-flow": "https://picsum.photos/seed/server-architecture/1200/630",
    "scaling-frontend-teams": "https://picsum.photos/seed/team-collaboration/1200/630",
    "accessibility-is-infrastructure": "https://picsum.photos/seed/accessibility-design/1200/630",
    "what-nobody-tells-you-about-micro-frontends": "https://picsum.photos/seed/modular-blocks/1200/630",
    "building-plugin-platform-lessons": "https://picsum.photos/seed/puzzle-plugins/1200/630",
    "ci-pipeline-performance-regressions": "https://picsum.photos/seed/pipeline-automation/1200/630",
  } as Record<string, string>,

  avatars: {
    marlene: "/images/avatars/marlene.jpg",
    dylan: "/images/avatars/dylan.jpg",
    natasha: "/images/avatars/natasha.jpg",
    marcus: "/images/avatars/marcus.jpg",
  } as Record<string, string>,

  logos: {
    vercel: "/logos/vercel.svg",
    stripe: "/logos/stripe.svg",
    figma: "/logos/figma.svg",
    airbnb: "/logos/airbnb.svg",
  } as Record<string, string>,
} as const;

export function getProjectImage(slug: string): string {
  return assets.projects[slug] ?? "/images/project-placeholder.svg";
}

export function getBlogImage(slug: string): string {
  return assets.blog[slug] ?? "/images/blog-placeholder.svg";
}

export function getAvatarImage(name: string): string {
  const key = name.toLowerCase().split(" ")[0];
  return assets.avatars[key] ?? "";
}
