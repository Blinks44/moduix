import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/solid/progress';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function ProgressCircular(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <ProgressPrimitive.Root
      class={cn('inline-grid w-max max-w-full justify-items-center gap-2', local.class)}
      {...others}
      data-slot="progress-circular-root"
    >
      {local.children}
    </ProgressPrimitive.Root>
  );
}

function ProgressCircularRootProvider(
  props: ComponentProps<typeof ProgressPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <ProgressPrimitive.RootProvider
      class={cn('inline-grid w-max max-w-full justify-items-center gap-2', local.class)}
      {...others}
      data-slot="progress-circular-root-provider"
    >
      {local.children}
    </ProgressPrimitive.RootProvider>
  );
}

function ProgressCircularLabel(props: ComponentProps<typeof ProgressPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Label
      class={cn('text-center text-sm wrap-anywhere', local.class)}
      {...others}
      data-slot="progress-circular-label"
    />
  );
}

function ProgressCircularValueText(props: ComponentProps<typeof ProgressPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.ValueText
      class={cn('text-center text-sm font-medium wrap-anywhere', local.class)}
      {...others}
      data-slot="progress-circular-value-text"
    />
  );
}

function ProgressCircularCircle(props: ComponentProps<typeof ProgressPrimitive.Circle>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <ProgressPrimitive.Circle
      class={cn('block [--size:var(--spacing-control-xl)] [--thickness:0.4rem]', local.class)}
      {...others}
      data-slot="progress-circular-circle"
    >
      {local.children}
    </ProgressPrimitive.Circle>
  );
}

function ProgressCircularCircleTrack(props: ComponentProps<typeof ProgressPrimitive.CircleTrack>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.CircleTrack
      class={cn('stroke-muted', local.class)}
      {...others}
      data-slot="progress-circular-circle-track"
    />
  );
}

function ProgressCircularCircleRange(props: ComponentProps<typeof ProgressPrimitive.CircleRange>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.CircleRange
      class={cn(
        'stroke-primary transition-[stroke-dashoffset] duration-normal ease-in-out [stroke-linecap:round] data-[state=indeterminate]:animate-moduix-progress-circular-indeterminate data-[state=indeterminate]:[stroke-dasharray:calc(var(--circumference)/4)_var(--circumference)] motion-reduce:data-[state=indeterminate]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="progress-circular-circle-range"
    />
  );
}

type ProgressCircularRingProps = Omit<
  ComponentProps<typeof ProgressPrimitive.Circle>,
  'asChild' | 'children'
>;

function ProgressCircularRing(props: ProgressCircularRingProps) {
  return (
    <ProgressCircularCircle {...props}>
      <ProgressCircularCircleTrack />
      <ProgressCircularCircleRange />
    </ProgressCircularCircle>
  );
}

function ProgressCircularView(props: ComponentProps<typeof ProgressPrimitive.View>) {
  return <ProgressPrimitive.View {...props} data-slot="progress-circular-view" />;
}

const ProgressCircularContext = ProgressPrimitive.Context;

export {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  ProgressCircularView,
  useProgress,
  useProgressContext,
};
export type {
  ProgressCircleProps,
  ProgressCircleRangeProps,
  ProgressCircleTrackProps,
  ProgressContextProps,
  ProgressLabelProps,
  ProgressRootProps,
  ProgressRootProviderProps,
  ProgressValueChangeDetails,
  ProgressValueTextProps,
  ProgressValueTranslationDetails,
  ProgressViewProps,
  UseProgressContext,
  UseProgressProps,
  UseProgressReturn,
} from '@ark-ui/solid/progress';