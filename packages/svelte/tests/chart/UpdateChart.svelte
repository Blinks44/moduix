<script lang="ts">
  import { barY, defineChart } from '@tanstack/charts';
  import { scaleBand } from '@tanstack/charts/scales/band';
  import { scaleLinear } from '@tanstack/charts/scales/linear';
  import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
  import { ChartPlot } from '@/components/chart';

  let { label, rows }: { label: string; rows: readonly { month: string; value: number }[] } =
    $props();

  const definition = $derived(
    defineChart({
      marks: [barY(rows, { x: 'month', y: 'value' })],
      scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
    }),
  );
</script>

<ChartPlot ariaLabel={label} {definition} renderer={svgChartRenderer} width={640} height={320} />