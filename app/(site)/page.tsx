import SiteNav from '@/components/site/SiteNav'
import SiteHero from '@/components/site/SiteHero'
import SiteTicker from '@/components/site/SiteTicker'
import DemoSection from '@/components/site/DemoSection'
import HowItWorks from '@/components/site/HowItWorks'
import ComponentShowcase from '@/components/site/ComponentShowcase'
import SiteFooter from '@/components/site/SiteFooter'

export default function ForgePage() {
  return (
    <>
      <div className="forge-grid" />
      <div className="forge-vignette" />

      <SiteNav />

      <main style={{ position: 'relative', zIndex: 1, paddingTop: '56px' }}>
        <SiteHero />
        <div className="spectrum-bar" />
        <SiteTicker />
        <DemoSection />
        <HowItWorks />
        <ComponentShowcase />
      </main>

      <SiteFooter />
    </>
  )
}
