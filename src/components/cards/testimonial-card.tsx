import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  avatar: string;
  review: string;
}

function TestimonialCard({
  name,
  role,
  avatar,
  review,
  className,
  ...props
}: TestimonialCardProps) {
  const [imgFailed, setImgFailed] = React.useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
          {avatar && !imgFailed ? (
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span>{name.charAt(0)}</span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <blockquote className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{review}&rdquo;
      </blockquote>
    </div>
  );
}

export { TestimonialCard };
