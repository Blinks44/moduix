import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { barY, defineChart, group } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { interactiveColorLegend } from '@tanstack/charts/legend';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { render } from '@testing-library/react';
import { useMemo, useState } from 'react';
import { ChartPlot } from '@/index';

const rows = [
  { month: 'Jan', series: 'Revenue', value: 42 },
  { month: 'Jan', series: 'Target', value: 58 },
];

function InteractiveChart() {
  const [visible, setVisible] = useState<readonly string[]>(['Revenue', 'Target']);
  const definition = useMemo(
    () =>
      defineChart({
        marks: [barY(rows, { x: 'month', y: 'value', color: 'series', layout: group() })],
        scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
        color: {
          domain: ['Revenue', 'Target'],
          range: ['tomato', 'royalblue'],
          legend: interactiveColorLegend({
            hover: 'series',
            visible: controlledSignal(visible, setVisible),
          }),
        },
      }),
    [visible],
  );

  return (
    <ChartPlot definition={definition} ariaLabel="Revenue and target" width={640} height={320} />
  );
}

test('updates a real motion chart through its controlled legend and preserves keyboard focus', async () => {
  render(<InteractiveChart />);
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

test('applies host tooltip CSS variables to the framework-rendered card', async () => {
  const definition = defineChart({
    marks: [barY([{ month: 'Jan', value: 42 }], { x: 'month', y: 'value' })],
    scales: { x: { scale: scaleBand }, y: { scale: scaleLinear } },
    tooltip,
  });
  render(
    <ChartPlot
      definition={definition}
      ariaLabel="Tooltip chart"
      motion={false}
      width={640}
      height={320}
      style={{ '--ts-chart-tooltip-padding': '19px' } as React.CSSProperties}
    />,
  );
  const chart = page.getByRole('img', { name: 'Tooltip chart' });
  await expect.element(chart).toBeVisible();
  await chart.press('ArrowRight');
  await expect
    .poll(() => document.querySelector('[data-slot="chart-tooltip-surface"]'))
    .not.toBeNull();
  const surface = document.querySelector('[data-slot="chart-tooltip-surface"]')!;
  expect(getComputedStyle(surface).padding).toBe('19px');
});