"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

const DEFAULT_TRACK = {
  track: "Billie Jean",
  artist: "Michael Jackson",
  album: "Thriller",
  cover:
    "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg",
  durationMs: 293802,
};

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

function TrackCard({
  track,
  artist,
  album,
  cover,
  progressMs,
  durationMs,
  looping = false,
}: {
  track: string;
  artist: string;
  album: string;
  cover: string;
  progressMs: number;
  durationMs: number;
  looping?: boolean;
}) {
  const liveWidth = Math.min(100, (progressMs / durationMs) * 100);

  return (
    <a
      href="https://open.spotify.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={cover}
          alt={`${album} cover`}
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
          {track}
        </p>
        <p className="truncate text-xs text-muted-foreground">{artist}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
            {looping ? (
              <motion.div
                className="h-full bg-emerald-500/70"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ) : (
              <motion.div
                className="h-full bg-foreground/60"
                initial={{ width: 0 }}
                animate={{ width: `${liveWidth}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            )}
          </div>
          <span className="text-[10px] tabular-nums text-muted-foreground">
            {formatTime(looping ? 0 : progressMs)}
          </span>
        </div>
      </div>
    </a>
  );
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
        // network hiccup - leave the fallback state
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
      ) : state?.playing && state.track && state.cover ? (
        <TrackCard
          track={state.track}
          artist={state.artist ?? ""}
          album={state.album ?? "Album"}
          cover={state.cover}
          progressMs={state.progressMs ?? 0}
          durationMs={state.durationMs ?? 1}
        />
      ) : state?.configured ? (
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Music2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Music2 className="h-3 w-3" />
              Paused
            </div>
            <p className="text-sm font-semibold">Nothing playing right now</p>
            <p className="text-xs text-muted-foreground">
              Usually Afrobeats on repeat.
            </p>
          </div>
        </div>
      ) : (
        <TrackCard
          track={DEFAULT_TRACK.track}
          artist={DEFAULT_TRACK.artist}
          album={DEFAULT_TRACK.album}
          cover={DEFAULT_TRACK.cover}
          progressMs={0}
          durationMs={DEFAULT_TRACK.durationMs}
          looping
        />
      )}
    </motion.div>
  );
}

export { SpotifyNowPlaying };
