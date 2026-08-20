import { Chart } from '@moduix/react/chart';
import { defineChart, dot } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

const accounts = [
  { account: 'Aster', sessions: 12, conversion: 18, segment: 'Starter' },
  { account: 'Boreal', sessions: 19, conversion: 24, segment: 'Starter' },
  { account: 'Cirrus', sessions: 25, conversion: 31, segment: 'Growth' },
  { account: 'Dune', sessions: 31, conversion: 28, segment: 'Growth' },
  { account: 'Ember', sessions: 38, conversion: 42, segment: 'Scale' },
  { account: 'Fjord', sessions: 44, conversion: 47, segment: 'Scale' },
] as const;

const definition = defineChart({
  marks: [
    dot(accounts, {
      x: 'sessions',
      y: 'conversion',
      color: 'segment',
      key: 'account',
      r: 7,
      fillOpacity: 0.8,
      stroke: 'var(--moduix-color-card)',
      strokeWidth: 2,
    }),
  ],
  x: {
    scale: scaleLinear,
    nice: true,
    grid: true,
    axis: { label: 'Sessions' },
  },
  y: {
    scale: scaleLinear,
    nice: true,
    grid: true,
    axis: { label: 'Conversion (%)' },
  },
  color: {
    domain: ['Starter', 'Growth', 'Scale'],
    range: [
      'var(--moduix-color-chart-1)',
      'var(--moduix-color-chart-2)',
      'var(--moduix-color-chart-3)',
    ],
  },
  tooltip,
});

export default function ScatterChartDemo() {
  return (
    <Chart>
      <Chart.Header>
        <Chart.Title>Engagement and conversion</Chart.Title>
        <Chart.Description>Each point represents one customer account.</Chart.Description>
      </Chart.Header>
      <Chart.Plot
        definition={definition}
        height={320}
        ariaLabel="Account sessions and conversion rate"
      />
      <Chart.Legend aria-label="Account segments">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Starter</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-2)">Growth</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-3)">Scale</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  );
}