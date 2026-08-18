import { Button } from '@moduix/react/button';
import { Chart } from '@moduix/react/chart';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

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
  x: { scale: scaleBand, axis: { label: 'Month' } },
  y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } },
  color: {
    domain: ['Revenue'],
    range: ['var(--moduix-color-chart-1)'],
  },
  tooltip,
});

export default function AdvancedCustomizationChartDemo() {
  return (
    <Chart.Root asChild>
      <section aria-labelledby="dashboard-revenue-title">
        <Chart.Header asChild>
          <header
            style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'space-between',
              gap: 'var(--moduix-spacing-4)',
            }}
          >
            <div>
              <Chart.Title asChild>
                <h2 id="dashboard-revenue-title">Monthly revenue</h2>
              </Chart.Title>
              <Chart.Description>Click a bar to pin its tooltip.</Chart.Description>
            </div>
            <Chart.Legend aria-label="Revenue series">
              <Chart.LegendItem color="var(--moduix-color-chart-1)">Revenue</Chart.LegendItem>
            </Chart.Legend>
          </header>
        </Chart.Header>
        <Chart.Plot
          definition={definition}
          height={320}
          ariaLabel="Monthly revenue"
          renderTooltipBody={({ defaultBody, dismiss, pinned }) => (
            <Chart.TooltipContent>
              {defaultBody}
              {pinned ? (
                <Button size="sm" variant="outline" onClick={dismiss}>
                  Close
                </Button>
              ) : null}
            </Chart.TooltipContent>
          )}
        />
      </section>
    </Chart.Root>
  );
}