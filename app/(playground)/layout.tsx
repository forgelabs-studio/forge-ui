import Topbar from '@/components/layout/Topbar'

export default function PlaygroundGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app">
      <Topbar />
      {children}
    </div>
  )
}
