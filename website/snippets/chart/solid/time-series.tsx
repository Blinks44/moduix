import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
  chartColors,
} from '@moduix/solid/chart';
import { areaY, defineChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';

const revenue = [
  { date: new Date(Date.UTC(2026, 0, 5)), value: 18400 },
  { date: new Date(Date.UTC(2026, 0, 12)), value: 21900 },
  { date: new Date(Date.UTC(2026, 0, 19)), value: 20300 },
  { date: new Date(Date.UTC(2026, 0, 26)), value: 24800 },
  { date: new Date(Date.UTC(2026, 1, 2)), value: 27100 },
  { date: new Date(Date.UTC(2026, 1, 9)), value: 25600 },
  { date: new Date(Date.UTC(2026, 1, 16)), value: 29400 },
  { date: new Date(Date.UTC(2026, 1, 23)), value: 31800 },
];

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

const definition = defineChart({
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

export default function TimeSeriesChartDemo() {
  return (
    <Chart>
      <ChartHeader>
        <ChartTitle>Weekly revenue</ChartTitle>
        <ChartDescription>Revenue per week, January to February 2026.</ChartDescription>
      </ChartHeader>
      <ChartPlot definition={definition} height={320} ariaLabel="Weekly revenue" />
      <ChartLegend aria-label="Revenue series">
        <ChartLegendItem color={chartColors[0]}>Revenue</ChartLegendItem>
      </ChartLegend>
    </Chart>
  );
}