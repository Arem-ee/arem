import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ExperienceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  role: string;
  company: string;
  duration: string;
  summary: string;
  achievements: string[];
}

function ExperienceCard({
  role,
  company,
  duration,
  summary,
  achievements,
  className,
  ...props
}: ExperienceCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card p-6 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{role}</h3>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
        <Badge variant="secondary" className="w-fit shrink-0">
          {duration}
        </Badge>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {summary}
      </p>
      <ul className="space-y-2">
        {achievements.map((achievement, i) => (
          <li key={i} className="flex gap-2 text-sm">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
            <span className="text-muted-foreground">{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ExperienceCard };
