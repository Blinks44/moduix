export { default as Chart } from './Chart.svelte';
export { default as ChartDescription } from './ChartDescription.svelte';
export { default as ChartHeader } from './ChartHeader.svelte';
export { default as ChartLegend } from './ChartLegend.svelte';
export { default as ChartLegendItem } from './ChartLegendItem.svelte';
export { default as ChartPlot } from './ChartPlot.svelte';
export { default as ChartTitle } from './ChartTitle.svelte';

// Theme-aware chart palette for TanStack color scales and legend indicators.
export const chartColors = [
  'var(--moduix-chart-1)',
  'var(--moduix-chart-2)',
  'var(--moduix-chart-3)',
  'var(--moduix-chart-4)',
  'var(--moduix-chart-5)',
  'var(--moduix-chart-6)',
  'var(--moduix-chart-7)',
  'var(--moduix-chart-8)',
] as const;

export type { ChartLegendItemProps } from './ChartLegendItem.svelte';
export type { ChartPlotProps, ChartTooltipBodyRenderContext } from './ChartPlot.svelte';