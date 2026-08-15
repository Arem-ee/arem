import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  folio?: string;
}

function SectionTitle({
  label,
  title,
  description,
  align = "left",
  folio,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-5",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-8">
        <div className="space-y-6">
          {label && <span className="whisper-label block">{label}</span>}
          <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-foreground sm:text-[2.5rem] sm:leading-[1.12]">
            {title}
          </h2>
        </div>
        {folio && (
          <span className="whisper-label hidden shrink-0 pt-1 text-muted-foreground/40 sm:block">
            {folio}
          </span>
        )}
      </div>
      {description && (
        <p className="max-w-xl text-[13px] leading-[1.8] text-muted-foreground sm:text-sm">
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionTitle };