"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { SocialLink } from "@/components/cards/social-link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/lib/icons";
import { navItems, socialLinks } from "@/constants";

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
    <footer className="border-t py-14">
      <Container size="xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Link href="/" className="whisper-label text-foreground">
              <span className="flex items-center gap-2">
                <Logo className="h-4 w-4" />
                Arem
              </span>
            </Link>
            <p className="text-[11px] text-muted-foreground/60">
              Built with care. &copy; {new Date().getFullYear()}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
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
        </div>

        <motion.p
          className="mt-10 cursor-pointer text-center text-[11px] text-muted-foreground/50 transition-colors hover:text-muted-foreground sm:text-left"
          onClick={cycle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={line}
              className="inline-block"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
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