import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
}

function StatCard({ value, label, className, ...props }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl border bg-card p-6 text-center shadow-sm",
        className
      )}
      {...props}
    >
      <span className="text-3xl font-bold tracking-tight">{value}</span>
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export { StatCard };
