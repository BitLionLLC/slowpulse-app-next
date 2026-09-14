/** X reads `twitter:image` and falls back to `og:image` only when it's
 *  absent; naming it explicitly keeps the summary_large_image card honest.
 *  Same artwork, so the route is a re-export rather than a second design. */
export { default, alt, size, contentType } from "./opengraph-image";
