import { Chart } from '@moduix/react/chart';
import { cell, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { tooltip } from '@tanstack/charts/tooltip';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const periods = ['Morning', 'Afternoon', 'Evening'];
const activity = [
  { day: 'Mon', period: 'Morning', sessions: 18, level: 'Low' },
  { day: 'Tue', period: 'Morning', sessions: 31, level: 'Medium' },
  { day: 'Wed', period: 'Morning', sessions: 44, level: 'High' },
  { day: 'Thu', period: 'Morning', sessions: 38, level: 'Medium' },
  { day: 'Fri', period: 'Morning', sessions: 22, level: 'Low' },
  { day: 'Mon', period: 'Afternoon', sessions: 36, level: 'Medium' },
  { day: 'Tue', period: 'Afternoon', sessions: 48, level: 'High' },
  { day: 'Wed', period: 'Afternoon', sessions: 52, level: 'High' },
  { day: 'Thu', period: 'Afternoon', sessions: 41, level: 'High' },
  { day: 'Fri', period: 'Afternoon', sessions: 29, level: 'Medium' },
  { day: 'Mon', period: 'Evening', sessions: 12, level: 'Low' },
  { day: 'Tue', period: 'Evening', sessions: 21, level: 'Low' },
  { day: 'Wed', period: 'Evening', sessions: 34, level: 'Medium' },
  { day: 'Thu', period: 'Evening', sessions: 27, level: 'Medium' },
  { day: 'Fri', period: 'Evening', sessions: 16, level: 'Low' },
] as const;

const definition = defineChart({
  marks: [
    cell(activity, {
      x: 'day',
      y: 'period',
      color: 'level',
      key: ({ day, period }) => `${day}-${period}`,
      inset: 2,
      radius: 5,
    }),
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().domain(days).padding(0.04),
      axis: { label: 'Day' },
    },
    y: {
      scale: () => scaleBand<string>().domain(periods).padding(0.04),
      axis: { label: 'Period' },
    },
  },
  color: {
    domain: ['Low', 'Medium', 'High'],
    range: [
      'var(--moduix-color-chart-3)',
      'var(--moduix-color-chart-2)',
      'var(--moduix-color-chart-1)',
    ],
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point ? `${point.datum.day} · ${point.datum.period}` : undefined,
      rows: point
        ? [{ label: 'Sessions', value: String(point.datum.sessions), color: point.color }]
        : [],
    }),
  },
});

export default function HeatmapChartDemo() {
  return (
    <Chart>
      <Chart.Header>
        <Chart.Title>Weekly activity</Chart.Title>
        <Chart.Description>Session volume by day and time of day.</Chart.Description>
      </Chart.Header>
      <Chart.Plot
        definition={definition}
        height={320}
        ariaLabel="Weekly session activity heatmap"
      />
      <Chart.Legend aria-label="Activity levels">
        <Chart.LegendItem color="var(--moduix-color-chart-3)">Low</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-2)">Medium</Chart.LegendItem>
        <Chart.LegendItem color="var(--moduix-color-chart-1)">High</Chart.LegendItem>
      </Chart.Legend>
    </Chart>
  );
}