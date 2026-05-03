import { ForgeButton } from '@/components/forge/ForgeButton'
import Link from 'next/link'

export default function PlaygroundPage() {
  return (
    <>
      <div className="flex flex-row gap-2 justify-center align-middle">
        <Link href="/playground/ui" style={{ textDecoration: 'none' }}>
          <ForgeButton variant="outline">FORGE.ui</ForgeButton>
        </Link>
        <Link href="/playground/motion" style={{ textDecoration: 'none' }}>
          <ForgeButton variant="outline">FORGE.motion</ForgeButton>
        </Link>
      </div>
    </>
  )
}
