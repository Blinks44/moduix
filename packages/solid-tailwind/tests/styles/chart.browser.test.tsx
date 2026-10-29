import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '@/index';

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
  primaryPoint?: { key: string };
};

type MockOptions = {
  ariaLabel: string;
  className?: string;
  definition?: { tooltip?: { className?: string } };
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
    let target: HTMLElement | null = null;

    return {
      prerender: () =>
        `<div role="img" aria-label="${options.ariaLabel}" class="${options.className ?? ''}" data-testid="tanstack-chart" data-renderer="${options.renderer?.type ?? ''}" data-tooltip-class="${options.definition?.tooltip?.className ?? ''}"></div>`,
      mount: (container: HTMLElement) => {
        target = container.querySelector<HTMLElement>('[data-testid="tanstack-chart"]');

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
            primaryPoint: { key: 'march-target' },
          });
        }
      },
      update: (nextOptions: MockOptions) => {
        options = nextOptions;
        target?.setAttribute('aria-label', options.ariaLabel);
        target?.setAttribute('data-renderer', options.renderer?.type ?? '');
      },
      destroy: () => undefined,
    };
  },
}));

test('renders the callable root with stable hooks and replaceable Tailwind defaults', async () => {
  render(() => <Chart class="consumer-chart bg-muted p-0 shadow-none" data-testid="root" />);

  const root = screen.getByTestId('root');

  expect(root.tagName).toBe('FIGURE');
  await expect.element(page.getByTestId('root')).toHaveAttribute('data-scope', 'chart');
  await expect.element(page.getByTestId('root')).toHaveAttribute('data-part', 'root');
  await expect.element(page.getByTestId('root')).toHaveAttribute('data-slot', 'chart-root');
  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['consumer-chart', 'p-0', 'bg-muted', 'shadow-none']),
  );
});

test('updates renderer options reactively without replacing the plot', async () => {
  const [label, setLabel] = createSignal('Monthly revenue');
  const [motion, setMotion] = createSignal(true);
  render(() => <ChartPlot ariaLabel={label()} definition={{} as never} motion={motion()} />);

  const plot = screen.getByTestId('tanstack-chart');
  setLabel('Annual revenue');
  expect(plot).toBe(
    screen.getByRole(plot!.getAttribute('role') || 'button', { name: 'Annual revenue' }),
  );
  setMotion(false);
  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'static-svg-renderer');
  expect(screen.getByTestId('tanstack-chart')).toBe(plot);
});

test('forwards plot props and supplies the default motion renderer', async () => {
  render(() => <ChartPlot ariaLabel="Monthly revenue" definition={{} as never} />);

  const plot = screen.getByTestId('tanstack-chart');

  expect(plot).toBe(
    screen.getByRole(plot!.getAttribute('role') || 'button', { name: 'Monthly revenue' }),
  );
  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'default-motion-renderer');
});

test('uses the static SVG renderer when motion is disabled', async () => {
  render(() => <ChartPlot ariaLabel="Monthly revenue" definition={{} as never} motion={false} />);

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'static-svg-renderer');
});

test('prefers an explicit renderer over the motion setting', async () => {
  render(() => (
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      motion={false}
      renderer={{ type: 'custom-renderer' } as never}
    />
  ));

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'custom-renderer');
});

test('maps tooltip chrome to TanStack variables without rewriting the definition', async () => {
  render(() => (
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{ tooltip: { use: {}, className: '!bg-muted' } } as never}
    />
  ));

  expect(screen.getByTestId('tanstack-chart').getAttribute('data-tooltip-class')).toBe('!bg-muted');

  const host = getComputedStyle(document.querySelector('.ts-chart-host')!);

  for (const name of [
    'background',
    'border',
    'border-radius',
    'color',
    'font',
    'padding',
    'shadow',
  ]) {
    expect(host.getPropertyValue(`--ts-chart-tooltip-${name}`).trim()).not.toBe('');
  }
});

