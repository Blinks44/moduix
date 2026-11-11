<script lang="ts">
  import { barY, defineChart } from '@tanstack/charts';
  import { scaleBand } from '@tanstack/charts/scales/band';
  import { scaleLinear } from '@tanstack/charts/scales/linear';
  import {
    Chart,
    ChartHeader,
    ChartLegend,
    ChartLegendItem,
    ChartPlot,
    ChartTitle,
  } from '@/components/chart';

  const label = 'Monthly revenue';
  const definition = defineChart({
    marks: [barY([{ month: 'March', value: 76 }], { x: 'month', y: 'value' })],
    scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
  });
</script>

<Chart id="ssr-chart">
  <ChartHeader><ChartTitle>Monthly revenue</ChartTitle></ChartHeader>
  <ChartPlot ariaLabel={label} {definition} width={640} height={320} />
  <ChartLegend aria-label="Revenue series">
    <ChartLegendItem color="tomato">Revenue</ChartLegendItem>
  </ChartLegend>
</Chart>