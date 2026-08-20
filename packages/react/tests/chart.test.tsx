import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type ReactNode } from 'react';
import { Chart } from '../src';

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

test('renders the callable root with stable hooks', () => {
  render(<Chart className="consumer-chart" data-testid="root" />);

  const root = screen.getByTestId('root');

  expect(root.tagName).toBe('FIGURE');
  expect(root).toHaveAttribute('data-scope', 'chart');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'chart-root');
  expect(root).toHaveClass('consumer-chart');
});

test('forwards plot props and supplies the default motion renderer', () => {
  render(<Chart.Plot ariaLabel="Monthly revenue" definition={{} as never} />);

  const plot = screen.getByTestId('tanstack-chart');

  expect(plot).toHaveAccessibleName('Monthly revenue');
  expect(plot).toHaveAttribute('data-renderer', 'default-motion-renderer');
});

test('uses the static SVG renderer when motion is disabled', () => {
  render(<Chart.Plot ariaLabel="Monthly revenue" definition={{} as never} motion={false} />);

  expect(screen.getByTestId('tanstack-chart')).toHaveAttribute(
    'data-renderer',
    'static-svg-renderer',
  );
});

test('keeps the native tooltip body when no custom renderer is supplied', () => {
  render(<Chart.Plot ariaLabel="Monthly revenue" definition={{} as never} />);

  expect(screen.queryByTestId('tanstack-default-body')).not.toBeInTheDocument();
});

test('passes TanStack’s native default body to a custom tooltip renderer', () => {
  render(
    <Chart.Plot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      renderTooltipBody={({ defaultBody }) => <div data-testid="custom-tooltip">{defaultBody}</div>}
    />,
  );

  expect(screen.getByTestId('custom-tooltip')).toContainElement(
    screen.getByTestId('tanstack-default-body'),
  );
});

test('renders composition parts with semantic defaults and stable hooks', () => {
  render(
    <Chart>
      <Chart.Header data-testid="header">
        <Chart.Title data-testid="title">Monthly revenue</Chart.Title>
        <Chart.Description data-testid="description">Revenue by month</Chart.Description>
      </Chart.Header>
      <Chart.Legend aria-label="Series" data-testid="legend">
        <Chart.LegendItem color="tomato" data-testid="legend-item">
          Revenue
        </Chart.LegendItem>
      </Chart.Legend>
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

    expect(element).toHaveAttribute('data-scope', 'chart');
    expect(element).toHaveAttribute('data-part', part);
    expect(element).toHaveAttribute('data-slot', `chart-${part}`);
    expect(element.tagName).toBe(tagName.toUpperCase());
  }

  expect(
    screen
      .getByTestId('legend-item')
      .style.getPropertyValue('--moduix-chart-legend-indicator-color'),
  ).toBe('tomato');
});

test('forwards an HTMLElement ref through an asChild root', () => {
  const ref = createRef<HTMLElement>();

  render(
    <Chart asChild ref={ref}>
      <article aria-label="Revenue report" />
    </Chart>,
  );

  const root = screen.getByRole('article', { name: 'Revenue report' });

  expect(ref.current).toBe(root);
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'chart-root');
});