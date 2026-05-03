'use client'

import type { MotionPresetId } from '@/components/motion/MotionPlaygroundLayout'

interface MotionPropsPanelProps {
  activePreset: MotionPresetId
}

export function MotionPropsPanel({ activePreset }: MotionPropsPanelProps) {
  return (
    <aside
      style={{
        borderLeft: '1px solid var(--line)',
        padding: '16px',
        overflowY: 'auto',
        color: 'var(--muted)',
        fontFamily: 'var(--font)',
        fontSize: '13px',
      }}
    >
      {activePreset} props
    </aside>
  )
}
