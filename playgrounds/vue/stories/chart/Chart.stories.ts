import type { StoryObj } from '@storybook/vue3-vite';
import { areaY, barY, defineChart, lineY, stack } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { defineComponent, h } from 'vue';
import type { VNodeChild } from 'vue';
import { Button } from '@/components/button';
import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '@/components/chart';

const monthlyRevenue = [
  { month: 'Jan', revenue: 42, target: 48 },
  { month: 'Feb', revenue: 58, target: 55 },
  { month: 'Mar', revenue: 76, target: 68 },
  { month: 'Apr', revenue: 64, target: 72 },
  { month: 'May', revenue: 81, target: 80 },
] as const;

const quarterlyRevenue = [
  { quarter: 'Q1', segment: 'Product', value: 42 },
  { quarter: 'Q1', segment: 'Services', value: 18 },
  { quarter: 'Q2', segment: 'Product', value: 48 },
  { quarter: 'Q2', segment: 'Services', value: 24 },
  { quarter: 'Q3', segment: 'Product', value: 53 },
  { quarter: 'Q3', segment: 'Services', value: 31 },
  { quarter: 'Q4', segment: 'Product', value: 59 },
  { quarter: 'Q4', segment: 'Services', value: 38 },
] as const;

const revenueByChannel = [
  { channel: 'Direct', value: 38 },
  { channel: 'Organic', value: 29 },
  { channel: 'Partners', value: 21 },
  { channel: 'Other', value: 12 },
];

const barDefinition = defineChart({
  marks: [
    barY(monthlyRevenue, {
      x: 'month',
      y: 'revenue',
      color: () => 'Revenue',
      inset: 3,
      radius: 6,
    }),
  ],
  scales: {
    x: {
      scale: scaleBand,
      axis: { label: 'Month' },
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: 'Revenue ($k)' },
    },
  },
  color: {
    domain: ['Revenue'],
    range: ['var(--moduix-color-chart-1)'],
  },
  tooltip,
});

const areaDefinition = defineChart({
  marks: [
    areaY(monthlyRevenue, {
      x: 'month',
      y: 'revenue',
      color: () => 'Revenue',
      fillOpacity: 0.18,
      strokeWidth: 2,
    }),
    lineY(monthlyRevenue, {
      x: 'month',
      y: 'target',
      color: () => 'Target',
      points: true,
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: {
      scale: () => scalePoint<string>().padding(0.2),
      axis: { label: 'Month' },
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: 'Revenue ($k)' },
    },
  },
  color: {
    domain: ['Revenue', 'Target'],
    range: ['var(--moduix-color-chart-1)', 'var(--moduix-color-chart-2)'],
  },
  focus: 'group-x',
  tooltip,
});

const stackedDefinition = defineChart({
  marks: [
    barY(quarterlyRevenue, {
      x: 'quarter',
      y: 'value',
      color: 'segment',
      layout: stack(),
      inset: 3,
    }),
  ],
  scales: {
    x: {
      scale: scaleBand,
      axis: { label: 'Quarter' },
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: 'Revenue ($k)' },
    },
  },
  color: {
    domain: ['Product', 'Services'],
    range: ['var(--moduix-color-chart-1)', 'var(--moduix-color-chart-2)'],
  },
  focus: 'group-x',
  tooltip,
});

const donutDefinition = defineChart({
  marks: [
    polar({
      inset: 8,
      radiusRatio: 0.82,
      scales: {
        angle: null,
        radius: null,
      },
      marks: [
        radialArc(pie(revenueByChannel, { value: 'value', gapAngle: 0.04 }), {
          innerRadius: ({ radius }) => radius * 0.58,
          cornerRadius: 5,
          color: 'channel',
          key: 'channel',
        }),
      ],
    }),
  ],
  scales: {
    x: null,
    y: null,
  },
  color: {
    domain: revenueByChannel.map(({ channel }) => channel),
    range: [
      'var(--moduix-color-chart-1)',
      'var(--moduix-color-chart-2)',
      'var(--moduix-color-chart-3)',
      'var(--moduix-color-chart-4)',
    ],
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point?.datum.channel,
      rows: point ? [{ label: 'Share', value: `${point.datum.value}%`, color: point.color }] : [],
    }),
  },
});

