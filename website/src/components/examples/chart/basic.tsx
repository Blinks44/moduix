import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '@moduix/react/chart';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

const revenue = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 76 },
  { month: 'Apr', value: 64 },
  { month: 'May', value: 81 },
] as const;

const definition = defineChart({
  marks: [
    barY(revenue, {
      x: 'month',
      y: 'value',
      color: () => 'Revenue',
      inset: 3,
      radius: 6,
    }),
  ],
  scales: {
    x: {
      scale: scaleBand,
      axis: { label: 'Month' },
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: 'Revenue ($k)' },
    },
  },
  color: {
    domain: ['Revenue'],
    range: ['var(--moduix-color-chart-1)'],
  },
  tooltip,
});

export default function ChartDemo() {
  return (
    <Chart>
      <ChartHeader>
        <ChartTitle>Monthly revenue</ChartTitle>
        <ChartDescription>Revenue in thousands of dollars.</ChartDescription>
      </ChartHeader>
      <ChartPlot definition={definition} height={320} ariaLabel="Monthly revenue" />
      <ChartLegend aria-label="Revenue series">
        <ChartLegendItem color="var(--moduix-color-chart-1)">Revenue</ChartLegendItem>
      </ChartLegend>
    </Chart>
  );
}