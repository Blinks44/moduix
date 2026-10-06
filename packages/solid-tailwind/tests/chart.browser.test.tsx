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
} from '../src';

type MockTarget = {
  content:
    | string
    | {
        title?: string;
        color?: string;
        rows: Array<{ label: string; value: string; color?: string }>;
      };
  dismiss: () => void;
  element: HTMLElement;
  pinned: boolean;
  points: never[];
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
                { label: 'Target', value: '68', color: 'tomato' },
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
  expect(['p-5', 'bg-card', 'shadow-sm'].some((name) => root!.classList.contains(name))).toBe(
    false,
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
  expect([...document.querySelector('.ts-chart-host')!.classList]).toEqual(
    expect.arrayContaining(['min-w-0', 'text-muted-foreground']),
  );
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

test('styles TanStack tooltip chrome through its public class option', async () => {
  render(() => (
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{ tooltip: { use: {}, className: '!bg-muted' } } as never}
    />
  ));

  const tooltipClassName = screen.getByTestId('tanstack-chart').getAttribute('data-tooltip-class');

  expect(tooltipClassName).toContain('!p-3');
  expect(tooltipClassName).toContain('!bg-muted');
  expect(tooltipClassName).not.toContain('!bg-popover');
});

test('renders the compact Moduix tooltip body by default', async () => {
  render(() => <ChartPlot ariaLabel="Monthly revenue" definition={{} as never} />);

  await expect.element(page.locator('[data-slot="chart-tooltip-body"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="chart-tooltip-title"]')).toContainText('March');
  expect(document.querySelectorAll('[data-slot="chart-tooltip-row"]')).toHaveLength(2);
  expect(document.querySelectorAll('[data-slot="chart-tooltip-swatch"]')).toHaveLength(1);
  await expect
    .element(page.locator('[data-slot="chart-tooltip-label"]').first())
    .toContainText('Revenue');
  await expect
    .element(page.locator('[data-slot="chart-tooltip-value"]').first())
    .toContainText('76');
});

test('passes TanStack’s native default body to a custom tooltip renderer', async () => {
  render(() => (
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      renderTooltipBody={(tooltip) => <div data-testid="custom-tooltip">{tooltip.defaultBody}</div>}
    />
  ));

  await expect.element(page.getByTestId('custom-tooltip')).toBeAttached();
  expect(
    screen
      .getByTestId('custom-tooltip')!
      .contains(document.querySelector('[data-slot="chart-tooltip-rows"]')),
  ).toBe(true);
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

  expect([...screen.getByTestId('header')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'gap-1']),
  );
  expect([...screen.getByTestId('title')!.classList]).toEqual(
    expect.arrayContaining(['text-lg', 'font-semibold']),
  );
  expect([...screen.getByTestId('description')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'text-muted-foreground']),
  );
  expect([...screen.getByTestId('legend')!.classList]).toEqual(
    expect.arrayContaining(['flex', 'flex-wrap', 'gap-3']),
  );
  expect([...screen.getByTestId('legend-item')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'items-center',
      'gap-2',
      'text-sm',
      'text-muted-foreground',
    ]),
  );

  const indicator = screen.getByTestId('legend-item').firstElementChild;
  expect(indicator!.getAttribute('aria-hidden')).toBe('true');
  expect([...indicator!.classList]).toEqual(
    expect.arrayContaining(['size-2.5', 'shrink-0', 'rounded-full', 'bg-muted-foreground']),
  );
  expect((indicator as HTMLElement).style.backgroundColor).toBe('tomato');
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
  expect(['gap-1'].some((name) => screen.getByTestId('header')!.classList.contains(name))).toBe(
    false,
  );
  expect([...screen.getByTestId('title')!.classList]).toEqual(expect.arrayContaining(['text-xl']));
  expect(['text-lg'].some((name) => screen.getByTestId('title')!.classList.contains(name))).toBe(
    false,
  );
  expect([...screen.getByTestId('description')!.classList]).toEqual(
    expect.arrayContaining(['text-foreground']),
  );
  expect(
    ['text-muted-foreground'].some((name) =>
      screen.getByTestId('description')!.classList.contains(name),
    ),
  ).toBe(false);
  expect([...screen.getByTestId('legend')!.classList]).toEqual(expect.arrayContaining(['gap-1']));
  expect(['gap-3'].some((name) => screen.getByTestId('legend')!.classList.contains(name))).toBe(
    false,
  );
  expect([...screen.getByTestId('legend-item')!.classList]).toEqual(
    expect.arrayContaining(['text-foreground']),
  );
  expect(
    ['text-muted-foreground'].some((name) =>
      screen.getByTestId('legend-item')!.classList.contains(name),
    ),
  ).toBe(false);
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