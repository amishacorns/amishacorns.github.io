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

## Performance History

The homepage history below uses the comparable simulated-mobile production audits recorded throughout the optimization work. Scores and long-task grouping vary slightly between runs, so the larger directional changes matter more than a single point.

| Milestone | Score | LCP | TBT | Transfer | Primary change |
| --- | ---: | ---: | ---: | ---: | --- |
| Original production baseline | 49 | 13.65 s | 1,523 ms | 3,207 KiB | Unoptimized 8K/2K globe and runtime visuals |
| Right-sized Earth textures | 58 | 4.85 s | 1,252 ms | 995 KiB | Removed the mobile 8K download |
| Pre-generated AGI surface | 67 | 4.68 s | 641 ms | 1,031 KiB | Removed millions of startup texture calculations |
| Pre-rendered real star field | 73 | 3.53 s | 694 ms | 966 KiB | Removed the star catalog download and projection loop |
| Cached orbit geometry | 76 | 3.54 s | 596 ms | 966 KiB | Removed repeated fixed trigonometry |
| Right-sized comet trails | 78 | 3.54 s | 485 ms | 966 KiB | Reduced per-frame trail geometry |
| Current optimized build | 93 | 3.01 s | 183 ms | 469 KiB | Lean assets, parked work, native search, and smaller hot loops |
| Lean-media build | 90 | 2.26 s | 367 ms | 212 KiB | Explicitly deferred card art and re-encoded persistent visuals |
| Compact-globe build | 93 | 2.04 s | 296 ms | 185 KiB | Smaller mobile Earth and native-parsed compact location data |
| Lower-allocation hero | 91 | 2.11 s | 353 ms | 185 KiB | Single-pass trails and delegated controls |

| End-to-end homepage change | Improvement |
| --- | ---: |
| Lighthouse performance | 49 → 91 latest median; 93 best optimized median |
| Largest Contentful Paint | 13.65 s → 2.11 s (-85%) |
| Total Blocking Time | 1,523 ms → 353 ms latest median (-77%); 183 ms best optimized median |
| Initial transfer | 3,207 KiB → 185 KiB (-94%) |
| Constrained scroll rate | approximately 30 FPS → 60 FPS |
| Median missed frames in the orbit benchmark | 34 → 0 |

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

### 15. Remove the retired site and lighten below-fold cards

Removed the complete retired Jekyll implementation after independently verifying that all seven posts and all 126 travel locations exist in the Astro site. The live wall-of-shame data remains because the Yann article still consumes it. The repository change deletes 235 obsolete files and approximately 10.1 MB while preserving the generated CNAME, robots file, RSS feed, travel route, and all article routes.

The active site was also narrowed to its real content model: unused project, work, legal, MDX, copy-code, view-transition, and light-theme branches were removed. This reduced client modules from 26 to 24, the search bundle from 22.90 KB to 22.33 KB, and the largest generated CSS file from 51,175 bytes to 50,503 bytes.

Finally, the three lazy homepage transmission-card images now use dedicated 800 x 600 WebP derivatives. Their combined transfer size fell from 604 KB to 168 KB, a 72% reduction, without changing article hero quality.

Measured on 2026-08-04 against the local production preview with five mobile runs at 4x CPU throttling:

| Metric | Median |
| --- | ---: |
| Frame time | 16.7 ms |
| 95th-percentile frame time | 16.8 ms |
| 99th-percentile frame time | 33.4 ms |
| Missed frames | 1 |
| Severe frames | 0 |
| Long animation frames | 0 |
| Earth-to-singularity center error | 0.39 px |

The first cold run remains more variable than warm runs on highly constrained devices, but the median active orbit path remains at approximately 60 FPS. This experiment is retained.

Cross-device verification used the same five-run, 4x CPU-throttled benchmark:

| Mobile viewport | Median frame | P95 frame | Missed frames | Severe frames | Center error |
| --- | ---: | ---: | ---: | ---: | ---: |
| 360 x 640 @3 | 16.7 ms | 16.8 ms | 1 | 0 | 0.39 px |
| 412 x 830 @2.625 | 16.7 ms | 16.8 ms | 1 | 0 | 0.39 px |
| 768 x 1024 @2 | 16.7 ms | 16.8 ms | 3 | 1 | 0.28 px |

