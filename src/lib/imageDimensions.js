/**
 * Standard image dimensions across the site. We use higher resolutions for
 * sharper display; property images prefer cover.src / photo.src (full size) over logo URLs.
 *
 * DIMENSIONS:
 * - CARD (property/developer cards in grids): 800 x 600 (4:3, high-res)
 * - DETAIL_HERO (property detail main image): 1600 x 900 (16:9)
 * - DETAIL_GALLERY (property gallery thumbs): 400 x 300 (4:3)
 * - DEVELOPER_LOGO (developer list logo): 160 x 60
 */
export const IMAGE = {
  CARD_WIDTH: 800,
  CARD_HEIGHT: 600,
  DETAIL_HERO_WIDTH: 1600,
  DETAIL_HERO_HEIGHT: 900,
  GALLERY_THUMB_WIDTH: 400,
  GALLERY_THUMB_HEIGHT: 300,
  DEVELOPER_LOGO_WIDTH: 160,
  DEVELOPER_LOGO_HEIGHT: 60,
};
