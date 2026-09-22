import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/solid/progress';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function ProgressCircular(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.Root
      asChild={local.asChild}
      class={cn(
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        local.class,
      )}
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
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.RootProvider
      asChild={local.asChild}
      class={cn(
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        local.class,
      )}
      {...others}
      data-slot="progress-circular-root-provider"
    >
      {local.children}
    </ProgressPrimitive.RootProvider>
  );
}

function ProgressCircularLabel(props: ComponentProps<typeof ProgressPrimitive.Label>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.Label
      asChild={local.asChild}
      class={cn('max-w-full min-w-0 text-center text-sm font-regular wrap-anywhere', local.class)}
      {...others}
      data-slot="progress-circular-label"
    />
  );
}

function ProgressCircularValueText(props: ComponentProps<typeof ProgressPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.ValueText
      asChild={local.asChild}
      class={cn('max-w-full min-w-0 text-center text-sm font-medium wrap-anywhere', local.class)}
      {...others}
      data-slot="progress-circular-value-text"
    />
  );
}

function ProgressCircularCircle(props: ComponentProps<typeof ProgressPrimitive.Circle>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.Circle
      asChild={local.asChild}
      class={cn(
        'block overflow-visible [--size:var(--spacing-control-xl)] [--thickness:0.4rem]',
        local.class,
      )}
      {...others}
      data-slot="progress-circular-circle"
    >
      {local.children}
    </ProgressPrimitive.Circle>
  );
}

function ProgressCircularCircleTrack(props: ComponentProps<typeof ProgressPrimitive.CircleTrack>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.CircleTrack
      asChild={local.asChild}
      class={cn('stroke-muted', local.class)}
      {...others}
      data-slot="progress-circular-circle-track"
    />
  );
}

function ProgressCircularCircleRange(props: ComponentProps<typeof ProgressPrimitive.CircleRange>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.CircleRange
      asChild={local.asChild}
      class={cn(
        'origin-center stroke-primary transition-[stroke-dashoffset] duration-200 ease-in-out [stroke-linecap:round] [transform-box:fill-box] data-[state=indeterminate]:animate-moduix-progress-circular-indeterminate data-[state=indeterminate]:[stroke-dasharray:1_200] motion-reduce:transition-none motion-reduce:data-[state=indeterminate]:animate-none motion-reduce:data-[state=indeterminate]:[stroke-dasharray:20_200]',
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.View
      asChild={local.asChild}
      class={cn('contents', local.class)}
      {...others}
      data-slot="progress-circular-view"
    />
  );
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
