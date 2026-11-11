<script lang="ts">
  import { barY, defineChart, group } from '@tanstack/charts';
  import { controlledSignal } from '@tanstack/charts/interaction/signal';
  import { interactiveColorLegend } from '@tanstack/charts/legend';
  import { scaleBand } from '@tanstack/charts/scales/band';
  import { scaleLinear } from '@tanstack/charts/scales/linear';
  import { ChartPlot } from '@/components/chart';

  const rows = [
    { month: 'Jan', series: 'Revenue', value: 42 },
    { month: 'Jan', series: 'Target', value: 58 },
  ];
  let visible = $state<readonly string[]>(['Revenue', 'Target']);
  const definition = $derived(
    defineChart({
      marks: [barY(rows, { x: 'month', y: 'value', color: 'series', layout: group() })],
      scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
      color: {
        domain: ['Revenue', 'Target'],
        range: ['tomato', 'royalblue'],
        legend: interactiveColorLegend({
          hover: 'series',
          visible: controlledSignal(visible, (next) => {
            visible = next;
          }),
        }),
      },
    }),
  );
</script>

<ChartPlot {definition} ariaLabel="Revenue and target" width={640} height={320} />