# Foundation

Internal source-only CSS foundation shared by the published moduix framework packages.

Each adapter builds these files into its own package. Components, CSS Modules, framework primitives, and JSX/SFC icon implementations stay in their respective adapter packages.

`src/styles/style.css` exposes the foundation through Tailwind v4 theme namespaces:

- semantic colors, including chart and sidebar colors;
- the sans and mono families, font weights, text sizes with their line heights, and tracking;
- the numeric spacing scale, semantic `*-space-{xs,sm,md,lg,xl,2xl}` utilities, and
  `size-control-{xs,sm,md,lg,xl}`;
- radii, shadows, easing curves, and shared animations.

Standard spacing utilities such as `gap-3` and `p-3` resolve through the moduix spacing tokens, so
runtime presets remain effective. Semantic spacing uses the extra `space-` segment to avoid
overriding Tailwind's standard size names such as `max-w-lg`. Foundation categories without a
Tailwind theme namespace, such as border widths, opacity, durations, scale factors, and z-index
roles, remain CSS variables and can be used through Tailwind's custom-property syntax when a
component needs them.