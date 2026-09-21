import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '@moduix/solid/chart';
import { barX, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

const products = [
  { product: 'Analytics', users: 88 },
  { product: 'Delivery', users: 72 },
  { product: 'Navigation', users: 64 },
  { product: 'Places API', users: 49 },
] as const;

const definition = defineChart({
  marks: [
    barX(products, {
      x: 'users',
      y: 'product',
      color: () => 'Active users',
      inset: 3,
      radius: 6,
    }),
  ],
  scales: {
    x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Active users (k)' } },
    y: { scale: scaleBand, axis: { label: 'Product' } },
  },
  color: { domain: ['Active users'], range: ['var(--moduix-color-chart-1)'] },
  tooltip,
});

export default function HorizontalBarsChartDemo() {
  return (
    <Chart>
      <ChartHeader>
        <ChartTitle>Product adoption</ChartTitle>
        <ChartDescription>Monthly active users by product.</ChartDescription>
      </ChartHeader>
      <ChartPlot
        definition={definition}
        height={320}
        ariaLabel="Monthly active users by product"
      />
      <ChartLegend aria-label="Product metric">
        <ChartLegendItem color="var(--moduix-color-chart-1)">Active users</ChartLegendItem>
      </ChartLegend>
    </Chart>
  );
}