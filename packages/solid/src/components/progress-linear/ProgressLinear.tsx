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
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="progress-linear-root"
    />
  );
}

function ProgressLinearRootProvider(props: ComponentProps<typeof ProgressPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="progress-linear-root-provider"
    />
  );
}

function ProgressLinearLabel(props: ComponentProps<typeof ProgressPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="progress-linear-label"
    />
  );
}

function ProgressLinearValueText(props: ComponentProps<typeof ProgressPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.ValueText
      class={clsx(styles.valueText, local.class)}
      {...others}
      data-slot="progress-linear-value-text"
    />
  );
}

function ProgressLinearTrack(props: ComponentProps<typeof ProgressPrimitive.Track>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Track
      class={clsx(styles.track, local.class)}
      {...others}
      data-slot="progress-linear-track"
    />
  );
}

function ProgressLinearRange(props: ComponentProps<typeof ProgressPrimitive.Range>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.Range
      class={clsx(styles.range, local.class)}
      {...others}
      data-slot="progress-linear-range"
    />
  );
}

function ProgressLinearView(props: ComponentProps<typeof ProgressPrimitive.View>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ProgressPrimitive.View
      class={clsx(styles.view, local.class)}
      {...others}
      data-slot="progress-linear-view"
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