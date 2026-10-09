import { Button } from '@moduix/solid/button';
import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '@moduix/solid/chart';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import styles from '@/components/examples/chart/chart-advanced-customization.module.css';

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
  color: { domain: ['Revenue'], range: ['var(--moduix-color-chart-1)'] },
  tooltip,
});

export default function AdvancedCustomizationChartDemo() {
  return (
    <Chart asChild={(props) => <section {...props()} aria-labelledby="dashboard-revenue-title" />}>
      <ChartHeader
        asChild={(props) => (
          <header {...props()} class={`${props().class ?? ''} ${styles.header}`.trim()} />
        )}
      >
        <div>
          <ChartTitle asChild={(props) => <h2 {...props()} id="dashboard-revenue-title" />} />
          <ChartDescription>Click a bar to pin its tooltip.</ChartDescription>
        </div>
        <ChartLegend aria-label="Revenue series">
          <ChartLegendItem color="var(--moduix-color-chart-1)">Revenue</ChartLegendItem>
        </ChartLegend>
      </ChartHeader>
      <ChartPlot
        definition={definition}
        height={320}
        ariaLabel="Monthly revenue"
        renderTooltipBody={({ defaultBody, dismiss, pinned }) => (
          <div class={styles.tooltip}>
            {defaultBody}
            {pinned ? (
              <Button size="sm" variant="outline" onClick={dismiss}>
                Close
              </Button>
            ) : null}
          </div>
        )}
      />
    </Chart>
  );
}