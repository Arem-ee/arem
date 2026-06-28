"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SocialLink } from "@/components/cards/social-link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/lib/icons";
import { navItems, siteConfig, socialLinks } from "@/constants";

function FooterSection() {
  return (
    <footer className="border-t py-12">
      <Container size="xl">
        <motion.div
          className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              Built with care. &copy; {new Date().getFullYear()}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <SocialLink
              href={socialLinks.github}
              label="GitHub"
              icon={<GitHubIcon className="h-4 w-4" />}
            />
            <SocialLink
              href={socialLinks.linkedin}
              label="LinkedIn"
              icon={<LinkedInIcon className="h-4 w-4" />}
            />
            <SocialLink
              href={socialLinks.twitter}
              label="Twitter"
              icon={<TwitterIcon className="h-4 w-4" />}
            />
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-center text-xs text-muted-foreground/60 sm:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Crafting systems that scale, one commit at a time.
        </motion.p>
      </Container>
    </footer>
  );
}

export { FooterSection };
