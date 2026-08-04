import sharp from "sharp"
import { fileURLToPath } from "node:url"

const size = 512
let seed = 928371
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}

const hash2 = (x, y) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123
  return value - Math.floor(value)
}

const valueNoise = (x, y, cellSize) => {
  const gridX = Math.floor(x / cellSize)
  const gridY = Math.floor(y / cellSize)
  const fractionX = x / cellSize - gridX
  const fractionY = y / cellSize - gridY
  const smoothX = fractionX * fractionX * (3 - 2 * fractionX)
  const smoothY = fractionY * fractionY * (3 - 2 * fractionY)
  const top = hash2(gridX, gridY) * (1 - smoothX) + hash2(gridX + 1, gridY) * smoothX
  const bottom = hash2(gridX, gridY + 1) * (1 - smoothX) + hash2(gridX + 1, gridY + 1) * smoothX
  return top * (1 - smoothY) + bottom * smoothY
}

const pixels = Buffer.alloc(size * size * 4)
for (let y = 0; y < size; y += 1) {
  for (let x = 0; x < size; x += 1) {
    const index = (y * size + x) * 4
    const layeredNoise =
      0.24 +
      valueNoise(x, y, 88) * 0.36 +
      valueNoise(x, y, 31) * 0.24 +
      valueNoise(x, y, 9) * 0.1 +
      (random() - 0.5) * 0.06
    const value = Math.max(25, Math.min(218, Math.round(layeredNoise * 190)))
    pixels[index] = value
    pixels[index + 1] = value
    pixels[index + 2] = value
    pixels[index + 3] = 255
  }
}

const cracks = []
for (let crackIndex = 0; crackIndex < 36; crackIndex += 1) {
  let x = random() * size
  let y = random() * size
  const points = [`${x.toFixed(2)},${y.toFixed(2)}`]
  const segments = 3 + Math.floor(random() * 6)
  for (let segment = 0; segment < segments; segment += 1) {
    x += (random() - 0.5) * 54
    y += (random() - 0.5) * 54
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }
  const opacity = 0.34 + random() * 0.42
  const width = 1.5 + random() * 3.2
  cracks.push(`<polyline points="${points.join(" ")}" fill="none" stroke="rgb(8 6 4)" stroke-opacity="${opacity.toFixed(3)}" stroke-width="${width.toFixed(2)}" stroke-linecap="round" />`)
}

const crackOverlay = Buffer.from(
  `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${cracks.join("")}</svg>`,
)

await sharp(pixels, { raw: { width: size, height: size, channels: 4 } })
  .composite([{ input: crackOverlay }])
  .webp({ quality: 70, smartSubsample: true, effort: 6 })
  .toFile(fileURLToPath(new URL("../public/images/agi-asteroid-surface.webp", import.meta.url)))
