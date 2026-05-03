'use client'

import { MotionCanvas } from '@/components/motion/MotionCanvas'
import { MotionPropsPanel } from '@/components/motion/MotionPropsPanel'
import { MotionSidebar } from '@/components/motion/MotionSidebar'
import { useMotionPlaygroundStore } from '@/store/motion'

export function MotionPlaygroundLayout() {
  const { activePreset, props, setActivePreset } = useMotionPlaygroundStore()
  const activeProps = props[activePreset]

  return (
    <div className="playground">
      <MotionSidebar activePreset={activePreset} onPresetChange={setActivePreset} />
      <MotionCanvas activePreset={activePreset} props={activeProps} />
      <MotionPropsPanel activePreset={activePreset} />
    </div>
  )
}
