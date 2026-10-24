---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Chart: React `renderTooltipBody` now receives the compact moduix body as `defaultBody`, like Solid and Vue, so a wrapped tooltip looks the same as the default one. Tooltip rows that TanStack marks as `active` are highlighted, and Solid `renderTooltipBody` now receives `primaryPoint`.
The CSS Modules packages keep 7 `--moduix-chart-*` variables instead of 22: the `--moduix-chart-tooltip-*` aliases, axis color, plot radius, border width, and focus-ring variables are removed. Override TanStack's `--ts-chart-tooltip-*` variables on `ChartPlot` instead, and set other styles with a class on the part.
Tailwind packages style the tooltip through the same `--ts-chart-tooltip-*` variables instead of rewriting `definition.tooltip.className` with `!important` utilities, and `ChartLegendItem` draws its indicator with `::before` like the CSS Modules packages, so it no longer renders an extra span or special-cases `asChild`.