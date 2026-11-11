import Chart from './Chart.vue';
import ChartDescription from './ChartDescription.vue';
import ChartHeader from './ChartHeader.vue';
import ChartLegend from './ChartLegend.vue';
import ChartLegendItem from './ChartLegendItem.vue';
import ChartPlot from './ChartPlot.vue';
import ChartTitle from './ChartTitle.vue';

// Theme-aware chart palette for TanStack color scales and legend indicators.
const chartColors = [
  'var(--moduix-chart-1)',
  'var(--moduix-chart-2)',
  'var(--moduix-chart-3)',
  'var(--moduix-chart-4)',
  'var(--moduix-chart-5)',
  'var(--moduix-chart-6)',
  'var(--moduix-chart-7)',
  'var(--moduix-chart-8)',
] as const;

export {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
  chartColors,
};