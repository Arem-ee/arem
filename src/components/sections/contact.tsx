"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { SocialLink } from "@/components/cards/social-link";
import { FadeIn } from "@/components/animations";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/lib/icons";
import { socialLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useAnalyticsStore } from "@/stores/analytics-store";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactSection() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const track = useAnalyticsStore((s) => s.track);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Something went wrong");
      }

      setStatus("success");
      track({ type: "contact_submit", payload: { subject: data.subject } });
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message"
      );
    }
  }

  function inputClasses(field: keyof ContactFormData) {
    return cn(
      "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      errors[field]
        ? "border-destructive"
        : "border-input hover:border-foreground/40"
    );
  }

  return (
    <section id="contact" className="border-t py-24 md:py-32" aria-labelledby="contact-heading">
      <Container size="md">
        <div className="grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <SectionTitle
              label="Contact"
              title="Let&apos;s build something."
              description="Whether you have a project in mind or just want to say hello, I&apos;d love to hear from you."
            />

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for freelance and full-time opportunities
              </div>

              <a
                href="mailto:toromadeadesina@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Send email to toromadeadesina@gmail.com"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                toromadeadesina@gmail.com
              </a>

              <div className="flex items-center gap-1 pt-2" role="list" aria-label="Social media links">
                <SocialLink
                  href={socialLinks.github}
                  label="GitHub"
                  icon={<GitHubIcon className="h-4 w-4" aria-hidden="true" />}
                />
                <SocialLink
                  href={socialLinks.linkedin}
                  label="LinkedIn"
                  icon={<LinkedInIcon className="h-4 w-4" aria-hidden="true" />}
                />
                <SocialLink
                  href={socialLinks.twitter}
                  label="Twitter"
                  icon={<TwitterIcon className="h-4 w-4" aria-hidden="true" />}
                />
              </div>
            </div>
          </FadeIn>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
            aria-label="Contact form"
          >
            <input
              type="text"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              {...register("website")}
            />

            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-medium">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                className={inputClasses("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                {...register("name")}
              />
              {errors.name && (
                <motion.p
                  id="contact-name-error"
                  className="text-xs text-destructive"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                className={inputClasses("email")}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <motion.p
                  id="contact-email-error"
                  className="text-xs text-destructive"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-subject" className="text-sm font-medium">
                Subject <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                placeholder="What is this about?"
                className={inputClasses("subject")}
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                {...register("subject")}
              />
              {errors.subject && (
                <motion.p
                  id="contact-subject-error"
                  className="text-xs text-destructive"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.subject.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium">
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="contact-message"
                placeholder="Tell me about your project..."
                rows={5}
                className={cn(inputClasses("message"), "h-auto min-h-[100px] resize-y")}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                {...register("message")}
              />
              {errors.message && (
                <motion.p
                  id="contact-message-error"
                  className="text-xs text-destructive"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            <motion.div
              whileHover={status === "idle" ? { scale: 1.01 } : undefined}
              whileTap={status === "idle" ? { scale: 0.99 } : undefined}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "loading"}
                aria-label={status === "loading" ? "Sending message..." : "Send message"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </motion.div>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </Container>
    </section>
  );
}

export { ContactSection };
