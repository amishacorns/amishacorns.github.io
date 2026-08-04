import sharp from "sharp"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const catalog = JSON.parse(
  await readFile(fileURLToPath(new URL("./data/bright-stars.json", import.meta.url)), "utf8"),
)

const degrees = Math.PI / 180
const centerRa = 292.5 * degrees
const centerDec = 30 * degrees
const sinCenter = Math.sin(centerDec)
const cosCenter = Math.cos(centerDec)
const projectionRadius = 2 * Math.tan((120 * degrees) / 4)

const colorForIndex = (index) => {
  if (index < -0.05) return [190, 211, 255]
  if (index < 0.55) return [229, 237, 255]
  if (index < 1.1) return [255, 244, 218]
  return [255, 211, 163]
}

const blendPixel = (pixels, width, x, y, red, green, blue, alpha) => {
  if (x < 0 || y < 0 || x >= width) return
  const index = (y * width + x) * 4
  const destinationAlpha = pixels[index + 3] / 255
  const outputAlpha = alpha + destinationAlpha * (1 - alpha)
  if (outputAlpha <= 0) return
  pixels[index] = Math.round((red * alpha + pixels[index] * destinationAlpha * (1 - alpha)) / outputAlpha)
  pixels[index + 1] = Math.round((green * alpha + pixels[index + 1] * destinationAlpha * (1 - alpha)) / outputAlpha)
  pixels[index + 2] = Math.round((blue * alpha + pixels[index + 2] * destinationAlpha * (1 - alpha)) / outputAlpha)
  pixels[index + 3] = Math.round(outputAlpha * 255)
}

const renderStarField = async ({ cssWidth, cssHeight, output, magnitudeLimit }) => {
  const density = 1.5
  const width = Math.round(cssWidth * density)
  const height = Math.round(cssHeight * density)
  const pixels = Buffer.alloc(width * height * 4)
  const scale = cssWidth / (2 * projectionRadius)

  for (const [raDegrees, decDegrees, magnitude, colorIndex] of catalog) {
    if (magnitude > magnitudeLimit) continue
    const ra = raDegrees * degrees
    const dec = decDegrees * degrees
    let deltaRa = ra - centerRa
    if (deltaRa > Math.PI) deltaRa -= Math.PI * 2
    if (deltaRa < -Math.PI) deltaRa += Math.PI * 2

    const sinDec = Math.sin(dec)
    const cosDec = Math.cos(dec)
    const cosDistance = sinCenter * sinDec + cosCenter * cosDec * Math.cos(deltaRa)
    if (cosDistance <= -0.2) continue

    const factor = 2 / (1 + cosDistance)
    const projectionX = factor * cosDec * Math.sin(deltaRa)
    const projectionY = factor * (cosCenter * sinDec - sinCenter * cosDec * Math.cos(deltaRa))
    const cssX = cssWidth / 2 + projectionX * scale
    const cssY = cssHeight / 2 - projectionY * scale
    if (cssX < -8 || cssX > cssWidth + 8 || cssY < -8 || cssY > cssHeight + 8) continue

    const strength = Math.max(0.12, Math.min(1, (7.2 - magnitude) / 7.8))
    const radius = (0.52 + Math.pow(strength, 1.65) * 2.15) * density
    const [red, green, blue] = colorForIndex(colorIndex)
    const centerX = Math.round(cssX * density)
    const centerY = Math.round(cssY * density)
    const glowRadius = strength >= 0.6 ? radius + (8 + strength * 7) * density : radius + 1
    const bound = Math.ceil(glowRadius)

    for (let offsetY = -bound; offsetY <= bound; offsetY += 1) {
      const y = centerY + offsetY
      if (y < 0 || y >= height) continue
      for (let offsetX = -bound; offsetX <= bound; offsetX += 1) {
        const x = centerX + offsetX
        if (x < 0 || x >= width) continue
        const distance = Math.hypot(offsetX, offsetY)
        let alpha = 0
        if (distance <= radius + 1) {
          const edge = Math.max(0, Math.min(1, radius + 0.75 - distance))
          alpha += (0.26 + strength * 0.7) * edge
        }
        if (strength >= 0.6 && distance <= glowRadius) {
          const sigma = (3 + strength * 3.5) * density
          alpha += Math.exp(-(distance * distance) / (2 * sigma * sigma)) * strength * 0.24
        }
        if (alpha > 0.005) blendPixel(pixels, width, x, y, red, green, blue, Math.min(0.96, alpha))
      }
    }
  }

  await sharp(pixels, { raw: { width, height, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 90, effort: 6 })
    .toFile(fileURLToPath(new URL(`../public/images/${output}`, import.meta.url)))
}

await Promise.all([
  renderStarField({ cssWidth: 1280, cssHeight: 720, output: "real-star-field-desktop.webp", magnitudeLimit: Infinity }),
  renderStarField({ cssWidth: 375, cssHeight: 680, output: "real-star-field-mobile.webp", magnitudeLimit: 6 }),
])
