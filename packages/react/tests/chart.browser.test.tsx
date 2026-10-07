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
            rows: Array<{ label: string; value: string; color?: string }>;
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
            { label: 'Target', value: '68', color: 'tomato' },
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

  expect(
    screen
      .getByTestId('legend-item')
      .style.getPropertyValue('--moduix-chart-legend-indicator-color'),
  ).toBe('tomato');
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