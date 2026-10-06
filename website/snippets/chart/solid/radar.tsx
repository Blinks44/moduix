import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
} from '@moduix/solid/chart';
import { defineChart } from '@tanstack/charts';
import { angleGrid, focusGroupAngle, polar, radialGrid, radialLine } from '@tanstack/charts/polar';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { curveLinearClosed } from 'd3-shape';

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

const radarDefinition = defineChart({
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
    range: ['var(--moduix-color-chart-1)', 'var(--moduix-color-chart-2)'],
  },
  focus: focusGroupAngle,
  tooltip: {
    use: tooltip,
    content: (points) => ({
      title: points[0]?.datum.metric,
      rows: points.map((point) => ({
        label: point.datum.series,
        value: `${point.datum.value}/100`,
        color: point.color,
      })),
    }),
  },
});

export default function RadarChartDemo() {
  return (
    <Chart>
      <ChartHeader>
        <ChartTitle>Product comparison</ChartTitle>
        <ChartDescription>
          Scores out of 100. Hover a point or use arrow keys to compare a metric.
        </ChartDescription>
      </ChartHeader>
      <ChartPlot definition={radarDefinition} height={360} ariaLabel="Product scores by metric" />
      <ChartLegend aria-label="Products">
        <ChartLegendItem color="var(--moduix-color-chart-1)">Product A</ChartLegendItem>
        <ChartLegendItem color="var(--moduix-color-chart-2)">Product B</ChartLegendItem>
      </ChartLegend>
    </Chart>
  );
}