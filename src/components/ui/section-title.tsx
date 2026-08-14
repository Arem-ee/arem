import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

function SectionTitle({
  label,
  title,
  description,
  align = "left",
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
      {label && (
        <span className="whisper-label inline-flex items-center gap-3">
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-[2.5rem] sm:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionTitle };