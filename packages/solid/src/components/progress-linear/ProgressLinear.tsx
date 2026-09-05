import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/solid/progress';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './ProgressLinear.module.css';

function ProgressLinearRoot(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Root
      data-slot="progress-linear-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function ProgressLinearRootProvider(props: ComponentProps<typeof ProgressPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.RootProvider
      data-slot="progress-linear-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function ProgressLinearLabel(props: ComponentProps<typeof ProgressPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Label
      data-slot="progress-linear-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function ProgressLinearValueText(props: ComponentProps<typeof ProgressPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.ValueText
      data-slot="progress-linear-value-text"
      class={clsx(styles.valueText, local.class)}
      {...others}
    />
  );
}

function ProgressLinearTrack(props: ComponentProps<typeof ProgressPrimitive.Track>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Track
      data-slot="progress-linear-track"
      class={clsx(styles.track, local.class)}
      {...others}
    />
  );
}

function ProgressLinearRange(props: ComponentProps<typeof ProgressPrimitive.Range>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Range
      data-slot="progress-linear-range"
      class={clsx(styles.range, local.class)}
      {...others}
    />
  );
}

function ProgressLinearView(props: ComponentProps<typeof ProgressPrimitive.View>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.View
      data-slot="progress-linear-view"
      class={clsx(styles.view, local.class)}
      {...others}
    />
  );
}

type ProgressLinearComponent = typeof ProgressLinearRoot & {
  Root: typeof ProgressLinearRoot;
  RootProvider: typeof ProgressLinearRootProvider;
  Context: typeof ProgressPrimitive.Context;
  Label: typeof ProgressLinearLabel;
  ValueText: typeof ProgressLinearValueText;
  Track: typeof ProgressLinearTrack;
  Range: typeof ProgressLinearRange;
  View: typeof ProgressLinearView;
  useProgress: typeof useProgress;
  useProgressContext: typeof useProgressContext;
};

const ProgressLinear: ProgressLinearComponent = Object.assign(ProgressLinearRoot, {
  Root: ProgressLinearRoot,
  RootProvider: ProgressLinearRootProvider,
  Context: ProgressPrimitive.Context,
  Label: ProgressLinearLabel,
  ValueText: ProgressLinearValueText,
  Track: ProgressLinearTrack,
  Range: ProgressLinearRange,
  View: ProgressLinearView,
  useProgress,
  useProgressContext,
});

export { ProgressLinear };