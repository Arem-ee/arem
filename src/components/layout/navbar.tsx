"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useMotionValueEvent } from "framer-motion";

import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { navItems, socialLinks } from "@/constants";

function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-primary" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [avatarVisible, setAvatarVisible] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
    setAvatarVisible(latest > 140);
  });

  const linkClasses = cn(
    "text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground",
    "transition-colors duration-200 hover:text-foreground"
  );

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      role="banner"
    >
      <Container as="nav" size="xl" aria-label="Main navigation">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="relative" aria-label="Home">
            <span className="whisper-label">Arem</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  linkClasses,
                  "relative pb-0.5 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
            </motion.a>
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
            </motion.a>
            <ThemeToggle />
            <Link
              href="/resume"
              className="whisper-label rounded-md border border-border px-3 py-1.5 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Resume
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="absolute left-0 right-0 top-full max-h-[calc(100svh-3.5rem)] overflow-y-auto border-b bg-background/95 backdrop-blur-md md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Container size="xl">
              <nav className="flex flex-col gap-1 py-6" aria-label="Mobile">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="py-2 font-display text-xl font-medium tracking-tight text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6 flex items-center gap-5 border-t pt-6">
                  <Link
                    href="/resume"
                    className="whisper-label text-foreground underline decoration-border underline-offset-4"
                  >
                    Resume
                  </Link>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="GitHub"
                  >
                    <GitHubIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export { Navbar };