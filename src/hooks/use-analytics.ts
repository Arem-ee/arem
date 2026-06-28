"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useAnalyticsStore } from "@/stores/analytics-store";

export function useAnalytics() {
  const pathname = usePathname();
  const track = useAnalyticsStore((s) => s.track);

  React.useEffect(() => {
    track({ type: "page_view", payload: { path: pathname } });
  }, [pathname, track]);

  return { track };
}

export function useTrackProjectView() {
  const track = useAnalyticsStore((s) => s.track);
  return React.useCallback(
    (slug: string) => track({ type: "project_view", payload: { slug } }),
    [track]
  );
}

export function useTrackArticleRead() {
  const track = useAnalyticsStore((s) => s.track);
  return React.useCallback(
    (slug: string) => track({ type: "article_read", payload: { slug } }),
    [track]
  );
}

export function useTrackResumeDownload() {
  const track = useAnalyticsStore((s) => s.track);
  return React.useCallback(
    () => track({ type: "resume_download", payload: { timestamp: Date.now() } }),
    [track]
  );
}
