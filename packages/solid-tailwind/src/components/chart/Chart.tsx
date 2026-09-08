import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
import type {
  ChartRenderer,
  ChartRendererHostOptions,
  ChartTooltipBodyContext,
  ChartTooltipBodyTarget,
  ChartValue,
  DomChartDefinition,
} from '@tanstack/charts';
import { createChartRendererAdapter } from '@tanstack/charts/adapter/renderer';
import { motion as createMotionRenderer } from '@tanstack/charts/motion';
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

type ChartTooltipContent = ChartTooltipBodyContext['content'];
type ChartTooltipObjectContent = Exclude<ChartTooltipContent, string>;

type ChartTooltipBodyRenderContext<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = ChartTooltipBodyContext<TDatum, TXValue, TYValue> & {
  defaultBody: JSX.Element;
};

type ChartTooltipBodyRenderProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = {
  renderTooltipBody?: (
    context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>,
  ) => JSX.Element;
};

type ChartPlotProps<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = Omit<ChartRendererHostOptions<TDatum, TXValue, TYValue>, 'onTooltipBodyChange' | 'renderer'> &
  ChartTooltipBodyRenderProps<TDatum, TXValue, TYValue> & {
    class?: string;
    style?: JSX.CSSProperties;
    motion?: boolean;
    renderer?: ChartRenderer<NoInfer<TDatum>, NoInfer<TXValue>, NoInfer<TYValue>>;
  };

function ChartRoot(props: HTMLArkProps<'figure'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.figure
      asChild={local.asChild}
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
                data-has-swatch={row.color ? '' : undefined}
                data-slot="chart-tooltip-row"
                class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 data-[has-swatch]:grid-cols-[0.625rem_minmax(0,1fr)_auto]"
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
                  class="text-right font-semibold whitespace-nowrap text-popover-foreground tabular-nums"
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
    <>
      <Show when={typeof props.content() === 'string'}>
        <span data-slot="chart-tooltip-text">{props.content() as string}</span>
      </Show>
      <Show when={typeof props.content() !== 'string'}>
        <ModuixTooltipObjectContent content={() => props.content() as ChartTooltipObjectContent} />
      </Show>
    </>
  );
}

function TanStackTooltipSwatch(props: { color: string }) {
  return (
    <span
      aria-hidden="true"
      class="ts-chart-tooltip__swatch"
      style={{
        display: 'block',
        width: '0.55rem',
        height: '0.55rem',
        'border-radius': '0.15rem',
        'box-shadow': 'inset 0 0 0 1px rgb(0 0 0/.12)',
        background: props.color,
      }}
    />
  );
}

