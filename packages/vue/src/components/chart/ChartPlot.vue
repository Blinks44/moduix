<script lang="ts">
import type {
  ChartRenderer,
  ChartRendererHostOptions,
  ChartTooltipBodyContext,
  ChartValue,
} from '@tanstack/charts';
import { motion as createMotionRenderer } from '@tanstack/charts/motion';
import type { HTMLAttributes, StyleValue, VNodeChild } from 'vue';

const defaultChartRenderer = createMotionRenderer({
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  },
});

export type ChartTooltipBodyRenderContext<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = ChartTooltipBodyContext<TDatum, TXValue, TYValue> & {
  defaultBody: () => VNodeChild;
};

type ChartTooltipBodyRenderProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = {
  renderTooltipBody?: (
    context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>,
  ) => VNodeChild;
};

export interface Props<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>
  extends
    Omit<
      ChartRendererHostOptions<TDatum, TXValue, TYValue>,
      'className' | 'onTooltipBodyChange' | 'renderer'
    >,
    ChartTooltipBodyRenderProps<TDatum, TXValue, TYValue> {
  class?: HTMLAttributes['class'];
  style?: HTMLAttributes['style'];
  motion?: boolean;
  renderer?: ChartRenderer<NoInfer<TDatum>, NoInfer<TXValue>, NoInfer<TYValue>>;
}
</script>

<script
  setup
  lang="ts"
  generic="TDatum, TXValue extends ChartValue = ChartValue, TYValue extends ChartValue = ChartValue"
>
import type { ChartTooltipBodyTarget, ChartTooltipContent } from '@tanstack/charts';
import { createChartRendererAdapter } from '@tanstack/charts/adapter/renderer';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import { clsx } from 'clsx';
import { computed, h, onBeforeUnmount, onMounted, ref, shallowRef, useId, watch } from 'vue';
import styles from './Chart.module.css';

const {
  class: className,
  style,
  motion = true,
  renderer,
  renderTooltipBody,
  definition,
  ariaLabel,
  ariaDescription,
  height,
  aspectRatio,
  width,
  initialWidth,
  tabIndex,
  idPrefix,
  measureText,
  onFocusChange,
  onFocusGroupChange,
  onSelect,
  onRender,
} = defineProps<Props<TDatum, TXValue, TYValue>>();

const renderTooltipSwatch = (color: string) =>
  h('span', {
    'aria-hidden': 'true',
    'data-slot': 'chart-tooltip-swatch',
    class: styles.tooltipSwatch,
    style: { backgroundColor: color },
  });

const renderModuixTooltipBody = (content: ChartTooltipContent | string): VNodeChild => {
  if (typeof content === 'string') {
    return h('span', { 'data-slot': 'chart-tooltip-text' }, content);
  }

  return h('div', { 'data-slot': 'chart-tooltip-body', class: styles.defaultTooltipContent }, [
    content.title
      ? h('div', { 'data-slot': 'chart-tooltip-title', class: styles.tooltipTitle }, [
          content.color ? renderTooltipSwatch(content.color) : null,
          content.title,
        ])
      : null,
    content.rows.length
      ? h(
          'div',
          { 'data-slot': 'chart-tooltip-rows', class: styles.tooltipRows },
          content.rows.map((row, index) =>
            h(
              'div',
              {
                key: `${row.label}-${index}`,
                'data-has-swatch': row.color ? '' : undefined,
                'data-slot': 'chart-tooltip-row',
                class: styles.tooltipRow,
              },
              [
                row.color ? renderTooltipSwatch(row.color) : null,
                h(
                  'span',
                  { 'data-slot': 'chart-tooltip-label', class: styles.tooltipLabel },
                  row.label,
                ),
                h(
                  'span',
                  { 'data-slot': 'chart-tooltip-value', class: styles.tooltipValue },
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

const resolvedAspectRatio = computed(() =>
  typeof aspectRatio === 'number' && Number.isFinite(aspectRatio) && aspectRatio > 0
    ? aspectRatio
    : undefined,
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

const renderDefaultTooltipBody = (
  context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>,
) => renderModuixTooltipBody(context.content);

const hostOptions = computed<ChartRendererHostOptions<TDatum, TXValue, TYValue>>(() => ({
  definition,
  ariaLabel,
  ariaDescription,
  height,
  aspectRatio,
  width,
  initialWidth,
  tabIndex,
  idPrefix: idPrefix ?? generatedIdPrefix,
  measureText,
  onFocusChange,
  onFocusGroupChange,
  onSelect,
  onRender,
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
    width: width === undefined ? '100%' : `${width}px`,
    height:
      height === undefined
        ? resolvedAspectRatio.value === undefined
          ? '320px'
          : undefined
        : `${height}px`,
    aspectRatio:
      height === undefined && resolvedAspectRatio.value !== undefined
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

  return (renderTooltipBody ?? renderDefaultTooltipBody)({
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
  <div :class="clsx('ts-chart-host', styles.plot, className)" :style="hostStyle">
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