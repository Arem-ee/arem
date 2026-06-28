# Deployment Guide

## Prerequisites

- Node.js 18+
- pnpm (recommended), npm, or yarn
- A Vercel account (for deployment)

## Local Development

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Fill in your .env.local values:
#   RESEND_API_KEY   - Get from https://resend.com/api-keys
#   CONTACT_EMAIL    - Your email for contact form submissions
#   NEXT_PUBLIC_SITE_URL - Your local URL (default: http://localhost:3000)
#   NEXT_PUBLIC_SITE_NAME - Your name

# Start development server
pnpm dev
```

The site will be available at `http://localhost:3000`.

## Production Build

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Build
pnpm build

# Preview production build locally
pnpm start
```

## Deploy to Vercel

### Automatic (Recommended)

1. Push the repository to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Set the following environment variables in Vercel:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (your production domain, e.g., `https://alexmorgan.dev`)
   - `NEXT_PUBLIC_SITE_NAME`
4. Deploy

### Manual (Vercel CLI)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes (for contact form) | Resend API key for sending emails |
| `CONTACT_EMAIL` | Yes (for contact form) | Where contact submissions are sent |
| `NEXT_PUBLIC_SITE_URL` | Yes | Site URL (sitemap, OG images, canonical) |
| `NEXT_PUBLIC_SITE_NAME` | No | Your name/brand name |

## Post-Deployment Checklist

- [ ] Contact form works (test submission)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] OG image renders in social previews
- [ ] 404 page shows for unknown routes
- [ ] All internal links work
- [ ] Lighthouse scores >90 Performance, >95 Accessibility
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode toggle works
