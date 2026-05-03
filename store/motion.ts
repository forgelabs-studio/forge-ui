"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  MOTION_PROP_DEFAULTS,
  type MotionPresetId,
  type MotionPresetProps,
} from "@/lib/motion";

interface MotionPlaygroundStore {
  activePreset: MotionPresetId;
  props: Record<MotionPresetId, MotionPresetProps>;
  setActivePreset: (id: MotionPresetId) => void;
  setProp: (
    presetId: MotionPresetId,
    key: string,
    value: MotionPresetProps[string],
  ) => void;
  resetPreset: (presetId: MotionPresetId) => void;
}

export const useMotionPlaygroundStore = create<MotionPlaygroundStore>()(
  persist(
    (set) => ({
      activePreset: "fade-up",
      props: structuredClone(MOTION_PROP_DEFAULTS),

      setActivePreset: (id) => set({ activePreset: id }),

      setProp: (presetId, key, value) =>
        set((state) => ({
          props: {
            ...state.props,
            [presetId]: {
              ...state.props[presetId],
              [key]: value,
            },
          },
        })),

      resetPreset: (presetId) =>
        set((state) => ({
          props: {
            ...state.props,
            [presetId]: structuredClone(MOTION_PROP_DEFAULTS[presetId]),
          },
        })),
    }),
    {
      name: "forge-motion-playground",
      version: 1,
    },
  ),
);
