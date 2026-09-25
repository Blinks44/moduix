import { expect, test } from '@rstest/core';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { render } from '@testing-library/vue';
import { nextTick } from 'vue';
import { ChartPlot } from '../src';

test('renders a real TanStack SVG chart through the adapter', async () => {
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

  render({
    components: { ChartPlot },
    setup: () => ({ definition }),
    template: '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" :height="320" />',
  });

  await nextTick();

  const svg = document.querySelector('svg.ts-chart');
  expect(svg).not.toBeNull();
  expect(svg?.getAttribute('role')).toBe('img');
  expect(svg?.getAttribute('aria-label')).toBe('Monthly revenue');
  expect(svg?.querySelectorAll('rect')).toHaveLength(3);
});