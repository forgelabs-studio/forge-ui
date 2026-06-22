'use client'

import { useEffect, useRef, useState } from 'react'
import { useAsciiPlaygroundStore } from '@/store/ascii'
import { CHARACTER_SET_BY_ID, isAdvancedAnimation, type AsciiConfig } from '@/lib/ascii'
import { buildAnimationCss } from '@/lib/ascii-animate'
import { startAdvancedAnimation } from '@/lib/ascii-animate-advanced'
import { AsciiExportBar } from '@/components/ascii/AsciiExportBar'
import type { AsciiWorkerRequest, AsciiWorkerResponse } from '@/workers/ascii.worker'

const FONT_SIZE = 8
const LINE_HEIGHT = 9
const CHAR_WIDTH = FONT_SIZE * 0.6
const ACCEPTED_TYPES = ['image/png', 'image/jpeg']

interface AsciiCanvasProps {
  config: AsciiConfig
}

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M7 10V2M7 2L4 5M7 2l3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9.5v1A1.5 1.5 0 003.5 12h7a1.5 1.5 0 001.5-1.5v-1" strokeLinecap="round" />
    </svg>
  )
}

function RemoveIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
    </svg>
  )
}

interface DecodedImage {
  width: number
  height: number
  data: Uint8ClampedArray
}

