import Nav from '@/components/site/Nav'
import Hero from '@/components/site/Hero'
import Tools from '@/components/site/Tools'
import Philosophy from '@/components/site/Philosophy'
import OssCallout from '@/components/site/OssCallout'
import BuiltBy from '@/components/site/BuiltBy'
import Cta from '@/components/site/Cta'
import Footer from '@/components/site/Footer'

export default function ForgePage() {
  return (
    <>
      <div className="forge-grid" />
      <div className="forge-vignette" />

      <Nav />

      <main style={{ position: 'relative', zIndex: 1, paddingTop: '60px' }}>
        <Hero />
        <div className="spectrum-bar" />
        <Tools />
        <Philosophy />
        <OssCallout />
        <BuiltBy />
        <Cta />
      </main>

      <Footer />
    </>
  )
}
