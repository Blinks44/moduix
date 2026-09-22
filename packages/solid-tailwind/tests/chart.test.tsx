import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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

    return {
      prerender: () =>
        `<div role="img" aria-label="${options.ariaLabel}" class="${options.className ?? ''}" data-testid="tanstack-chart" data-renderer="${options.renderer?.type ?? ''}" data-tooltip-class="${options.definition?.tooltip?.className ?? ''}"></div>`,
      mount: (container: HTMLElement) => {
        const target = container.querySelector<HTMLElement>('[data-testid="tanstack-chart"]');

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
      },
      destroy: () => undefined,
    };
  },
}));

test('renders the callable root with stable hooks and replaceable Tailwind defaults', () => {
  render(() => <Chart class="consumer-chart bg-muted p-0 shadow-none" data-testid="root" />);

  const root = screen.getByTestId('root');

  expect(root.tagName).toBe('FIGURE');
  expect(root).toHaveAttribute('data-scope', 'chart');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'chart-root');
  expect(root).toHaveClass('consumer-chart', 'p-0', 'bg-muted', 'shadow-none');
  expect(root).not.toHaveClass('p-5', 'bg-card', 'shadow-sm');
});

test('forwards plot props and supplies the default motion renderer', () => {
  render(() => <ChartPlot ariaLabel="Monthly revenue" definition={{} as never} />);

  const plot = screen.getByTestId('tanstack-chart');

  expect(plot).toHaveAccessibleName('Monthly revenue');
  expect(plot).toHaveAttribute('data-renderer', 'default-motion-renderer');
  expect(document.querySelector('.ts-chart-host')).toHaveClass('min-w-0', 'text-muted-foreground');
});

test('uses the static SVG renderer when motion is disabled', () => {
  render(() => <ChartPlot ariaLabel="Monthly revenue" definition={{} as never} motion={false} />);

  expect(screen.getByTestId('tanstack-chart')).toHaveAttribute(
    'data-renderer',
    'static-svg-renderer',
  );
});

test('prefers an explicit renderer over the motion setting', () => {
  render(() => (
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      motion={false}
      renderer={{ type: 'custom-renderer' } as never}
    />
  ));

  expect(screen.getByTestId('tanstack-chart')).toHaveAttribute('data-renderer', 'custom-renderer');
});

test('styles TanStack tooltip chrome through its public class option', () => {
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

test('renders the compact Moduix tooltip body by default', () => {
  render(() => <ChartPlot ariaLabel="Monthly revenue" definition={{} as never} />);

  expect(document.querySelector('[data-slot="chart-tooltip-body"]')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="chart-tooltip-title"]')).toHaveTextContent('March');
  expect(document.querySelectorAll('[data-slot="chart-tooltip-row"]')).toHaveLength(2);
  expect(document.querySelectorAll('[data-slot="chart-tooltip-swatch"]')).toHaveLength(1);
  expect(document.querySelector('[data-slot="chart-tooltip-label"]')).toHaveTextContent('Revenue');
  expect(document.querySelector('[data-slot="chart-tooltip-value"]')).toHaveTextContent('76');
});

test('passes TanStack’s native default body to a custom tooltip renderer', () => {
  render(() => (
    <ChartPlot
      ariaLabel="Monthly revenue"
      definition={{} as never}
      renderTooltipBody={(tooltip) => <div data-testid="custom-tooltip">{tooltip.defaultBody}</div>}
    />
  ));

  expect(screen.getByTestId('custom-tooltip')).toContainElement(
    document.querySelector('.ts-chart-tooltip__rows'),
  );
});

test('renders composition parts with semantic defaults and stable hooks', () => {
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

test('forwards an HTMLElement ref through an ordinary root', () => {
  let rootRef!: HTMLElement;

  render(() => <Chart ref={(element) => (rootRef = element)} />);

  expect(rootRef).toBe(screen.getByRole('figure'));
});

test('preserves semantic hosts and data hooks with native Ark Solid asChild composition', () => {
  render(() => (
    <Chart
      asChild={(props) => (
        <article {...props()} aria-label="Revenue report">
          Revenue report
        </article>
      )}
    />
  ));

  const root = screen.getByRole('article', { name: 'Revenue report' });

  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'chart-root');
});