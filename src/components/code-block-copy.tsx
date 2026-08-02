"use client";

import * as React from "react";

const COPY_SVG =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

const CHECK_SVG =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

function CodeBlockCopy({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks = Array.from(container.querySelectorAll<HTMLElement>("pre"));

    blocks.forEach((pre) => {
      if (pre.querySelector(".code-copy-btn")) return;
      pre.classList.add("relative", "group/pre");

      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "code-copy-btn absolute right-2.5 top-2.5 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md bg-secondary/80 text-secondary-foreground shadow-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
      button.setAttribute("aria-label", "Copy code");
      button.innerHTML = COPY_SVG;

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.innerText ?? "";
        try {
          await navigator.clipboard.writeText(code);
        } catch {
          const textarea = document.createElement("textarea");
          textarea.value = code;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
        }
        button.innerHTML = CHECK_SVG;
        button.setAttribute("aria-label", "Copied");
        setTimeout(() => {
          button.innerHTML = COPY_SVG;
          button.setAttribute("aria-label", "Copy code");
        }, 2000);
      });

      pre.appendChild(button);
    });

    return () => {
      blocks.forEach((pre) => {
        pre.querySelector(".code-copy-btn")?.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export { CodeBlockCopy };
