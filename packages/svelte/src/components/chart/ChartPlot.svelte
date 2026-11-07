<script module lang="ts">
  import type {
    ChartRenderer,
    ChartRendererHostOptions,
    ChartTooltipBodyContext,
    ChartValue,
  } from '@tanstack/charts';
  import type { ChartTooltipBodySnippetContext } from '@tanstack/charts/svelte';
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  export type ChartTooltipBodyRenderContext<
    TDatum = unknown,
    TXValue extends ChartValue = ChartValue,
    TYValue extends ChartValue = ChartValue,
  > = ChartTooltipBodySnippetContext<TDatum, TXValue, TYValue>;

  export interface ChartPlotProps<
    TDatum = unknown,
    TXValue extends ChartValue = ChartValue,
    TYValue extends ChartValue = ChartValue,
  > extends Omit<
    ChartRendererHostOptions<TDatum, TXValue, TYValue>,
    'className' | 'onTooltipBodyChange' | 'renderer'
  > {
    class?: ClassValue;
    style?: string;
    motion?: boolean;
    renderer?: ChartRenderer<NoInfer<TDatum>, NoInfer<TXValue>, NoInfer<TYValue>>;
    renderTooltipBody?: Snippet<[ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>]>;
  }

  export type { ChartTooltipBodyContext };
</script>

<script
  lang="ts"
  generics="TDatum, TXValue extends ChartValue = ChartValue, TYValue extends ChartValue = ChartValue"
>
  import type { ChartTooltipBodyTarget, ChartTooltipContent } from '@tanstack/charts';
  import { resolveChartAdapterLayout } from '@tanstack/charts/adapter';
  import { createChartRendererAdapter } from '@tanstack/charts/adapter/renderer';
  import { motion as createMotionRenderer } from '@tanstack/charts/motion';
  import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
  import { clsx } from 'clsx';
  import { onMount, untrack } from 'svelte';
  import styles from './Chart.module.css';

  const defaultChartRenderer = createMotionRenderer({
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 30,
      mass: 0.8,
    },
  });
  let {
    class: className,
    idPrefix,
    motion = true,
    renderer,
    renderTooltipBody,
    style,
    ...hostProps
  }: ChartPlotProps<TDatum, TXValue, TYValue> = $props();

  const generatedId = $props.id();
  const generatedIdPrefix = `ts-chart-${generatedId.replaceAll(/[^a-zA-Z0-9_-]/g, '')}`;

  const resolvedAspectRatio = $derived(
    resolveChartAdapterLayout({ aspectRatio: hostProps.aspectRatio }).aspectRatio,
  );
  const resolvedRenderer = $derived(
    (renderer ?? (motion === false ? svgChartRenderer : defaultChartRenderer)) as ChartRenderer<
      TDatum,
      TXValue,
      TYValue
    >,
  );

  let tooltipTarget = $state.raw<ChartTooltipBodyTarget<TDatum, TXValue, TYValue> | null>(null);

  const hostOptions = $derived<ChartRendererHostOptions<TDatum, TXValue, TYValue>>({
    ...hostProps,
    idPrefix: idPrefix ?? generatedIdPrefix,
    renderer: resolvedRenderer,
    onTooltipBodyChange: (target) => {
      tooltipTarget = target;
    },
  });

  const adapter = untrack(() => createChartRendererAdapter(hostOptions));
  const initialMarkup = adapter.prerender();
  let surface: HTMLDivElement;

  $effect(() => adapter.update(hostOptions));
  onMount(() => {
    adapter.mount(surface);
    return () => adapter.destroy();
  });

  const hostStyle = $derived(
    [
      'position:relative',
      `width:${hostProps.width === undefined ? '100%' : `${hostProps.width}px`}`,
      hostProps.height !== undefined
        ? `height:${hostProps.height}px`
        : resolvedAspectRatio === undefined
          ? 'height:320px'
          : `aspect-ratio:${resolvedAspectRatio}`,
      style,
    ]
      .filter(Boolean)
      .join(';'),
  );

  // TanStack owns the tooltip element; the surface moves into it, like its own Svelte adapter.
  const moveInto = (element: HTMLElement) => (node: HTMLElement) => {
    element.append(node);
  };
</script>

{#snippet tooltipSwatch(color: string)}
  <span
    aria-hidden="true"
    data-slot="chart-tooltip-swatch"
    class={styles.tooltipSwatch}
    style:background-color={color}
  ></span>
{/snippet}

{#snippet moduixTooltipBody(content: ChartTooltipContent | string)}
  {#if typeof content === 'string'}
    <span data-slot="chart-tooltip-text">{content}</span>
  {:else}
    <div data-slot="chart-tooltip-body" class={styles.defaultTooltipContent}>
      {#if content.title}
        <div data-slot="chart-tooltip-title" class={styles.tooltipTitle}>
          {#if content.color}{@render tooltipSwatch(content.color)}{/if}
          {content.title}
        </div>
      {/if}
      {#if content.rows.length}
        <div data-slot="chart-tooltip-rows" class={styles.tooltipRows}>
          {#each content.rows as row, index (`${row.label}-${index}`)}
            <div
              data-active={row.active ? '' : undefined}
              data-has-swatch={row.color ? '' : undefined}
              data-slot="chart-tooltip-row"
              class={styles.tooltipRow}
            >
              {#if row.color}{@render tooltipSwatch(row.color)}{/if}
              <span data-slot="chart-tooltip-label" class={styles.tooltipLabel}>{row.label}</span>
              <span data-slot="chart-tooltip-value" class={styles.tooltipValue}>{row.value}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
{/snippet}

<div class={clsx('ts-chart-host', styles.plot, className)} style={hostStyle}>
  <div bind:this={surface} class="ts-chart-surface" style="width:100%;height:100%">
    {@html initialMarkup}
  </div>
</div>

{#if tooltipTarget}
  {@const target = tooltipTarget}
  {#snippet defaultBody()}
    {@render moduixTooltipBody(target.content)}
  {/snippet}
  <div
    data-slot="chart-tooltip-surface"
    class={styles.tooltipSurface}
    {@attach moveInto(target.element)}
  >
    {#if renderTooltipBody}
      {@render renderTooltipBody({
        primaryPoint: target.primaryPoint,
        points: target.points,
        content: target.content,
        pinned: target.pinned,
        dismiss: target.dismiss,
        defaultBody,
      })}
    {:else}
      {@render defaultBody()}
    {/if}
  </div>
{/if}