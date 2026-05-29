import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { forwardRef, type ComponentRef } from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Progress.module.css';

const Progress = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressPrimitive.Root.Props
>(function Progress({ children, ...props }, ref) {
  return (
    <ProgressRoot ref={ref} {...props}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  );
});

const ProgressRoot = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressPrimitive.Root.Props
>(function ProgressRoot({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

const ProgressTrack = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Track>,
  ProgressPrimitive.Track.Props
>(function ProgressTrack({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Track
      ref={ref}
      data-slot="progress-track"
      className={mergeClassName(className, styles.track)}
      {...props}
    />
  );
});

const ProgressIndicator = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Indicator>,
  ProgressPrimitive.Indicator.Props
>(function ProgressIndicator({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Indicator
      ref={ref}
      data-slot="progress-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    />
  );
});

const ProgressLabel = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Label>,
  ProgressPrimitive.Label.Props
>(function ProgressLabel({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Label
      ref={ref}
      data-slot="progress-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
});

const ProgressValue = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Value>,
  ProgressPrimitive.Value.Props
>(function ProgressValue({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Value
      ref={ref}
      data-slot="progress-value"
      className={mergeClassName(className, styles.value)}
      {...props}
    />
  );
});

export { Progress, ProgressRoot, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };