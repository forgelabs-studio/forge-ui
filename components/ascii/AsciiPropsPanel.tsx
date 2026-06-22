'use client'

import {
  ADVANCED_ANIMATIONS,
  ANIMATIONS,
  CHARACTER_SET_BY_ID,
  isAdvancedAnimation,
  type AdvancedAnimationId,
  type AnimationId,
} from '@/lib/ascii'
import { useAsciiPlaygroundStore } from '@/store/ascii'
import { Grp, OptsGrid, Range, Row, Swatches } from '@/components/playground/props/controls'

export function AsciiPropsPanel() {
  const { config, fileName, setConfigValue, reset } = useAsciiPlaygroundStore()
  const activeSet = CHARACTER_SET_BY_ID[config.characterSet]

  const cssOpts = ['None', ...ANIMATIONS.map((a) => a.name)]
  const advancedOpts = ['None', ...ADVANCED_ANIMATIONS.map((a) => a.name)]

  const activeCssLabel =
    config.animation && !isAdvancedAnimation(config.animation)
      ? ANIMATIONS.find((a) => a.id === config.animation)?.name ?? 'None'
      : 'None'

  const activeAdvancedLabel =
    config.animation && isAdvancedAnimation(config.animation)
      ? ADVANCED_ANIMATIONS.find((a) => a.id === config.animation)?.name ?? 'None'
      : 'None'

  function onCssSelect(label: string) {
    if (label === 'None') {
      setConfigValue('animation', null)
      return
    }
    const match = ANIMATIONS.find((a) => a.name === label)
    if (match) setConfigValue('animation', match.id as AnimationId)
  }

  function onAdvancedSelect(label: string) {
    if (label === 'None') {
      setConfigValue('animation', null)
      return
    }
    const match = ADVANCED_ANIMATIONS.find((a) => a.name === label)
    if (match) setConfigValue('animation', match.id as AdvancedAnimationId)
  }

  return (
    <aside className="props-col">
      <div className="ph">
        <div>
          <div className="ph-lbl">Props</div>
          <div className="ph-name">{fileName || 'FORGE.ascii'}</div>
        </div>
        <button type="button" className="cli-btn" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="ps">
        <Grp title="Character set">
          <p style={{ fontFamily: 'var(--font)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
            {activeSet.name} — {activeSet.description}
          </p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--hint)', marginTop: 8, letterSpacing: '0.08em' }}>
            {activeSet.ramp}
          </p>
        </Grp>

        <Grp title="Density">
          <Row label="Columns">
            <Range value={config.density} min={1} max={200} onChange={(v) => setConfigValue('density', v)} />
          </Row>
        </Grp>

        <Grp title="Colour">
          <Row label="Character colour">
            <Swatches value={config.colour} onChange={(v) => setConfigValue('colour', v)} />
          </Row>
        </Grp>

        <Grp title="Animation">
          <Row label="CSS">
            <OptsGrid value={activeCssLabel} opts={cssOpts} onChange={onCssSelect} />
          </Row>
          <Row label="Advanced">
            <OptsGrid value={activeAdvancedLabel} opts={advancedOpts} onChange={onAdvancedSelect} />
          </Row>
          {config.animation && (
            <Row label="Duration">
              <Range value={config.duration} min={200} max={4000} step={100} unit="ms" onChange={(v) => setConfigValue('duration', v)} />
            </Row>
          )}
        </Grp>
      </div>
    </aside>
  )
}
