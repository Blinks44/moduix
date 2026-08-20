import type { Meta, StoryObj } from '@storybook/react';
import { areaY, barY, defineChart, lineY, stack } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { Button } from '@/components/button/Button';
import { Chart } from '@/components/chart/Chart';

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
] as const;

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
      radius: 4,
    }),
  ],
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
  component: Chart.Plot,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    ariaLabel: 'Monthly revenue',
    definition: barDefinition,
    height: 320,
  },
} satisfies Meta<typeof Chart.Plot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Chart>
      <Chart.Header>
        <Chart.Title>Monthly revenue</Chart.Title>
        <Chart.Description>Revenue in thousands of dollars.</Chart.Description>
      </Chart.Header>
      <Chart.Plot {...args} />
      <Chart.Legend aria-label="Revenue series">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Revenue</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  ),
};

export const AnimatedArea: Story = {
  args: {
    ariaLabel: 'Monthly revenue and target',
    definition: areaDefinition,
  },
  render: (args) => (
    <Chart>
      <Chart.Header>
        <Chart.Title>Revenue and target</Chart.Title>
        <Chart.Description>Marks and tooltip share the default motion renderer.</Chart.Description>
      </Chart.Header>
      <Chart.Plot {...args} />
      <Chart.Legend aria-label="Revenue series">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Revenue</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-2)">Target</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  ),
};

export const CustomTooltip: Story = {
  render: (args) => (
    <Chart>
      <Chart.Header>
        <Chart.Title>Monthly revenue</Chart.Title>
        <Chart.Description>Pin the tooltip, then dismiss it from its content.</Chart.Description>
      </Chart.Header>
      <Chart.Plot
        {...args}
        renderTooltipBody={({ defaultBody, dismiss, pinned }) => (
          <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
            {defaultBody}
            {pinned ? (
              <Button size="sm" variant="outline" onClick={dismiss}>
                Close
              </Button>
            ) : null}
          </div>
        )}
      />
      <Chart.Legend aria-label="Revenue series">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Revenue</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  ),
};

export const Donut: Story = {
  render: () => (
    <Chart>
      <Chart.Header>
        <Chart.Title>Revenue mix</Chart.Title>
        <Chart.Description>Share of revenue by acquisition channel.</Chart.Description>
      </Chart.Header>
      <Chart.Plot
        definition={donutDefinition}
        height={320}
        ariaLabel="Revenue share by acquisition channel"
      />
      <Chart.Legend aria-label="Acquisition channels">
        {revenueByChannel.map(({ channel }, index) => (
          <Chart.LegendItem key={channel} color={`var(--moduix-color-chart-${index + 1})`}>
            {channel}
          </Chart.LegendItem>
        ))}
      </Chart.Legend>
    </Chart>
  ),
};

export const StackedBars: Story = {
  args: {
    ariaLabel: 'Quarterly revenue by segment',
    definition: stackedDefinition,
  },
  render: (args) => (
    <Chart>
      <Chart.Header>
        <Chart.Title>Quarterly revenue</Chart.Title>
        <Chart.Description>Product and services revenue by quarter.</Chart.Description>
      </Chart.Header>
      <Chart.Plot {...args} />
      <Chart.Legend aria-label="Revenue segments">
        <Chart.LegendItem color="var(--moduix-color-chart-1)">Product</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-2)">Services</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  ),
};