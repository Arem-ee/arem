"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SocialLink } from "@/components/cards/social-link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/lib/icons";
import { navItems, siteConfig, socialLinks } from "@/constants";

const microcopy = [
  "The status labels above are current as of the last commit.",
  "Mostly built on Sundays, when the campus network is quiet.",
  "Powered by Afrobeats and a reliable sleep schedule.",
  "Typed in VS Code, edited with intent, shipped with care.",
  "The 404 page is a dodge game. It was not a deliberate feature.",
];

function FooterSection() {
  const [line, setLine] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(
      () => setLine(Math.floor(Math.random() * microcopy.length)),
      0
    );
    return () => clearTimeout(timer);
  }, []);

  const cycle = () => setLine((l) => (l + 1) % microcopy.length);

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
          className="mt-8 cursor-pointer text-center text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground sm:text-left"
          onClick={cycle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={line}
              className="inline-block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {microcopy[line]}
            </motion.span>
          </AnimatePresence>
        </motion.p>
      </Container>
    </footer>
  );
}

export { FooterSection };
