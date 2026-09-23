# Chart

## Upstream reference

- TanStack Charts: https://tanstack.com/charts/latest/docs/reference/chart
- TanStack Charts focus and interaction: https://tanstack.com/charts/latest/docs/reference/focus-and-interaction

## Purpose

`Chart` provides a styled figure and presentation parts around a TanStack Charts definition.

## Public contract

The flat API is `Chart`, `ChartPlot`, `ChartHeader`, `ChartTitle`, `ChartDescription`, `ChartLegend`, and `ChartLegendItem`. `ChartPlot` mounts the TanStack chart host; mark, scale, and interaction definitions belong to TanStack Charts.

## Preservation notes

- Preserve TanStack's chart definition, focus, interaction, and tooltip contracts instead of adding a moduix chart DSL.
- In Solid, keep chart setup reactive and dispose the host in `onCleanup` when its owner is removed.

## Styling and accessibility

Keep `data-scope="chart"`, `data-part`, and `data-slot` hooks. `ChartPlot` forwards its styling and host props to the TanStack container.