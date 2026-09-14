import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/solid/progress';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './ProgressCircular.module.css';

function ProgressCircularRoot(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.Root
      asChild={local.asChild}
      data-slot="progress-circular-root"
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.label, local.class)}
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
      class={clsx(styles.valueText, local.class)}
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
      class={clsx(styles.circle, local.class)}
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
      class={clsx(styles.circleTrack, local.class)}
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
      class={clsx(styles.circleRange, local.class)}
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
      class={clsx(styles.view, local.class)}
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