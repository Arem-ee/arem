"use client";

import { motion } from "framer-motion";

interface AnnotationLineProps {
  label: string;
  align?: "left" | "right";
  className?: string;
}

function AnnotationLine({
  label,
  align = "left",
  className = "",
}: AnnotationLineProps) {
  const isRight = align === "right";

  const line = (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`h-px w-20 bg-foreground/40 md:w-28 ${
        isRight ? "origin-right" : "origin-left"
      }`}
      aria-hidden="true"
    />
  );

  const labelEl = <span className="pill-label">{label}</span>;
  const dot = (
    <span
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
      aria-hidden="true"
    />
  );

  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      aria-hidden="true"
    >
      {isRight ? (
        <>
          {line}
          {labelEl}
          {dot}
        </>
      ) : (
        <>
          {dot}
          {labelEl}
          {line}
        </>
      )}
    </div>
  );
}

export { AnnotationLine };