function TanStackTooltipObjectContent(props: { content: Accessor<ChartTooltipObjectContent> }) {
  return (
    <>
      <Show when={props.content().title}>
        <div
          class="ts-chart-tooltip__title"
          style={{
            display: 'flex',
            'align-items': 'center',
            gap: '0.4rem',
            'font-weight': 650,
            'margin-bottom': props.content().rows.length ? '0.3rem' : 0,
          }}
        >
          <Show when={props.content().color}>
            <TanStackTooltipSwatch color={props.content().color!} />
          </Show>
          {props.content().title}
        </div>
      </Show>
      <Show when={props.content().rows.length}>
        <div class="ts-chart-tooltip__rows" aria-hidden="true">
          <For each={props.content().rows}>
            {(row) => (
              <div
                class="ts-chart-tooltip__row"
                style={{
                  display: 'grid',
                  'grid-template-columns': '0.55rem minmax(0,1fr) auto',
                  'align-items': 'center',
                  'column-gap': '0.4rem',
                }}
              >
                {row.color ? <TanStackTooltipSwatch color={row.color} /> : <span />}
                <span>{row.label}</span>
                <span
                  style={{
                    'text-align': 'right',
                    'font-variant-numeric': 'tabular-nums',
                    'white-space': 'nowrap',
                  }}
                >
                  {row.value}
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}

function TanStackTooltipBody(props: { content: Accessor<ChartTooltipContent> }) {
  return (
    <>
      <Show when={typeof props.content() === 'string'}>{props.content() as string}</Show>
      <Show when={typeof props.content() !== 'string'}>
        <TanStackTooltipObjectContent
          content={() => props.content() as ChartTooltipObjectContent}
        />
      </Show>
    </>
  );
}

function ChartTooltipBody<TDatum, TXValue extends ChartValue, TYValue extends ChartValue>(props: {
  render: (context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>) => JSX.Element;
  target: Accessor<ChartTooltipBodyTarget<TDatum, TXValue, TYValue>>;
}) {
  const context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue> = {
    get points() {
      return props.target().points;
    },
    get content() {
      return props.target().content;
    },
    defaultBody: <TanStackTooltipBody content={() => props.target().content} />,
    get pinned() {
      return props.target().pinned;
    },
    get dismiss() {
      return props.target().dismiss;
    },
  };

  return <Portal mount={props.target().element}>{props.render(context)}</Portal>;
}

const renderDefaultTooltipBody = <
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(
  context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>,
) => <ModuixTooltipBody content={() => context.content} />;

function ChartPrimitive<
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

  const getOptions = () => {
    const {
      class: _class,
      motion: _motion,
      renderTooltipBody,
      renderer: _renderer,
      style: _style,
      ...others
    } = props;

    return {
      ...others,
      definition: withTooltipStyles(props.definition),
      idPrefix: props.idPrefix ?? generatedId,
      renderer: resolvedRenderer(),
      onTooltipBodyChange: renderTooltipBody ? setTooltipTarget : undefined,
    };
  };

  const adapter = createChartRendererAdapter(getOptions());
  const initialMarkup = adapter.prerender();
  let surface!: HTMLDivElement;

  createEffect(() => adapter.update(getOptions()));
  onMount(() => adapter.mount(surface));
  onCleanup(() => adapter.destroy());

  return (
    <>
      <div
        class={cn('ts-chart-host', props.class)}
        style={{
          position: 'relative',
          width: props.width === undefined ? '100%' : `${props.width}px`,
          height:
            props.height === undefined
              ? typeof props.aspectRatio === 'number' &&
                Number.isFinite(props.aspectRatio) &&
                props.aspectRatio > 0
                ? undefined
                : '320px'
              : `${props.height}px`,
          'aspect-ratio':
            props.height === undefined &&
            typeof props.aspectRatio === 'number' &&
            Number.isFinite(props.aspectRatio) &&
            props.aspectRatio > 0
              ? props.aspectRatio.toString()
              : undefined,
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
      <Show when={props.renderTooltipBody} keyed>
        {(render) => (
          <Show when={tooltipTarget()} keyed>
            {(target) => <ChartTooltipBody render={render} target={() => target} />}
          </Show>
        )}
      </Show>
    </>
  );
}

function ChartPlot<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(props: ChartPlotProps<TDatum, TXValue, TYValue>) {
  const [local, others] = splitProps(props, [
    'class',
    'motion',
    'renderTooltipBody',
    'renderer',
    'style',
  ]);

  return (
    <ChartPrimitive
      {...others}
      class={cn(
        '[&_.ts-chart:focus-visible]:outline-offset-0.5 min-w-0 text-muted-foreground [&_.ts-chart]:rounded-md [&_.ts-chart]:outline-none [&_.ts-chart:focus-visible]:outline-2 [&_.ts-chart:focus-visible]:outline-ring',
        local.class,
      )}
      motion={local.motion}
      renderTooltipBody={local.renderTooltipBody ?? renderDefaultTooltipBody}
      renderer={local.renderer}
      style={local.style}
    />
  );
}

function ChartHeader(props: HTMLArkProps<'figcaption'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.figcaption
      asChild={local.asChild}
      {...others}
      data-scope="chart"
      data-part="header"
      data-slot="chart-header"
      class={cn('grid gap-1', local.class)}
    />
  );
}

function ChartTitle(props: HTMLArkProps<'h3'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.h3
      asChild={local.asChild}
      {...others}
      data-scope="chart"
      data-part="title"
      data-slot="chart-title"
      class={cn('text-lg font-semibold', local.class)}
    />
  );
}

function ChartDescription(props: HTMLArkProps<'p'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.p
      asChild={local.asChild}
      {...others}
      data-scope="chart"
      data-part="description"
      data-slot="chart-description"
      class={cn('text-sm text-muted-foreground', local.class)}
    />
  );
}

function ChartLegend(props: HTMLArkProps<'ul'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.ul
      asChild={local.asChild}
      {...others}
      data-scope="chart"
      data-part="legend"
      data-slot="chart-legend"
      class={cn('flex flex-wrap gap-3', local.class)}
    />
  );
}

function ChartLegendItem(props: HTMLArkProps<'li'> & { color?: string }) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'color', 'style']);

  return (
    <ark.li
      asChild={local.asChild}
      {...others}
      data-scope="chart"
      data-part="legend-item"
      data-slot="chart-legend-item"
      class={cn('inline-flex items-center gap-2 text-sm text-muted-foreground', local.class)}
      style={local.style}
    >
      {local.asChild ? (
        local.children
      ) : (
        <>
          <span
            aria-hidden="true"
            class="size-2.5 shrink-0 rounded-full bg-muted-foreground shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]"
            style={local.color ? { 'background-color': local.color } : undefined}
          />
          {local.children}
        </>
      )}
    </ark.li>
  );
}

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