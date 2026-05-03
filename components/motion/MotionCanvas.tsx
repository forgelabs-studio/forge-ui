'use client'

import type { MotionPresetId } from '@/components/motion/MotionPlaygroundLayout'

interface MotionCanvasProps {
  activePreset: MotionPresetId
}

export function MotionCanvas({ activePreset }: MotionCanvasProps) {
  return (
    <div className="centre">
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontFamily: 'var(--font)',
          fontSize: '13px',
        }}
      >
        {activePreset} preview
      </div>
    </div>
  )
}
