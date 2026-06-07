import { Meter as MeterPrimitive } from '@base-ui/react/meter';
import { forwardRef, type ComponentRef } from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Meter.module.css';

const Meter = forwardRef<ComponentRef<typeof MeterPrimitive.Root>, MeterPrimitive.Root.Props>(
  function Meter({ children, ...props }, ref) {
    return (
      <MeterRoot ref={ref} {...props}>
        {children}
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </MeterRoot>
    );
  },
);

const MeterRoot = forwardRef<ComponentRef<typeof MeterPrimitive.Root>, MeterPrimitive.Root.Props>(
  function MeterRoot({ className, ...props }, ref) {
    return (
      <MeterPrimitive.Root
        ref={ref}
        data-slot="meter-root"
        className={mergeClassName(className, styles.root)}
        {...props}
      />
    );
  },
);

const MeterLabel = forwardRef<
  ComponentRef<typeof MeterPrimitive.Label>,
  MeterPrimitive.Label.Props
>(function MeterLabel({ className, ...props }, ref) {
  return (
    <MeterPrimitive.Label
      ref={ref}
      data-slot="meter-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
});

const MeterValue = forwardRef<
  ComponentRef<typeof MeterPrimitive.Value>,
  MeterPrimitive.Value.Props
>(function MeterValue({ className, ...props }, ref) {
  return (
    <MeterPrimitive.Value
      ref={ref}
      data-slot="meter-value"
      className={mergeClassName(className, styles.value)}
      {...props}
    />
  );
});

const MeterTrack = forwardRef<
  ComponentRef<typeof MeterPrimitive.Track>,
  MeterPrimitive.Track.Props
>(function MeterTrack({ className, ...props }, ref) {
  return (
    <MeterPrimitive.Track
      ref={ref}
      data-slot="meter-track"
      className={mergeClassName(className, styles.track)}
      {...props}
    />
  );
});

const MeterIndicator = forwardRef<
  ComponentRef<typeof MeterPrimitive.Indicator>,
  MeterPrimitive.Indicator.Props
>(function MeterIndicator({ className, ...props }, ref) {
  return (
    <MeterPrimitive.Indicator
      ref={ref}
      data-slot="meter-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    />
  );
});

export { Meter, MeterRoot, MeterLabel, MeterValue, MeterTrack, MeterIndicator };