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
