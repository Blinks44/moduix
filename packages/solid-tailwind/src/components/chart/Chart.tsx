import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
import type {
  ChartRenderer,
  ChartRendererHostOptions,
  ChartTooltipBodyContext,
  ChartTooltipBodyTarget,
  ChartValue,
} from '@tanstack/charts';
import { resolveChartAdapterLayout } from '@tanstack/charts/adapter';
import { createChartRendererAdapter } from '@tanstack/charts/adapter/renderer';
import { motion as createMotionRenderer } from '@tanstack/charts/motion';
import type { ChartTooltipBodyRenderContext } from '@tanstack/charts/solid';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
  splitProps,
  type Accessor,
  type JSX,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '@/lib/moduix/cn';

const defaultChartRenderer = createMotionRenderer<unknown, ChartValue, ChartValue>({
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  },
});

type ChartTooltipContent = ChartTooltipBodyContext['content'];
type ChartTooltipObjectContent = Exclude<ChartTooltipContent, string>;

type ChartPlotProps<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = Omit<ChartRendererHostOptions<TDatum, TXValue, TYValue>, 'onTooltipBodyChange' | 'renderer'> & {
  class?: string;
  style?: JSX.CSSProperties;
  motion?: boolean;
  renderer?: ChartRenderer<NoInfer<TDatum>, NoInfer<TXValue>, NoInfer<TYValue>>;
  renderTooltipBody?: (
    context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>,
  ) => JSX.Element;
};

function Chart(props: HTMLArkProps<'figure'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.figure
      {...others}
      data-scope="chart"
      data-part="root"
      data-slot="chart-root"
      class={cn(
        'grid w-full min-w-0 gap-5 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm',
        local.class,
      )}
    />
  );
}

