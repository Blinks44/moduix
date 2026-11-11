<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Chart,
    ChartDescription,
    ChartHeader,
    ChartLegend,
    ChartLegendItem,
    ChartPlot,
    ChartTitle,
    chartColors,
    type ChartTooltipBodyRenderContext,
  } from '@moduix/svelte/chart';
  import { barY, defineChart } from '@tanstack/charts';
  import { scaleBand } from '@tanstack/charts/scales/band';
  import { scaleLinear } from '@tanstack/charts/scales/linear';
  import { tooltip } from '@tanstack/charts/tooltip';
  import styles from '@/components/examples/chart/chart-dashboard-layout.module.css';

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
      x: { scale: scaleBand, axis: { label: 'Month' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } },
    },
    color: { domain: ['Revenue'], range: chartColors },
    tooltip,
  });
</script>

{#snippet renderTooltipBody(tooltip: ChartTooltipBodyRenderContext)}
  <div class={styles.tooltip}>
    {@render tooltip.defaultBody()}
    {#if tooltip.pinned}
      <Button size="sm" variant="outline" onclick={tooltip.dismiss}>Close</Button>
    {/if}
  </div>
{/snippet}

<Chart>
  {#snippet asChild(props)}
    <section {...props()} aria-labelledby="dashboard-revenue-title">
      <ChartHeader>
        {#snippet asChild(props)}
          <header {...props()} class={styles.header}>
            <div>
              <ChartTitle>
                {#snippet asChild(props)}
                  <h2 {...props()} id="dashboard-revenue-title">Monthly revenue</h2>
                {/snippet}
              </ChartTitle>
              <ChartDescription>Click a bar to pin its tooltip.</ChartDescription>
            </div>
            <ChartLegend aria-label="Revenue series">
              <ChartLegendItem color={chartColors[0]}>Revenue</ChartLegendItem>
            </ChartLegend>
          </header>
        {/snippet}
      </ChartHeader>
      <ChartPlot {definition} height={320} ariaLabel="Monthly revenue" {renderTooltipBody} />
    </section>
  {/snippet}
</Chart>