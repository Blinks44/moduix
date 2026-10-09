<script setup lang="ts">
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { ref } from 'vue';
import {
  Chart,
  ChartHeader,
  ChartTitle,
  ChartPlot,
  ChartLegend,
  ChartLegendItem,
} from '../../src/components/chart';

const label = ref('Monthly revenue');
const definition = defineChart({
  marks: [barY([{ month: 'March', value: 76 }], { x: 'month', y: 'value' })],
  scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
});
</script>
<template>
  <Chart id="ssr-chart">
    <ChartHeader><ChartTitle>Monthly revenue</ChartTitle></ChartHeader>
    <ChartPlot :ariaLabel="label" :definition="definition" :width="640" :height="320" />
    <ChartLegend aria-label="Revenue series"
      ><ChartLegendItem color="tomato">Revenue</ChartLegendItem></ChartLegend
    >
    <button type="button" @click="label = 'Annual revenue'">Show annual revenue</button>
  </Chart>
</template>