<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { defineChart, lineY } from '@tanstack/charts';
  import { controlledSignal } from '@tanstack/charts/interaction/signal';
  import { interactiveColorLegend } from '@tanstack/charts/legend';
  import { scaleLinear } from '@tanstack/charts/scales/linear';
  import { scalePoint } from '@tanstack/charts/scales/point';
  import { tooltip } from '@tanstack/charts/tooltip';
  import { Button } from '@/components/button';
  import {
    Chart,
    ChartDescription,
    ChartHeader,
    ChartLegend,
    ChartLegendItem,
    ChartPlot,
    ChartTitle,
    type ChartTooltipBodyRenderContext,
  } from '@/components/chart';
  import {
    areaDefinition,
    barDefinition,
    donutDefinition,
    radarDefinition,
    revenue,
    revenueByChannel,
    stackedDefinition,
  } from './definitions';

  const { Story } = defineMeta({
    title: 'Components/Chart',
    component: ChartPlot,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });
</script>

<script lang="ts">
  let visible = $state<readonly string[]>(['Revenue', 'Target']);
  const interactiveDefinition = $derived(
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

{#snippet customTooltipBody(context: ChartTooltipBodyRenderContext)}
  <div style="display: grid; gap: var(--moduix-spacing-3)">
    {@render context.defaultBody()}
    {#if context.pinned}
      <Button size="sm" variant="outline" onclick={context.dismiss}>Close</Button>
    {/if}
  </div>
{/snippet}

<Story name="Basic" asChild>
  <Chart>
    <ChartHeader>
      <ChartTitle>Monthly revenue</ChartTitle>
      <ChartDescription>Revenue in thousands of dollars.</ChartDescription>
    </ChartHeader>
    <ChartPlot ariaLabel="Monthly revenue" definition={barDefinition} height={320} />
    <ChartLegend aria-label="Revenue series">
      <ChartLegendItem color="var(--moduix-chart-1)">Revenue</ChartLegendItem>
    </ChartLegend>
  </Chart>
</Story>

<Story name="Animated Area" exportName="AnimatedArea" asChild>
  <Chart>
    <ChartHeader>
      <ChartTitle>Revenue and target</ChartTitle>
      <ChartDescription>Marks and tooltip share the default motion renderer.</ChartDescription>
    </ChartHeader>
    <ChartPlot ariaLabel="Monthly revenue and target" definition={areaDefinition} height={320} />
    <ChartLegend aria-label="Revenue series">
      <ChartLegendItem color="var(--moduix-chart-1)">Revenue</ChartLegendItem>
      <ChartLegendItem color="var(--moduix-chart-2)">Target</ChartLegendItem>
    </ChartLegend>
  </Chart>
</Story>

<Story name="Custom Tooltip" exportName="CustomTooltip" asChild>
  <Chart>
    <ChartHeader>
      <ChartTitle>Monthly revenue</ChartTitle>
      <ChartDescription>Pin the tooltip, then dismiss it from its content.</ChartDescription>
    </ChartHeader>
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={barDefinition}
      height={320}
      renderTooltipBody={customTooltipBody}
    />
    <ChartLegend aria-label="Revenue series">
      <ChartLegendItem color="var(--moduix-chart-1)">Revenue</ChartLegendItem>
    </ChartLegend>
  </Chart>
</Story>

<Story name="Donut" asChild>
  <Chart>
    <ChartHeader>
      <ChartTitle>Revenue mix</ChartTitle>
      <ChartDescription>Share of revenue by acquisition channel.</ChartDescription>
    </ChartHeader>
    <ChartPlot
      definition={donutDefinition}
      height={320}
      ariaLabel="Revenue share by acquisition channel"
    />
    <ChartLegend aria-label="Acquisition channels">
      {#each revenueByChannel as { channel }, index (channel)}
        <ChartLegendItem color={`var(--moduix-chart-${index + 1})`}>
          {channel}
        </ChartLegendItem>
      {/each}
    </ChartLegend>
  </Chart>
</Story>

<Story name="Interactive Legend" exportName="InteractiveLegend" asChild>
  <Chart>
    <ChartHeader>
      <ChartTitle>Revenue and target</ChartTitle>
      <ChartDescription>
        Hover or focus a legend item to highlight it. Click to hide its series.
      </ChartDescription>
    </ChartHeader>
    <ChartPlot
      definition={interactiveDefinition}
      height={320}
      ariaLabel="Monthly revenue and target with interactive legend"
    />
  </Chart>
</Story>

<Story name="Radar" asChild>
  <Chart>
    <ChartHeader>
      <ChartTitle>Product comparison</ChartTitle>
      <ChartDescription>
        Scores out of 100. Hover a point or use arrow keys to compare a metric.
      </ChartDescription>
    </ChartHeader>
    <ChartPlot definition={radarDefinition} height={360} ariaLabel="Product scores by metric" />
    <ChartLegend aria-label="Products">
      <ChartLegendItem color="var(--moduix-chart-1)">Product A</ChartLegendItem>
      <ChartLegendItem color="var(--moduix-chart-2)">Product B</ChartLegendItem>
    </ChartLegend>
  </Chart>
</Story>

<Story name="Stacked Bars" exportName="StackedBars" asChild>
  <Chart>
    <ChartHeader>
      <ChartTitle>Quarterly revenue</ChartTitle>
      <ChartDescription>Product and services revenue by quarter.</ChartDescription>
    </ChartHeader>
    <ChartPlot
      ariaLabel="Quarterly revenue by segment"
      definition={stackedDefinition}
      height={320}
    />
    <ChartLegend aria-label="Revenue segments">
      <ChartLegendItem color="var(--moduix-chart-1)">Product</ChartLegendItem>
      <ChartLegendItem color="var(--moduix-chart-2)">Services</ChartLegendItem>
    </ChartLegend>
  </Chart>
</Story>