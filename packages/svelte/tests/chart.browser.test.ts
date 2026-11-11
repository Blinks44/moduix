import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { chartColors } from '@/components/chart';
import AsChildChart from './chart/AsChildChart.svelte';
import PartsChart from './chart/PartsChart.svelte';
import PlotHarness from './chart/PlotHarness.svelte';
import RefChart from './chart/RefChart.svelte';
import RootChart from './chart/RootChart.svelte';
import TooltipBodyPlot from './chart/TooltipBodyPlot.svelte';

type MockTarget = {
  content:
    | string
    | {
        title?: string;
        color?: string;
        rows: Array<{ label: string; value: string; color?: string; active?: boolean }>;
      };
  dismiss: () => void;
  element: HTMLElement;
  pinned: boolean;
  points: never[];
};

type MockOptions = {
  ariaLabel: string;
  className?: string;
  onTooltipBodyChange?: (target: MockTarget) => void;
  renderer?: { type?: string };
};

rs.mock('@tanstack/charts/motion', () => ({
  motion: () => ({ type: 'default-motion-renderer' }),
}));

rs.mock('@tanstack/charts/svg/renderer', () => ({
  svgChartRenderer: { type: 'static-svg-renderer' },
}));

rs.mock('@tanstack/charts/adapter/renderer', () => ({
  createChartRendererAdapter: (initialOptions: MockOptions) => {
    let options = initialOptions;

    return {
      prerender: () =>
        `<div role="img" aria-label="${options.ariaLabel}" class="${options.className ?? ''}" data-testid="tanstack-chart" data-renderer="${options.renderer?.type ?? ''}"></div>`,
      mount: (container: HTMLElement) => {
        const target = container.querySelector<HTMLElement>('[data-testid="tanstack-chart"]');

        if (target) {
          options.onTooltipBodyChange?.({
            content: {
              title: 'March',
              rows: [
                { label: 'Revenue', value: '76' },
                { label: 'Target', value: '68', color: 'tomato', active: true },
              ],
            },
            dismiss: () => undefined,
            element: target,
            pinned: false,
            points: [],
          });
        }
      },
      update: (nextOptions: MockOptions) => {
        options = nextOptions;
      },
      destroy: () => undefined,
    };
  },
}));

test('preserves reactive plot dimensions and consumer style precedence', async () => {
  const { rerender } = render(PlotHarness, {
    props: { ariaLabel: 'Revenue', style: 'color: red; height: 180px' },
  });
  const host = document.querySelector<HTMLElement>('.ts-chart-host')!;
  expect(host.style.height).toBe('180px');
  expect(host.style.color).toBe('red');
  expect(host.style.width).toBe('100%');
  await rerender({ style: undefined });
  for (const ratio of [undefined, 0, -1, Number.NaN, Number.POSITIVE_INFINITY, 2]) {
    await rerender({ aspectRatio: ratio });
    await expect.poll(() => host.style.height).toBe(ratio === 2 ? '' : '320px');
    await expect.poll(() => host.style.aspectRatio).toBe(ratio === 2 ? '2 / 1' : '');
  }
  await rerender({ height: 240, width: 640 });
  await expect.poll(() => host.style.width).toBe('640px');
  await expect.poll(() => host.style.height).toBe('240px');
  await expect.poll(() => host.style.aspectRatio).toBe('');
});

test('preserves empty custom tooltip output and reactive callback replacement', async () => {
  const { rerender } = render(TooltipBodyPlot, { props: { mode: 'empty' } });
  expect(document.querySelector('[data-slot="chart-tooltip-body"]')).toBeNull();
  await rerender({ mode: 'replacement' });
  await expect.element(page.getByTestId('replacement-tooltip')).toContainText('Custom');
  await rerender({ mode: undefined });
  await expect.poll(() => screen.queryByTestId('replacement-tooltip')).toBeNull();
  await expect.element(page.locator('[data-slot="chart-tooltip-rows"]')).toBeAttached();
});

test('renders the callable root with stable hooks', async () => {
  render(RootChart);

  const root = screen.getByTestId('root');

  expect(root.tagName).toBe('FIGURE');
  await expect.element(page.getByTestId('root')).toHaveAttribute('data-scope', 'chart');
  await expect.element(page.getByTestId('root')).toHaveAttribute('data-part', 'root');
  await expect.element(page.getByTestId('root')).toHaveAttribute('data-slot', 'chart-root');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-chart']));
});

test('forwards plot props and supplies the default motion renderer', async () => {
  render(PlotHarness, { props: { ariaLabel: 'Monthly revenue' } });

  const plot = screen.getByTestId('tanstack-chart');

  expect(plot).toBe(
    screen.getByRole(plot!.getAttribute('role') || 'button', { name: 'Monthly revenue' }),
  );
  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'default-motion-renderer');
});

test('uses the static SVG renderer when motion is disabled', async () => {
  render(PlotHarness, { props: { ariaLabel: 'Monthly revenue', motion: false } });

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'static-svg-renderer');
});

test('prefers an explicit renderer over the motion setting', async () => {
  render(PlotHarness, {
    props: {
      ariaLabel: 'Monthly revenue',
      motion: false,
      renderer: { type: 'custom-renderer' } as never,
    },
  });

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'custom-renderer');
});

test('passes the Moduix default body to a custom tooltip renderer', async () => {
  render(TooltipBodyPlot, { props: { mode: 'wrap' } });

  await expect.element(page.getByTestId('custom-tooltip')).toBeAttached();
  expect(
    screen
      .getByTestId('custom-tooltip')!
      .contains(document.querySelector('[data-slot="chart-tooltip-rows"]')),
  ).toBe(true);
});

test('renders composition parts with semantic defaults and stable hooks', async () => {
  render(PartsChart);

  const parts = [
    ['header', 'figcaption'],
    ['title', 'h3'],
    ['description', 'p'],
    ['legend', 'ul'],
    ['legend-item', 'li'],
  ] as const;

  for (const [part, tagName] of parts) {
    const element = screen.getByTestId(part);

    await expect.element(page.getByTestId(part)).toHaveAttribute('data-scope', 'chart');
    await expect.element(page.getByTestId(part)).toHaveAttribute('data-part', part);
    await expect.element(page.getByTestId(part)).toHaveAttribute('data-slot', `chart-${part}`);
    expect(element.tagName).toBe(tagName.toUpperCase());
  }

  const indicator = getComputedStyle(screen.getByTestId('legend-item'), '::before');
  expect(indicator.backgroundColor).toBe('rgb(255, 99, 71)');
  expect(indicator.borderRadius).not.toBe('0px');
});

test('forwards a component ref through the ordinary root', async () => {
  const { component } = render(RefChart);

  expect(component.getRefs().rootRef).toBe(screen.getByRole('figure'));
});

test('preserves semantic hosts, refs, and data hooks through native Ark Svelte asChild', async () => {
  const { component } = render(AsChildChart);

  const root = screen.getByRole('article', { name: 'Revenue report' });

  expect(component.getRefs().rootRef).toBe(root);
  await expect
    .element(page.getByRole('article', { name: 'Revenue report', exact: true }))
    .toHaveAttribute('data-part', 'root');
  await expect
    .element(page.getByRole('article', { name: 'Revenue report', exact: true }))
    .toHaveAttribute('data-slot', 'chart-root');
});

test('exports a palette of distinct theme chart colors', () => {
  const resolved = chartColors.map((color) => {
    const element = document.createElement('span');
    element.style.color = color;
    document.body.append(element);
    const value = getComputedStyle(element).color;
    element.remove();
    return value;
  });
  expect(new Set(resolved).size).toBe(chartColors.length);
});