// Monospace glyphs read roughly twice as tall as they are wide, so rows are
// derived from the image aspect ratio with this correction factor.
const CHAR_ASPECT = 0.5

export interface ConvertOptions {
  width: number
  height: number
  /** Target column count, 1–200. */
  density: number
  /** Glyph ramp ordered sparsest → densest. */
  ramp: string
}

export function brightnessToChar(brightness: number, ramp: string): string {
  const index = Math.min(ramp.length - 1, Math.floor((brightness / 255) * ramp.length))
  return ramp[index]
}

export function convertPixelsToAscii(
  pixels: Uint8ClampedArray,
  { width, height, density, ramp }: ConvertOptions,
): string {
  const cols = Math.max(1, Math.min(200, Math.round(density)))
  const rows = Math.max(1, Math.round((height / width) * cols * CHAR_ASPECT))

  const cellWidth = width / cols
  const cellHeight = height / rows

  const lines: string[] = new Array(rows)

  for (let row = 0; row < rows; row++) {
    const yStart = Math.floor(row * cellHeight)
    const yEnd = Math.max(yStart + 1, Math.floor((row + 1) * cellHeight))

    let line = ""
    for (let col = 0; col < cols; col++) {
      const xStart = Math.floor(col * cellWidth)
      const xEnd = Math.max(xStart + 1, Math.floor((col + 1) * cellWidth))

      let total = 0
      let count = 0
      for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
          const i = (y * width + x) * 4
          // Perceptual luminance (Rec. 601).
          total += pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114
          count++
        }
      }

      line += brightnessToChar(count > 0 ? total / count : 0, ramp)
    }
    lines[row] = line
  }

  return lines.join("\n")
}
