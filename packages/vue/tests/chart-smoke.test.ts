import { afterEach, expect, rs, test } from '@rstest/core';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import { render, screen, waitFor } from '@testing-library/vue';
import { computed, nextTick, ref } from 'vue';
import { ChartPlot } from '../src';

afterEach(() => {
  rs.restoreAllMocks();
});

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

test('updates a real SVG chart without remounting its renderer and destroys it on unmount', async () => {
  const rows = ref([
    { month: 'Jan', value: 42 },
    { month: 'Feb', value: 58 },
  ]);
  const label = ref('Revenue');
  const definition = computed(() =>
    defineChart({
      marks: [barY(rows.value, { x: 'month', y: 'value' })],
      scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
    }),
  );
  const mount = rs.spyOn(svgChartRenderer, 'mount');
  const { unmount } = render({
    components: { ChartPlot },
    setup: () => ({ definition, label, renderer: svgChartRenderer }),
    template:
      '<ChartPlot :aria-label="label" :definition="definition" :renderer="renderer" :width="640" :height="320" />',
  });
  const svg = await screen.findByRole('img', { name: 'Revenue' });
  const container = svg.parentElement;
  expect(svg.querySelectorAll('rect')).toHaveLength(2);
  expect(mount).toHaveBeenCalledTimes(1);
  const surface = mount.mock.results[0]!.value;
  const destroy = rs.spyOn(surface, 'destroy');
  rows.value = [{ month: 'Mar', value: 76 }];
  label.value = 'Updated revenue';
  await waitFor(() => {
    const updatedSvg = screen.getByRole('img', { name: 'Updated revenue' });
    expect(updatedSvg.parentElement).toBe(container);
    expect(updatedSvg.querySelectorAll('rect')).toHaveLength(1);
  });
  expect(mount).toHaveBeenCalledTimes(1);
  unmount();
  expect(destroy).toHaveBeenCalledTimes(1);
  expect(container).not.toBeInTheDocument();
});