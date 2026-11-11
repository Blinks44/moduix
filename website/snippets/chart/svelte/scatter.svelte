<script lang="ts">
  import {
    Chart,
    ChartDescription,
    ChartHeader,
    ChartLegend,
    ChartLegendItem,
    ChartPlot,
    ChartTitle,
    chartColors,
  } from '@moduix/svelte/chart';
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
        stroke: 'var(--moduix-card)',
        strokeWidth: 2,
      }),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Sessions' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Conversion (%)' } },
    },
    color: {
      domain: ['Starter', 'Growth', 'Scale'],
      range: chartColors,
    },
    tooltip,
  });
</script>

<Chart>
  <ChartHeader>
    <ChartTitle>Engagement and conversion</ChartTitle>
    <ChartDescription>Each point represents one customer account.</ChartDescription>
  </ChartHeader>
  <ChartPlot {definition} height={320} ariaLabel="Account sessions and conversion rate" />
  <ChartLegend aria-label="Account segments">
    <ChartLegendItem color={chartColors[0]}>Starter</ChartLegendItem>
    <ChartLegendItem color={chartColors[1]}>Growth</ChartLegendItem>
    <ChartLegendItem color={chartColors[2]}>Scale</ChartLegendItem>
  </ChartLegend>
</Chart>