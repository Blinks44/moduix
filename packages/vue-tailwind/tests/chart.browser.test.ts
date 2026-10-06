import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { h, ref } from 'vue';
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

const chartComponents = {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
};

test('preserves reactive plot dimensions and consumer style precedence', async () => {
  const aspectRatio = ref<number>();
  const height = ref<number>();
  const width = ref<number>();
  const style = ref([{ color: 'red' }, { height: '180px' }]);
  render({
    components: chartComponents,
    setup: () => ({ definition: {} as never, aspectRatio, height, width, style }),
    template:
      '<ChartPlot aria-label="Revenue" :definition="definition" :aspect-ratio="aspectRatio" :height="height" :width="width" :style="style" />',
  });
  const host = document.querySelector<HTMLElement>('.ts-chart-host')!;
  expect((host as HTMLElement).style.height).toBe('180px');
  expect((host as HTMLElement).style.color).toBe('red');
  expect((host as HTMLElement).style.width).toBe('100%');
  style.value = [];
  for (const ratio of [undefined, 0, -1, Number.NaN, Number.POSITIVE_INFINITY, 2]) {
    aspectRatio.value = ratio;
    await expect.poll(() => host.style.height).toBe(ratio === 2 ? '' : '320px');
    await expect.poll(() => host.style.aspectRatio).toBe(ratio === 2 ? '2 / 1' : '');
  }
  height.value = 240;
  width.value = 640;
  await expect.poll(() => (host as HTMLElement).style.width).toBe('640px');
  await expect.poll(() => (host as HTMLElement).style.height).toBe('240px');
  await expect.poll(() => host.style.aspectRatio).toBe('');
});

test('preserves empty custom tooltip output and reactive callback replacement', async () => {
  const renderTooltipBody = ref<(() => VNodeChild) | undefined>(() => null);
  render({
    components: chartComponents,
    setup: () => ({ definition: {} as never, renderTooltipBody }),
    template:
      '<ChartPlot aria-label="Revenue" :definition="definition" :render-tooltip-body="renderTooltipBody" />',
  });
  expect(document.querySelector('[data-slot="chart-tooltip-body"]')).toBeNull();
  renderTooltipBody.value = () => h('span', { 'data-testid': 'replacement-tooltip' }, 'Custom');
  await expect.element(page.getByTestId('replacement-tooltip')).toContainText('Custom');
  renderTooltipBody.value = undefined;
  await expect.poll(() => screen.queryByTestId('replacement-tooltip')).toBeNull();
  await expect.element(page.locator('[data-slot="chart-tooltip-rows"]')).toBeAttached();
});

test('renders the callable root with stable hooks and replaceable Tailwind defaults', async () => {
  render({
    components: chartComponents,
    template: '<Chart class="consumer-chart bg-muted p-0 shadow-none" data-testid="root" />',
  });

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
  render({
    components: chartComponents,
    setup: () => ({ definition: {} as never }),
    template: '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" />',
  });

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
  render({
    components: chartComponents,
    setup: () => ({ definition: {} as never }),
    template: '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" :motion="false" />',
  });

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'static-svg-renderer');
});

test('prefers an explicit renderer over the motion setting', async () => {
  render({
    components: chartComponents,
    setup: () => ({
      definition: {} as never,
      renderer: { type: 'custom-renderer' } as never,
    }),
    template:
      '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" :motion="false" :renderer="renderer" />',
  });

  await expect
    .element(page.getByTestId('tanstack-chart'))
    .toHaveAttribute('data-renderer', 'custom-renderer');
});

test('styles TanStack tooltip chrome through its public class option', async () => {
  render({
    components: chartComponents,
    setup: () => ({
      definition: { tooltip: { use: {}, className: '!bg-muted' } } as never,
    }),
    template: '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" />',
  });

  const tooltipClassName = screen.getByTestId('tanstack-chart').getAttribute('data-tooltip-class');

  expect(tooltipClassName).toContain('!p-3');
  expect(tooltipClassName).toContain('!bg-muted');
  expect(tooltipClassName).not.toContain('!bg-popover');
});

test('renders the compact Moduix tooltip body by default', async () => {
  render({
    components: chartComponents,
    setup: () => ({ definition: {} as never }),
    template: '<ChartPlot ariaLabel="Monthly revenue" :definition="definition" />',
  });

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

  await expect.element(page.getByTestId('custom-tooltip')).toBeAttached();
  expect(
    screen
      .getByTestId('custom-tooltip')!
      .contains(document.querySelector('[data-slot="chart-tooltip-rows"]')),
  ).toBe(true);
});

test('renders composition parts with semantic defaults and stable hooks', async () => {
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
  render({
    components: chartComponents,
    template: `
      <Chart>
        <ChartHeader class="gap-4" data-testid="header" />
        <ChartTitle class="text-xl" data-testid="title">Monthly revenue</ChartTitle>
        <ChartDescription class="text-foreground" data-testid="description" />
        <ChartLegend class="gap-1" data-testid="legend" />
        <ChartLegendItem class="text-foreground" data-testid="legend-item" />
      </Chart>
    `,
  });

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

test('forwards a component ref through the ordinary root', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: chartComponents,
    setup: () => ({ rootRef }),
    template: '<Chart ref="rootRef" />',
  });

  expect(rootRef.value?.$el).toBe(screen.getByRole('figure'));
});

test('preserves semantic hosts, refs, and data hooks through native Ark Vue asChild', async () => {
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
  await expect
    .element(page.getByRole('article', { name: 'Revenue report', exact: true }))
    .toHaveAttribute('data-part', 'root');
  await expect
    .element(page.getByRole('article', { name: 'Revenue report', exact: true }))
    .toHaveAttribute('data-slot', 'chart-root');
});