"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

const FALLING_SPEED = 2.5;

const palette = ["#8b5cf6", "#06b6d4", "#f59e0b", "#ec4899", "#22c55e"];

interface FallingBlock {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  color: string;
}

function NotFoundGame() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const scoreRef = React.useRef(0);
  const playerRef = React.useRef({ x: 0, y: 0, size: 16 });
  const keysRef = React.useRef<Set<string>>(new Set());
  const rafRef = React.useRef<number>(0);
  const lastSpawnRef = React.useRef(0);
  const blocksRef = React.useRef<FallingBlock[]>([]);

  const start = React.useCallback(() => {
    setRunning(true);
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;
    blocksRef.current = [];
    lastSpawnRef.current = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = Math.min(420, canvas.clientWidth);
    canvas.height = 300;
    playerRef.current = {
      x: canvas.width / 2,
      y: canvas.height - 30,
      size: 14,
    };
  }, []);

  const reset = React.useCallback(() => {
    setRunning(false);
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;
    blocksRef.current = [];
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
      }
      keysRef.current.add(e.key.toLowerCase());
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !running) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spawn = () => {
      const now = performance.now();
      if (now - lastSpawnRef.current < 700) return;
      lastSpawnRef.current = now;
      const w = 10 + Math.random() * 22;
      blocksRef.current.push({
        x: Math.random() * (canvas!.width - w),
        y: -20,
        w,
        h: 10 + Math.random() * 12,
        speed: FALLING_SPEED + Math.random() * 2.5,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    };

    const frame = (_t: number) => {
      const player = playerRef.current;
      const speed = 3.2;

      if (keysRef.current.has("arrowleft") || keysRef.current.has("a")) {
        player.x -= speed;
      }
      if (keysRef.current.has("arrowright") || keysRef.current.has("d")) {
        player.x += speed;
      }
      if (keysRef.current.has("arrowup") || keysRef.current.has("w")) {
        player.y -= speed;
      }
      if (keysRef.current.has("arrowdown") || keysRef.current.has("s")) {
        player.y += speed;
      }

      player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
      player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));

      spawn();

      const blocks = blocksRef.current;
      for (const block of blocks) {
        block.y += block.speed;
        if (
          player.x < block.x + block.w &&
          player.x + player.size > block.x &&
          player.y < block.y + block.h &&
          player.y + player.size > block.y
        ) {
          cancelAnimationFrame(rafRef.current);
          setRunning(false);
          setGameOver(true);
          return;
        }
      }
      blocksRef.current = blocks.filter((b) => b.y < canvas.height + 20);

      scoreRef.current += 1;
      setScore(scoreRef.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const block of blocksRef.current) {
        ctx.fillStyle = block.color;
        ctx.beginPath();
        ctx.roundRect(block.x, block.y, block.w, block.h, 4);
        ctx.fill();
      }

      ctx.fillStyle = getComputedStyle(canvas).color;
      ctx.shadowColor = "currentColor";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(player.x + player.size / 2, player.y + player.size / 2, player.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <canvas
        ref={canvasRef}
        className="w-full rounded-xl border bg-muted/40"
        style={{ color: "var(--foreground)" }}
        aria-label="Dodge game canvas"
      />

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground/80">
          {gameOver ? (
            <span className="text-destructive">Game over! You dodged for {Math.floor(score / 30)}s.</span>
          ) : running ? (
            <span>Survive: {Math.floor(score / 30)}s</span>
          ) : (
            <span>Dodge the blocks — arrow keys / WASD</span>
          )}
        </span>
        {gameOver ? (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Play again
          </button>
        ) : (
          <button
            onClick={running ? reset : start}
            className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            {running ? "Reset" : "Start game"}
          </button>
        )}
      </div>
    </div>
  );
}

export { NotFoundGame };
