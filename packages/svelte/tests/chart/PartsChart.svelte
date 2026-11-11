<script lang="ts">
  import {
    Chart,
    ChartDescription,
    ChartHeader,
    ChartLegend,
    ChartLegendItem,
    ChartTitle,
  } from '@/components/chart';
</script>

<Chart>
  <ChartHeader data-testid="header">
    <ChartTitle data-testid="title">Monthly revenue</ChartTitle>
    <ChartDescription data-testid="description">Revenue by month</ChartDescription>
  </ChartHeader>
  <ChartLegend aria-label="Series" data-testid="legend">
    <ChartLegendItem color="tomato" data-testid="legend-item">Revenue</ChartLegendItem>
  </ChartLegend>
</Chart>