export const assets = {
  hero: "/images/profile-hero.svg",
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
  } as Record<string, string>,

  blog: {
    "cutting-checkout-abandonment": "/images/blog/checkout-abandonment.jpg",
    "building-real-time-sync-crdts": "/images/blog/crdt-sync.jpg",
    "performance-budgets-that-work": "/images/blog/perf-budgets.jpg",
    "designing-apis-frontend-developers-love": "/images/blog/api-design.jpg",
    "architecture-checkout-flow": "/images/blog/checkout-architecture.jpg",
    "scaling-frontend-teams": "/images/blog/scaling-teams.jpg",
    "accessibility-is-infrastructure": "/images/blog/a11y-infrastructure.jpg",
    "what-nobody-tells-you-about-micro-frontends": "/images/blog/micro-frontends.jpg",
    "building-plugin-platform-lessons": "/images/blog/plugin-platform.jpg",
    "ci-pipeline-performance-regressions": "/images/blog/ci-performance.jpg",
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
