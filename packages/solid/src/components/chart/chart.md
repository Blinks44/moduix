# Chart

## Upstream reference

- TanStack Charts 1.5.0 published types and release-source docs:
  https://github.com/TanStack/charts/tree/v1.5.0/docs (accessed 2026-11-11)

- TanStack Charts: https://tanstack.com/charts/latest/docs/reference/chart
- TanStack Charts focus and interaction: https://tanstack.com/charts/latest/docs/reference/focus-and-interaction

## Purpose

`Chart` provides a styled figure and presentation parts around a TanStack Charts definition.

## Public contract

The flat API is `Chart`, `ChartPlot`, `ChartHeader`, `ChartTitle`, `ChartDescription`, `ChartLegend`, and `ChartLegendItem`. `ChartPlot` mounts the TanStack chart host; mark, scale, and interaction definitions belong to TanStack Charts.

`chartColors` is a readonly tuple of `var(--moduix-chart-1)` through `var(--moduix-chart-8)`. Pass
it, or a slice of it, to a TanStack color `range` and reuse the same entries for
`ChartLegendItem` colors so the plot and legend stay in sync with the active theme.

## Preservation notes

- TanStack Charts 1.1+ removes native card styling for framework-rendered tooltip bodies.
  The moduix surface restores the existing card presentation and consumes TanStack's CSS variables.
  Require at least 1.1 to avoid a second native card around the moduix surface.
- Charts 1.2 adds `motionLite()` from `@tanstack/charts/motion/lite`. Consumers can pass it through
  the existing `renderer` prop for fade entrances and keyed SVG tweens.
  This does not shrink the moduix bundle: `ChartPlot` still imports the default full motion renderer.
  Keep `motion()` as the default: lite omits springs, specialized entrances, and tooltip motion.

- Preserve TanStack's chart definition, focus, interaction, and tooltip contracts instead of adding a moduix chart DSL.
- In Solid, keep chart setup reactive and dispose the host in `onCleanup` when its owner is removed.
- TanStack's official Solid entry in v1 accepts `renderSvg`, not `ChartRenderer`. Keep
  `createChartRendererAdapter` to preserve the default moduix motion preset and custom renderers.
- `@tanstack/charts` is an optional peer dependency with the range `^1.1.0`.

## Styling and accessibility

moduix renders a `chart-tooltip-surface` around both default and custom tooltip bodies. This
surface reads the host's `--ts-chart-tooltip-*` variables for its card styling, including when
TanStack disables its own card for framework-rendered content.

Keep `data-scope="chart"`, `data-part`, and `data-slot` hooks. `ChartPlot` forwards its styling and host props to the TanStack container and sets TanStack's `--ts-chart-tooltip-*` variables there.

The default tooltip body is the compact moduix layout. Rows that TanStack marks as `active` get `data-active` and a muted highlight. A custom `renderTooltipBody` receives it as `defaultBody`, together with TanStack's `primaryPoint`, `points`, `content`, `pinned`, and `dismiss`.