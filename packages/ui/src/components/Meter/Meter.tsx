import { Meter as MeterPrimitive } from '@base-ui/react/meter';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Meter.module.css';

type MeterClassNames = {
  track?: string;
  indicator?: string;
};

type MeterProps = MeterPrimitive.Root.Props & {
  classNames?: MeterClassNames;
};

function Meter({ className, classNames, children, ...props }: MeterProps) {
  return (
    <MeterPrimitive.Root
      data-slot="meter-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {children}
      <MeterTrack className={classNames?.track}>
        <MeterIndicator className={classNames?.indicator} />
      </MeterTrack>
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

export { Meter, MeterLabel, MeterValue };

export type { MeterClassNames, MeterProps, MeterLabelProps, MeterValueProps };