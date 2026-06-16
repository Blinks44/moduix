import { Meter as MeterPrimitive } from '@base-ui/react/meter';
import { forwardRef, type ComponentRef } from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Meter.module.css';

type MeterRootElement = ComponentRef<typeof MeterPrimitive.Root>;
type MeterLabelElement = ComponentRef<typeof MeterPrimitive.Label>;
type MeterValueElement = ComponentRef<typeof MeterPrimitive.Value>;
type MeterTrackElement = ComponentRef<typeof MeterPrimitive.Track>;
type MeterIndicatorElement = ComponentRef<typeof MeterPrimitive.Indicator>;

const Meter = forwardRef<MeterRootElement, MeterPrimitive.Root.Props>(function Meter(
  { children, ...props },
  ref,
) {
  return (
    <MeterRoot ref={ref} {...props}>
      {children}
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </MeterRoot>
  );
});

const MeterRoot = forwardRef<MeterRootElement, MeterPrimitive.Root.Props>(function MeterRoot(
  { className, ...props },
  ref,
) {
  return (
    <MeterPrimitive.Root
      ref={ref}
      data-slot="meter-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

const MeterLabel = forwardRef<MeterLabelElement, MeterPrimitive.Label.Props>(function MeterLabel(
  { className, ...props },
  ref,
) {
  return (
    <MeterPrimitive.Label
      ref={ref}
      data-slot="meter-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
});

const MeterValue = forwardRef<MeterValueElement, MeterPrimitive.Value.Props>(function MeterValue(
  { className, ...props },
  ref,
) {
  return (
    <MeterPrimitive.Value
      ref={ref}
      data-slot="meter-value"
      className={mergeClassName(className, styles.value)}
      {...props}
    />
  );
});

const MeterTrack = forwardRef<MeterTrackElement, MeterPrimitive.Track.Props>(function MeterTrack(
  { className, ...props },
  ref,
) {
  return (
    <MeterPrimitive.Track
      ref={ref}
      data-slot="meter-track"
      className={mergeClassName(className, styles.track)}
      {...props}
    />
  );
});

const MeterIndicator = forwardRef<MeterIndicatorElement, MeterPrimitive.Indicator.Props>(
  function MeterIndicator({ className, ...props }, ref) {
    return (
      <MeterPrimitive.Indicator
        ref={ref}
        data-slot="meter-indicator"
        className={mergeClassName(className, styles.indicator)}
        {...props}
      />
    );
  },
);

export { Meter, MeterRoot, MeterLabel, MeterValue, MeterTrack, MeterIndicator };