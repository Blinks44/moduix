import { Meter as MeterPrimitive } from '@base-ui/react/meter';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Meter.module.css';

type MeterClassNames = {
  track?: MeterPrimitive.Track.Props['className'];
  indicator?: MeterPrimitive.Indicator.Props['className'];
};

type MeterProps = MeterPrimitive.Root.Props & {
  classNames?: MeterClassNames;
  withTrack?: boolean;
};

function Meter({ className, classNames, children, withTrack = true, ...props }: MeterProps) {
  return (
    <MeterPrimitive.Root
      data-slot="meter-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children}
      {withTrack ? (
        <MeterTrack className={classNames?.track}>
          <MeterIndicator className={classNames?.indicator} />
        </MeterTrack>
      ) : null}
    </MeterPrimitive.Root>
  );
}

function MeterLabel({ className, ...props }: MeterPrimitive.Label.Props) {
  return (
    <MeterPrimitive.Label
      data-slot="meter-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
}

function MeterValue({ className, ...props }: MeterPrimitive.Value.Props) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
      className={mergeClassName(className, styles.value)}
      {...props}
    />
  );
}

function MeterTrack({ className, ...props }: MeterPrimitive.Track.Props) {
  return (
    <MeterPrimitive.Track
      data-slot="meter-track"
      className={mergeClassName(className, styles.track)}
      {...props}
    />
  );
}

function MeterIndicator({ className, ...props }: MeterPrimitive.Indicator.Props) {
  return (
    <MeterPrimitive.Indicator
      data-slot="meter-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    />
  );
}

type MeterLabelProps = MeterPrimitive.Label.Props;
type MeterValueProps = MeterPrimitive.Value.Props;
type MeterTrackProps = MeterPrimitive.Track.Props;
type MeterIndicatorProps = MeterPrimitive.Indicator.Props;

export { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator };

export type {
  MeterClassNames,
  MeterProps,
  MeterLabelProps,
  MeterValueProps,
  MeterTrackProps,
  MeterIndicatorProps,
};