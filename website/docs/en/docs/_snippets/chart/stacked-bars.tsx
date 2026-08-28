import { Chart } from '@moduix/react/chart';
import { barY, defineChart, stack } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

const revenue = [
  { quarter: 'Q1', segment: 'Product', value: 42 },
  { quarter: 'Q1', segment: 'Services', value: 18 },
  { quarter: 'Q2', segment: 'Product', value: 48 },
  { quarter: 'Q2', segment: 'Services', value: 24 },
  { quarter: 'Q3', segment: 'Product', value: 53 },
  { quarter: 'Q3', segment: 'Services', value: 31 },
  { quarter: 'Q4', segment: 'Product', value: 59 },
  { quarter: 'Q4', segment: 'Services', value: 38 },
] as const;

const definition = defineChart({
  marks: [
    barY(revenue, {
      x: 'quarter',
      y: 'value',
      color: 'segment',
      layout: stack(),
      inset: 3,
    }),
  ],
  scales: {
    x: {
      scale: scaleBand,
      axis: { label: 'Quarter' },
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: 'Revenue ($k)' },
    },
  },
  color: {
    domain: ['Product', 'Services'],
    range: ['var(--moduix-color-chart-1)', 'var(--moduix-color-chart-2)'],
  },
  focus: 'group-x',
  tooltip,
});

export default function StackedBarsChartDemo() {
  return (
    <Chart>
      <Chart.Header>
        <Chart.Title>Quarterly revenue</Chart.Title>
        <Chart.Description>Product and services revenue by quarter.</Chart.Description>
      </Chart.Header>
      <Chart.Plot definition={definition} height={320} ariaLabel="Quarterly revenue by segment" />
      <Chart.Legend aria-label="Revenue segments">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Product</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-2)">Services</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  );
}