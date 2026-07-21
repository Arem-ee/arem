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
  } as Record<string, string>,

  blog: {
    "cutting-checkout-abandonment": "https://picsum.photos/seed/cutting-checkout-abandonment/1200/630",
    "building-real-time-sync-crdts": "https://picsum.photos/seed/building-real-time-sync-crdts/1200/630",
    "performance-budgets-that-work": "https://picsum.photos/seed/performance-budgets-that-work/1200/630",
    "designing-apis-frontend-developers-love": "https://picsum.photos/seed/designing-apis-frontend-developers-love/1200/630",
    "architecture-checkout-flow": "https://picsum.photos/seed/architecture-checkout-flow/1200/630",
    "scaling-frontend-teams": "https://picsum.photos/seed/scaling-frontend-teams/1200/630",
    "accessibility-is-infrastructure": "https://picsum.photos/seed/accessibility-is-infrastructure/1200/630",
    "what-nobody-tells-you-about-micro-frontends": "https://picsum.photos/seed/what-nobody-tells-you-about-micro-frontends/1200/630",
    "building-plugin-platform-lessons": "https://picsum.photos/seed/building-plugin-platform-lessons/1200/630",
    "ci-pipeline-performance-regressions": "https://picsum.photos/seed/ci-pipeline-performance-regressions/1200/630",
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
