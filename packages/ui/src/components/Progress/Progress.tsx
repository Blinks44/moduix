import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Progress.module.css';

function Progress({ children, ...props }: ProgressPrimitive.Root.Props) {
  return (
    <ProgressRoot {...props}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  );
}

function ProgressRoot({ className, ...props }: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={mergeClassName(className, styles.track)}
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={mergeClassName(className, styles.value)}
      {...props}
    />
  );
}

export { Progress, ProgressRoot, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };