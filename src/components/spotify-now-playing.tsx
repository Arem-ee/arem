"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music2, Play, Pause } from "lucide-react";

const DEFAULT_TRACK = {
  track: "Billie Jean",
  artist: "Michael Jackson",
  album: "Thriller",
  cover:
    "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg",
  previewUrl:
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/dc/bc/8a/dcbc8a3e-4ce1-c00d-cc02-eda2212053c7/mzaf_8347559338388601510.plus.aac.p.m4a",
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

function DefaultTrackCard() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentMs, setCurrentMs] = React.useState(0);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentMs(audio.currentTime * 1000);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setCurrentMs(0);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const progress = Math.min(100, (currentMs / DEFAULT_TRACK.durationMs) * 100);

  return (
    <div className="flex w-full items-center gap-4">
      <button
        type="button"
        onClick={togglePlay}
        className="group relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-lg"
        aria-label={playing ? "Pause Billie Jean" : "Play Billie Jean"}
      >
        <Image
          src={DEFAULT_TRACK.cover}
          alt={`${DEFAULT_TRACK.album} cover`}
          fill
          className="object-cover"
          sizes="56px"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
          {playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 fill-current" />
          )}
        </span>
      </button>
      <audio ref={audioRef} src={DEFAULT_TRACK.previewUrl} preload="none" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-emerald-500">
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          Now playing
        </div>
        <p className="truncate text-sm font-semibold">{DEFAULT_TRACK.track}</p>
        <p className="truncate text-xs text-muted-foreground">
          {DEFAULT_TRACK.artist}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-emerald-500/70"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
          </div>
          <span className="text-[10px] tabular-nums text-muted-foreground">
            {formatTime(currentMs)}
          </span>
        </div>
      </div>
    </div>
  );
}

function TrackCard({
  track,
  artist,
  album,
  cover,
  progressMs,
  durationMs,
}: {
  track: string;
  artist: string;
  album: string;
  cover: string;
  progressMs: number;
  durationMs: number;
}) {
  const liveWidth = Math.min(100, (progressMs / durationMs) * 100);

  return (
    <a
      href="https://open.spotify.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-4"
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
            <motion.div
              className="h-full bg-foreground/60"
              initial={{ width: 0 }}
              animate={{ width: `${liveWidth}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="text-[10px] tabular-nums text-muted-foreground">
            {formatTime(progressMs)}
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
        <DefaultTrackCard />
      )}
    </motion.div>
  );
}

export { SpotifyNowPlaying };
