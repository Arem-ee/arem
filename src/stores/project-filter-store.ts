import { create } from "zustand";
import type { ProjectCategory } from "@/types";

interface ProjectFilterState {
  search: string;
  category: ProjectCategory | "All";
  sort: "recent" | "popular" | "featured";
  setSearch: (search: string) => void;
  setCategory: (category: ProjectCategory | "All") => void;
  setSort: (sort: "recent" | "popular" | "featured") => void;
  reset: () => void;
}

export const useProjectFilterStore = create<ProjectFilterState>((set) => ({
  search: "",
  category: "All",
  sort: "recent",
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
  reset: () => set({ search: "", category: "All", sort: "recent" }),
}));
