import puppeteer from "puppeteer-core"

const url = process.argv[2] ?? "http://127.0.0.1:4013/"
const executablePath = process.env.CHROME_PATH
  ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
const runs = Number(process.env.SCROLL_BENCHMARK_RUNS ?? 3)
const cpuThrottle = Number(process.env.SCROLL_BENCHMARK_CPU ?? 4)
const coldMode = process.env.SCROLL_BENCHMARK_COLD === "true"
const action = process.env.SCROLL_BENCHMARK_ACTION ?? "scroll"
const animationDuration = Number(process.env.SCROLL_BENCHMARK_DURATION ?? 1500)
const viewportWidth = Number(process.env.SCROLL_BENCHMARK_WIDTH ?? 412)
const viewportHeight = Number(process.env.SCROLL_BENCHMARK_HEIGHT ?? 830)
const deviceScaleFactor = Number(process.env.SCROLL_BENCHMARK_DPR ?? 2.625)

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

const launchBrowser = () => puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--disable-background-timer-throttling", "--disable-renderer-backgrounding"],
})

const results = []
let browser = coldMode ? null : await launchBrowser()
try {
  const createPage = async (activeBrowser) => {
    const nextPage = await activeBrowser.newPage()
    nextPage.setDefaultNavigationTimeout(60000)
    await nextPage.setViewport({ width: viewportWidth, height: viewportHeight, deviceScaleFactor, isMobile: true, hasTouch: true })
    const devtools = await nextPage.createCDPSession()
    await devtools.send("Emulation.setCPUThrottlingRate", { rate: cpuThrottle })
    if (coldMode) await devtools.send("Network.setCacheDisabled", { cacheDisabled: true })
    return nextPage
  }

  let page = browser ? await createPage(browser) : null

  for (let run = 0; run < runs; run += 1) {
    if (coldMode) {
      browser = await launchBrowser()
      page = await createPage(browser)
    }
    await page.goto(url, { waitUntil: "networkidle0" })
    const result = await page.evaluate(async ({ action, animationDuration }) => {
      const section = document.getElementById("orbit")
      if (!section) throw new Error("Orbit section not found")
      window.scrollTo(0, 0)
      await new Promise((resolve) => setTimeout(resolve, 250))

      const frameGaps = []
      const longFrames = []
      let observer
      if (PerformanceObserver.supportedEntryTypes.includes("long-animation-frame")) {
        observer = new PerformanceObserver((list) => {
          longFrames.push(...list.getEntries().map((entry) => entry.duration))
        })
        observer.observe({ type: "long-animation-frame" })
      }

      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      const duration = animationDuration
      const start = performance.now()
      let previous = start
      await new Promise((resolve) => {
        const step = (now) => {
          frameGaps.push(now - previous)
          previous = now
          const progress = Math.min(1, (now - start) / duration)
          if (action === "scroll") window.scrollTo(0, travel * progress)
          if (progress < 1) requestAnimationFrame(step)
          else resolve()
        }
        requestAnimationFrame(step)
      })
      await new Promise((resolve) => setTimeout(resolve, 200))
      observer?.disconnect()

      const sorted = frameGaps.slice(1).sort((a, b) => a - b)
      const atPercentile = (fraction) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))]
      const earth = document.getElementById("crescent")?.getBoundingClientRect()
      const singularity = document.querySelector(".singularity-system")?.getBoundingClientRect()
      const impactDistance = earth && singularity
        ? Math.hypot(
            earth.left + earth.width / 2 - (singularity.left + singularity.width / 2),
            earth.top + earth.height / 2 - (singularity.top + singularity.height / 2),
          )
        : null
      return {
        frames: sorted.length,
        medianFrameMs: atPercentile(0.5),
        p95FrameMs: atPercentile(0.95),
        p99FrameMs: atPercentile(0.99),
        maxFrameMs: sorted.at(-1),
        missedFrames: sorted.filter((gap) => gap > 24).length,
        severeFrames: sorted.filter((gap) => gap > 50).length,
        longAnimationFrames: longFrames.length,
        maxLongAnimationFrameMs: longFrames.length ? Math.max(...longFrames) : 0,
        impactDistance,
      }
    }, { action, animationDuration })
    results.push(result)
    if (coldMode) {
      await browser.close()
      browser = null
    }
  }
} finally {
  await browser?.close()
}

const summary = Object.fromEntries(
  Object.keys(results[0]).map((key) => [key, Number(median(results.map((result) => result[key])).toFixed(2))]),
)
const warmResults = coldMode ? [] : results.slice(1)
const warmMedian = warmResults.length
  ? Object.fromEntries(
      Object.keys(results[0]).map((key) => [key, Number(median(warmResults.map((result) => result[key])).toFixed(2))]),
    )
  : summary

console.log(JSON.stringify({
  url,
  viewport: `${viewportWidth}x${viewportHeight}@${deviceScaleFactor}`,
  cpuThrottle,
  runMode: coldMode ? "independent-cold" : "cold-then-warm",
  action,
  runs,
  coldStart: results[0],
  ...(coldMode ? {} : { warmMedian }),
  summary,
  results,
}, null, 2))
