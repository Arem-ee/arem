import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return null;
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: SPOTIFY_REFRESH_TOKEN,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function GET() {
  const token = await getAccessToken();

  if (!token) {
    return NextResponse.json({ playing: false, configured: false });
  }

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (res.status === 204 || res.status === 404) {
    return NextResponse.json({ playing: false, configured: true });
  }

  if (!res.ok) {
    return NextResponse.json({ playing: false, configured: false });
  }

  const data = (await res.json()) as {
    is_playing?: boolean;
    item?: {
      name?: string;
      artists?: { name?: string }[];
      album?: { name?: string; images?: { url?: string }[] };
      duration_ms?: number;
    };
    progress_ms?: number;
  };

  const album = data.item?.album;
  const cover = album?.images?.[0]?.url ?? null;

  return NextResponse.json({
    playing: data.is_playing ?? false,
    configured: true,
    track: data.item?.name ?? null,
    artist: data.item?.artists?.[0]?.name ?? null,
    album: album?.name ?? null,
    cover,
    durationMs: data.item?.duration_ms ?? 0,
    progressMs: data.progress_ms ?? 0,
  });
}
