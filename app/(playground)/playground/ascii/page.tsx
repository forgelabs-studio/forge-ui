import type { Metadata } from 'next'
import { AsciiPlaygroundLayout } from '@/components/ascii/AsciiPlaygroundLayout'

export const metadata: Metadata = {
  metadataBase: new URL('https://forgelabs.studio'),
  title: 'FORGE.ascii - Component Playground',
  description:
    'Turn images into animated ASCII art rendered on canvas. Configure visually, export self-contained HTML and CSS — zero dependencies.',
  openGraph: {
    title: 'FORGE.ascii',
    description:
      'Turn images into animated ASCII art rendered on canvas. Configure visually, export self-contained HTML and CSS — zero dependencies.',
    url: 'https://forgelabs.studio',
    siteName: 'FORGE.ascii',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://forgelabs.studio/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'FORGE.ascii - Animated ASCII art from images, rendered on canvas',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://forgelabs.studio/opengraph-image'],
  },
}

export default function AsciiPlaygroundPage() {
  return <AsciiPlaygroundLayout />
}