The smallest phone now matches the Pixel-sized median. Tablet performance is still close to 60 FPS under the artificial slowdown, so extending the lower-resolution phone rendering profile to tablets is not justified yet.

### 16. Remove the client framework and per-frame asteroid layout work

Replaced the Solid/Fuse search implementation with a small native Astro component and plain browser search. Solid, its Astro integration, Fuse, and two unused class-name helpers were removed, eliminating 103 installed packages. The production client graph fell from 24 modules and four JavaScript chunks to 14 modules and one chunk. The homepage client bundle fell from 47.76 KB to 43.13 KB raw (9.7%), while search no longer downloads the roughly 40 KB of raw framework and search-library chunks it previously required.

The AGI asteroid had also been reading its layout and resetting its WebGL viewport on every animation frame. Its displayed buffer varied only between roughly 263 and 284 pixels, so it now uses one fixed 288-pixel drawing buffer. This removes a forced layout from the hot animation loop without lowering the visible resolution.

Two small identity marks were resized to their actual high-DPI display needs, reducing their combined size from 69.9 KB to 8.1 KB. The two local fonts were converted from WOFF to WOFF2, saving another 8.6 KB. Total Lighthouse transfer fell from 552.6 KB in the retained reference run to 481.1 KB, a 12.9% reduction.

Measured on 2026-08-04 against the local production preview. Lighthouse values are the median of three independent mobile runs; scroll values are the median of seven runs at 4x CPU throttling.

| Cold-load metric | Reference | After | Change |
| --- | ---: | ---: | ---: |
| Lighthouse performance | 86 | 92 | +6 points |
| First contentful paint | 1.1 s | 1.1 s | unchanged |
| Largest contentful paint | 3.3 s | 2.9 s | -12% |
| Total blocking time | 310 ms | 181 ms | -42% |
| Transferred bytes | 552.6 KB | 481.1 KB | -12.9% |

| Constrained scroll metric | Median |
| --- | ---: |
| Frame time | 16.7 ms |
| 95th-percentile frame time | 16.8 ms |
| 99th-percentile frame time | 33.4 ms |
| Missed frames | 1 |
| Severe frames | 0 |
| Long animation frames | 0 |
| Earth-to-singularity center error | 0.39 px |

Three plausible optimizations were rejected after measurement: delaying the visual initializers increased total blocking time, pre-rendering all SVG trails increased layout cost, and `content-visibility` on the lower homepage produced no consistent improvement. All three were reverted. The retained changes reduce startup and maintenance cost while preserving the established steady-scroll result.

### 17. Remove global script requests and invisible animation work

Folded the two sub-kilobyte global scripts into the header and footer components that own their behavior, deleting two files and two requests on every route. Four homepage sections and the footer previously completed one-second entrance transitions while still far below the viewport; those meaningless offscreen transitions were removed while preserving the visible hero reveal.

Measured on 2026-08-04 against the local production preview. Lighthouse values are the median of three mobile runs; scroll values are the median of seven runs at 4x CPU throttling.

| Cold-load metric | Median |
| --- | ---: |
| Lighthouse performance | 93 |
| First Contentful Paint | 1.06 s |
| Largest Contentful Paint | 3.01 s |
| Total Blocking Time | 183 ms |
| Main-thread work | 3.35 s |
| Transferred bytes | 469 KiB |
| Network requests | 19 |

The results remain inside the previous run-to-run envelope while simplifying the shipped page and removing two requests. The constrained scroll median remains 16.7 ms with one missed frame, no severe frames, and a 0.39-pixel Earth-to-singularity center error.

Two alternatives were rejected and reverted: viewport-triggering every reveal moved occasional transition work into the orbit scroll, and explicitly decoding the Earth texture before WebGL upload did not reduce the measured upload task. The retained version removes work rather than rescheduling it.

### 18. Precompute travel-marker geometry