function ModuixTooltipObjectContent(props: { content: Accessor<ChartTooltipObjectContent> }) {
  return (
    <div data-slot="chart-tooltip-body" class="grid gap-1">
      <Show when={props.content().title}>
        <div
          data-slot="chart-tooltip-title"
          class="flex items-center gap-2 font-semibold text-popover-foreground"
        >
          <Show when={props.content().color}>
            <span
              aria-hidden="true"
              data-slot="chart-tooltip-swatch"
              class="size-2.5 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]"
              style={{ 'background-color': props.content().color }}
            />
          </Show>
          {props.content().title}
        </div>
      </Show>
      <Show when={props.content().rows.length}>
        <div data-slot="chart-tooltip-rows" class="grid gap-1">
          <For each={props.content().rows}>
            {(row) => (
              <div
                data-active={row.active ? '' : undefined}
                data-has-swatch={row.color ? '' : undefined}
                data-slot="chart-tooltip-row"
                class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 data-active:rounded-sm data-active:bg-muted data-active:ring-4 data-active:ring-muted data-[has-swatch]:grid-cols-[0.625rem_minmax(0,1fr)_auto]"
              >
                <Show when={row.color}>
                  <span
                    aria-hidden="true"
                    data-slot="chart-tooltip-swatch"
                    class="size-2.5 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]"
                    style={{ 'background-color': row.color }}
                  />
                </Show>
                <span data-slot="chart-tooltip-label" class="min-w-0 text-muted-foreground">
                  {row.label}
                </span>
                <span
                  data-slot="chart-tooltip-value"
                  class="text-end font-semibold whitespace-nowrap text-popover-foreground tabular-nums"
                >
                  {row.value}
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

function ModuixTooltipBody(props: { content: Accessor<ChartTooltipContent> }) {
  return (
    <Show
      when={typeof props.content() !== 'string'}
      fallback={<span data-slot="chart-tooltip-text">{props.content() as string}</span>}
    >
      <ModuixTooltipObjectContent content={() => props.content() as ChartTooltipObjectContent} />
    </Show>
  );
}

function ChartTooltipBody<TDatum, TXValue extends ChartValue, TYValue extends ChartValue>(props: {
  render: (context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>) => JSX.Element;
  target: Accessor<ChartTooltipBodyTarget<TDatum, TXValue, TYValue>>;
}) {
  const context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue> = {
    get primaryPoint() {
      return props.target().primaryPoint;
    },
    get points() {
      return props.target().points;
    },
    get content() {
      return props.target().content;
    },
    defaultBody: <ModuixTooltipBody content={() => props.target().content} />,
    get pinned() {
      return props.target().pinned;
    },
    get dismiss() {
      return props.target().dismiss;
    },
  };

  return <Portal mount={props.target().element}>{props.render(context)}</Portal>;
}

function ChartPlot<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(props: ChartPlotProps<TDatum, TXValue, TYValue>) {
  const generatedId = `ts-chart-${createUniqueId().replaceAll(/[^a-zA-Z0-9_-]/g, '')}`;
  const resolvedRenderer = createMemo(
    () =>
      (props.renderer ??
        (props.motion === false ? svgChartRenderer : defaultChartRenderer)) as ChartRenderer<
        TDatum,
        TXValue,
        TYValue
      >,
  );
  const [tooltipTarget, setTooltipTarget] = createSignal<ChartTooltipBodyTarget<
    TDatum,
    TXValue,
    TYValue
  > | null>(null);

  const [local, others] = splitProps(props, [
    'class',
    'motion',
    'renderTooltipBody',
    'renderer',
    'style',
  ]);

  const getOptions = () => {
    return {
      ...others,
      idPrefix: props.idPrefix ?? generatedId,
      renderer: resolvedRenderer(),
      onTooltipBodyChange: setTooltipTarget,
    };
  };

  const adapter = createChartRendererAdapter(getOptions());
  const initialMarkup = adapter.prerender();
  let surface!: HTMLDivElement;
  const layout = createMemo(() => resolveChartAdapterLayout({ aspectRatio: props.aspectRatio }));

  createEffect(() => adapter.update(getOptions()));
  onMount(() => adapter.mount(surface));
  onCleanup(() => adapter.destroy());

  return (
    <>
      <div
        class={cn(
          'ts-chart-host min-w-0 text-muted-foreground [--ts-chart-tooltip-background:--theme(--color-popover)] [--ts-chart-tooltip-border-radius:--theme(--radius-md)] [--ts-chart-tooltip-border:1px_solid_--theme(--color-border)] [--ts-chart-tooltip-color:--theme(--color-popover-foreground)] [--ts-chart-tooltip-font:--theme(--font-weight-medium)_--theme(--text-xs)/--theme(--text-xs--line-height)_--theme(--font-sans)] [--ts-chart-tooltip-padding:--spacing(3)] [--ts-chart-tooltip-shadow:--theme(--shadow-lg)] [&_.ts-chart]:rounded-md [&_.ts-chart]:outline-none [&_.ts-chart:focus-visible]:outline-2 [&_.ts-chart:focus-visible]:outline-offset-2 [&_.ts-chart:focus-visible]:outline-ring',
          local.class,
        )}
        style={{
          position: 'relative',
          width: props.width === undefined ? '100%' : `${props.width}px`,
          height:
            props.height === undefined
              ? layout().aspectRatio === undefined
                ? '320px'
                : undefined
              : `${props.height}px`,
          'aspect-ratio': props.height === undefined ? layout().aspectRatio?.toString() : undefined,
          ...props.style,
        }}
      >
        <div
          ref={(element) => (surface = element)}
          class="ts-chart-surface"
          style={{ width: '100%', height: '100%' }}
          innerHTML={initialMarkup}
        />
      </div>
      <Show when={tooltipTarget()} keyed>
        {(target) => (
          <ChartTooltipBody
            render={local.renderTooltipBody ?? ((context) => context.defaultBody)}
            target={() => target}
          />
        )}
      </Show>
    </>
  );
}

function ChartHeader(props: HTMLArkProps<'figcaption'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.figcaption
      {...others}
      data-scope="chart"
      data-part="header"
      data-slot="chart-header"
      class={cn('grid gap-1', local.class)}
    />
  );
}

function ChartTitle(props: HTMLArkProps<'h3'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.h3
      {...others}
      data-scope="chart"
      data-part="title"
      data-slot="chart-title"
      class={cn('text-lg font-semibold', local.class)}
    />
  );
}

function ChartDescription(props: HTMLArkProps<'p'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.p
      {...others}
      data-scope="chart"
      data-part="description"
      data-slot="chart-description"
      class={cn('text-sm text-muted-foreground', local.class)}
    />
  );
}

function ChartLegend(props: HTMLArkProps<'ul'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.ul
      {...others}
      data-scope="chart"
      data-part="legend"
      data-slot="chart-legend"
      class={cn('flex flex-wrap gap-3', local.class)}
    />
  );
}

function ChartLegendItem(props: HTMLArkProps<'li'> & { color?: string }) {
  const [local, others] = splitProps(props, ['class', 'color', 'style']);

  return (
    <ark.li
      {...others}
      data-scope="chart"
      data-part="legend-item"
      data-slot="chart-legend-item"
      class={cn(
        'inline-flex items-center gap-2 text-sm text-muted-foreground before:size-2.5 before:shrink-0 before:rounded-full before:bg-(--moduix-chart-legend-indicator-color,--theme(--color-muted-foreground)) before:shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]',
        local.class,
      )}
      style={
        local.color
          ? ({
              '--moduix-chart-legend-indicator-color': local.color,
              ...(typeof local.style === 'object' && local.style ? local.style : {}),
            } as JSX.CSSProperties)
          : local.style
      }
    />
  );
}

export {
  Chart,
  ChartDescription,
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartTitle,
};