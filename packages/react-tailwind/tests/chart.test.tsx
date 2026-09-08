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

test('renders the callable root with stable hooks and replaceable Tailwind defaults', () => {
  render(<Chart className="consumer-chart bg-muted p-0 shadow-none" data-testid="root" />);

  const root = screen.getByTestId('root');

  expect(root.tagName).toBe('FIGURE');
  expect(root).toHaveAttribute('data-scope', 'chart');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'chart-root');
  expect(root).toHaveClass('consumer-chart', 'p-0', 'bg-muted', 'shadow-none');
  expect(root).not.toHaveClass('p-5', 'bg-card', 'shadow-sm');
});

test('forwards plot props and supplies the default motion renderer', () => {
  render(<Chart.Plot ariaLabel="Monthly revenue" definition={{} as never} />);

  const plot = screen.getByTestId('tanstack-chart');

  expect(plot).toHaveAccessibleName('Monthly revenue');
  expect(plot).toHaveAttribute('data-renderer', 'default-motion-renderer');
  expect(screen.getByTestId('tanstack-chart-host')).toHaveClass('min-w-0', 'text-muted-foreground');
});

test('uses the static SVG renderer when motion is disabled', () => {
  render(<Chart.Plot ariaLabel="Monthly revenue" definition={{} as never} motion={false} />);

  expect(screen.getByTestId('tanstack-chart')).toHaveAttribute(
    'data-renderer',
    'static-svg-renderer',
  );
});

test('prefers an explicit renderer over the motion setting', () => {
  render(
    <Chart.Plot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      motion={false}
      renderer={{ type: 'custom-renderer' } as never}
    />,
  );

  expect(screen.getByTestId('tanstack-chart')).toHaveAttribute('data-renderer', 'custom-renderer');
});

test('styles TanStack tooltip chrome through its public class option', () => {
  render(
    <Chart.Plot
      ariaLabel="Monthly revenue"
      definition={{ tooltip: { use: {}, className: '!bg-muted' } } as never}
    />,
  );

  const tooltipClassName = screen.getByTestId('tanstack-chart').getAttribute('data-tooltip-class');

  expect(tooltipClassName).toContain('!p-3');
  expect(tooltipClassName).toContain('!bg-muted');
  expect(tooltipClassName).not.toContain('!bg-popover');
});

test('renders the compact Moduix tooltip body by default', () => {
  render(<Chart.Plot ariaLabel="Monthly revenue" definition={{} as never} />);

  expect(screen.queryByTestId('tanstack-default-body')).not.toBeInTheDocument();
  expect(document.querySelector('[data-slot="chart-tooltip-body"]')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="chart-tooltip-title"]')).toHaveTextContent('March');
  expect(document.querySelectorAll('[data-slot="chart-tooltip-row"]')).toHaveLength(2);
  expect(document.querySelectorAll('[data-slot="chart-tooltip-swatch"]')).toHaveLength(1);
  expect(document.querySelector('[data-slot="chart-tooltip-label"]')).toHaveTextContent('Revenue');
  expect(document.querySelector('[data-slot="chart-tooltip-value"]')).toHaveTextContent('76');
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

  expect(screen.getByTestId('header')).toHaveClass('grid', 'gap-1');
  expect(screen.getByTestId('title')).toHaveClass('text-lg', 'font-semibold');
  expect(screen.getByTestId('description')).toHaveClass('text-sm', 'text-muted-foreground');
  expect(screen.getByTestId('legend')).toHaveClass('flex', 'flex-wrap', 'gap-3');
  expect(screen.getByTestId('legend-item')).toHaveClass(
    'inline-flex',
    'items-center',
    'gap-2',
    'text-sm',
    'text-muted-foreground',
  );

  const indicator = screen.getByTestId('legend-item').firstElementChild;
  expect(indicator).toHaveAttribute('aria-hidden', 'true');
  expect(indicator).toHaveClass('size-2.5', 'shrink-0', 'rounded-full', 'bg-muted-foreground');
  expect(indicator).toHaveStyle({ backgroundColor: 'tomato' });
});

test('lets consumer Tailwind classes override conflicting defaults on every public part', () => {
  render(
    <Chart>
      <Chart.Header className="gap-4" data-testid="header" />
      <Chart.Title className="text-xl" data-testid="title">
        Monthly revenue
      </Chart.Title>
      <Chart.Description className="text-foreground" data-testid="description" />
      <Chart.Legend className="gap-1" data-testid="legend" />
      <Chart.LegendItem className="text-foreground" data-testid="legend-item" />
    </Chart>,
  );

  expect(screen.getByTestId('header')).toHaveClass('gap-4');
  expect(screen.getByTestId('header')).not.toHaveClass('gap-1');
  expect(screen.getByTestId('title')).toHaveClass('text-xl');
  expect(screen.getByTestId('title')).not.toHaveClass('text-lg');
  expect(screen.getByTestId('description')).toHaveClass('text-foreground');
  expect(screen.getByTestId('description')).not.toHaveClass('text-muted-foreground');
  expect(screen.getByTestId('legend')).toHaveClass('gap-1');
  expect(screen.getByTestId('legend')).not.toHaveClass('gap-3');
  expect(screen.getByTestId('legend-item')).toHaveClass('text-foreground');
  expect(screen.getByTestId('legend-item')).not.toHaveClass('text-muted-foreground');
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