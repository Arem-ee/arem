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
          <span className="h-2 w-2 bg-primary" aria-hidden="true" />
          <span className="whisper-label">{label}</span>
        </div>
      )}
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-sm leading-[1.8] text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionTitle };