# Chart

## Upstream reference

- TanStack Charts 1.0.0 published types and release-source docs:
  https://github.com/TanStack/charts/tree/v1.0.0/docs (accessed 2026-10-06)

- TanStack Charts: https://tanstack.com/charts/latest/docs/reference/chart
- TanStack Charts focus and interaction: https://tanstack.com/charts/latest/docs/reference/focus-and-interaction

## Purpose

`Chart` provides a styled figure and presentation parts around a TanStack Charts definition.

## Public contract

The flat API is `Chart`, `ChartPlot`, `ChartHeader`, `ChartTitle`, `ChartDescription`, `ChartLegend`, and `ChartLegendItem`. `ChartPlot` mounts the TanStack chart host; mark, scale, and interaction definitions belong to TanStack Charts.

## Preservation notes

- Preserve TanStack's chart definition, focus, interaction, and tooltip contracts instead of adding a moduix chart DSL.
- In Solid, keep chart setup reactive and dispose the host in `onCleanup` when its owner is removed.
- TanStack's official Solid entry in v1 accepts `renderSvg`, not `ChartRenderer`. Keep
  `createChartRendererAdapter` to preserve the default moduix motion preset and custom renderers.
- `@tanstack/charts` is an optional peer dependency with the range `^1.0.0`.

## Styling and accessibility

Keep `data-scope="chart"`, `data-part`, and `data-slot` hooks. `ChartPlot` forwards its styling and host props to the TanStack container.