The globe previously recalculated four trigonometric functions for each of 126 fixed locations on every rendered frame. Latitude and longitude terms are now prepared once, while each frame computes only the shared Earth-rotation and tilt terms. Marker clustering now compares squared distances instead of repeatedly calculating square roots, and marker painting iterates backward without allocating and reversing a copy of the cluster array.

The new projection is algebraically equivalent to the original; a sweep across all locations and 90 rotation angles produced a maximum coordinate difference of `5.33e-16`. In an isolated five-run benchmark of the location-projection loop, median execution fell from 103.3 ms to 6.3 ms, a 94% reduction. This measures the optimized math rather than the complete globe renderer, but it represents recurring CPU and battery work while the Earth is moving.

The production bundle grows by approximately 0.2 KB raw to carry the prepared values, while removing roughly 500 trigonometric calls per rendered globe frame. This experiment is retained.

### 19. Defer offscreen media and right-size persistent assets

The browser's native lazy-loading threshold still fetched all three selected-transmission thumbnails during the initial homepage load, even though the first card starts roughly 740 pixels below a Pixel-sized viewport. The cards now begin loading independently when they enter a 300-pixel approach margin. They retain fixed dimensions, so this removes startup competition without introducing layout shift; a mobile interaction check confirmed that no card artwork is requested at the top of the page and that each image is complete before it reaches the viewport during normal scrolling.

The persistent sky, Earth, and AGI material images were also conservatively re-encoded for their actual use. The mobile star field fell from 84.5 KB to 51.2 KB, the mobile Earth texture from 88.7 KB to 67.9 KB, and the grayscale asteroid surface from 37.2 KB to 9.9 KB. Desktop equivalents were similarly reduced. Side-by-side inspections of the star field, globe texture, and focused asteroid showed no perceptible change at rendered size. The two local fonts were subset to full Western Latin plus every additional punctuation and symbol present in the site, reducing their combined size from 38.0 KB to 25.9 KB.

Measured on 2026-08-04 against the local production preview after all retained changes. Lighthouse values are the median of three mobile runs; scroll values are the median of seven runs at 4x CPU throttling.

| Cold-load metric | Experiment 17 | After | Change |
| --- | ---: | ---: | ---: |
| Lighthouse performance | 93 | 90 | within long-task run variance |
| First Contentful Paint | 1.06 s | 1.06 s | unchanged |
| Largest Contentful Paint | 3.01 s | 2.26 s | -25% |
| Total Blocking Time | 183 ms | 367 ms | variable long-task grouping |
| Transferred bytes | 469 KiB | 212 KiB | -55% |
| Network requests | 19 | 16 | -3 |

| Constrained scroll metric | Median |
| --- | ---: |
| Frame time | 16.7 ms |
| 95th-percentile frame time | 16.8 ms |
| 99th-percentile frame time | 33.4 ms |
| Missed frames | 1 |
| Severe frames | 0 |
| Long animation frames | 0 |
| Earth-to-singularity center error | 0.39 px |

Three related experiments were rejected. SVG geometry sharing via `<use>` reduced attribute writes but made reference resolution much slower. Replacing the trails with two canvases produced a perfect steady-scroll median but created a 534–657 ms cold-start drawing task. Inlining every stylesheet painted about 150 ms earlier, but transferred roughly 10 KB more on the first page and discarded cross-page stylesheet caching; the external stylesheets were retained for the site's multi-page reading flow.

### 20. Compact the globe payload and measure cold starts separately

The 126 travel locations were previously compiled as repeated JavaScript object literals in the homepage's critical module. They are now emitted once as compact coordinate/name tuples in inert page data and parsed natively when the globe initializes. This removes the location catalog from JavaScript evaluation and reduces the critical client module from 43.75 KB to 37.40 KB raw (-14.5%) and from 15.87 KB to 13.17 KB compressed (-17%). The source-of-truth location file and the rendered country index remain unchanged.

