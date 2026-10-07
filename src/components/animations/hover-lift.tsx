"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverLiftProps extends Omit<HTMLMotionProps<"div">, "whileHover" | "whileTap"> {
  children: React.ReactNode;
  lift?: number;
  scale?: number;
}

export function HoverLift({
  children,
  className,
  lift = -8,
  scale = 1.02,
  ...props
}: HoverLiftProps) {
  return (
    <motion.div
      className={cn("transition-shadow duration-300", className)}
      whileHover={{ y: lift, scale, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}