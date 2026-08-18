# Chart

## Upstream reference

- TanStack Charts React chart reference: https://tanstack.com/charts/latest/docs/framework/react/reference/chart
  (accessed 2026-08-18)
- TanStack Charts focus and interaction: https://tanstack.com/charts/latest/docs/reference/focus-and-interaction
  (accessed 2026-08-18)
- TanStack Charts motion: https://tanstack.com/charts/latest/docs/reference/motion
  (accessed 2026-08-18)
- TanStack Charts polar marks: https://tanstack.com/charts/latest/docs/reference/marks/polar
  (accessed 2026-08-18)
- TanStack Charts themes and styling: https://tanstack.com/charts/latest/docs/guides/themes-and-styling
  (accessed 2026-08-18)
- shadcn Chart: https://ui.shadcn.com/docs/components/base/chart (accessed 2026-08-18)
- shadcn Pie Chart: https://ui.shadcn.com/charts/pie (accessed 2026-08-18)
- Chakra UI Charts: https://chakra-ui.com/docs/charts/installation (accessed 2026-08-18)
- Chakra UI Donut Chart: https://chakra-ui.com/docs/charts/donut-chart (accessed 2026-08-18)

## Purpose

Provide a composed, styled figure around the framework-independent TanStack Charts definition and
React host.

## Public contract

`Chart` and `Chart.Root` are the same Ark factory root. They render a `figure` and accept native
props, `asChild`, `className`, `style`, and an `HTMLElement` ref.

`Chart.Plot` accepts the TanStack `RendererChartProps` contract from
`@tanstack/charts/react/tooltip`, except that `renderer` is optional. It defaults to the Moduix
`motion()` preset. Set `motion={false}` to use TanStack's static SVG renderer; an explicit
`renderer` always takes precedence. Definitions, responsiveness, accessibility props, and callbacks
pass through unchanged. A custom `renderTooltipBody` receives the Moduix default body in
`defaultBody`, while the remaining context stays native to TanStack.

`Chart.Header` renders `figcaption`. `Chart.Title`, `Chart.Description`, `Chart.Legend`, and
`Chart.LegendItem` provide the standard figure context. `Chart.LegendItem` accepts an optional
`color` for its indicator. `Chart.TooltipContent` lays out React content returned from
`renderTooltipBody` inside the native TanStack tooltip shell.

## Preservation notes

- Create `areaY`, `barX`, `barY`, `cell`, `dot`, `lineY`, `pie`, `polar`, `radialArc`, scales, axes,
  layouts, focus behavior, and interactions with `@tanstack/charts`; moduix does not mirror the mark
  API or add a second definition DSL.
- The default Moduix `motion()` preset animates initial geometry, keyed updates, focus guides, and the
  native tooltip. It respects `prefers-reduced-motion` by default. `motion={false}` disables the
  renderer animation entirely.
- Keep `defaultBody` inside `Chart.TooltipContent`. Moduix builds that body from TanStack's official
  `content` model. TanStack owns tooltip anchoring, placement, pinned state, portalling, and
  dismissal. Interactive tooltip content renders only while pinned.
- The internal focusable SVG keeps TanStack keyboard navigation and receives the moduix focus ring.
  Do not disable `focusRing` unless the definition provides replacement focus geometry.
- `@tanstack/charts` is an optional peer dependency. Version 0.14 requires React 19.

## Styling and accessibility

The root and presentational parts expose stable `data-scope="chart"`, `data-part`, and `data-slot`
hooks. `className` and `style` on `Chart.Plot` apply to the outer TanStack host. moduix maps its
shell variables to TanStack's official `--ts-chart-tooltip-*` contract. The Moduix-owned default
body exposes `chart-tooltip-body`, `chart-tooltip-title`, `chart-tooltip-rows`,
`chart-tooltip-row`, `chart-tooltip-swatch`, `chart-tooltip-label`, and `chart-tooltip-value` data
slots. This keeps
single-series rows compact and makes customization possible without `!important` or dependency
selectors.

Every plot requires a concise `ariaLabel`. Use `ariaDescription` when the visible title and
description do not fully explain the data. The root is a `figure` and its header is the first
`figcaption` by default.

## Differences from upstream

- Chakra uses `Chart.Root` around a Recharts tree; moduix keeps that root naming while
  `Chart.Plot` mounts a complete TanStack definition.
- shadcn keeps its chart engine unwrapped and adds tooltip and legend presentation. moduix follows
  the same boundary without adding a label/color config that duplicates TanStack color scales.
- Ark `Tooltip` is not used because TanStack already owns the plot focus anchor and tooltip
  lifecycle.

## Local changelog

- 2026-08-18: Made `Chart` / `Chart.Root` the figure root, moved the TanStack host to `Chart.Plot`,
  added default native motion, aligned focus and tooltip styling, and renamed the React tooltip
  body part to `Chart.TooltipContent`.
- 2026-08-18: Added `motion={false}` and collapsed empty native tooltip swatch columns.
- 2026-08-18: Replaced the dependency-owned default tooltip body with stable Moduix slots and CSS
  properties, removed specificity overrides, and documented how TanStack definitions select chart
  types.
- 2026-08-18: Reduced the default tooltip typography to the extra-small text scale and exposed its
  font size and line height as component CSS properties.