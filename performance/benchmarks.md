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
