<script lang="ts">
  import {
    Chart,
    ChartDescription,
    ChartHeader,
    ChartPlot,
    ChartTitle,
  } from '@moduix/svelte/chart';
  import { defineChart, lineY } from '@tanstack/charts';
  import { controlledSignal } from '@tanstack/charts/interaction/signal';
  import { interactiveColorLegend } from '@tanstack/charts/legend';
  import { scaleLinear } from '@tanstack/charts/scales/linear';
  import { scalePoint } from '@tanstack/charts/scales/point';
  import { tooltip } from '@tanstack/charts/tooltip';

  const revenue = [
    { month: 'Jan', series: 'Revenue', value: 42 },
    { month: 'Feb', series: 'Revenue', value: 58 },
    { month: 'Mar', series: 'Revenue', value: 76 },
    { month: 'Apr', series: 'Revenue', value: 64 },
    { month: 'Jan', series: 'Target', value: 48 },
    { month: 'Feb', series: 'Target', value: 55 },
    { month: 'Mar', series: 'Target', value: 68 },
    { month: 'Apr', series: 'Target', value: 72 },
  ];

  let visible = $state<readonly string[]>(['Revenue', 'Target']);
  const definition = $derived(
    defineChart({
      marks: [
        lineY(revenue, {
          x: 'month',
          y: 'value',
          color: 'series',
          points: true,
          strokeWidth: 2,
          states: [
            { when: { focus: 'unmatched', source: 'legend' }, style: { opacity: 0.2 } },
            { when: { focus: 'series', source: 'legend' }, style: { strokeWidth: 3 } },
          ],
        }),
      ],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: 'Month' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } },
      },
      color: {
        domain: ['Revenue', 'Target'],
        range: ['var(--moduix-chart-1)', 'var(--moduix-chart-2)'],
        legend: interactiveColorLegend({
          hover: 'series',
          visible: controlledSignal(visible, (next) => {
            visible = next;
          }),
          ariaLabel: 'Revenue series visibility',
        }),
      },
      focus: 'group-x',
      tooltip,
    }),
  );
</script>

<Chart>
  <ChartHeader>
    <ChartTitle>Revenue and target</ChartTitle>
    <ChartDescription
      >Hover or focus a legend item to highlight it. Click to hide its series.</ChartDescription
    >
  </ChartHeader>
  <ChartPlot
    {definition}
    height={320}
    ariaLabel="Monthly revenue and target with interactive legend"
  />
</Chart>