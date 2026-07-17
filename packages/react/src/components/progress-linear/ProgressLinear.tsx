import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/react/progress';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './ProgressLinear.module.css';

const ProgressLinearRoot = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ComponentProps<typeof ProgressPrimitive.Root>
>(function ProgressLinearRoot({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress-linear-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="progress-linear-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="progress-linear-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="progress-linear-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
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
      data-slot="progress-linear-track"
      className={clsx(styles.track, normalizeClassName(className))}
      {...props}
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
      data-slot="progress-linear-range"
      className={clsx(styles.range, normalizeClassName(className))}
      {...props}
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
      data-slot="progress-linear-view"
      className={clsx(styles.view, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressLinear = Object.assign(ProgressLinearRoot, {
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