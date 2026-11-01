# Foundation

Internal source-only CSS foundation shared by the published moduix framework packages.

Each adapter builds these files into its own package. Components, CSS Modules, framework primitives, and JSX/SFC icon implementations stay in their respective adapter packages.

`src/styles/style.css` exposes the foundation through Tailwind v4 theme namespaces:

- semantic colors, including chart and sidebar colors;
- the sans and mono families, font weights, and text sizes with their line heights;
- the numeric spacing scale and `size-control-{xs,sm,md,lg,xl}`;
- radii, shadows, easing curves, and shared animations.

Standard spacing utilities such as `gap-3` and `p-3` resolve through the moduix spacing tokens, so
runtime presets remain effective. Foundation categories without a
Tailwind theme namespace, such as border widths, opacity, durations, scale factors, and z-index
roles, remain CSS variables and can be used through Tailwind's custom-property syntax when a
component needs them.

## CSS scopes

`data-moduix-theme` marks a token-override boundary; Dense, Soft, and Contrast are optional CSS
presets, not a runtime theme system. Components read color tokens such as `--moduix-primary`
directly, so color overrides work on any element. Derived spacing and radius steps are recalculated
only at each theme or color-scheme boundary: for scoped spacing or radius overrides, put
`data-moduix-theme` on the same element as the overrides.

Palettes use native `light-dark()` pairs. `data-moduix-color-scheme="light"` or `"dark"` sets the
inherited `color-scheme`, including nested opposite-scheme islands; the default is explicitly light.
Native support requires Chrome/Edge 123+, Firefox 120+, and Safari/iOS 17.5+. Applications targeting
older browsers need a compatible CSS build strategy; raw foundation CSS has no legacy fallback.

Presets override only their declared tokens: a nested preset still inherits unspecified values
from its parent. Portals inherit from their DOM container, not the framework component tree;
use the component's `portalRef` when an overlay must remain in a local CSS scope.

Lightbox, CommandPalette, and Drawer in every shipped adapter consume foundation keyframes. CSS Modules retain
their public motion overrides; Tailwind uses the matching named animation utilities. Drawer
motion reads its content's island offset and bleed, without replacing Ark's swipe/snap transforms.