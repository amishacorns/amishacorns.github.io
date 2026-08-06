import { mkdir } from "node:fs/promises"
import path from "node:path"
import puppeteer from "puppeteer-core"
import sharp from "sharp"

const url = process.env.COMET_ATLAS_URL ?? "http://127.0.0.1:4005/"
const executablePath = process.env.CHROME_PATH
  ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
const keys = ["GOOG", "CU", "USA", "PRC", "GEM", "TSLA", "CT", "MJOLNIR"]
const outputDirectory = path.resolve("public/images/comet-atlases")

await mkdir(outputDirectory, { recursive: true })
const browser = await puppeteer.launch({ executablePath, headless: true })
try {
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "load" })
  for (const key of keys) {
    const dataUrl = await page.evaluate(async (objectKey) => {
      const { createOrbitCometAtlas } = await import("/src/scripts/focusedCometMesh.ts")
      const atlas = await createOrbitCometAtlas(objectKey)
      return atlas.canvas.toDataURL("image/png")
    }, key)
    const png = Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64")
    const output = path.join(outputDirectory, `${key.toLowerCase()}.webp`)
    const result = await sharp(png).webp({ quality: 68, alphaQuality: 85, effort: 6 }).toFile(output)
    console.log(`${key}: ${(result.size / 1024).toFixed(1)} KiB`)
  }
} finally {
  await browser.close()
}
