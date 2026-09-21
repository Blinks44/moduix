'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ChartValue, DomChartDefinition } from '@tanstack/charts';
import { motion as createMotionRenderer } from '@tanstack/charts/motion';
import { RendererChart as ChartPrimitive } from '@tanstack/charts/react/tooltip';
import type {
  ChartTooltipBodyRenderContext,
  RendererChartProps,
} from '@tanstack/charts/react/tooltip';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import type { ComponentRef } from 'react';
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

function mergeTooltipClassName(className?: string) {
  return cn(
    '!rounded-md !border !border-border !bg-popover !p-3 !font-sans !text-xs !leading-4 !font-medium !text-popover-foreground !shadow-lg',
    className,
  );
}

function withTooltipStyles<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(definition: DomChartDefinition<TDatum, TXValue, TYValue>) {
  const tooltip = definition.tooltip;

  if (!tooltip) {
    return definition;
  }

  const styledTooltip =
    typeof tooltip === 'object' && 'use' in tooltip
      ? { ...tooltip, className: mergeTooltipClassName(tooltip.className) }
      : { use: tooltip, className: mergeTooltipClassName() };

  return { ...definition, tooltip: styledTooltip };
}

const Chart = forwardRef<ComponentRef<typeof ark.figure>, HTMLArkProps<'figure'>>(
  function Chart({ className, ...props }, ref) {
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
  },
);

const renderDefaultTooltipBody = ({ content }: ChartTooltipBodyRenderContext) => {
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
              data-has-swatch={row.color ? '' : undefined}
              data-slot="chart-tooltip-row"
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 data-[has-swatch]:grid-cols-[0.625rem_minmax(0,1fr)_auto]"
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
                className="text-right font-semibold whitespace-nowrap text-popover-foreground tabular-nums"
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
  definition,
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
      definition={withTooltipStyles(definition)}
      renderer={renderer ?? (motion ? defaultChartRenderer : svgChartRenderer)}
      renderTooltipBody={renderTooltipBody ?? renderDefaultTooltipBody}
      className={cn(
        '[&_.ts-chart:focus-visible]:outline-offset-0.5 min-w-0 text-muted-foreground [&_.ts-chart]:rounded-md [&_.ts-chart]:outline-none [&_.ts-chart:focus-visible]:outline-2 [&_.ts-chart:focus-visible]:outline-ring',
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
>(function ChartLegendItem({ asChild, children, className, color, style, ...props }, ref) {
  return (
    <ark.li
      ref={ref}
      asChild={asChild}
      className={cn('inline-flex items-center gap-2 text-sm text-muted-foreground', className)}
      style={style}
      {...props}
      data-scope="chart"
      data-part="legend-item"
      data-slot="chart-legend-item"
    >
      {asChild ? (
        children
      ) : (
        <>
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 rounded-full bg-muted-foreground shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]"
            style={color ? { backgroundColor: color } : undefined}
          />
          {children}
        </>
      )}
    </ark.li>
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
