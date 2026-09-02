import { Chart } from '@moduix/react/chart';
import { areaY, defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';

const revenue = [
  { month: 'Jan', value: 42, target: 48 },
  { month: 'Feb', value: 58, target: 55 },
  { month: 'Mar', value: 76, target: 68 },
  { month: 'Apr', value: 64, target: 72 },
  { month: 'May', value: 81, target: 80 },
] as const;

const definition = defineChart({
  marks: [
    areaY(revenue, {
      x: 'month',
      y: 'value',
      color: () => 'Revenue',
      fillOpacity: 0.18,
      strokeWidth: 2,
    }),
    lineY(revenue, {
      x: 'month',
      y: 'target',
      color: () => 'Target',
      points: true,
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: {
      scale: () => scalePoint<string>().padding(0.2),
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
    domain: ['Revenue', 'Target'],
    range: ['var(--moduix-color-chart-1)', 'var(--moduix-color-chart-2)'],
  },
  focus: 'group-x',
  tooltip,
});

export default function AnimatedAreaChartDemo() {
  return (
    <Chart>
      <Chart.Header>
        <Chart.Title>Revenue and target</Chart.Title>
        <Chart.Description>Marks and tooltip share the default motion renderer.</Chart.Description>
      </Chart.Header>
      <Chart.Plot definition={definition} height={320} ariaLabel="Monthly revenue and target" />
      <Chart.Legend aria-label="Revenue series">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Revenue</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-2)">Target</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  );
}