const meta = {
  title: 'Components/Chart',
  component: ChartPlot,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    ariaLabel: 'Monthly revenue',
    definition: barDefinition,
    height: 320,
  },
};

export default meta;

type Story = StoryObj;

const storyComponents = {
  Button,
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return (args: Record<string, unknown>) =>
    defineComponent({
      components: storyComponents,
      setup: () => ({ args, ...setup?.() }),
      template,
    });
}

const customTooltipBody = (tooltip: {
  defaultBody: () => VNodeChild;
  dismiss: () => void;
  pinned: boolean;
}) =>
  h('div', { style: { display: 'grid', gap: 'var(--moduix-spacing-3)' } }, [
    tooltip.defaultBody(),
    tooltip.pinned
      ? h(
          Button,
          { size: 'sm', variant: 'outline', onClick: tooltip.dismiss },
          { default: () => 'Close' },
        )
      : null,
  ]);

export const Basic: Story = {
  render: renderStory(`
    <Chart>
      <ChartHeader>
        <ChartTitle>Monthly revenue</ChartTitle>
        <ChartDescription>Revenue in thousands of dollars.</ChartDescription>
      </ChartHeader>
      <ChartPlot v-bind="args" />
      <ChartLegend aria-label="Revenue series">
        <ChartLegendItem color="var(--moduix-color-chart-1)">Revenue</ChartLegendItem>
      </ChartLegend>
    </Chart>
  `),
};

export const AnimatedArea: Story = {
  args: {
    ariaLabel: 'Monthly revenue and target',
    definition: areaDefinition,
  },
  render: renderStory(`
    <Chart>
      <ChartHeader>
        <ChartTitle>Revenue and target</ChartTitle>
        <ChartDescription>Marks and tooltip share the default motion renderer.</ChartDescription>
      </ChartHeader>
      <ChartPlot v-bind="args" />
      <ChartLegend aria-label="Revenue series">
        <ChartLegendItem color="var(--moduix-color-chart-1)">Revenue</ChartLegendItem>
        <ChartLegendItem color="var(--moduix-color-chart-2)">Target</ChartLegendItem>
      </ChartLegend>
    </Chart>
  `),
};

export const CustomTooltip: Story = {
  render: renderStory(
    `
      <Chart>
        <ChartHeader>
          <ChartTitle>Monthly revenue</ChartTitle>
          <ChartDescription>Pin the tooltip, then dismiss it from its content.</ChartDescription>
        </ChartHeader>
        <ChartPlot v-bind="args" :render-tooltip-body="renderTooltipBody" />
        <ChartLegend aria-label="Revenue series">
          <ChartLegendItem color="var(--moduix-color-chart-1)">Revenue</ChartLegendItem>
        </ChartLegend>
      </Chart>
    `,
    () => ({ renderTooltipBody: customTooltipBody }),
  ),
};

export const Donut: Story = {
  render: renderStory(
    `
      <Chart>
        <ChartHeader>
          <ChartTitle>Revenue mix</ChartTitle>
          <ChartDescription>Share of revenue by acquisition channel.</ChartDescription>
        </ChartHeader>
        <ChartPlot
          :definition="donutDefinition"
          :height="320"
          aria-label="Revenue share by acquisition channel"
        />
        <ChartLegend aria-label="Acquisition channels">
          <ChartLegendItem
            v-for="({ channel }, index) in revenueByChannel"
            :key="channel"
            :color="\`var(--moduix-color-chart-\${index + 1})\`"
          >
            {{ channel }}
          </ChartLegendItem>
        </ChartLegend>
      </Chart>
    `,
    () => ({ donutDefinition, revenueByChannel }),
  ),
};

export const StackedBars: Story = {
  args: {
    ariaLabel: 'Quarterly revenue by segment',
    definition: stackedDefinition,
  },
  render: renderStory(`
    <Chart>
      <ChartHeader>
        <ChartTitle>Quarterly revenue</ChartTitle>
        <ChartDescription>Product and services revenue by quarter.</ChartDescription>
      </ChartHeader>
      <ChartPlot v-bind="args" />
      <ChartLegend aria-label="Revenue segments">
        <ChartLegendItem color="var(--moduix-color-chart-1)">Product</ChartLegendItem>
        <ChartLegendItem color="var(--moduix-color-chart-2)">Services</ChartLegendItem>
      </ChartLegend>
    </Chart>
  `),
};