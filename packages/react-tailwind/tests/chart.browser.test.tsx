import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type ReactNode } from 'react';
import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '../src';

rs.mock('@tanstack/charts/motion', () => ({
  motion: () => ({ type: 'default-motion-renderer' }),
}));

rs.mock('@tanstack/charts/svg/renderer', () => ({
  svgChartRenderer: { type: 'static-svg-renderer' },
}));

rs.mock('@tanstack/charts/react/tooltip', () => ({
  RendererChart: ({
    ariaLabel,
    className,
    definition,
    renderTooltipBody,
    renderer,
  }: {
    ariaLabel: string;
    className?: string;
    definition?: { tooltip?: { className?: string } };
    renderTooltipBody?: (context: {
      content:
        | string
        | {
            title?: string;
            color?: string;
            rows: Array<{ label: string; value: string; color?: string }>;
          };
      defaultBody: ReactNode;
      dismiss: () => void;
      pinned: boolean;
      points: never[];
    }) => ReactNode;
    renderer?: unknown;
  }) => (
    <div className={`ts-chart-host ${className ?? ''}`} data-testid="tanstack-chart-host">
      <div
        role="img"
        aria-label={ariaLabel}
        data-renderer={(renderer as { type?: string } | undefined)?.type}
        data-testid="tanstack-chart"
        data-tooltip-class={definition?.tooltip?.className}
      >
        {renderTooltipBody?.({
          content: {
            title: 'March',
            rows: [
              { label: 'Revenue', value: '76' },
              { label: 'Target', value: '68', color: 'tomato' },
            ],
          },
          defaultBody: <span data-testid="tanstack-default-body" />,
          dismiss: () => undefined,
          pinned: false,
          points: [],
        })}
      </div>
    </div>
  ),
}));

test('renders the callable root with stable hooks and replaceable Tailwind defaults', async () => {
  render(
    <Chart
      className="consumer-chart bg-muted p-0 shadow-none"
      data-part="consumer"
      data-scope="consumer"
      data-slot="consumer"
      data-testid="root"
    />,
  );

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

test('forwards plot props and supplies the default motion renderer', async () => {
  render(<ChartPlot ariaLabel="Monthly revenue" definition={{} as never} />);

  const plot = screen.getByTestId('tanstack-chart');

  expect(plot).toBe(
    screen.getByRole(plot!.getAttribute('role') || 'button', { name: 'Monthly revenue' }),
  );
  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'default-motion-renderer');
  expect([...screen.getByTestId('tanstack-chart-host')!.classList]).toEqual(
    expect.arrayContaining(['min-w-0', 'text-muted-foreground']),
  );
});

test('uses the static SVG renderer when motion is disabled', async () => {
  render(<ChartPlot ariaLabel="Monthly revenue" definition={{} as never} motion={false} />);

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'static-svg-renderer');
});

test('prefers an explicit renderer over the motion setting', async () => {
  render(
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      motion={false}
      renderer={{ type: 'custom-renderer' } as never}
    />,
  );

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'custom-renderer');
});

test('styles TanStack tooltip chrome through its public class option', async () => {
  render(
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{ tooltip: { use: {}, className: '!bg-muted' } } as never}
    />,
  );

  const tooltipClassName = screen.getByTestId('tanstack-chart').getAttribute('data-tooltip-class');

  expect(tooltipClassName).toContain('!p-3');
  expect(tooltipClassName).toContain('!bg-muted');
  expect(tooltipClassName).not.toContain('!bg-popover');
});

test('renders the compact Moduix tooltip body by default', async () => {
  render(<ChartPlot ariaLabel="Monthly revenue" definition={{} as never} />);

  await expect.element(page.getByTestId('tanstack-default-body')).toHaveCount(0);
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
  await expect
    .element(page.locator('[data-slot="chart-tooltip-value"]').first())
    .toHaveCSS('text-align', 'end');
});

test('passes TanStack’s native default body to a custom tooltip renderer', async () => {
  render(
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      renderTooltipBody={({ defaultBody }) => <div data-testid="custom-tooltip">{defaultBody}</div>}
    />,
  );

  await expect.element(page.getByTestId('custom-tooltip')).toBeAttached();
  expect(
    screen.getByTestId('custom-tooltip')!.contains(screen.getByTestId('tanstack-default-body')),
  ).toBe(true);
});

test('renders composition parts with semantic defaults and stable hooks', async () => {
  render(
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
    </Chart>,
  );

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
  render(
    <Chart>
      <ChartHeader className="gap-4" data-testid="header" />
      <ChartTitle className="text-xl" data-testid="title">
        Monthly revenue
      </ChartTitle>
      <ChartDescription className="text-foreground" data-testid="description" />
      <ChartLegend className="gap-1" data-testid="legend" />
      <ChartLegendItem className="text-foreground" data-testid="legend-item" />
    </Chart>,
  );

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

test('forwards an HTMLElement ref through an asChild root', async () => {
  const ref = createRef<HTMLElement>();

  render(
    <Chart asChild ref={ref}>
      <article aria-label="Revenue report" />
    </Chart>,
  );

  const root = screen.getByRole('article', { name: 'Revenue report' });

  expect(ref.current).toBe(root);
  await expect
    .element(page.getByRole('article', { name: 'Revenue report', exact: true }))
    .toHaveAttribute('data-part', 'root');
  await expect
    .element(page.getByRole('article', { name: 'Revenue report', exact: true }))
    .toHaveAttribute('data-slot', 'chart-root');
});