test('passes the Moduix default body to a reactive custom tooltip renderer', async () => {
  const [custom, setCustom] = createSignal(false);
  render(() => (
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      renderTooltipBody={
        custom()
          ? (tooltip) => (
              <div data-primary={tooltip.primaryPoint?.key} data-testid="custom-tooltip">
                {tooltip.defaultBody}
              </div>
            )
          : undefined
      }
    />
  ));

  await expect.element(page.locator('[data-slot="chart-tooltip-rows"]')).toBeAttached();
  setCustom(true);
  await expect.element(page.getByTestId('custom-tooltip')).toBeAttached();
  await expect
    .element(page.getByTestId('custom-tooltip'))
    .toHaveAttribute('data-primary', 'march-target');
  expect(
    screen
      .getByTestId('custom-tooltip')!
      .contains(document.querySelector('[data-slot="chart-tooltip-rows"]')),
  ).toBe(true);
  setCustom(false);
  await expect.element(page.getByTestId('custom-tooltip')).toHaveCount(0);
  await expect.element(page.locator('[data-slot="chart-tooltip-rows"]')).toBeAttached();
});

test('updates aspect ratio and falls back to the default height for an invalid ratio', async () => {
  const [ratio, setRatio] = createSignal(2);
  render(() => (
    <ChartPlot
      ariaLabel="Responsive chart"
      definition={{} as never}
      width={640}
      aspectRatio={ratio()}
    />
  ));
  const host = page.locator('.ts-chart-host');
  await expect.element(host).toHaveCSS('aspect-ratio', '2 / 1');
  await expect.element(host).toHaveCSS('height', '320px');
  setRatio(4);
  await expect.element(host).toHaveCSS('height', '160px');
  setRatio(0);
  await expect.element(host).toHaveCSS('aspect-ratio', 'auto');
  await expect.element(host).toHaveCSS('height', '320px');
});

test('renders composition parts with semantic defaults and stable hooks', async () => {
  render(() => (
    <Chart>
      <ChartHeader data-testid="header">
        <ChartTitle data-testid="title">Monthly revenue</ChartTitle>
        <ChartDescription data-testid="description">Revenue by month</ChartDescription>
      </ChartHeader>
      <ChartLegend aria-label="Series" data-testid="legend">
        <ChartLegendItem color="tomato" data-testid="legend-item">
          Revenue
        </ChartLegendItem>
      </ChartLegend>
    </Chart>
  ));

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

test('lets consumer Tailwind classes override conflicting defaults on every public part', async () => {
  render(() => (
    <Chart>
      <ChartHeader class="gap-4" data-testid="header" />
      <ChartTitle class="text-xl" data-testid="title">
        Monthly revenue
      </ChartTitle>
      <ChartDescription class="text-foreground" data-testid="description" />
      <ChartLegend class="gap-1" data-testid="legend" />
      <ChartLegendItem class="text-foreground" data-testid="legend-item" />
    </Chart>
  ));

  expect([...screen.getByTestId('header')!.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect([...screen.getByTestId('title')!.classList]).toEqual(expect.arrayContaining(['text-xl']));
  expect([...screen.getByTestId('description')!.classList]).toEqual(
    expect.arrayContaining(['text-foreground']),
  );
  expect([...screen.getByTestId('legend')!.classList]).toEqual(expect.arrayContaining(['gap-1']));
  expect([...screen.getByTestId('legend-item')!.classList]).toEqual(
    expect.arrayContaining(['text-foreground']),
  );
});

test('forwards an HTMLElement ref through an ordinary root', async () => {
  let rootRef!: HTMLElement;

  render(() => <Chart ref={(element) => (rootRef = element)} />);

  expect(rootRef).toBe(screen.getByRole('figure'));
});

test('preserves semantic hosts and data hooks with native Ark Solid asChild composition', async () => {
  render(() => (
    <Chart
      asChild={(props) => (
        <article {...props()} aria-label="Revenue report">
          Revenue report
        </article>
      )}
    />
  ));

  await expect
    .element(page.getByRole('article', { name: 'Revenue report', exact: true }))
    .toHaveAttribute('data-part', 'root');
  await expect
    .element(page.getByRole('article', { name: 'Revenue report', exact: true }))
    .toHaveAttribute('data-slot', 'chart-root');
});