The mobile globe now uses a carefully checked 1536 × 768 Earth texture instead of decoding the 2048 × 1024 version. Encoded transfer falls from 67.9 KB to 40.1 KB (-41%), while decoded pixel memory falls from 8 MiB to 4.5 MiB (-44%). In throttled startup traces, the image decode task fell from 42.9 ms to 30.0 ms (-30%) and the complete Earth image-load handler fell from 86.5 ms to 62.9 ms (-27%). Side-by-side phone captures preserve the coastlines, lights, cloud bands, and overall sharpness at the rendered size. Desktop and tablet now use their 4K Earth texture for both the temporary fallback and WebGL globe, avoiding a second Earth request; the superseded 2K asset was removed.

The scroll benchmark now reports the first run and the warm-run median separately. This prevents the site's steady 60 FPS median from hiding intermittent cold-start work and gives the next round a stable target without changing the benchmark's existing all-run summary.

Measured on 2026-08-04 against the local production preview. Lighthouse values are the median of five mobile runs; scroll values are the median of nine runs at 4x CPU throttling.

| Cold-load metric | Experiment 19 | After | Change |
| --- | ---: | ---: | ---: |
| Lighthouse performance | 90 | 93 | +3 points |
| First Contentful Paint | 1.06 s | 1.06 s | unchanged |
| Largest Contentful Paint | 2.26 s | 2.04 s | -10% |
| Total Blocking Time | 367 ms | 296 ms | -19%; still run-variable |
| Transferred bytes | 212 KiB | 185 KiB | -13% |
| Network requests | 16 | 16 | unchanged |

| Constrained scroll metric | Nine-run median | Warm-run median | Cold first run |
| --- | ---: | ---: | ---: |
| Frame time | 16.7 ms | 16.7 ms | 16.7 ms |
| 95th-percentile frame time | 16.8 ms | 16.8 ms | 66.6 ms |
| Missed frames | 0 | 0 | 7 |
| Severe frames | 0 | 0 | 4 |
| Earth-to-singularity center error | 0.39 px | 0.39 px | 0.39 px |

Three alternatives were rejected after isolated tests. Disabling WebGL antialiasing did not improve the cold run. Loading the travel panel as a separate on-demand module reduced the entry bundle slightly but made the first and second constrained runs less consistent. Removing the animated dust layer from mobile comet trails did not measurably improve the remaining startup spike, so the full visual was retained. The compact-data and Earth-texture changes are retained.

### 21. Remove animation allocations and per-element listeners

The comet trail renderer previously built three temporary arrays per orbital object on every draw: one array of projected points and separate front/back command arrays. Trail projection, body occlusion, depth splitting, and path construction now happen in one pass. With nine orbital objects, this eliminates 27 short-lived arrays per draw, or approximately 540 allocations per second on the mobile rendering profile. Empty front/back trail layers also stop receiving redundant path and gradient writes until their state changes.

Two interaction systems were simplified at the same time. Comet telemetry now uses two delegated pointer listeners instead of three closures for every object, and the travel index uses one listener for its progress controls and one for its complete panel instead of attaching handlers to every continent, country, planet, and close button. That removes approximately 70 listener registrations while preserving hover telemetry, country targeting, keyboard escape behavior, and the expanding continent transitions. The runtime source is 26 lines shorter; the production module falls slightly from 37.40 KB to 37.20 KB raw while compressed transfer remains effectively unchanged.

The benchmark gained two explicit modes so this work could be measured rather than inferred: independent cold runs launch a fresh browser process for every sample, and idle-hero runs measure the continuously moving globe and comet system without the scroll controller parking that work. The existing scroll benchmark remains the primary interaction test.

Measured on 2026-08-04 at 412 × 830 under a deliberately severe 6x CPU slowdown. Each cold result is the median of five independent browser launches; each warm result is the median of six warmed runs over three seconds.

| Animated-hero metric | Before | After | Change |
| --- | ---: | ---: | ---: |
| Independent-cold sampled frames | 140 | 159 | +14% |
| Independent-cold missed frames | 36 | 21 | -42% |
| Independent-cold severe frames | 1 | 0 | eliminated |
| Warm sampled frames | 135 | 160 | +19% |
| Warm missed frames | 48 | 32 | -33% |
| Warm severe frames | 3 | 0 | eliminated |
| Approximate warm frame rate | 45 FPS | 53 FPS | +18% |

