import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  date: string;
  readingTime: string;
  summary: string;
}

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function ArticleCard({
  title,
  date,
  readingTime,
  summary,
  className,
  ...props
}: ArticleCardProps) {
  return (
    <div
      className={cn(
        "group cursor-pointer rounded-xl border bg-card p-6 shadow-sm transition-colors hover:border-foreground/20",
        className
      )}
      {...props}
    >
      <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{formatDisplayDate(date)}</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
        <span>{readingTime}</span>
      </div>
      <div className="mb-2 flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold group-hover:text-foreground/80">
          {title}
        </h3>
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {summary}
      </p>
    </div>
  );
}

export { ArticleCard };
