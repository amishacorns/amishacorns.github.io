import sharp from "sharp"
import { fileURLToPath } from "node:url"

const images = [
  ["yann-lecant-lifeboat-v3.png", "yann-lecant-lifeboat-v3.webp"],
  ["lab-of-one.png", "lab-of-one.webp"],
  ["ban-the-boomer-board.png", "ban-the-boomer-board.webp"],
]

await Promise.all(images.map(async ([source, output]) => {
  const sourcePath = fileURLToPath(new URL(`../public/images/${source}`, import.meta.url))
  const outputPath = fileURLToPath(new URL(`../public/images/${output}`, import.meta.url))
  await sharp(sourcePath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 90, effort: 6 })
    .toFile(outputPath)
}))
