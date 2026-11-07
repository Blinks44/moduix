<script lang="ts">
  import {
    Chart,
    ChartDescription,
    ChartHeader,
    ChartLegend,
    ChartLegendItem,
    ChartTitle,
  } from '@/components/chart';

  let { root = false }: { root?: boolean } = $props();
</script>

{#if root}
  <Chart class="consumer-chart bg-muted p-0 shadow-none" data-testid="root" />
{:else}
  <Chart>
    <ChartHeader class="gap-4" data-testid="header" />
    <ChartTitle class="text-xl" data-testid="title">Monthly revenue</ChartTitle>
    <ChartDescription class="text-foreground" data-testid="description" />
    <ChartLegend class="gap-1" data-testid="legend" />
    <ChartLegendItem class="text-foreground" data-testid="legend-item" />
  </Chart>
{/if}