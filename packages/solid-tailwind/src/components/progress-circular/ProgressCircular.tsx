import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/solid/progress';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function ProgressCircularRoot(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.Root
      asChild={local.asChild}
      data-slot="progress-circular-root"
      class={cn(
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        local.class,
      )}
      {...others}
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
      data-slot="progress-circular-root-provider"
      class={cn(
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        local.class,
      )}
      {...others}
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
      data-slot="progress-circular-label"
      class={cn(
        'max-w-full min-w-0 text-center text-sm font-regular [overflow-wrap:anywhere]',
        local.class,
      )}
      {...others}
    />
  );
}

function ProgressCircularValueText(props: ComponentProps<typeof ProgressPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.ValueText
      asChild={local.asChild}
      data-slot="progress-circular-value-text"
      class={cn(
        'max-w-full min-w-0 text-center text-sm font-medium [overflow-wrap:anywhere]',
        local.class,
      )}
      {...others}
    />
  );
}

function ProgressCircularCircle(props: ComponentProps<typeof ProgressPrimitive.Circle>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.Circle
      asChild={local.asChild}
      data-slot="progress-circular-circle"
      class={cn(
        'block overflow-visible [--size:var(--spacing-control-xl)] [--thickness:0.4rem]',
        local.class,
      )}
      {...others}
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
      data-slot="progress-circular-circle-track"
      class={cn('stroke-muted', local.class)}
      {...others}
    />
  );
}

function ProgressCircularCircleRange(props: ComponentProps<typeof ProgressPrimitive.CircleRange>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ProgressPrimitive.CircleRange
      asChild={local.asChild}
      data-slot="progress-circular-circle-range"
      class={cn(
        'origin-center stroke-primary transition-[stroke-dashoffset] duration-200 ease-in-out [stroke-linecap:round] [transform-box:fill-box] data-[state=indeterminate]:animate-[moduix-spin_1.4s_linear_infinite] data-[state=indeterminate]:[stroke-dasharray:1_200] motion-reduce:transition-none motion-reduce:data-[state=indeterminate]:animate-none motion-reduce:data-[state=indeterminate]:[stroke-dasharray:20_200]',
        local.class,
      )}
      {...others}
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
      data-slot="progress-circular-view"
      class={cn('contents', local.class)}
      {...others}
    />
  );
}

type ProgressCircularComponent = typeof ProgressCircularRoot & {
  Root: typeof ProgressCircularRoot;
  RootProvider: typeof ProgressCircularRootProvider;
  Context: typeof ProgressPrimitive.Context;
  Label: typeof ProgressCircularLabel;
  ValueText: typeof ProgressCircularValueText;
  Circle: typeof ProgressCircularCircle;
  CircleTrack: typeof ProgressCircularCircleTrack;
  CircleRange: typeof ProgressCircularCircleRange;
  Ring: typeof ProgressCircularRing;
  View: typeof ProgressCircularView;
  useProgress: typeof useProgress;
  useProgressContext: typeof useProgressContext;
};

const ProgressCircular: ProgressCircularComponent = Object.assign(ProgressCircularRoot, {
  Root: ProgressCircularRoot,
  RootProvider: ProgressCircularRootProvider,
  Context: ProgressPrimitive.Context,
  Label: ProgressCircularLabel,
  ValueText: ProgressCircularValueText,
  Circle: ProgressCircularCircle,
  CircleTrack: ProgressCircularCircleTrack,
  CircleRange: ProgressCircularCircleRange,
  Ring: ProgressCircularRing,
  View: ProgressCircularView,
  useProgress,
  useProgressContext,
});

export { ProgressCircular };