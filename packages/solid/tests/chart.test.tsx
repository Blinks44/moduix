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

test('renders the callable root with stable hooks', () => {
  render(() => <Chart class="consumer-chart" data-testid="root" />);

  const root = screen.getByTestId('root');

  expect(root.tagName).toBe('FIGURE');
  expect(root).toHaveAttribute('data-scope', 'chart');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'chart-root');
  expect(root).toHaveClass('consumer-chart');
});

test('forwards plot props and supplies the default motion renderer', () => {
  render(() => <ChartPlot ariaLabel="Monthly revenue" definition={{} as never} />);

  const plot = screen.getByTestId('tanstack-chart');

  expect(plot).toHaveAccessibleName('Monthly revenue');
  expect(plot).toHaveAttribute('data-renderer', 'default-motion-renderer');
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

  expect(
    screen
      .getByTestId('legend-item')
      .style.getPropertyValue('--moduix-chart-legend-indicator-color'),
  ).toBe('tomato');
});

test('forwards an HTMLElement ref through the ordinary root', () => {
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

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLElement | undefined;

  render(() => (
    <Chart
      ref={(element) => (rootRef = element)}
      asChild={(props) => <article {...props()} aria-label="Revenue report" />}
    />
  ));

  expect(screen.getByRole('article', { name: 'Revenue report' })).toBeInTheDocument();
  expect(rootRef).toBeUndefined();
});