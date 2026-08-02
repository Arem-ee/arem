"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music2, Pause } from "lucide-react";

interface NowPlayingState {
  playing: boolean;
  configured: boolean;
  track?: string | null;
  artist?: string | null;
  album?: string | null;
  cover?: string | null;
  durationMs?: number;
  progressMs?: number;
}

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function SpotifyNowPlaying() {
  const [state, setState] = React.useState<NowPlayingState | null>(null);

  React.useEffect(() => {
    let active = true;

    const fetchState = async () => {
      try {
        const res = await fetch("/api/spotify", { cache: "no-store" });
        if (!res.ok) return;
        const data: NowPlayingState = await res.json();
        if (active) setState(data);
      } catch {
        // network hiccup — leave the fallback state
      }
    };

    fetchState();
    const interval = setInterval(fetchState, 30_000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const isLoading = state === null;
  const isConfigured = state?.configured;
  const nowPlaying = state?.playing && state?.track;

  return (
    <motion.div
      className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 animate-pulse rounded-lg bg-secondary" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 animate-pulse rounded bg-secondary" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      ) : nowPlaying && state.cover ? (
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4"
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={state.cover}
              alt={`${state.album ?? "Album"} cover`}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-emerald-500">
              <motion.span
                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              Now playing
            </div>
            <p className="truncate text-sm font-semibold group-hover:underline">
              {state.track}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {state.artist}
            </p>
            {state.durationMs ? (
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full bg-foreground/60"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        100,
                        ((state.progressMs ?? 0) / state.durationMs) * 100
                      )}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {formatTime(state.progressMs ?? 0)}
                </span>
              </div>
            ) : null}
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Music2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {isConfigured ? (
                <>
                  <Pause className="h-3 w-3" />
                  Paused
                </>
              ) : (
                <>
                  <Music2 className="h-3 w-3" />
                  On the playlist
                </>
              )}
            </div>
            <p className="text-sm font-semibold">
              {isConfigured
                ? "Nothing playing right now"
                : "Afrobeats, lo-fi & clean code"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isConfigured
                ? "Usually Afrobeats on repeat."
                : "The soundtrack to the shipping."}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export { SpotifyNowPlaying };
