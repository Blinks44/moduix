import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
  chartColors,
} from '@moduix/solid/chart';
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
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: 'Month' } },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } },
  },
  color: {
    domain: ['Actual', 'Planned'],
    range: chartColors,
  },
  focus: 'group-x',
  tooltip,
});

export default function ChartColorsDemo() {
  return (
    <Chart>
      <ChartHeader>
        <ChartTitle>Planned and actual revenue</ChartTitle>
        <ChartDescription>Chart tokens remain valid SVG paint values.</ChartDescription>
      </ChartHeader>
      <ChartPlot
        definition={definition}
        height={320}
        ariaLabel="Planned and actual monthly revenue"
      />
      <ChartLegend aria-label="Revenue series">
        <ChartLegendItem color={chartColors[0]}>Actual</ChartLegendItem>
        <ChartLegendItem color={chartColors[1]}>Planned</ChartLegendItem>
      </ChartLegend>
    </Chart>
  );
}