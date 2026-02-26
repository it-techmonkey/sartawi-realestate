# Image dimensions for Sartawi Real Estate

Use these dimensions when preparing or serving images so the site stays consistent and loads quickly.

| Use case | Width × Height (px) | Aspect ratio |
|----------|---------------------|--------------|
| **Property / developer cards** (grids, featured) | **400 × 300** | 4:3 |
| **Property detail hero** (main image) | **800 × 450** | 16:9 |
| **Property gallery thumbnails** | **200 × 150** | 4:3 |
| **Developer logo** (list/carousel) | **160 × 60** | — |

- Prefer JPEG/WebP for photos; keep file sizes small (e.g. &lt; 200 KB per card image).
- These values are defined in `src/lib/imageDimensions.js` and used by `ExternalImage` and related components.