The standard 4x CPU orbit benchmark remains at a 16.7 ms median frame, zero warm missed frames, and a 0.39-pixel Earth-to-singularity center error. An attempted metadata implementation that wrote telemetry values into every comet's DOM increased source and bundle size, so it was rejected in favor of the smaller in-memory delegated version. This experiment is retained.

Five mobile cold-load audits produced a 91 median score, 2.11-second LCP, 353 ms of blocking time, and 185 KiB transferred. The load result remains inside the established long-task variance while the isolated animated-hero benchmark improves substantially; the optimization is retained for its repeatable runtime, allocation, listener, and maintainability gains rather than claiming a cold-load improvement.

### 22. Trim the shared icon sprite and reject marker pooling

The shared interface sprite still contained twelve icons retired with the old theme, sorting controls, and reading interface. Only menu, close, and search remain in use. Removing the dead symbols reduces the sprite from 7,498 bytes to 685 bytes (-91%) without changing any rendered icon. Seven orphaned Jekyll comment records were also removed; they were not read by the Astro build and never reached the deployed site. Together, this removes 141 source lines.

A reusable object pool for the globe's 126 projected travel markers was tested under the independent-cold idle-hero benchmark at 6x CPU slowdown. It reduced short-lived allocations, but increased the critical module by 0.27 KB and produced the same median result as the existing implementation: 160 sampled frames, 21 missed frames, and zero severe frames over three seconds. The pool was rejected because the measurable result did not justify the added state and code.

The retained sprite cleanup leaves the client module unchanged at 37.20 KB raw / 13.19 KB compressed. A final mobile cold-load audit scored 96 with a 1.96-second LCP, 199 ms of blocking time, 184 KiB transferred, and 16 requests. This single audit is recorded as a smoke check rather than a new median; the established five-run median remains the comparison baseline.

### 23. Add adaptive city labels without sacrificing the hero frame budget

Visible travel locations now receive small, clickable telemetry labels. The label pass prioritizes front-facing cities, clusters nearby points, tests four placements, rejects collisions, and caps output at ten labels on constrained devices or twenty-four on desktop. Labels disappear during a drag and refresh after the globe settles, so they remain useful without fighting direct manipulation. Clicking a label opens the existing coordinates and signal-count panel.

The first implementation painted labels into a second full-resolution canvas several times per second. It was visually correct but reduced the severe mobile idle-hero median to 116 sampled frames with 57 missed and two severe frames, so it was rejected. The retained implementation uses a lightweight DOM layer and refreshes only as fast as the globe's slow rotation requires: every 1.2 seconds on constrained devices and every 0.6 seconds elsewhere.

Measured on 2026-08-05 at 412 × 830. The animated-hero result is the median of five independent cold launches at 6x CPU slowdown; the orbit result is the warm median of five runs at 4x CPU slowdown.

| Metric | Experiment 22 baseline | Adaptive labels | Change |
| --- | ---: | ---: | ---: |
| Animated-hero sampled frames | 160 | 154 | -4% |
| Animated-hero missed frames | 21 | 25 | +4 frames |
| Animated-hero severe frames | 0 | 0 | unchanged |
| Orbit median frame time | 16.7 ms | 16.7 ms | unchanged |
| Orbit 95th-percentile frame time | 16.8 ms | 16.8 ms | unchanged |
| Orbit warm missed frames | 0 | 1 | +1 frame |
| Earth-to-singularity center error | 0.39 px | 0.39 px | unchanged |

The same change also removes the homepage's fixed negative content margin. The first content section now starts below the hero and rises progressively with orbit scroll, preventing it from covering the Countries, Planets, and Galaxies HUD at page load. The client module is 38.54 KB raw / 13.75 KB compressed; the 0.56 KB compressed increase includes both interactions. This implementation is retained because it stays close to the established idle-hero baseline and preserves a smooth 60 FPS warm scroll profile.
