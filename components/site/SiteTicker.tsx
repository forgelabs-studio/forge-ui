import { ForgeTicker } from '@/components/forge/ForgeTicker'

const TICKER_ITEMS = [
  'ForgeButton',
  'ForgeCard',
  'ForgeInput',
  'ForgeBadge',
  'ForgeToggle',
  'ForgeSelect',
  'ForgeSlider',
  'ForgeSpinner',
  'ForgeMorphBlob',
  'ForgeCountUp',
  'ForgeToast',
  'ForgeModal',
  'ForgeAccordion',
  'ForgeStepper',
  'ForgeTable',
  'ForgeBarChart',
  'ForgeLineChart',
  'ForgeDonut',
]

export default function SiteTicker() {
  return (
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: '12px 0',
      }}
    >
      <ForgeTicker
        items={TICKER_ITEMS}
        color="var(--purple)"
        speed="slow"
        separator="·"
        gap={56}
        pauseOnHover={false}
      />
    </div>
  )
}
