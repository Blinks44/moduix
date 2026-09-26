<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '@moduix/vue/chart';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { h } from 'vue';
import type { VNodeChild } from 'vue';
import styles from '@/components/examples/chart/chart-advanced-customization.module.css';

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
  color: { domain: ['Revenue'], range: ['var(--moduix-color-chart-1)'] },
  tooltip,
});

const renderTooltipBody = (tooltip: {
  defaultBody: () => VNodeChild;
  dismiss: () => void;
  pinned: boolean;
}) =>
  h('div', { class: styles.tooltip }, [
    tooltip.defaultBody(),
    tooltip.pinned
      ? h(
          Button,
          { size: 'sm', variant: 'outline', onClick: tooltip.dismiss },
          { default: () => 'Close' },
        )
      : null,
  ]);
</script>

<template>
  <Chart as-child>
    <section aria-labelledby="dashboard-revenue-title">
      <ChartHeader as-child>
        <header :class="styles.header">
          <div>
            <ChartTitle as-child>
              <h2 id="dashboard-revenue-title">Monthly revenue</h2>
            </ChartTitle>
            <ChartDescription>Click a bar to pin its tooltip.</ChartDescription>
          </div>
          <ChartLegend aria-label="Revenue series">
            <ChartLegendItem color="var(--moduix-color-chart-1)">Revenue</ChartLegendItem>
          </ChartLegend>
        </header>
      </ChartHeader>
      <ChartPlot
        :definition="definition"
        :height="320"
        ariaLabel="Monthly revenue"
        :render-tooltip-body="renderTooltipBody"
      />
    </section>
  </Chart>
</template>