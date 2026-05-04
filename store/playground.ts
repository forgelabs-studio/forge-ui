"use client";
import { create } from "zustand";
import { PROP_DEFAULTS } from "@/lib/prop-defaults";
import type { ComponentProps } from "@/lib/types";
import type { ComponentId } from "@/lib/registry";
import { persist } from "zustand/middleware";

export type CanvasMode = "c-grid" | "c-dots" | "c-dark";
export type RadiusScale = "sharp" | "default" | "rounded";

interface PlaygroundStore {
  activeComponent: ComponentId;
  props: Record<ComponentId, ComponentProps>;
  canvasMode: CanvasMode;
  globalFont: string;
  globalTextColor: string;
  globalRadius: RadiusScale;
  setActiveComponent: (id: ComponentId) => void;
  setProp: (
    componentId: ComponentId,
    key: string,
    value: ComponentProps[string],
  ) => void;
  setCanvasMode: (mode: CanvasMode) => void;
  setGlobalFont: (font: string) => void;
  setGlobalTextColor: (color: string) => void;
  setGlobalRadius: (r: RadiusScale) => void;
  resetComponent: (componentId: ComponentId) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>()(
  persist(
    (set) => ({
      activeComponent: "button",
      props: structuredClone(PROP_DEFAULTS),
      canvasMode: "c-grid",
      globalFont: "Inter",
      globalTextColor: "#f0ede8",
      globalRadius: "default",

      setActiveComponent: (id) => set({ activeComponent: id }),

      setProp: (componentId, key, value) =>
        set((state) => ({
          props: {
            ...state.props,
            [componentId]: {
              ...state.props[componentId],
              [key]: value,
            },
          },
        })),

      setCanvasMode: (mode) => set({ canvasMode: mode }),
      setGlobalFont: (font) => set({ globalFont: font }),
      setGlobalTextColor: (color) => set({ globalTextColor: color }),
      setGlobalRadius: (r) => set({ globalRadius: r }),

      resetComponent: (componentId) =>
        set((state) => ({
          props: {
            ...state.props,
            [componentId]: structuredClone(PROP_DEFAULTS[componentId] ?? {}),
          },
        })),
    }),
    {
      name: "forge-playground",
    },
  ),
);
