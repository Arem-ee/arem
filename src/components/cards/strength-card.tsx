import * as React from "react";
import { cn } from "@/lib/utils";

interface StrengthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function StrengthCard({
  title,
  description,
  icon,
  className,
  ...props
}: StrengthCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl border bg-card p-6 shadow-sm transition-colors hover:border-foreground/20",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export { StrengthCard };
