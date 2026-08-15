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
      "h-11 w-full border-0 border-b bg-transparent px-0 text-sm transition-colors duration-200",
      "placeholder:text-muted-foreground/50",
      "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary",
      errors[field] ? "border-destructive" : "border-input hover:border-foreground/40"
    );
  }

  const statusBox = cn(
    "flex items-center gap-2 px-4 py-3 text-sm"
  );

  return (
    <section id="contact" className="border-t py-24 md:py-48" aria-labelledby="contact-heading">
      <Container size="lg">
        <div className="grid gap-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:col-start-1">
            <FadeIn from="left">
              <SectionTitle
                label="Contact"
                title="Get in touch."
                description="Email is the reliable channel. X works if you are already there."
                folio="08"
              />

              <div className="mt-16 space-y-6">
                <p className="flex items-center gap-3 text-xs text-muted-foreground sm:text-[13px]">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Based in Nigeria. Replies within a day or two.
                </p>

                <a
                  href="mailto:toromadeadesina@gmail.com"
                  className="group flex items-center gap-3 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-[13px]"
                  aria-label="Send email to toromadeadesina@gmail.com"
                >
                  <Mail
                    className="h-4 w-4 text-muted-foreground/60 transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                  <span className="border-b border-transparent transition-colors group-hover:border-primary">
                    toromadeadesina@gmail.com
                  </span>
                </a>

                <div className="flex items-center gap-1 pt-3" role="list" aria-label="Social media links">
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
          </div>

          <FadeIn from="right" delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-11"
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
                <label htmlFor="contact-name" className="flex text-xs font-medium">
                  Name <span className="ml-1 text-primary">*</span>
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
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-email" className="flex text-xs font-medium">
                  Email <span className="ml-1 text-primary">*</span>
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
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="flex text-xs font-medium">
                  Subject <span className="ml-1 text-primary">*</span>
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
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {errors.subject.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="flex text-xs font-medium">
                  Message <span className="ml-1 text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Tell me about your project"
                  rows={4}
                  className={cn(inputClasses("message"), "h-auto min-h-[96px] resize-y")}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  {...register("message")}
                />
                {errors.message && (
                  <motion.p
                    id="contact-message-error"
                    className="text-xs text-destructive"
                    role="alert"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full rounded-lg transition-colors duration-300 hover:bg-primary/90"
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

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    className={cn(statusBox, "border border-primary/30 bg-primary/10 text-foreground")}
                    role="alert"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    Message sent. I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    className={cn(statusBox, "border border-destructive/30 bg-destructive/10 text-destructive")}
                    role="alert"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export { ContactSection };