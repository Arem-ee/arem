import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SocialLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function SocialLink({
  href,
  label,
  icon,
  className,
  ...props
}: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      aria-label={label}
      {...props}
    >
      {icon}
    </Link>
  );
}

export { SocialLink };
