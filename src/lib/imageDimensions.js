/**
 * Standard image dimensions across the site for consistency and faster loading.
 * Use these when rendering property/developer images.
 *
 * DIMENSIONS:
 * - CARD (property/developer cards in grids): 400 x 300 (4:3)
 * - DETAIL_HERO (property detail main image): 800 x 450 (16:9)
 * - DETAIL_GALLERY (property gallery thumbs): 200 x 150 (4:3)
 * - DEVELOPER_LOGO (developer list logo): 160 x 60
 *
 * For faster loading: request smaller sizes from API if supported, or use
 * Next.js Image sizes prop to serve appropriate resolution per viewport.
 */
export const IMAGE = {
  CARD_WIDTH: 400,
  CARD_HEIGHT: 300,
  DETAIL_HERO_WIDTH: 800,
  DETAIL_HERO_HEIGHT: 450,
  GALLERY_THUMB_WIDTH: 200,
  GALLERY_THUMB_HEIGHT: 150,
  DEVELOPER_LOGO_WIDTH: 160,
  DEVELOPER_LOGO_HEIGHT: 60,
};
