# Performance Benchmarks

This log tracks isolated performance experiments on the production build. Homepage results use the median of three Lighthouse 13.4.1 runs. Mobile audits use Lighthouse's default simulated mobile throttling; desktop audits use the desktop preset.

## Performance Budgets

| Metric | Homepage mobile | Article mobile |
| --- | ---: | ---: |
| Lighthouse performance | >= 90 | >= 95 |
| First Contentful Paint | <= 1.5 s | <= 1.5 s |
| Largest Contentful Paint | <= 2.5 s | <= 2.5 s |
| Total Blocking Time | <= 200 ms | <= 100 ms |
| Cumulative Layout Shift | <= 0.1 | <= 0.1 |
| Initial transfer | <= 1,024 KiB | <= 500 KiB |
| Longest main-thread task | <= 50 ms | <= 50 ms |

## Baseline

Measured on 2026-08-03 against `https://www.jordandotzel.com/` before performance-specific optimization.

| Page and profile | Score | FCP | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile median (3 runs) | 49 | 1.15 s | 13.65 s | 1,523 ms | 4,604 ms | 3,207 KiB |
| Homepage, desktop median (3 runs) | 61 | 0.29 s | 2.44 s | 647 ms | 1,807 ms | 3,120 KiB |
| Typical article, mobile | 95 | 1.1 s | 3.0 s | 0 ms | 0.4 s | 403 KiB |
| Image-heavy article, mobile | 74 | 1.6 s | 17.0 s | 0 ms | 0.4 s | 3,123 KiB |

### Baseline findings

- The homepage transferred both the 8K and 2K Earth textures in the mobile audit.
- The 8K Earth image is 2,260,106 encoded bytes and approximately 128 MiB when decoded to RGBA pixels.
- Images accounted for approximately 2,956 KiB of the 3,207 KiB mobile homepage transfer.
- The homepage JavaScript transferred only approximately 22 KiB, but consumed approximately 1,835 ms of simulated mobile script evaluation.
- The image-heavy article's 2.9 MiB hero image dominated its 17-second LCP; the article template itself produced no blocking time.

## Experiments

Results are added here after each isolated change. A change is retained only when it improves the target metrics without an unacceptable visual or functional regression.

### 1. Right-size the Earth textures

Changed the static fallback from the 8K texture to the existing 2K texture, and changed capable desktop WebGL rendering from 8K to a new 4K derivative. Constrained devices continue to use 2K. The result passed a production build and a visual review with no perceptible loss of globe detail at the site's rendered size.

Measured on 2026-08-03 against the local production preview after the isolated change.

| Profile | Score | FCP | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile median (3 runs) | 58 | 1.28 s | 4.85 s | 1,252 ms | 3,500 ms | 995 KiB |
| Homepage, desktop median (3 runs) | 89 | 0.35 s | 1.01 s | 249 ms | 977 ms | 1,259 KiB |

Change from the original production baseline:

| Profile | Score | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | +9 | -64% | -18% | -24% | -69% |
| Desktop | +28 | -59% | -62% | -46% | -60% |

The mobile audit no longer requests the 8K texture and now meets the 1 MiB transfer budget. This experiment is retained. The original baseline was measured against the public deployment while this experiment was measured against a local production preview, so subsequent experiments should use this result as their consistent local comparison point.

### 2. Pre-generate the AGI asteroid surface

Replaced the visitor-side generation of a 512×512 procedural noise texture with an equivalent deterministic WebP generated ahead of time. This removes more than three million trigonometric hash calculations from page startup. The 37 KiB asset preserves the asteroid's grain, cracks, lighting, and tumbling; a production build and close-up visual review passed.

Measured on 2026-08-03 against the local production preview after the isolated change.

| Profile | Score | FCP | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile median (3 runs) | 67 | 1.29 s | 4.68 s | 641 ms | 3,237 ms | 1,031 KiB |
| Homepage, desktop median (3 runs) | 98 | 0.33 s | 0.91 s | 94 ms | 995 ms | 1,296 KiB |

