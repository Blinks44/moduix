import { Chart } from '@moduix/react/chart';
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
    x: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: 'Active users (k)' },
    },
    y: {
      scale: scaleBand,
      axis: { label: 'Product' },
    },
  },
  color: {
    domain: ['Active users'],
    range: ['var(--moduix-color-chart-1)'],
  },
  tooltip,
});

export default function HorizontalBarsChartDemo() {
  return (
    <Chart>
      <Chart.Header>
        <Chart.Title>Product adoption</Chart.Title>
        <Chart.Description>Monthly active users by product.</Chart.Description>
      </Chart.Header>
      <Chart.Plot
        definition={definition}
        height={320}
        ariaLabel="Monthly active users by product"
      />
      <Chart.Legend aria-label="Product metric">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Active users</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  );
}