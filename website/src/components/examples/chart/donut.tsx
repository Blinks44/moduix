import { Chart } from '@moduix/react/chart';
import { defineChart } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';

const revenue = [
  { channel: 'Direct', value: 38 },
  { channel: 'Organic', value: 29 },
  { channel: 'Partners', value: 21 },
  { channel: 'Other', value: 12 },
] as const;

const definition = defineChart({
  marks: [
    polar({
      inset: 8,
      radiusRatio: 0.82,
      scales: {
        angle: null,
        radius: null,
      },
      marks: [
        radialArc(pie(revenue, { value: 'value', gapAngle: 0.04 }), {
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
    domain: revenue.map(({ channel }) => channel),
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

export default function DonutChartDemo() {
  return (
    <Chart>
      <Chart.Header>
        <Chart.Title>Revenue mix</Chart.Title>
        <Chart.Description>Share of revenue by acquisition channel.</Chart.Description>
      </Chart.Header>
      <Chart.Plot
        definition={definition}
        height={320}
        ariaLabel="Revenue share by acquisition channel"
      />
      <Chart.Legend aria-label="Acquisition channels">
        {revenue.map(({ channel }, index) => (
          <Chart.LegendItem key={channel} color={`var(--moduix-color-chart-${index + 1})`}>
            {channel}
          </Chart.LegendItem>
        ))}
      </Chart.Legend>
    </Chart>
  );
}