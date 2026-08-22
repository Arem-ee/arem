import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionTitleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  label?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "on-primary";
}

function SectionTitle({
  label,
  title,
  description,
  align = "left",
  tone = "default",
  className,
  ...props
}: SectionTitleProps) {
  const onPrimary = tone === "on-primary";

  return (
    <div
      className={cn(
        "max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...props}
    >
      {label && (
        <div
          className={cn(
            "flex items-center gap-2.5",
            align === "center" && "justify-center"
          )}
        >
          <span
            className={cn(
              "h-2 w-2",
              onPrimary ? "bg-[#0a0a0a]" : "bg-primary"
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "whisper-label",
              onPrimary && "text-[#0a0a0a]/70"
            )}
          >
            {label}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "text-xl font-semibold tracking-tight sm:text-2xl",
          onPrimary ? "text-[#0a0a0a]" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-sm leading-[1.8]",
            onPrimary ? "text-[#0a0a0a]/60" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionTitle };