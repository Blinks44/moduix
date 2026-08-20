'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ChartValue } from '@tanstack/charts';
import { motion as createMotionRenderer } from '@tanstack/charts/motion';
import { RendererChart as ChartPrimitive } from '@tanstack/charts/react/tooltip';
import type { RendererChartProps } from '@tanstack/charts/react/tooltip';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import { clsx } from 'clsx';
import type { CSSProperties, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Chart.module.css';

const defaultChartRenderer = createMotionRenderer({
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  },
});

const ChartRoot = forwardRef<HTMLElement, HTMLArkProps<'figure'>>(function ChartRoot(
  { className, ...props },
  ref,
) {
  return (
    <ark.figure
      ref={ref as ForwardedRef<HTMLElement>}
      data-scope="chart"
      data-part="root"
      data-slot="chart-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const ChartPlot = function ChartPlot<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>({
  className,
  motion = true,
  renderer,
  ...props
}: Omit<RendererChartProps<TDatum, TXValue, TYValue>, 'renderer'> & {
  motion?: boolean;
  renderer?: RendererChartProps<TDatum, TXValue, TYValue>['renderer'];
}) {
  return (
    <ChartPrimitive
      {...props}
      renderer={renderer ?? (motion ? defaultChartRenderer : svgChartRenderer)}
      className={clsx(styles.plot, normalizeClassName(className))}
    />
  );
};

const ChartHeader = forwardRef<HTMLElement, HTMLArkProps<'figcaption'>>(function ChartHeader(
  { className, ...props },
  ref,
) {
  return (
    <ark.figcaption
      ref={ref as ForwardedRef<HTMLElement>}
      data-scope="chart"
      data-part="header"
      data-slot="chart-header"
      className={clsx(styles.header, normalizeClassName(className))}
      {...props}
    />
  );
});

const ChartTitle = forwardRef<HTMLElement, HTMLArkProps<'h3'>>(function ChartTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref as ForwardedRef<HTMLHeadingElement>}
      data-scope="chart"
      data-part="title"
      data-slot="chart-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
    />
  );
});

const ChartDescription = forwardRef<HTMLElement, HTMLArkProps<'p'>>(function ChartDescription(
  { className, ...props },
  ref,
) {
  return (
    <ark.p
      ref={ref as ForwardedRef<HTMLParagraphElement>}
      data-scope="chart"
      data-part="description"
      data-slot="chart-description"
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
    />
  );
});

const ChartLegend = forwardRef<HTMLElement, HTMLArkProps<'ul'>>(function ChartLegend(
  { className, ...props },
  ref,
) {
  return (
    <ark.ul
      ref={ref as ForwardedRef<HTMLUListElement>}
      data-scope="chart"
      data-part="legend"
      data-slot="chart-legend"
      className={clsx(styles.legend, normalizeClassName(className))}
      {...props}
    />
  );
});

const ChartLegendItem = forwardRef<
  HTMLElement,
  HTMLArkProps<'li'> & {
    color?: string;
  }
>(function ChartLegendItem({ className, color, style, ...props }, ref) {
  return (
    <ark.li
      ref={ref as ForwardedRef<HTMLLIElement>}
      data-scope="chart"
      data-part="legend-item"
      data-slot="chart-legend-item"
      className={clsx(styles.legendItem, normalizeClassName(className))}
      style={
        color
          ? ({ '--moduix-chart-legend-indicator-color': color, ...style } as CSSProperties)
          : style
      }
      {...props}
    />
  );
});

const Chart = Object.assign(ChartRoot, {
  Root: ChartRoot,
  Plot: ChartPlot,
  Header: ChartHeader,
  Title: ChartTitle,
  Description: ChartDescription,
  Legend: ChartLegend,
  LegendItem: ChartLegendItem,
});

export { Chart };