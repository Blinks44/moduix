# Chart

## Upstream reference

- TanStack Charts chart reference: https://tanstack.com/charts/latest/docs/reference/chart
  (accessed 2026-09-25)
- TanStack Charts adapter controller: https://tanstack.com/charts/latest/docs/reference/adapter-controller
  (accessed 2026-09-25)
- TanStack Charts SSR and hydration: https://tanstack.com/charts/latest/docs/guides/ssr-and-hydration
  (accessed 2026-09-25)
- TanStack Charts themes and styling: https://tanstack.com/charts/latest/docs/guides/themes-and-styling
  (accessed 2026-09-25)
- Installed @tanstack/charts 0.16.2 declarations and Vue adapter source (accessed 2026-09-25)

## Purpose

Provide a composed, styled figure around the framework-independent TanStack Charts definition and
the Vue renderer adapter host, using Tailwind utilities instead of component variables.

## Public contract

`Chart` is the Ark factory root. It renders a `figure` and accepts native props, `asChild`,
`class`, `style`, and a component ref exposing the `figure` through `$el`.

`ChartPlot` accepts the TanStack `ChartRendererHostOptions` contract from the framework-independent
adapter tier, except that `renderer` is optional. It defaults to the Moduix `motion()` preset. Set
`motion={false}` to use TanStack's static SVG renderer; an explicit `renderer` always takes
precedence. Definitions, responsiveness, accessibility props, and callbacks pass through unchanged,
including TanStack's optional `renderTooltipBody`.

By default, `ChartPlot` uses a compact Moduix tooltip layout, so rows without a swatch do not
reserve an empty column. When you provide `renderTooltipBody`, its `defaultBody` is the same compact
Moduix body, exposed as a `() => VNodeChild` render function matching TanStack's Vue adapter
convention.

`ChartHeader` renders `figcaption`. `ChartTitle`, `ChartDescription`, `ChartLegend`, and
`ChartLegendItem` provide the standard figure context. `ChartLegendItem` renders its indicator span
and accepts an optional `color` for it; with `asChild` the indicator is omitted and the child
becomes the host.

## Preservation notes

- Create `areaY`, `barX`, `barY`, `cell`, `dot`, `lineY`, `pie`, `polar`, `radialArc`, scales, axes,
  layouts, focus behavior, and interactions with `@tanstack/charts`; moduix does not mirror the mark
  API or add a second definition DSL.
- TanStack's official Vue entry is SVG-only, so `ChartPlot` drives `createChartRendererAdapter` from
  `@tanstack/charts/adapter/renderer` directly, mirroring the Solid adapter. This is the documented
  renderer-neutral tier for hosts that expose an application-selected `ChartRenderer`, and it keeps
  the moduix motion preset and custom renderers available.
- The default Moduix `motion()` preset animates initial geometry, keyed updates, focus guides, and
  the native tooltip. It respects `prefers-reduced-motion` by default. `motion={false}` disables the
  renderer animation entirely.
- The adapter lifecycle follows the documented controller contract: `prerender()` at setup,
  `update()` plus `mount()` on mount, `update()` through an options watcher, and `destroy()` on
  unmount. One controller is kept per component instance.
- Tailwind variants style the TanStack tooltip shell by merging utilities into the definition's
  `tooltip.className` through `withTooltipStyles`, so consumer `tooltip.className` values keep
  precedence. The CSS Modules track maps the same shell through `--ts-chart-tooltip-*` variables
  instead.
- `renderTooltipBody` is an escape hatch for Vue-owned tooltip content rendered through a Teleport
  into TanStack's tooltip element. Its `defaultBody` is a render function over the current target
  content. TanStack owns tooltip anchoring, placement, pinned state, portalling, and dismissal;
  interactive content renders only while pinned.
- The internal focusable SVG keeps TanStack keyboard navigation and receives the moduix focus ring
  through arbitrary variants on the host. Do not disable `focusRing` unless the definition provides
  replacement focus geometry.
- `@tanstack/charts` is an optional peer dependency. The current moduix peer range is `^0.16.0`.

## Styling and accessibility

The root and presentational parts expose stable `data-scope="chart"`, `data-part`, and `data-slot`
hooks. `class` and `style` on `ChartPlot` apply to the outer TanStack host. The compact default body
exposes `chart-tooltip-body`, `chart-tooltip-title`, `chart-tooltip-rows`, `chart-tooltip-row`,
`chart-tooltip-swatch`, `chart-tooltip-label`, `chart-tooltip-value`, and `chart-tooltip-text` data
slots. Tailwind consumers override part defaults with utility `class` values and style the tooltip
shell through TanStack's `tooltip.className`.

Every plot requires a concise `ariaLabel`. Use `ariaDescription` when the visible title and
description do not fully explain the data. The root is a `figure` and its header is the first
`figcaption` by default.

## Differences from upstream

- Chakra uses a chart root around a Recharts tree; moduix exposes the flat `Chart` root while
  `ChartPlot` mounts a complete TanStack definition.
- TanStack's Vue `Chart` slot is not used because it only supports `renderSvg`; the adapter tier
  preserves the moduix `motion` and `renderer` contract.
- Ark `Tooltip` is not used because TanStack already owns the plot focus anchor and tooltip
  lifecycle.

## Local changelog

- 2026-09-25: Initial Vue port following the React and Solid flat contract with the TanStack
  renderer adapter.