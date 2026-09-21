'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ChartValue } from '@tanstack/charts';
import { motion as createMotionRenderer } from '@tanstack/charts/motion';
import { RendererChart as ChartPrimitive } from '@tanstack/charts/react/tooltip';
import type {
  ChartTooltipBodyRenderContext,
  RendererChartProps,
} from '@tanstack/charts/react/tooltip';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { forwardRef } from 'react';
import styles from './Chart.module.css';

const defaultChartRenderer = createMotionRenderer({
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  },
});

const Chart = forwardRef<HTMLElement, HTMLArkProps<'figure'>>(function Chart(
  { className, ...props },
  ref,
) {
  return (
    <ark.figure
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-scope="chart"
      data-part="root"
      data-slot="chart-root"
    />
  );
});

const renderDefaultTooltipBody = ({ content }: ChartTooltipBodyRenderContext) => {
  if (typeof content === 'string') {
    return <span data-slot="chart-tooltip-text">{content}</span>;
  }

  return (
    <div data-slot="chart-tooltip-body" className={styles.defaultTooltipContent}>
      {content.title ? (
        <div data-slot="chart-tooltip-title" className={styles.tooltipTitle}>
          {content.color ? (
            <span
              aria-hidden="true"
              data-slot="chart-tooltip-swatch"
              className={styles.tooltipSwatch}
              style={{ backgroundColor: content.color }}
            />
          ) : null}
          {content.title}
        </div>
      ) : null}
      {content.rows.length ? (
        <div data-slot="chart-tooltip-rows" className={styles.tooltipRows}>
          {content.rows.map((row, index) => (
            <div
              key={`${row.label}-${index}`}
              data-has-swatch={row.color ? '' : undefined}
              data-slot="chart-tooltip-row"
              className={styles.tooltipRow}
            >
              {row.color ? (
                <span
                  aria-hidden="true"
                  data-slot="chart-tooltip-swatch"
                  className={styles.tooltipSwatch}
                  style={{ backgroundColor: row.color }}
                />
              ) : null}
              <span data-slot="chart-tooltip-label" className={styles.tooltipLabel}>
                {row.label}
              </span>
              <span data-slot="chart-tooltip-value" className={styles.tooltipValue}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const ChartPlot = function ChartPlot<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>({
  className,
  motion = true,
  renderTooltipBody,
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
      renderTooltipBody={renderTooltipBody ?? renderDefaultTooltipBody}
      className={clsx(styles.plot, className)}
    />
  );
};

const ChartHeader = forwardRef<HTMLElement, HTMLArkProps<'figcaption'>>(function ChartHeader(
  { className, ...props },
  ref,
) {
  return (
    <ark.figcaption
      ref={ref}
      className={clsx(styles.header, className)}
      {...props}
      data-scope="chart"
      data-part="header"
      data-slot="chart-header"
    />
  );
});

const ChartTitle = forwardRef<HTMLHeadingElement, HTMLArkProps<'h3'>>(function ChartTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      className={clsx(styles.title, className)}
      {...props}
      data-scope="chart"
      data-part="title"
      data-slot="chart-title"
    />
  );
});

const ChartDescription = forwardRef<HTMLParagraphElement, HTMLArkProps<'p'>>(
  function ChartDescription({ className, ...props }, ref) {
    return (
      <ark.p
        ref={ref}
        className={clsx(styles.description, className)}
        {...props}
        data-scope="chart"
        data-part="description"
        data-slot="chart-description"
      />
    );
  },
);

const ChartLegend = forwardRef<HTMLUListElement, HTMLArkProps<'ul'>>(function ChartLegend(
  { className, ...props },
  ref,
) {
  return (
    <ark.ul
      ref={ref}
      className={clsx(styles.legend, className)}
      {...props}
      data-scope="chart"
      data-part="legend"
      data-slot="chart-legend"
    />
  );
});

const ChartLegendItem = forwardRef<
  HTMLLIElement,
  HTMLArkProps<'li'> & {
    color?: string;
  }
>(function ChartLegendItem({ className, color, style, ...props }, ref) {
  return (
    <ark.li
      ref={ref}
      className={clsx(styles.legendItem, className)}
      style={
        color
          ? ({ '--moduix-chart-legend-indicator-color': color, ...style } as CSSProperties)
          : style
      }
      {...props}
      data-scope="chart"
      data-part="legend-item"
      data-slot="chart-legend-item"
    />
  );
});

export {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
};
