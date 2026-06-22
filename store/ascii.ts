"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ASCII_CONFIG_DEFAULTS, type AsciiConfig } from "@/lib/ascii";

interface AsciiPlaygroundStore {
  config: AsciiConfig;
  imageUrl: string | null;
  fileName: string;
  asciiText: string;
  setConfigValue: <K extends keyof AsciiConfig>(key: K, value: AsciiConfig[K]) => void;
  setImage: (url: string | null, fileName?: string) => void;
  setAsciiText: (text: string) => void;
  reset: () => void;
}

export const useAsciiPlaygroundStore = create<AsciiPlaygroundStore>()(
  persist(
    (set) => ({
      config: { ...ASCII_CONFIG_DEFAULTS },
      imageUrl: null,
      fileName: "",
      asciiText: "",

      setConfigValue: (key, value) =>
        set((state) => ({ config: { ...state.config, [key]: value } })),

      setImage: (url, fileName = "") => set({ imageUrl: url, fileName, asciiText: "" }),

      setAsciiText: (text) => set({ asciiText: text }),

      reset: () => set({ config: { ...ASCII_CONFIG_DEFAULTS } }),
    }),
    {
      name: "forge-ascii-playground",
      version: 1,
      partialize: (state) => ({ config: state.config }),
    },
  ),
);
