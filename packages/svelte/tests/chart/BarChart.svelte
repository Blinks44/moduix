<script lang="ts">
  import { barY, defineChart } from '@tanstack/charts';
  import { scaleBand } from '@tanstack/charts/scales/band';
  import { scaleLinear } from '@tanstack/charts/scales/linear';
  import { ChartPlot } from '@/components/chart';

  const revenue = [
    { month: 'Jan', value: 42 },
    { month: 'Feb', value: 58 },
    { month: 'Mar', value: 76 },
  ] as const;

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'value', color: () => 'Revenue' })],
    scales: {
      x: { scale: scaleBand, axis: { label: 'Month' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } },
    },
  });
</script>

<ChartPlot ariaLabel="Monthly revenue" {definition} height={320} />