Change from experiment 1:

| Profile | Score | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | +9 | -4% | -49% | -8% | +36 KiB |
| Desktop | +9 | -10% | -62% | +2% | +37 KiB |

Desktop now meets the blocking-time budget. Mobile blocking time remains above budget but has fallen 58% from the original baseline. The small main-thread variance on desktop is within run-to-run noise, while the blocking-time reduction is consistent and substantial. This experiment is retained.

### 3. Cap the asteroid rendering rate

The asteroid previously submitted WebGL work on every display refresh even at its small resting size. Resting rendering is now capped at approximately 15 FPS on compact devices and 24 FPS on larger screens, rising to 24/30 FPS only for the close-up focus view. Motion speed remains time-based, so the asteroid does not tumble more slowly. The focused visual review passed.

Measured on 2026-08-03 against the local production preview. Mobile uses the median of six runs because its first three blocking-time results were noisy; desktop uses three runs.

| Profile | Score | FCP | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile median (6 runs) | 66 | 1.28 s | 4.63 s | 682 ms | 3,003 ms | 1,032 KiB |
| Homepage, desktop median (3 runs) | 99 | 0.35 s | 0.91 s | 69 ms | 873 ms | 1,296 KiB |

Change from experiment 2:

| Profile | Score | LCP | TBT | Main thread | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | -1 | -1% | +6% | -7% | -7% |
| Desktop | +1 | 0% | -27% | -12% | -5% |

Mobile blocking time varied, but the broader mobile workload improved: main-thread time, boot-up work, and Speed Index all fell while the score remained effectively flat. The sustained WebGL draw rate is reduced by 75% on compact devices and 60% on desktop. This experiment is retained for low-end-device responsiveness and battery use.

### 4. Pre-render the real star field

Replaced the runtime download and projection of 12,495 cataloged stars with responsive desktop and mobile WebP renders generated from the same catalog. The sky remains a real fixed projection, but visitors no longer download the 385 KiB JSON source or execute its trigonometric projection loop. The final assets are 69 KiB for desktop and 83 KiB for mobile. Desktop uses a six-run median because combined homepage-script long tasks varied substantially; mobile uses three runs.

Measured on 2026-08-03 against the local production preview after the isolated change.

| Profile | Score | FCP | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile median (3 runs) | 73 | 1.28 s | 3.53 s | 694 ms | 3,097 ms | 966 KiB |
| Homepage, desktop median (6 runs) | 96.5 | 0.35 s | 0.71 s | 151 ms | 988 ms | 1,217 KiB |

Change from experiment 3:

| Profile | Score | LCP | TBT | Main thread | Transfer | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | +7 | -24% | +2% | +3% | -66 KiB | -12% |
| Desktop | -2.5 | -22% | +82 ms | +13% | -79 KiB | -2% |

The mobile result is a strong overall improvement. Desktop blocking time is volatile because the same combined animation script appears as either several short tasks or one long task, but LCP, transfer, and Speed Index improved consistently. The star image is not the source of those script long tasks. This experiment is retained, and splitting or deferring that combined homepage script becomes the next target.

### 5. Cache orbit trigonometry

The comet renderer previously recalculated each orbit's fixed inclination and node trigonometry, plus the shared globe rotation and tilt trigonometry, for every trail sample. Fixed values are now prepared once and globe-pose values once per frame. Only each sample's changing orbital angle still requires sine and cosine. This removes roughly 80% of projection trigonometric calls per animation frame without changing any trajectories or trail geometry. Visual review passed.

Measured on 2026-08-03 against the local production preview after the isolated change.

| Profile | Score | FCP | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile median (3 runs) | 76 | 1.28 s | 3.54 s | 596 ms | 2,985 ms | 966 KiB |
| Homepage, desktop median (3 runs) | 95 | 0.35 s | 0.71 s | 172 ms | 973 ms | 1,217 KiB |

Change from experiment 4:

