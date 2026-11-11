<script lang="ts">
  import { barY, defineChart } from '@tanstack/charts';
  import { scaleBand } from '@tanstack/charts/scales/band';
  import { scaleLinear } from '@tanstack/charts/scales/linear';
  import { tooltip } from '@tanstack/charts/tooltip';
  import { ChartPlot } from '@/components/chart';

  const definition = defineChart({
    marks: [barY([{ month: 'Jan', value: 42 }], { x: 'month', y: 'value' })],
    scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
    tooltip,
  });
</script>

<ChartPlot
  {definition}
  ariaLabel="Tooltip chart"
  motion={false}
  width={640}
  height={320}
  style="--ts-chart-tooltip-padding: 19px"
/>