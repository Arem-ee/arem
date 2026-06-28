import * as React from "react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";

interface SkillCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string;
  skills: string[];
}

function SkillCard({
  category,
  skills,
  className,
  ...props
}: SkillCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 shadow-sm",
        className
      )}
      {...props}
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>
    </div>
  );
}

export { SkillCard };
