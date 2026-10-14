<script lang="ts">
import type { ChartRenderer, ChartRendererHostOptions, ChartValue } from '@tanstack/charts';
import { motion as createMotionRenderer } from '@tanstack/charts/motion';
import type { ChartTooltipBodySlotContext as ChartTooltipBodyRenderContext } from '@tanstack/charts/vue';
import type { HTMLAttributes, StyleValue, VNodeChild } from 'vue';

const defaultChartRenderer = createMotionRenderer({
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  },
});

export type { ChartTooltipBodyRenderContext };

export interface Props<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> extends Omit<
  ChartRendererHostOptions<TDatum, TXValue, TYValue>,
  'className' | 'onTooltipBodyChange' | 'renderer'
> {
  class?: HTMLAttributes['class'];
  style?: HTMLAttributes['style'];
  motion?: boolean;
  renderer?: ChartRenderer<NoInfer<TDatum>, NoInfer<TXValue>, NoInfer<TYValue>>;
  renderTooltipBody?: (
    context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>,
  ) => VNodeChild;
}
</script>
<script
  setup
  lang="ts"
  generic="TDatum, TXValue extends ChartValue = ChartValue, TYValue extends ChartValue = ChartValue"
>
import type { ChartTooltipBodyTarget, ChartTooltipContent } from '@tanstack/charts';
import { resolveChartAdapterLayout } from '@tanstack/charts/adapter';
import { createChartRendererAdapter } from '@tanstack/charts/adapter/renderer';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import { computed, h, onBeforeUnmount, onMounted, ref, shallowRef, useId, watch } from 'vue';
import { cn } from '@/lib/moduix/cn';

const plotClass =
  'min-w-0 text-muted-foreground [--ts-chart-tooltip-background:--theme(--color-popover)] [--ts-chart-tooltip-border-radius:--theme(--radius-md)] [--ts-chart-tooltip-border:1px_solid_--theme(--color-border)] [--ts-chart-tooltip-color:--theme(--color-popover-foreground)] [--ts-chart-tooltip-font:--theme(--font-weight-medium)_--theme(--text-xs)/--theme(--text-xs--line-height)_--theme(--font-sans)] [--ts-chart-tooltip-padding:--spacing(3)] [--ts-chart-tooltip-shadow:--theme(--shadow-lg)] [&_.ts-chart]:rounded-md [&_.ts-chart]:outline-none [&_.ts-chart:focus-visible]:outline-2 [&_.ts-chart:focus-visible]:outline-offset-2 [&_.ts-chart:focus-visible]:outline-ring';

const {
  class: className,
  style,
  motion = true,
  renderer,
  renderTooltipBody,
  idPrefix,
  ...hostProps
} = defineProps<Props<TDatum, TXValue, TYValue>>();

const renderTooltipSwatch = (color: string) =>
  h('span', {
    'aria-hidden': 'true',
    'data-slot': 'chart-tooltip-swatch',
    class: 'size-2.5 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]',
    style: { backgroundColor: color },
  });

const renderModuixTooltipBody = (content: ChartTooltipContent | string): VNodeChild => {
  if (typeof content === 'string') {
    return h('span', { 'data-slot': 'chart-tooltip-text' }, content);
  }

  return h('div', { 'data-slot': 'chart-tooltip-body', class: 'grid gap-1' }, [
    content.title
      ? h(
          'div',
          {
            'data-slot': 'chart-tooltip-title',
            class: 'flex items-center gap-2 font-semibold text-popover-foreground',
          },
          [content.color ? renderTooltipSwatch(content.color) : null, content.title],
        )
      : null,
    content.rows.length
      ? h(
          'div',
          { 'data-slot': 'chart-tooltip-rows', class: 'grid gap-1' },
          content.rows.map((row, index) =>
            h(
              'div',
              {
                key: `${row.label}-${index}`,
                'data-active': row.active ? '' : undefined,
                'data-has-swatch': row.color ? '' : undefined,
                'data-slot': 'chart-tooltip-row',
                class:
                  'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 data-active:rounded-sm data-active:bg-muted data-active:ring-4 data-active:ring-muted data-[has-swatch]:grid-cols-[0.625rem_minmax(0,1fr)_auto]',
              },
              [
                row.color ? renderTooltipSwatch(row.color) : null,
                h(
                  'span',
                  { 'data-slot': 'chart-tooltip-label', class: 'min-w-0 text-muted-foreground' },
                  row.label,
                ),
                h(
                  'span',
                  {
                    'data-slot': 'chart-tooltip-value',
                    class:
                      'text-end font-semibold whitespace-nowrap text-popover-foreground tabular-nums',
                  },
                  row.value,
                ),
              ],
            ),
          ),
        )
      : null,
  ]);
};

const generatedIdPrefix = `ts-chart-${useId().replaceAll(/[^a-zA-Z0-9_-]/g, '')}`;

const resolvedAspectRatio = computed(
  () => resolveChartAdapterLayout({ aspectRatio: hostProps.aspectRatio }).aspectRatio,
);

const resolvedRenderer = computed(
  () =>
    (renderer ?? (motion === false ? svgChartRenderer : defaultChartRenderer)) as ChartRenderer<
      TDatum,
      TXValue,
      TYValue
    >,
);

const tooltipTarget = shallowRef<ChartTooltipBodyTarget<TDatum, TXValue, TYValue> | null>(null);

const setTooltipTarget = (target: ChartTooltipBodyTarget<TDatum, TXValue, TYValue> | null) => {
  tooltipTarget.value = target;
};

const hostOptions = computed<ChartRendererHostOptions<TDatum, TXValue, TYValue>>(() => ({
  ...hostProps,
  idPrefix: idPrefix ?? generatedIdPrefix,
  renderer: resolvedRenderer.value,
  onTooltipBodyChange: setTooltipTarget,
}));

const adapter = createChartRendererAdapter(hostOptions.value);
const initialMarkup = adapter.prerender();

const surfaceRef = ref<HTMLDivElement>();

onMounted(() => {
  if (!surfaceRef.value) return;
  adapter.update(hostOptions.value);
  adapter.mount(surfaceRef.value);
});

onBeforeUnmount(() => adapter.destroy());

watch(hostOptions, (nextOptions) => adapter.update(nextOptions));

const hostStyle = computed<StyleValue>(() => [
  {
    position: 'relative',
    width: hostProps.width === undefined ? '100%' : `${hostProps.width}px`,
    height:
      hostProps.height === undefined
        ? resolvedAspectRatio.value === undefined
          ? '320px'
          : undefined
        : `${hostProps.height}px`,
    aspectRatio:
      hostProps.height === undefined && resolvedAspectRatio.value !== undefined
        ? resolvedAspectRatio.value.toString()
        : undefined,
  },
  style,
]);

const renderTooltipContent = () => {
  const target = tooltipTarget.value;

  if (!target) {
    return null;
  }

  if (!renderTooltipBody) return renderModuixTooltipBody(target.content);

  return renderTooltipBody({
    primaryPoint: target.primaryPoint,
    points: target.points,
    content: target.content,
    pinned: target.pinned,
    dismiss: target.dismiss,
    defaultBody: () => renderModuixTooltipBody(target.content),
  });
};
</script>

<template>
  <div :class="cn('ts-chart-host', plotClass, className)" :style="hostStyle">
    <div
      ref="surfaceRef"
      class="ts-chart-surface"
      :style="{ width: '100%', height: '100%' }"
      :innerHTML="initialMarkup"
    />
  </div>
  <Teleport v-if="tooltipTarget" :to="tooltipTarget.element">
    <component :is="renderTooltipContent" />
  </Teleport>
</template>