export function AsciiCanvas({ config }: AsciiCanvasProps) {
  const { imageUrl, fileName, asciiText, setImage, setAsciiText } = useAsciiPlaygroundStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const workerRef = useRef<Worker | null>(null)
  const requestIdRef = useRef(0)
  const decodedRef = useRef<DecodedImage | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [status, setStatus] = useState<'idle' | 'converting' | 'ready' | 'error'>('idle')
  const [dragOver, setDragOver] = useState(false)
  const [decodeVersion, setDecodeVersion] = useState(0)

  // Conversion runs off the main thread - never block the UI.
  useEffect(() => {
    const worker = new Worker(new URL('../../workers/ascii.worker.ts', import.meta.url))
    worker.onmessage = (event: MessageEvent<AsciiWorkerResponse>) => {
      if (event.data.type !== 'result' || event.data.requestId !== requestIdRef.current) return
      setAsciiText(event.data.text)
      setStatus('ready')
    }
    workerRef.current = worker
    return () => worker.terminate()
  }, [setAsciiText])

  // Decode the source image once per upload - re-decoding on every density/character-set
  // tweak would redo a full image decode + getImageData for pixels that haven't changed.
  useEffect(() => {
    decodedRef.current = null
    if (!imageUrl) return

    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const source = document.createElement('canvas')
      source.width = img.naturalWidth
      source.height = img.naturalHeight
      const ctx = source.getContext('2d')
      if (!ctx) {
        setStatus('error')
        return
      }
      ctx.drawImage(img, 0, 0)

      let imageData: ImageData
      try {
        imageData = ctx.getImageData(0, 0, source.width, source.height)
      } catch {
        setStatus('error')
        return
      }

      decodedRef.current = { width: imageData.width, height: imageData.height, data: new Uint8ClampedArray(imageData.data) }
      setDecodeVersion((v) => v + 1)
    }
    img.onerror = () => { if (!cancelled) setStatus('error') }
    img.src = imageUrl

    return () => { cancelled = true }
  }, [imageUrl])

  // Re-run conversion whenever the decoded image, character set, or density changes -
  // reuses the cached pixel data instead of re-decoding the source image.
  useEffect(() => {
    const decoded = decodedRef.current
    if (!decoded) return
    const worker = workerRef.current
    if (!worker) return

    const requestId = ++requestIdRef.current
    setStatus('converting')

    const ramp = CHARACTER_SET_BY_ID[config.characterSet].ramp
    const pixels = new Uint8ClampedArray(decoded.data)
    const request: AsciiWorkerRequest = {
      type: 'convert',
      requestId,
      pixels,
      width: decoded.width,
      height: decoded.height,
      density: config.density,
      ramp,
    }
    worker.postMessage(request, [pixels.buffer])
  }, [decodeVersion, config.characterSet, config.density])

  // Draw the converted text onto the canvas - never as DOM text nodes.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lines = asciiText.length ? asciiText.split('\n') : []
    const cols = lines.reduce((max, line) => Math.max(max, line.length), 0)
    const rows = lines.length

    if (!cols || !rows) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    const dpr = window.devicePixelRatio || 1
    const cssWidth = cols * CHAR_WIDTH
    const cssHeight = rows * LINE_HEIGHT

    canvas.width = Math.ceil(cssWidth * dpr)
    canvas.height = Math.ceil(cssHeight * dpr)
    canvas.style.width = `${cssWidth}px`
    canvas.style.height = `${cssHeight}px`

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = '#09090b'
    ctx.fillRect(0, 0, cssWidth, cssHeight)
    ctx.fillStyle = config.colour
    ctx.font = `${FONT_SIZE}px 'DM Mono', ui-monospace, monospace`
    ctx.textBaseline = 'top'

    lines.forEach((line, i) => {
      ctx.fillText(line, 0, i * LINE_HEIGHT)
    })
  }, [asciiText, config.colour])

  // Hands the canvas to a per-frame render loop for advanced (character-level) animations.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!asciiText) return
    if (!config.animation || !isAdvancedAnimation(config.animation)) return

    const handle = startAdvancedAnimation(canvas, asciiText, config.animation, config)
    return () => handle.stop()
    // Depends on individual fields, not `config` itself - listing the whole object
    // would also restart the render loop on unrelated config changes (e.g. density).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asciiText, config.animation, config.colour, config.duration, config.characterSet])

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file || !ACCEPTED_TYPES.includes(file.type)) return
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImage(URL.createObjectURL(file), file.name)
  }

  function handleRemoveImage() {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImage(null)
    setStatus('idle')
    if (inputRef.current) inputRef.current.value = ''
  }

  const anim =
    config.animation && !isAdvancedAnimation(config.animation)
      ? buildAnimationCss(config.animation, config.duration, config.colour)
      : null

  return (
    <div className="centre">
      <div className="prev-bar">
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>
            {fileName || 'No image uploaded'}
          </span>
          {imageUrl && (
            <button
              type="button"
              onClick={handleRemoveImage}
              title="Remove image"
              aria-label="Remove image"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 18,
                height: 18,
                padding: 0,
                border: 'none',
                borderRadius: 4,
                background: 'transparent',
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              <RemoveIcon />
            </button>
          )}
        </span>
        <span
          style={{
            fontFamily: 'var(--font)',
            fontSize: 11,
            color: 'rgba(127,119,221,0.6)',
            letterSpacing: '0.04em',
          }}
        >
          {status === 'converting' ? 'converting…' : status === 'error' ? 'could not read image' : 'canvas renderer'}
        </span>
      </div>

      <div
        className="motion-preview c-grid"
        style={{ overflow: 'auto', position: 'relative' }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
      >
        {anim && (
          <style>{`${anim.keyframes}\n.ascii-canvas-preview { animation: ${anim.shorthand}; }`}</style>
        )}

        {asciiText ? (
          <canvas ref={canvasRef} className="ascii-canvas-preview" style={{ imageRendering: 'pixelated' }} />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              padding: '32px 40px',
              borderRadius: 10,
              border: `1px dashed ${dragOver ? 'var(--purple)' : 'var(--line2)'}`,
              background: dragOver ? 'rgba(127,119,221,0.06)' : 'transparent',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font)',
              transition: 'all 0.12s',
            }}
          >
            <UploadIcon />
            <span style={{ fontSize: 13 }}>
              {status === 'error' ? 'Could not read that file - try another PNG or JPG' : 'Upload a PNG or JPG'}
            </span>
            <span style={{ fontSize: 11, color: 'var(--hint)' }}>Click to browse, or drag and drop</span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
      </div>

      <AsciiExportBar asciiText={asciiText} config={config} />
    </div>
  )
}
