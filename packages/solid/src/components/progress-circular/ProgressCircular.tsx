import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/solid/progress';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './ProgressCircular.module.css';

function ProgressCircular(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ProgressPrimitive.Root
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.label, local.class)}
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
      class={clsx(styles.valueText, local.class)}
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
      class={clsx(styles.circle, local.class)}
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
      class={clsx(styles.circleTrack, local.class)}
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
      class={clsx(styles.circleRange, local.class)}
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
      class={clsx(styles.view, local.class)}
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