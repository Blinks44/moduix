# Foundation

Internal source-only CSS foundation shared by the published moduix framework packages.

Each adapter builds these files into its own package. Components, CSS Modules, framework primitives, and JSX/SFC icon implementations stay in their respective adapter packages.

`src/styles/style.css` imports `tokens.css` only and is used by the CSS Modules packages without
any Tailwind directives. `src/styles/tailwind.css` imports `tokens.css` plus `tailwind-theme.css`
to expose the foundation through Tailwind v4 `@theme inline` namespaces:

- semantic colors, including status, chart, and sidebar colors;
- the sans and mono font families, `text-2xs`, and `size-control-{xs,sm,md,lg,xl}`;
- radii, shadows, opacity, focus outline widths/offsets, durations, easing curves, and shared
  animations.

Host Tailwind numeric spacing (`gap-*`, `p-*`) and standard typography (`text-xs`..`text-3xl`,
`font-*`) scales are intentionally left untouched so moduix never overrides a host application's
Tailwind defaults. Foundation categories without a Tailwind theme namespace, such as border widths,
scale factors, and z-index roles, remain CSS variables and can be referenced with Tailwind's
custom-property syntax when needed.

## CSS scopes

`data-moduix-theme` marks a token-override boundary; Dense, Soft, and Contrast are optional CSS
presets, not a runtime theme system. Components read color tokens such as `--moduix-primary`
directly, so color overrides work on any element. Derived spacing and radius steps are recalculated
only at each theme or color-scheme boundary: for scoped spacing or radius overrides, put
`data-moduix-theme` on the same element as the overrides.

Palettes use native `light-dark()` pairs. `:where(:root)` sets `color-scheme: light dark`, so the
default follows the user's system color scheme automatically. `.light` /
`data-moduix-color-scheme="light"` and `.dark` / `data-moduix-color-scheme="dark"` force an explicit
scheme on the root or nested opposite-scheme islands.
Native support requires Chrome/Edge 123+, Firefox 120+, and Safari/iOS 17.5+. Applications targeting
older browsers need a compatible CSS build strategy; raw foundation CSS has no legacy fallback.

Presets override only their declared tokens: a nested preset still inherits unspecified values
from its parent. Portals inherit from their DOM container, not the framework component tree;
use the component's `portalRef` when an overlay must remain in a local CSS scope.

Lightbox, CommandPalette, and Drawer in every shipped adapter consume foundation keyframes. CSS Modules retain
their public motion overrides; Tailwind uses the matching named animation utilities. Drawer
motion reads its content's island offset and bleed, without replacing Ark's swipe/snap transforms.