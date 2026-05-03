import type { Metadata } from 'next'
import { MotionPlaygroundLayout } from '@/components/motion/MotionPlaygroundLayout'

export const metadata: Metadata = {
  metadataBase: new URL('https://forgelabs.studio'),
  title: 'FORGE.motion - Component Playground',
  description:
    'Scroll-triggered and viewport-aware animation presets for React. Configure visually, install with one CLI command, own the generated files.',
  openGraph: {
    title: 'FORGE.motion',
    description:
      'Scroll-triggered and viewport-aware animation presets for React. Configure visually, install with one CLI command, own the generated files.',
    url: 'https://forgelabs.studio',
    siteName: 'FORGE.motion',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://forgelabs.studio/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'FORGE.motion - Scroll-triggered and viewport-aware animation presets for React',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://forgelabs.studio/opengraph-image'],
  },
}

export default function MotionPlaygroundPage() {
  return <MotionPlaygroundLayout />
}
