import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import { render, screen } from '@testing-library/svelte';
import BarChart from './chart/BarChart.svelte';
import LegendChart from './chart/LegendChart.svelte';
import TooltipChart from './chart/TooltipChart.svelte';
import UpdateChart from './chart/UpdateChart.svelte';

test('updates a real motion chart through its controlled legend and preserves keyboard focus', async () => {
  render(LegendChart);
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
  render(BarChart);

  await expect.element(page.getByRole('img', { name: 'Monthly revenue' })).toBeVisible();
  const svg = document.querySelector('svg.ts-chart');
  expect(svg).not.toBeNull();
  expect(svg?.getAttribute('role')).toBe('img');
  expect(svg?.getAttribute('aria-label')).toBe('Monthly revenue');
  expect(svg?.querySelectorAll('rect')).toHaveLength(3);
});

test('updates a real SVG chart without remounting its renderer and destroys it on unmount', async () => {
  const mount = rs.spyOn(svgChartRenderer, 'mount');
  const { rerender, unmount } = render(UpdateChart, {
    props: {
      label: 'Revenue',
      rows: [
        { month: 'Jan', value: 42 },
        { month: 'Feb', value: 58 },
      ],
    },
  });
  await expect.element(page.getByRole('img', { name: 'Revenue', exact: true })).toBeVisible();
  const svg = screen.getByRole('img', { name: 'Revenue' });
  const container = svg.parentElement;
  expect(svg.querySelectorAll('rect')).toHaveLength(2);
  expect(mount).toHaveBeenCalledTimes(1);
  const surface = mount.mock.results[0]!.value;
  const destroy = rs.spyOn(surface, 'destroy');
  await rerender({ label: 'Updated revenue', rows: [{ month: 'Mar', value: 76 }] });
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

test('applies host tooltip CSS variables to the framework-rendered card', async () => {
  render(TooltipChart);
  const chart = page.getByRole('img', { name: 'Tooltip chart' });
  await expect.element(chart).toBeVisible();
  await chart.press('ArrowRight');
  await expect
    .poll(() => document.querySelector('[data-slot="chart-tooltip-surface"]'))
    .not.toBeNull();
  const surface = document.querySelector('[data-slot="chart-tooltip-surface"]')!;
  expect(getComputedStyle(surface).padding).toBe('19px');
});