import {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartPlot,
  ChartTitle,
  chartColors,
} from '@moduix/react/chart';
import { Empty, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from '@moduix/react/empty';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { ChartNoAxesColumn } from 'lucide-react';

type Order = { day: string; orders: number };

const orders: Order[] = [];

const definition = defineChart({
  marks: [barY(orders, { x: 'day', y: 'orders', color: () => 'Orders', inset: 3, radius: 6 })],
  scales: {
    x: { scale: scaleBand },
    y: { scale: scaleLinear, nice: true, grid: true },
  },
  color: { domain: ['Orders'], range: chartColors },
  tooltip,
});

export default function EmptyStateChartDemo() {
  return (
    <Chart>
      <ChartHeader>
        <ChartTitle>Orders this week</ChartTitle>
        <ChartDescription>Daily orders from the online store.</ChartDescription>
      </ChartHeader>
      {orders.length > 0 ? (
        <ChartPlot definition={definition} height={240} ariaLabel="Daily orders this week" />
      ) : (
        <Empty>
          <EmptyIcon>
            <ChartNoAxesColumn aria-hidden />
          </EmptyIcon>
          <EmptyContent>
            <EmptyTitle>No orders yet</EmptyTitle>
            <EmptyDescription>Orders appear here as soon as customers check out.</EmptyDescription>
          </EmptyContent>
        </Empty>
      )}
    </Chart>
  );
}