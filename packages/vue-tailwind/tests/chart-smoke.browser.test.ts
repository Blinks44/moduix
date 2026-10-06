import { page } from '@rstest/browser';
import { afterEach, expect, rs, test } from '@rstest/core';
import { barY, defineChart, group } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { interactiveColorLegend } from '@tanstack/charts/legend';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import { computed, ref } from 'vue';
import { ChartPlot } from '../src';
import SsrChart from './fixtures/SsrChart.vue';

afterEach(() => {
  rs.restoreAllMocks();
});

test('updates a real motion chart through its controlled legend and preserves keyboard focus', async () => {
  const rows = [
    { month: 'Jan', series: 'Revenue', value: 42 },
    { month: 'Jan', series: 'Target', value: 58 },
  ];
  const visible = ref<readonly string[]>(['Revenue', 'Target']);
  const definition = computed(() =>
    defineChart({
      marks: [barY(rows, { x: 'month', y: 'value', color: 'series', layout: group() })],
      scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
      color: {
        domain: ['Revenue', 'Target'],
        range: ['tomato', 'royalblue'],
        legend: interactiveColorLegend({
          hover: 'series',
          visible: controlledSignal(visible.value, (next) => {
            visible.value = next;
          }),
        }),
      },
    }),
  );
  render({
    components: { ChartPlot },
    setup: () => ({ definition }),
    template:
      '<ChartPlot :definition="definition" aria-label="Revenue and target" :width="640" :height="320" />',
  });
  await expect.element(page.getByRole('img', { name: 'Revenue and target' })).toBeVisible();
  const svg = document.querySelector('svg.ts-chart')!;
  const visibleBars = () =>
    [...svg.querySelectorAll('rect')].filter((bar) => bar.getBoundingClientRect().height > 0)
      .length;
  await expect.poll(visibleBars).toBe(2);

  const target = page.getByRole('button', { name: 'Toggle Target series' });
  await target.press('Enter');
  await expect.element(target).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(visibleBars).toBe(1);
  await expect.element(target).toBeFocused();
  expect(document.querySelector('svg.ts-chart')).toBe(svg);

  await target.press('Space');
  await expect.element(target).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(visibleBars).toBe(2);
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

  await expect.element(page.getByRole('img', { name: 'Monthly revenue' })).toBeVisible();
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
  await expect.element(page.getByRole('img', { name: 'Revenue', exact: true })).toBeVisible();
  const svg = screen.getByRole('img', { name: 'Revenue' });
  const container = svg.parentElement;
  expect(svg.querySelectorAll('rect')).toHaveLength(2);
  expect(mount).toHaveBeenCalledTimes(1);
  const surface = mount.mock.results[0]!.value;
  const destroy = rs.spyOn(surface, 'destroy');
  rows.value = [{ month: 'Mar', value: 76 }];
  label.value = 'Updated revenue';
  await expect
    .element(page.getByRole('img', { name: 'Updated revenue', exact: true }))
    .toBeAttached();
  const updatedSvg = screen.getByRole('img', { name: 'Updated revenue' });
  await expect.poll(() => updatedSvg.parentElement).toBe(container);
  await expect.poll(() => updatedSvg.querySelectorAll('rect')).toHaveLength(1);
  expect(mount).toHaveBeenCalledTimes(1);
  unmount();
  expect(destroy).toHaveBeenCalledTimes(1);
  expect(Boolean(container?.isConnected)).toBe(false);
});

test('hydrates a real chart as one surface and keeps its public hosts interactive', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrChart));
  document.body.append(host);
  const parts = [...host.querySelectorAll('[data-slot]')];
  const surface = host.querySelector('.ts-chart-surface');
  const app = createSSRApp(SsrChart);
  try {
    app.mount(host);
    const hydrated = [...host.querySelectorAll('[data-slot]')];
    expect(hydrated).toHaveLength(parts.length);
    hydrated.forEach((part, index) => expect(part).toBe(parts[index]));
    expect(host.querySelectorAll('figure')).toHaveLength(1);
    expect(host.querySelectorAll('.ts-chart-surface')).toHaveLength(1);
    expect(host.querySelector('.ts-chart-surface')).toBe(surface);
    await expect.element(page.getByRole('img', { name: 'Monthly revenue' })).toHaveCount(1);
    await page.getByRole('button', { name: 'Show annual revenue' }).click();
    await expect.element(page.getByRole('img', { name: 'Annual revenue' })).toHaveCount(1);
  } finally {
    app.unmount();
    host.remove();
  }
});