| Profile | Score | LCP | TBT | Main thread | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | +3 | 0% | -14% | -4% | -4% |
| Desktop | -1.5 | 0% | +21 ms | -2% | -4% |

Desktop long-task grouping remains noisy, while its total main-thread work still improved. The mobile gains and large sustained reduction in animation math are consistent. This experiment is retained.

### 6. Cache orbit dimensions (rejected)

An attempted optimization cached the orbit container's dimensions and updated its SVG viewports only on resize. Reading those dimensions synchronously during startup forced a full layout inside the combined homepage script. Although the mobile median happened to improve, desktop results regressed consistently: score fell to 74, TBT rose to 706 ms, and main-thread work rose to 1,747 ms across three runs. The change was reverted in full.

### 7. Right-size comet trail tessellation

Reduced curved trail sampling from 9 to 7 points on compact screens and from 15 to 12 on larger screens. At the trails' rendered size the curves remain visually indistinguishable, while projection calculations, path-string construction, and SVG path segments fall by approximately 20–22% on every rendered frame. Visual review passed.

Measured on 2026-08-03 against the local production preview after the isolated change.

| Profile | Score | FCP | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile median (3 runs) | 78 | 1.28 s | 3.54 s | 485 ms | 2,985 ms | 966 KiB |
| Homepage, desktop median (3 runs) | 99 | 0.33 s | 0.71 s | 85 ms | 882 ms | 1,217 KiB |

Change from experiment 5, excluding rejected experiment 6:

| Profile | Score | LCP | TBT | Main thread | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | +2 | 0% | -19% | 0% | 0% |
| Desktop | +4 | 0% | -51% | -9% | -6% |

Desktop again meets the blocking-time budget. This experiment is retained.

### 8. Lower the comet frame rate (rejected)

An attempted cap reduced comet rendering from approximately 20/30 FPS to 15/24 FPS on compact/desktop screens. Despite reducing theoretical sustained work, median startup scores fell from 78/99 to 73/94 and TBT rose on both profiles across three runs. It also reduced the fluidity of the site's most visible motion. The change was reverted in full.

### 9. Compress oversized article artwork

Converted the three 2.77–2.96 MiB PNG hero images for *Yann LeCan't*, *Research Without Researchers*, and *Ban the Boomerboard* into 1,200-pixel WebP assets. The results are 179–200 KiB, a 93–94% reduction, and are used for both article heroes and social metadata. Visual and Open Graph path reviews passed.

Measured on 2026-08-03 against the local production preview. The image-heavy Yann article uses the median of three mobile runs.

| Page and profile | Score | FCP | LCP | TBT | Main thread | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Yann article, mobile median (3 runs) | 95 | 0.91 s | 2.86 s | 0 ms | 414 ms | 336 KiB |

Change from the original image-heavy article baseline:

| Score | LCP | Transfer |
| ---: | ---: | ---: |
| +21 | -83% | -89% |

The article now meets the score, blocking-time, and transfer budgets. This experiment is retained.

### 10. Prioritize article hero images

Marked article hero artwork as eager, high-priority content while keeping decoding asynchronous. The Yann article's three-run mobile median held at 2.86 s LCP, with one run improving to 2.71 s and the median score rising from 95 to 96. The change adds no bytes or blocking work and correctly identifies the hero as the page's primary visual, so it is retained.

### 11. Stabilize the mobile orbit transition

Added a repeatable scroll benchmark at a 412 x 830 viewport, 2.625 device-pixel ratio, and 4x CPU throttling. The transition now caches layout measurements, smooths progress, uses a single composite transform, pauses offscreen animation work, and removes the orbital-object layer from the Earth-to-singularity sequence. The Earth path is calculated from the black hole's actual center and reaches it within 0.39 px.

The marker canvas also now sizes itself from the globe's stable layout width rather than its temporarily transformed width. This fixes a mobile-only failure where browser-toolbar resizing during the shrunken-Earth state could make the visited-location circles enormous after scrolling back.

Measured on 2026-08-04 against the local production preview. Results are the median of three runs.

