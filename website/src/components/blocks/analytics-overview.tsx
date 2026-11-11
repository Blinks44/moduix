'use client';

import { areaY, defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import { Badge } from '@/registry/react/ui/badge';
import { Card, CardBody } from '@/registry/react/ui/card';
import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartPlot,
  ChartTitle,
  chartColors,
} from '@/registry/react/ui/chart';
import styles from './analytics-overview.module.css';

const weeks = Array.from({ length: 8 }, (_, index) => new Date(Date.UTC(2026, 0, 5 + index * 7)));

const revenue = [18400, 21900, 20300, 24800, 27100, 25600, 29400, 31800].map((value, index) => ({
  date: weeks[index]!,
  value,
}));

const formatDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
}).format;

const formatCompactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
}).format;

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format;

// A decorative trend line: no axes, tooltip, or focus, so it reads as part of the card.
function sparkline(values: readonly number[], color: string) {
  return defineChart({
    marks: [
      lineY(
        values.map((value, index) => ({ index, value })),
        { x: 'index', y: 'value', color: () => color, strokeWidth: 2 },
      ),
    ],
    scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear } },
    color: { domain: [color], range: [color] },
    guides: false,
    margin: 2,
    focus: false,
    pointer: false,
    keyboard: false,
    tooltip: false,
  });
}

const metrics = [
  {
    label: 'Revenue',
    value: '$31.8k',
    change: '+8.2%',
    trend: sparkline([18.4, 21.9, 20.3, 24.8, 27.1, 25.6, 29.4, 31.8], chartColors[0]),
  },
  {
    label: 'Orders',
    value: '1,284',
    change: '+3.1%',
    trend: sparkline([1020, 1088, 1064, 1131, 1172, 1150, 1245, 1284], chartColors[1]),
  },
  {
    label: 'Refund rate',
    value: '1.9%',
    change: '−0.4 pt',
    trend: sparkline([2.6, 2.5, 2.4, 2.4, 2.2, 2.1, 2, 1.9], chartColors[2]),
  },
];

const revenueChart = defineChart({
  marks: [
    areaY(revenue, {
      x: 'date',
      y: 'value',
      color: () => 'Revenue',
      fillOpacity: 0.18,
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: { scale: scaleUtc, axis: { ticks: { format: formatDate } } },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { ticks: { format: formatCompactCurrency } },
    },
  },
  color: { domain: ['Revenue'], range: chartColors },
  focus: 'group-x',
  tooltip: {
    use: tooltip,
    hideDelay: 120,
    items: [
      { channel: 'x', label: 'Week', text: (point) => formatDate(point.xValue as Date) },
      { channel: 'y', label: 'Total', text: (point) => formatCurrency(point.yValue as number) },
    ],
  },
});

export function AnalyticsOverview() {
  return (
    <section className={styles.root} aria-label="Analytics overview">
      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <Card key={metric.label} size="sm">
            <CardBody className={styles.metric}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <Badge variant="secondary">{metric.change}</Badge>
              </div>
              <strong className={styles.metricValue}>{metric.value}</strong>
              <ChartPlot
                definition={metric.trend}
                height={48}
                ariaLabel={`${metric.label} over the last 8 weeks`}
              />
            </CardBody>
          </Card>
        ))}
      </div>
      <Chart>
        <ChartHeader>
          <ChartTitle>Weekly revenue</ChartTitle>
          <ChartDescription>Revenue per week over the last 8 weeks.</ChartDescription>
        </ChartHeader>
        <ChartPlot definition={revenueChart} height={280} ariaLabel="Weekly revenue" />
      </Chart>
    </section>
  );
}

export default AnalyticsOverview;