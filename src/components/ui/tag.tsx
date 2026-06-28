import * as React from "react";

import { cn } from "@/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

function Tag({ className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Tag };
