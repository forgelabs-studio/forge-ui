import { convertPixelsToAscii } from "../lib/ascii-convert"

export interface AsciiWorkerRequest {
  type: "convert"
  requestId: number
  pixels: Uint8ClampedArray
  width: number
  height: number
  density: number
  ramp: string
}

export interface AsciiWorkerResponse {
  type: "result"
  requestId: number
  text: string
}

self.onmessage = (event: MessageEvent<AsciiWorkerRequest>) => {
  const { type, requestId, pixels, width, height, density, ramp } = event.data
  if (type !== "convert") return

  const text = convertPixelsToAscii(pixels, { width, height, density, ramp })

  const response: AsciiWorkerResponse = { type: "result", requestId, text }
  self.postMessage(response)
}
