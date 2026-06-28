import { create } from "zustand";
import type { AnalyticsEvent } from "@/types";

interface AnalyticsState {
  events: AnalyticsEvent[];
  track: (event: Omit<AnalyticsEvent, "timestamp">) => void;
  flush: () => AnalyticsEvent[];
  clear: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  events: [],
  track: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, timestamp: Date.now() }],
    })),
  flush: () => {
    const events = get().events;
    set({ events: [] });
    return events;
  },
  clear: () => set({ events: [] }),
}));
