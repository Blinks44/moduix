import type { ComponentProps, ComponentRef } from 'react';
import {
  Progress as ProgressPrimitive,
  useProgress,
  useProgressContext,
} from '@ark-ui/react/progress';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './ProgressCircular.module.css';

const ProgressCircularRoot = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ComponentProps<typeof ProgressPrimitive.Root>
>(function ProgressCircularRoot({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress-circular-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressCircularRootProvider = forwardRef<
  ComponentRef<typeof ProgressPrimitive.RootProvider>,
  ComponentProps<typeof ProgressPrimitive.RootProvider>
>(function ProgressCircularRootProvider({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.RootProvider
      ref={ref}
      data-slot="progress-circular-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressCircularLabel = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Label>,
  ComponentProps<typeof ProgressPrimitive.Label>
>(function ProgressCircularLabel({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Label
      ref={ref}
      data-slot="progress-circular-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressCircularValueText = forwardRef<
  ComponentRef<typeof ProgressPrimitive.ValueText>,
  ComponentProps<typeof ProgressPrimitive.ValueText>
>(function ProgressCircularValueText({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.ValueText
      ref={ref}
      data-slot="progress-circular-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressCircularCircle = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Circle>,
  ComponentProps<typeof ProgressPrimitive.Circle>
>(function ProgressCircularCircle({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Circle
      ref={ref}
      data-slot="progress-circular-circle"
      className={clsx(styles.circle, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressCircularCircleTrack = forwardRef<
  ComponentRef<typeof ProgressPrimitive.CircleTrack>,
  ComponentProps<typeof ProgressPrimitive.CircleTrack>
>(function ProgressCircularCircleTrack({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.CircleTrack
      ref={ref}
      data-slot="progress-circular-circle-track"
      className={clsx(styles.circleTrack, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressCircularCircleRange = forwardRef<
  ComponentRef<typeof ProgressPrimitive.CircleRange>,
  ComponentProps<typeof ProgressPrimitive.CircleRange>
>(function ProgressCircularCircleRange({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.CircleRange
      ref={ref}
      data-slot="progress-circular-circle-range"
      className={clsx(styles.circleRange, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressCircularView = forwardRef<
  ComponentRef<typeof ProgressPrimitive.View>,
  ComponentProps<typeof ProgressPrimitive.View>
>(function ProgressCircularView({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.View
      ref={ref}
      data-slot="progress-circular-view"
      className={clsx(styles.view, normalizeClassName(className))}
      {...props}
    />
  );
});

const ProgressCircularContext = ProgressPrimitive.Context;

const ProgressCircular = Object.assign(ProgressCircularRoot, {
  Root: ProgressCircularRoot,
  RootProvider: ProgressCircularRootProvider,
  Label: ProgressCircularLabel,
  ValueText: ProgressCircularValueText,
  Circle: ProgressCircularCircle,
  CircleTrack: ProgressCircularCircleTrack,
  CircleRange: ProgressCircularCircleRange,
  View: ProgressCircularView,
  Context: ProgressCircularContext,
});

const useProgressCircular = useProgress;
const useProgressCircularContext = useProgressContext;

export { ProgressCircular, useProgressCircular, useProgressCircularContext };
export type {
  ProgressValueChangeDetails as ProgressCircularValueChangeDetails,
  ProgressValueTranslationDetails as ProgressCircularValueTranslationDetails,
  UseProgressProps as UseProgressCircularProps,
  UseProgressReturn as UseProgressCircularReturn,
} from '@ark-ui/react/progress';