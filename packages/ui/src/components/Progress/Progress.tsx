import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Progress.module.css';

type ProgressClassNames = {
  track?: ProgressPrimitive.Track.Props['className'];
  indicator?: ProgressPrimitive.Indicator.Props['className'];
};

type ProgressProps = ProgressPrimitive.Root.Props & {
  classNames?: ProgressClassNames;
};

function Progress({ className, classNames, children, ...props }: ProgressProps) {
  const { track, indicator } = classNames ?? {};

  return (
    <ProgressPrimitive.Root
      data-slot="progress-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children}
      <ProgressTrack className={track}>
        <ProgressIndicator className={indicator} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
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

type ProgressLabelProps = ProgressPrimitive.Label.Props;
type ProgressValueProps = ProgressPrimitive.Value.Props;

export { Progress, ProgressLabel, ProgressValue };

export type { ProgressClassNames, ProgressProps, ProgressLabelProps, ProgressValueProps };