| Metric | Before | After | Change |
| --- | ---: | ---: | ---: |
| Median frame time | 33.3 ms | 16.7 ms | -50% |
| Approximate frame rate | 30 FPS | 60 FPS | +100% |
| Missed frames | 34 | 1 | -97% |
| Severe frames | 2 | 0 | -100% |
| Earth-to-singularity center error | 0.39 px | 0.39 px | unchanged |

The asteroid mesh was also reduced by roughly two thirds on compact screens while retaining its uneven silhouette and texture. An obsolete straight-tail implementation was removed after confirming that the curved SVG trails had fully replaced it, shrinking `IdentityComets.astro` from 942 to 777 lines (17.5%). This experiment is retained.

### 12. Center the desktop orbit and suspend hidden singularity motion

The desktop Earth now moves from its initially below-viewport geometric center to the visible center of the screen during the first 22% of the orbit transition, then travels from that stable position into the singularity. The mobile path remains unchanged. The accretion-disk animations now remain paused until the singularity is visible or explicitly focused, eliminating continuous animation work for an invisible element at the top of the page.

Measured on 2026-08-04 against the local production preview with seven mobile runs at 4x CPU throttling:

| Metric | Median |
| --- | ---: |
| Frame time | 16.7 ms |
| 95th-percentile frame time | 16.8 ms |
| Missed frames | 1 |
| Severe frames | 0 |
| Long animation frames | 0 |
| Earth-to-singularity center error | 0.39 px |

An alternative experiment that cancelled and restarted all three animation loops during active scrolling raised the median missed-frame count from one to three. It was rejected and reverted in full.

### 13. Shorten the orbit handoff and park offscreen work

The first content panel now rises into the final part of the orbit sequence instead of waiting below it. The visible desktop gap between the orbit HUD and the first content fell from roughly 140 px to roughly 20 px; the same handoff was visually verified at a 412 x 830 mobile viewport.

The homepage now stops its countdown timer, shooting-star creation, globe rendering, comet rendering, and AGI asteroid rendering once the orbit leaves the viewport, then resumes them when the visitor returns. The unused light-theme runtime and its 1,750 generated particle-shadow declarations were removed. Four unrelated homepage controllers were also extracted from `index.astro`, reducing that page from 964 lines to 503 lines without changing its runtime behavior.

Measured on 2026-08-04 against the local production preview with seven mobile runs at 4x CPU throttling:

| Metric | Median |
| --- | ---: |
| Frame time | 16.7 ms |
| 95th-percentile frame time | 16.8 ms |
| 99th-percentile frame time | 33.4 ms |
| Missed frames | 1 |
| Severe frames | 0 |
| Long animation frames | 0 |
| Earth-to-singularity center error | 0.39 px |

The active scroll path remains effectively unchanged while idle CPU use drops to zero for these hero processes after the orbit leaves the screen. This experiment is retained.

### 14. Remove dormant UI and unblock document parsing

Six unused components/layouts and their Tailwind candidates were removed, shrinking the shared generated CSS from 52,753 bytes to 51,175 bytes. The global animation and scroll scripts are now deferred instead of blocking HTML parsing, and the header scroll listener coalesces updates into animation frames while avoiding repeated class mutations.

Superseded PNG artwork, an obsolete social preview, unused browser-manifest files, and a generated star catalog that did not need to be publicly served were removed or relocated. This reduced the deployed `public` directory by approximately 9.0 MB, from roughly 11.7 MB to 2.7 MB, without removing any image requested by a live page.

Measured on 2026-08-04 against the local production preview with seven mobile runs at 4x CPU throttling:

| Metric | Median |
| --- | ---: |
| Frame time | 16.7 ms |
| 95th-percentile frame time | 16.8 ms |
| 99th-percentile frame time | 33.4 ms |
| Missed frames | 1 |
| Severe frames | 0 |
| Long animation frames | 0 |
| Earth-to-singularity center error | 0.39 px |

The active orbit performance remains unchanged while document startup, generated CSS, repository maintenance, and deployment size improve. This experiment is retained.
