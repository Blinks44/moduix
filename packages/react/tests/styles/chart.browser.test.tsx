import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type ReactNode } from 'react';
import {
  chartColors,
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '@/index';

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
    renderTooltipBody,
    renderer,
  }: {
    ariaLabel: string;
    className?: string;
    renderTooltipBody?: (context: {
      content:
        | string
        | {
            title?: string;
            color?: string;
            rows: Array<{ label: string; value: string; color?: string; active?: boolean }>;
          };
      defaultBody: ReactNode;
      dismiss: () => void;
      pinned: boolean;
      points: never[];
    }) => ReactNode;
    renderer?: unknown;
  }) => (
    <div
      role="img"
      aria-label={ariaLabel}
      className={className}
      data-renderer={(renderer as { type?: string } | undefined)?.type}
      data-testid="tanstack-chart"
    >
      {renderTooltipBody?.({
        content: {
          title: 'March',
          rows: [
            { label: 'Revenue', value: '76' },
            { label: 'Target', value: '68', color: 'tomato', active: true },
          ],
        },
        defaultBody: <span data-testid="tanstack-default-body" />,
        dismiss: () => undefined,
        pinned: false,
        points: [],
      })}
    </div>
  ),
}));

test('renders the callable root with stable hooks', async () => {
  render(
    <Chart
      className="consumer-chart"
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
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-chart']));
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
});

test('uses the static SVG renderer when motion is disabled', async () => {
  render(<ChartPlot ariaLabel="Monthly revenue" definition={{} as never} motion={false} />);

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'static-svg-renderer');
});

test('passes the Moduix default body to a custom tooltip renderer', async () => {
  render(
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      renderTooltipBody={({ defaultBody }) => <div data-testid="custom-tooltip">{defaultBody}</div>}
    />,
  );

  await expect.element(page.getByTestId('custom-tooltip')).toBeAttached();
  await expect.element(page.getByTestId('tanstack-default-body')).toHaveCount(0);
  expect(
    screen
      .getByTestId('custom-tooltip')!
      .contains(document.querySelector('[data-slot="chart-tooltip-body"]')),
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

  const indicator = getComputedStyle(screen.getByTestId('legend-item'), '::before');
  expect(indicator.backgroundColor).toBe('rgb(255, 99, 71)');
  expect(indicator.borderRadius).not.toBe('0px');
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