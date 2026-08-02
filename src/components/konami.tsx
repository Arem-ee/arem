"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

function Konami() {
  const [pressed, setPressed] = React.useState(0);
  const [toastVisible, setToastVisible] = React.useState(false);

  const trigger = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
      zIndex: 9999,
    });
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.4, x: 0.2 },
      zIndex: 9999,
      colors: ["#8b5cf6", "#06b6d4", "#f59e0b"],
    });
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.4, x: 0.8 },
      zIndex: 9999,
      colors: ["#ec4899", "#22c55e", "#eab308"],
    });
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (SEQUENCE[pressed] === key) {
        const next = pressed + 1;
        setPressed(next);
        if (next === SEQUENCE.length) {
          setPressed(0);
          trigger();
        }
      } else {
        setPressed(key === "arrowup" ? 1 : 0);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pressed]);

  return (
    <AnimatePresence>
      {toastVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium shadow-lg">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Cheat code accepted – dev powers restored.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Konami };
