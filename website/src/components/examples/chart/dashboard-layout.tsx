import { Button } from '@moduix/react/button';
import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
  chartColors,
} from '@moduix/react/chart';
import { Stack } from '@moduix/react/stack';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import styles from '@/components/examples/chart/chart-dashboard-layout.module.css';

const revenue = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 76 },
  { month: 'Apr', value: 64 },
  { month: 'May', value: 81 },
] as const;

const definition = defineChart({
  marks: [
    barY(revenue, {
      x: 'month',
      y: 'value',
      color: () => 'Revenue',
      inset: 3,
      radius: 6,
    }),
  ],
  scales: {
    x: { scale: scaleBand, axis: { label: 'Month' } },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } },
  },
  color: {
    domain: ['Revenue'],
    range: chartColors,
  },
  tooltip,
});

export default function DashboardLayoutChartDemo() {
  return (
    <Chart asChild>
      <section aria-labelledby="dashboard-revenue-title">
        <ChartHeader asChild>
          <header className={styles.header}>
            <div>
              <ChartTitle asChild>
                <h2 id="dashboard-revenue-title">Monthly revenue</h2>
              </ChartTitle>
              <ChartDescription>Click a bar to pin its tooltip.</ChartDescription>
            </div>
            <ChartLegend aria-label="Revenue series">
              <ChartLegendItem color={chartColors[0]}>Revenue</ChartLegendItem>
            </ChartLegend>
          </header>
        </ChartHeader>
        <ChartPlot
          definition={definition}
          height={320}
          ariaLabel="Monthly revenue"
          renderTooltipBody={({ defaultBody, dismiss, pinned }) => (
            <Stack gap="3">
              {defaultBody}
              {pinned ? (
                <Button size="sm" variant="outline" onClick={dismiss}>
                  Close
                </Button>
              ) : null}
            </Stack>
          )}
        />
      </section>
    </Chart>
  );
}