<script setup lang="ts">
import { ChartNoAxesColumn } from '@lucide/vue';
import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartPlot,
  ChartTitle,
  chartColors,
} from '@moduix/vue/chart';
import { Empty, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from '@moduix/vue/empty';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

type Order = { day: string; orders: number };

const orders: Order[] = [];

const definition = defineChart({
  marks: [barY(orders, { x: 'day', y: 'orders', color: () => 'Orders', inset: 3, radius: 6 })],
  scales: {
    x: { scale: scaleBand },
    y: { scale: scaleLinear, nice: true, grid: true },
  },
  color: { domain: ['Orders'], range: chartColors },
  tooltip,
});
</script>

<template>
  <Chart>
    <ChartHeader>
      <ChartTitle>Orders this week</ChartTitle>
      <ChartDescription>Daily orders from the online store.</ChartDescription>
    </ChartHeader>
    <ChartPlot
      v-if="orders.length > 0"
      :definition="definition"
      :height="240"
      ariaLabel="Daily orders this week"
    />
    <Empty v-else>
      <EmptyIcon><ChartNoAxesColumn aria-hidden="true" /></EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No orders yet</EmptyTitle>
        <EmptyDescription>Orders appear here as soon as customers check out.</EmptyDescription>
      </EmptyContent>
    </Empty>
  </Chart>
</template>