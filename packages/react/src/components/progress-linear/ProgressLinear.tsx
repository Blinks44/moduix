import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/react/progress';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './ProgressLinear.module.css';

const ProgressLinear = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ComponentProps<typeof ProgressPrimitive.Root>
>(function ProgressLinear({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="progress-linear-root"
    />
  );
});

const ProgressLinearRootProvider = forwardRef<
  ComponentRef<typeof ProgressPrimitive.RootProvider>,
  ComponentProps<typeof ProgressPrimitive.RootProvider>
>(function ProgressLinearRootProvider({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="progress-linear-root-provider"
    />
  );
});

const ProgressLinearLabel = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Label>,
  ComponentProps<typeof ProgressPrimitive.Label>
>(function ProgressLinearLabel({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Label
      ref={ref}
      className={clsx(styles.label, className)}
      {...props}
      data-slot="progress-linear-label"
    />
  );
});

const ProgressLinearValueText = forwardRef<
  ComponentRef<typeof ProgressPrimitive.ValueText>,
  ComponentProps<typeof ProgressPrimitive.ValueText>
>(function ProgressLinearValueText({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.ValueText
      ref={ref}
      className={clsx(styles.valueText, className)}
      {...props}
      data-slot="progress-linear-value-text"
    />
  );
});

const ProgressLinearTrack = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Track>,
  ComponentProps<typeof ProgressPrimitive.Track>
>(function ProgressLinearTrack({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Track
      ref={ref}
      className={clsx(styles.track, className)}
      {...props}
      data-slot="progress-linear-track"
    />
  );
});

const ProgressLinearRange = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Range>,
  ComponentProps<typeof ProgressPrimitive.Range>
>(function ProgressLinearRange({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Range
      ref={ref}
      className={clsx(styles.range, className)}
      {...props}
      data-slot="progress-linear-range"
    />
  );
});

const ProgressLinearView = forwardRef<
  ComponentRef<typeof ProgressPrimitive.View>,
  ComponentProps<typeof ProgressPrimitive.View>
>(function ProgressLinearView({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.View
      ref={ref}
      className={clsx(styles.view, className)}
      {...props}
      data-slot="progress-linear-view"
    />
  );
});

const ProgressLinearContext = ProgressPrimitive.Context;

export {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  ProgressLinearView,
  useProgress,
  useProgressContext,
};