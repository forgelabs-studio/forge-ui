'use client'

import {
  MOTION_PRESET_BY_ID,
  MOTION_PROP_DEFAULTS,
  type MotionEase,
  type MotionPresetId,
  type MotionPresetProps,
} from '@/lib/motion'
import { useMotionPlaygroundStore } from '@/store/motion'
import { Grp, Pills, Range, Row, TextInput, Toggle } from '@/components/playground/props/controls'

interface MotionPropsPanelProps {
  activePreset: MotionPresetId
}

const EASES: MotionEase[] = ['linear', 'easeIn', 'easeOut', 'easeInOut']

function numberValue(props: MotionPresetProps, key: string): number {
  return props[key] as number
}

function stringValue(props: MotionPresetProps, key: string): string {
  return props[key] as string
}

function booleanValue(props: MotionPresetProps, key: string): boolean {
  return props[key] as boolean
}

export function MotionPropsPanel({ activePreset }: MotionPropsPanelProps) {
  const { props, setProp, resetPreset } = useMotionPlaygroundStore()
  const meta = MOTION_PRESET_BY_ID[activePreset]
  const p = props[activePreset]
  const defaults = MOTION_PROP_DEFAULTS[activePreset]
  const sp = (key: string, value: MotionPresetProps[string]) => setProp(activePreset, key, value)

  return (
    <aside className="props-col">
      <div className="ph">
        <div>
          <div className="ph-lbl">Props</div>
          <div className="ph-name">{meta.displayName}</div>
        </div>
        <button type="button" className="cli-btn" onClick={() => resetPreset(activePreset)}>
          Reset
        </button>
      </div>

      <div className="ps">
        <Grp title="Preset">
          <p
            style={{
              fontFamily: 'var(--font)',
              fontSize: 12,
              color: 'var(--muted)',
              lineHeight: 1.6,
            }}
          >
            {meta.description}
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(55,138,221,0.08)',
              border: '1px solid rgba(55,138,221,0.18)',
              marginTop: 12,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="rgba(55,138,221,0.7)" strokeWidth="1.4" aria-hidden="true">
              <path d="M5 1L9 3v4L5 9 1 7V3L5 1z" />
            </svg>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(55,138,221,0.7)' }}>
              framer-motion
            </span>
          </div>
        </Grp>

        {'duration' in defaults && (
          <Grp title="Timing">
            <Row label="Duration">
              <Range value={numberValue(p, 'duration')} min={0.1} max={5} step={0.1} onChange={(v) => sp('duration', v)} />
            </Row>
            {'delay' in defaults && (
              <Row label="Delay">
                <Range value={numberValue(p, 'delay')} min={0} max={2} step={0.05} onChange={(v) => sp('delay', v)} />
              </Row>
            )}
            {'ease' in defaults && (
              <Row label="Ease">
                <Pills value={stringValue(p, 'ease')} opts={EASES} onChange={(v) => sp('ease', v)} />
              </Row>
            )}
          </Grp>
        )}

        {('distance' in defaults || 'scale' in defaults || 'speed' in defaults) && (
          <Grp title="Motion">
            {'distance' in defaults && (
              <Row label="Distance">
                <Range value={numberValue(p, 'distance')} min={0} max={120} unit="px" onChange={(v) => sp('distance', v)} />
              </Row>
            )}
            {'scale' in defaults && (
              <Row label="Scale">
                <Range value={numberValue(p, 'scale')} min={0.2} max={2} step={0.05} onChange={(v) => sp('scale', v)} />
              </Row>
            )}
            {'speed' in defaults && activePreset !== 'typewriter' && (
              <Row label="Speed">
                <Range value={numberValue(p, 'speed')} min={0.1} max={1.2} step={0.05} onChange={(v) => sp('speed', v)} />
              </Row>
            )}
          </Grp>
        )}

        {('stiffness' in defaults || 'damping' in defaults || 'staggerDelay' in defaults) && (
          <Grp title="Physics">
            {'stiffness' in defaults && (
              <Row label="Stiffness">
                <Range value={numberValue(p, 'stiffness')} min={100} max={900} step={25} onChange={(v) => sp('stiffness', v)} />
              </Row>
            )}
            {'damping' in defaults && (
              <Row label="Damping">
                <Range value={numberValue(p, 'damping')} min={4} max={40} step={1} onChange={(v) => sp('damping', v)} />
              </Row>
            )}
            {'staggerDelay' in defaults && (
              <Row label="Stagger delay">
                <Range value={numberValue(p, 'staggerDelay')} min={0.02} max={0.5} step={0.01} onChange={(v) => sp('staggerDelay', v)} />
              </Row>
            )}
          </Grp>
        )}

        {activePreset === 'count-up' && (
          <Grp title="Number">
            <Row label="From">
              <Range value={numberValue(p, 'from')} min={0} max={500} step={10} onChange={(v) => sp('from', v)} />
            </Row>
            <Row label="To">
              <Range value={numberValue(p, 'to')} min={0} max={5000} step={25} onChange={(v) => sp('to', v)} />
            </Row>
          </Grp>
        )}

        {activePreset === 'typewriter' && (
          <Grp title="Content">
            <Row label="Text">
              <TextInput value={stringValue(p, 'text')} onChange={(v) => sp('text', v)} />
            </Row>
            <Row label="Speed">
              <Range value={numberValue(p, 'speed')} min={10} max={120} step={5} onChange={(v) => sp('speed', v)} />
            </Row>
          </Grp>
        )}

        {'once' in defaults && (
          <Grp title="Viewport">
            <Row label="Animate once">
              <Toggle value={booleanValue(p, 'once')} onChange={(v) => sp('once', v)} />
            </Row>
          </Grp>
        )}
      </div>
    </aside>
  )
}
