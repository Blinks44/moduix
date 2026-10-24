'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ChartTooltipBodyContext, ChartValue } from '@tanstack/charts';
import { motion as createMotionRenderer } from '@tanstack/charts/motion';
import { RendererChart as ChartPrimitive } from '@tanstack/charts/react/tooltip';
import type { RendererChartProps } from '@tanstack/charts/react/tooltip';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import type { ComponentRef, CSSProperties } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const defaultChartRenderer = createMotionRenderer({
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  },
});

const Chart = forwardRef<ComponentRef<typeof ark.figure>, HTMLArkProps<'figure'>>(function Chart(
  { className, ...props },
  ref,
) {
  return (
    <ark.figure
      ref={ref}
      className={cn(
        'grid w-full min-w-0 gap-5 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm',
        className,
      )}
      {...props}
      data-scope="chart"
      data-part="root"
      data-slot="chart-root"
    />
  );
});

const renderDefaultTooltipBody = (content: ChartTooltipBodyContext['content']) => {
  if (typeof content === 'string') {
    return <span data-slot="chart-tooltip-text">{content}</span>;
  }

  return (
    <div data-slot="chart-tooltip-body" className="grid gap-1">
      {content.title ? (
        <div
          data-slot="chart-tooltip-title"
          className="flex items-center gap-2 font-semibold text-popover-foreground"
        >
          {content.color ? (
            <span
              aria-hidden="true"
              data-slot="chart-tooltip-swatch"
              className="size-2.5 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]"
              style={{ backgroundColor: content.color }}
            />
          ) : null}
          {content.title}
        </div>
      ) : null}
      {content.rows.length ? (
        <div data-slot="chart-tooltip-rows" className="grid gap-1">
          {content.rows.map((row, index) => (
            <div
              key={`${row.label}-${index}`}
              data-active={row.active ? '' : undefined}
              data-has-swatch={row.color ? '' : undefined}
              data-slot="chart-tooltip-row"
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 data-active:rounded-sm data-active:bg-muted data-active:ring-4 data-active:ring-muted data-[has-swatch]:grid-cols-[0.625rem_minmax(0,1fr)_auto]"
            >
              {row.color ? (
                <span
                  aria-hidden="true"
                  data-slot="chart-tooltip-swatch"
                  className="size-2.5 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]"
                  style={{ backgroundColor: row.color }}
                />
              ) : null}
              <span data-slot="chart-tooltip-label" className="min-w-0 text-muted-foreground">
                {row.label}
              </span>
              <span
                data-slot="chart-tooltip-value"
                className="text-end font-semibold whitespace-nowrap text-popover-foreground tabular-nums"
              >
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
      renderTooltipBody={(context) => {
        const defaultBody = renderDefaultTooltipBody(context.content);
        return renderTooltipBody ? renderTooltipBody({ ...context, defaultBody }) : defaultBody;
      }}
      className={cn(
        'min-w-0 text-muted-foreground [--ts-chart-tooltip-background:--theme(--color-popover)] [--ts-chart-tooltip-border-radius:--theme(--radius-md)] [--ts-chart-tooltip-border:1px_solid_--theme(--color-border)] [--ts-chart-tooltip-color:--theme(--color-popover-foreground)] [--ts-chart-tooltip-font:--theme(--font-weight-medium)_--theme(--text-xs)/--theme(--text-xs--line-height)_--theme(--font-sans)] [--ts-chart-tooltip-padding:--spacing(3)] [--ts-chart-tooltip-shadow:--theme(--shadow-lg)] [&_.ts-chart]:rounded-md [&_.ts-chart]:outline-none [&_.ts-chart:focus-visible]:outline-focus [&_.ts-chart:focus-visible]:outline-offset-focus [&_.ts-chart:focus-visible]:outline-ring',
        className,
      )}
    />
  );
};

const ChartHeader = forwardRef<ComponentRef<typeof ark.figcaption>, HTMLArkProps<'figcaption'>>(
  function ChartHeader({ className, ...props }, ref) {
    return (
      <ark.figcaption
        ref={ref}
        className={cn('grid gap-1', className)}
        {...props}
        data-scope="chart"
        data-part="header"
        data-slot="chart-header"
      />
    );
  },
);

const ChartTitle = forwardRef<ComponentRef<typeof ark.h3>, HTMLArkProps<'h3'>>(function ChartTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
      data-scope="chart"
      data-part="title"
      data-slot="chart-title"
    />
  );
});

const ChartDescription = forwardRef<ComponentRef<typeof ark.p>, HTMLArkProps<'p'>>(
  function ChartDescription({ className, ...props }, ref) {
    return (
      <ark.p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
        data-scope="chart"
        data-part="description"
        data-slot="chart-description"
      />
    );
  },
);

const ChartLegend = forwardRef<ComponentRef<typeof ark.ul>, HTMLArkProps<'ul'>>(
  function ChartLegend({ className, ...props }, ref) {
    return (
      <ark.ul
        ref={ref}
        className={cn('flex flex-wrap gap-3', className)}
        {...props}
        data-scope="chart"
        data-part="legend"
        data-slot="chart-legend"
      />
    );
  },
);

const ChartLegendItem = forwardRef<
  ComponentRef<typeof ark.li>,
  HTMLArkProps<'li'> & { color?: string }
>(function ChartLegendItem({ className, color, style, ...props }, ref) {
  return (
    <ark.li
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 text-sm text-muted-foreground before:size-2.5 before:shrink-0 before:rounded-full before:bg-(--moduix-chart-legend-indicator-color,--theme(--color-muted-foreground)) before:shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]',
        className,
      )}
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