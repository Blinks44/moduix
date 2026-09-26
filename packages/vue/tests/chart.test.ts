import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue';
import type { ComponentPublicInstance, VNodeChild } from 'vue';
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

const chartComponents = {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
};

test('renders the callable root with stable hooks', () => {
  render({
    components: chartComponents,
    template:
      '<Chart class="consumer-chart" data-part="consumer" data-scope="consumer" data-slot="consumer" data-testid="root" />',
  });

  const root = screen.getByTestId('root');

  expect(root.tagName).toBe('FIGURE');
  expect(root).toHaveAttribute('data-scope', 'chart');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'chart-root');
  expect(root).toHaveClass('consumer-chart');
});

test('forwards plot props and supplies the default motion renderer', () => {
  render({
    components: chartComponents,
    setup: () => ({ definition: {} as never }),
    template: '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" />',
  });

  const plot = screen.getByTestId('tanstack-chart');

  expect(plot).toHaveAccessibleName('Monthly revenue');
  expect(plot).toHaveAttribute('data-renderer', 'default-motion-renderer');
});

test('uses the static SVG renderer when motion is disabled', () => {
  render({
    components: chartComponents,
    setup: () => ({ definition: {} as never }),
    template: '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" :motion="false" />',
  });

  expect(screen.getByTestId('tanstack-chart')).toHaveAttribute(
    'data-renderer',
    'static-svg-renderer',
  );
});

test('prefers an explicit renderer over the motion setting', () => {
  render({
    components: chartComponents,
    setup: () => ({
      definition: {} as never,
      renderer: { type: 'custom-renderer' } as never,
    }),
    template:
      '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" :motion="false" :renderer="renderer" />',
  });

  expect(screen.getByTestId('tanstack-chart')).toHaveAttribute('data-renderer', 'custom-renderer');
});

test('renders the compact Moduix tooltip body by default', async () => {
  render({
    components: chartComponents,
    setup: () => ({ definition: {} as never }),
    template: '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" />',
  });

  await nextTick();

  expect(document.querySelector('[data-slot="chart-tooltip-body"]')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="chart-tooltip-title"]')).toHaveTextContent('March');
  expect(document.querySelectorAll('[data-slot="chart-tooltip-row"]')).toHaveLength(2);
  expect(document.querySelectorAll('[data-slot="chart-tooltip-swatch"]')).toHaveLength(1);
  expect(document.querySelector('[data-slot="chart-tooltip-label"]')).toHaveTextContent('Revenue');
  expect(document.querySelector('[data-slot="chart-tooltip-value"]')).toHaveTextContent('76');
});

test('passes the Moduix default body to a custom tooltip renderer', async () => {
  render({
    components: chartComponents,
    setup: () => ({
      definition: {} as never,
      renderTooltipBody: (tooltip: { defaultBody: () => VNodeChild }) =>
        h('div', { 'data-testid': 'custom-tooltip' }, [tooltip.defaultBody()]),
    }),
    template:
      '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" :render-tooltip-body="renderTooltipBody" />',
  });

  await nextTick();

  expect(screen.getByTestId('custom-tooltip')).toContainElement(
    document.querySelector('[data-slot="chart-tooltip-rows"]'),
  );
});

test('renders composition parts with semantic defaults and stable hooks', () => {
  render({
    components: chartComponents,
    template: `
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
    `,
  });

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

test('forwards a component ref through the ordinary root', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: chartComponents,
    setup: () => ({ rootRef }),
    template: '<Chart ref="rootRef" />',
  });

  expect(rootRef.value?.$el).toBe(screen.getByRole('figure'));
});

test('preserves semantic hosts, refs, and data hooks through native Ark Vue asChild', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: chartComponents,
    setup: () => ({ rootRef }),
    template: `
      <Chart ref="rootRef" as-child>
        <article aria-label="Revenue report">Revenue report</article>
      </Chart>
    `,
  });

  const root = screen.getByRole('article', { name: 'Revenue report' });

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'chart-root');
});

test('renders the plot surface through SSR and hydrates a single instance', async () => {
  const App = defineComponent({
    components: chartComponents,
    setup: () => ({ definition: {} as never }),
    template: `
      <Chart id="ssr-chart">
        <ChartHeader><ChartTitle>Monthly revenue</ChartTitle></ChartHeader>
        <ChartPlot ariaLabel="Monthly revenue" :definition="definition" />
        <ChartLegend aria-label="Revenue series">
          <ChartLegendItem color="tomato">Revenue</ChartLegendItem>
        </ChartLegend>
      </Chart>
    `,
  });

  const html = await renderToString(createSSRApp(App));

  expect(html).toContain('data-slot="chart-root"');
  expect(html).toContain('aria-label="Monthly revenue"');
  expect(html).toContain('data-renderer="default-motion-renderer"');
  expect(html).not.toContain('data-slot="chart-tooltip-body"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('figure')).toHaveLength(1);
  expect(host.querySelectorAll('.ts-chart-surface')).toHaveLength(1);
  expect(host.querySelector('[data-testid="tanstack-chart"]')).toBeInTheDocument();
  expect(host.querySelector('[data-slot="chart-root"]')).toBeInTheDocument();

  app.unmount();
  host.remove();
});