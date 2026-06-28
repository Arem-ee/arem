import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  isContactModalOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setContactModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isContactModalOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setContactModalOpen: (open) => set({ isContactModalOpen: open }),
}));
