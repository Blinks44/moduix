import { Chart } from '@moduix/react/chart';
import { defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';

const revenue = [
  { month: 'Jan', planned: 44, actual: 42 },
  { month: 'Feb', planned: 56, actual: 58 },
  { month: 'Mar', planned: 69, actual: 76 },
  { month: 'Apr', planned: 73, actual: 64 },
  { month: 'May', planned: 80, actual: 81 },
] as const;

const definition = defineChart({
  marks: [
    lineY(revenue, {
      id: 'planned',
      x: 'month',
      y: 'planned',
      color: () => 'Planned',
      points: true,
      strokeWidth: 2,
    }),
    lineY(revenue, {
      id: 'actual',
      x: 'month',
      y: 'actual',
      color: () => 'Actual',
      points: true,
      strokeWidth: 2,
    }),
  ],
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
  color: {
    domain: ['Actual', 'Planned'],
    range: ['var(--moduix-color-chart-1)', 'var(--moduix-color-chart-2)'],
  },
  focus: 'group-x',
  tooltip,
});

export default function ChartColorsDemo() {
  return (
    <Chart>
      <Chart.Header>
        <Chart.Title>Planned and actual revenue</Chart.Title>
        <Chart.Description>Chart tokens remain valid SVG paint values.</Chart.Description>
      </Chart.Header>
      <Chart.Plot
        definition={definition}
        height={320}
        ariaLabel="Planned and actual monthly revenue"
      />
      <Chart.Legend aria-label="Revenue series">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Actual</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-2)">Planned</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  );
}