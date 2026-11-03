# Chart

## Upstream reference

- TanStack Charts 1.2.0 published types and release-source docs:
  https://github.com/TanStack/charts/tree/v1.2.0/docs (accessed 2026-11-03)

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

`Chart` is the Ark factory root. It renders a `figure` and accepts native
props, `asChild`, `className`, `style`, and an `HTMLElement` ref.

`ChartPlot` accepts the TanStack `RendererChartProps` contract from
`@tanstack/charts/react/tooltip`, except that `renderer` is optional. It defaults to the moduix
`motion()` preset. Set `motion={false}` to use TanStack's static SVG renderer; an explicit
`renderer` always takes precedence. Definitions, responsiveness, accessibility props, and callbacks
pass through unchanged, including TanStack's optional `renderTooltipBody`.

By default, `ChartPlot` uses a compact moduix tooltip layout, so rows without a swatch do not
reserve an empty column. Rows that TanStack marks as `active` get `data-active` and a muted highlight. When you provide `renderTooltipBody`, its
`defaultBody` is the same compact moduix body.

`ChartHeader` renders `figcaption`. `ChartTitle`, `ChartDescription`, `ChartLegend`, and
`ChartLegendItem` provide the standard figure context. `ChartLegendItem` accepts an optional
`color` for its indicator.

## Preservation notes

- TanStack Charts 1.1+ removes native card styling for framework-rendered tooltip bodies.
  The moduix surface restores the existing card presentation and consumes TanStack's CSS variables.
  Require at least 1.1 to avoid a second native card around the moduix surface.
- Charts 1.2 adds `motionLite()` from `@tanstack/charts/motion/lite`. Consumers can pass it through
  the existing `renderer` prop for fade entrances and keyed SVG tweens.
  This does not shrink the moduix bundle: `ChartPlot` still imports the default full motion renderer.
  Keep `motion()` as the default: lite omits springs, specialized entrances, and tooltip motion.

- Create `areaY`, `barX`, `barY`, `cell`, `dot`, `lineY`, `pie`, `polar`, `radialArc`, scales, axes,
  layouts, focus behavior, and interactions with `@tanstack/charts`; moduix does not mirror the mark
  API or add a second definition DSL.
- The default moduix `motion()` preset animates initial geometry, keyed updates, focus guides, and the
  native tooltip. It respects `prefers-reduced-motion` by default. `motion={false}` disables the
  renderer animation entirely.
- `renderTooltipBody` is an upstream escape hatch for React-owned tooltip content. moduix supplies
  its compact `defaultBody` and card surface; TanStack handles tooltip anchoring, placement, pinned
  state, portalling, and dismissal. Interactive content renders only while pinned.
- The internal focusable SVG keeps TanStack keyboard navigation and receives the moduix focus ring.
  Do not disable `focusRing` unless the definition provides replacement focus geometry.
- `@tanstack/charts` is an optional peer dependency. The current moduix peer range is `^1.1.0`,
  and its React adapter supports React 18 and 19.

## Styling and accessibility

moduix renders a `chart-tooltip-surface` around both default and custom tooltip bodies. This
surface reads the host's `--ts-chart-tooltip-*` variables for its card styling, including when
TanStack disables its own card for framework-rendered content.

The root and presentational parts expose stable `data-scope="chart"`, `data-part`, and `data-slot`
hooks. `className` and `style` on `ChartPlot` apply to the outer TanStack host. moduix styles the
tooltip shell by setting TanStack's `--ts-chart-tooltip-*` variables on that host; consumers
override them there instead of through moduix aliases. The compact default
body exposes `chart-tooltip-body`, `chart-tooltip-title`, `chart-tooltip-rows`,
`chart-tooltip-row`, `chart-tooltip-swatch`, `chart-tooltip-label`, `chart-tooltip-value`, and
`chart-tooltip-text` data slots. Use TanStack's `tooltip.className` for custom selectors; do not
depend on its internal tooltip markup when using `renderTooltipBody`.

Every plot requires a concise `ariaLabel`. Use `ariaDescription` when the visible title and
description do not fully explain the data. The root is a `figure` and its header is the first
`figcaption` by default.

## Differences from upstream

- Chakra uses a chart root around a Recharts tree; moduix exposes the flat `Chart` root while
  `ChartPlot` mounts a complete TanStack definition.
- shadcn keeps its chart engine unwrapped and adds tooltip and legend presentation. moduix follows
  the same boundary without adding a label/color config that duplicates TanStack color scales.
- Ark `Tooltip` is not used because TanStack already owns the plot focus anchor and tooltip
  lifecycle.