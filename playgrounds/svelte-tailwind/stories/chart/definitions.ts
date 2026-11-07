import { areaY, barY, defineChart, lineY, stack } from '@tanstack/charts';
import {
  angleGrid,
  focusGroupAngle,
  pie,
  polar,
  radialArc,
  radialGrid,
  radialLine,
} from '@tanstack/charts/polar';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { curveLinearClosed } from 'd3-shape';

export const monthlyRevenue = [
  { month: 'Jan', revenue: 42, target: 48 },
  { month: 'Feb', revenue: 58, target: 55 },
  { month: 'Mar', revenue: 76, target: 68 },
  { month: 'Apr', revenue: 64, target: 72 },
  { month: 'May', revenue: 81, target: 80 },
] as const;

export const quarterlyRevenue = [
  { quarter: 'Q1', segment: 'Product', value: 42 },
  { quarter: 'Q1', segment: 'Services', value: 18 },
  { quarter: 'Q2', segment: 'Product', value: 48 },
  { quarter: 'Q2', segment: 'Services', value: 24 },
  { quarter: 'Q3', segment: 'Product', value: 53 },
  { quarter: 'Q3', segment: 'Services', value: 31 },
  { quarter: 'Q4', segment: 'Product', value: 59 },
  { quarter: 'Q4', segment: 'Services', value: 38 },
] as const;

export const revenueByChannel = [
  { channel: 'Direct', value: 38 },
  { channel: 'Organic', value: 29 },
  { channel: 'Partners', value: 21 },
  { channel: 'Other', value: 12 },
];

export const barDefinition = defineChart({
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
    range: ['var(--moduix-chart-1)'],
  },
  tooltip,
});

export const areaDefinition = defineChart({
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
    range: ['var(--moduix-chart-1)', 'var(--moduix-chart-2)'],
  },
  focus: 'group-x',
  tooltip,
});

export const stackedDefinition = defineChart({
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
    range: ['var(--moduix-chart-1)', 'var(--moduix-chart-2)'],
  },
  focus: 'group-x',
  tooltip,
});

export const donutDefinition = defineChart({
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
      'var(--moduix-chart-1)',
      'var(--moduix-chart-2)',
      'var(--moduix-chart-3)',
      'var(--moduix-chart-4)',
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

export const revenue = [
  { month: 'Jan', series: 'Revenue', value: 42 },
  { month: 'Feb', series: 'Revenue', value: 58 },
  { month: 'Mar', series: 'Revenue', value: 76 },
  { month: 'Apr', series: 'Revenue', value: 64 },
  { month: 'Jan', series: 'Target', value: 48 },
  { month: 'Feb', series: 'Target', value: 55 },
  { month: 'Mar', series: 'Target', value: 68 },
  { month: 'Apr', series: 'Target', value: 72 },
];

const scores = [
  { metric: 'Speed', series: 'Product A', value: 85 },
  { metric: 'Reliability', series: 'Product A', value: 92 },
  { metric: 'Usability', series: 'Product A', value: 78 },
  { metric: 'Features', series: 'Product A', value: 72 },
  { metric: 'Support', series: 'Product A', value: 88 },
  { metric: 'Speed', series: 'Product B', value: 72 },
  { metric: 'Reliability', series: 'Product B', value: 82 },
  { metric: 'Usability', series: 'Product B', value: 90 },
  { metric: 'Features', series: 'Product B', value: 88 },
  { metric: 'Support', series: 'Product B', value: 68 },
];

export const radarDefinition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.7,
      scales: {
        angle: { scale: scalePoint },
        radius: { scale: scaleLinear().domain([0, 100]) },
      },
      guides: [
        radialGrid({ values: [25, 50, 75, 100], shape: 'polygon' }),
        angleGrid({ labels: true }),
      ],
      states: [{ when: { focus: 'unmatched' }, style: { opacity: 0.2 } }],
      marks: [
        radialLine(scores, {
          angle: 'metric',
          radius: 'value',
          color: 'series',
          curve: curveLinearClosed,
          points: true,
          strokeWidth: 2,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: ['Product A', 'Product B'],
    range: ['var(--moduix-chart-1)', 'var(--moduix-chart-2)'],
  },
  focus: focusGroupAngle,
  tooltip,
});