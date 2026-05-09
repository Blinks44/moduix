import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue, type MeterProps } from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './meter.module.css';

export const meterCssProperties: CssPropertyInput[] = [
  ['--meter-width', '12rem', 'Controls the root meter width.'],
  ['--meter-color', 'var(--color-foreground)', 'Controls the default meter text color.'],
  ['--meter-gap', '0.5rem', 'Controls spacing between meter slots.'],
  ['--meter-label-color', 'var(--meter-color)', 'Controls label text color.'],
  ['--meter-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--meter-label-font-weight', 'var(--weight-regular)', 'Controls label font weight.'],
  ['--meter-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--meter-value-color', 'var(--meter-color)', 'Controls value text color.'],
  ['--meter-value-font-size', 'var(--text-sm)', 'Controls value font size.'],
  ['--meter-value-font-weight', 'var(--weight-regular)', 'Controls value font weight.'],
  ['--meter-value-line-height', 'var(--line-height-text-sm)', 'Controls value line height.'],
  ['--meter-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--meter-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--meter-track-height', '0.5rem', 'Controls track height.'],
  ['--meter-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--meter-indicator-bg', 'var(--color-primary)', 'Controls indicator background color.'],
  [
    '--meter-indicator-transition',
    'var(--transition-default)',
    'Controls indicator width transition.',
  ],
];

export function MeterExample({ value = 24, ...props }: MeterProps) {
  return (
    <Meter value={value} {...props}>
      <MeterLabel>Storage Used</MeterLabel>
      <MeterValue />
    </Meter>
  );
}

export function MinMaxRangeMeterExample() {
  return (
    <Meter value={420} min={200} max={800}>
      <MeterLabel>Requests per minute</MeterLabel>
      <MeterValue />
    </Meter>
  );
}

export function ControlledMeterExample() {
  const [value, setValue] = React.useState(45);

  return (
    <div className={styles.stack}>
      <Meter value={value}>
        <MeterLabel>Capacity</MeterLabel>
        <MeterValue />
      </Meter>
      <input
        className={styles.range}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => {
          setValue(Number(event.target.value));
        }}
      />
    </div>
  );
}

export function PercentFormatMeterExample() {
  return (
    <Meter value={0.64} min={0} max={1} format={{ style: 'percent', maximumFractionDigits: 0 }}>
      <MeterLabel>Usage</MeterLabel>
      <MeterValue>{(formattedValue) => `${formattedValue} used`}</MeterValue>
    </Meter>
  );
}

export function CustomStylesMeterExample() {
  return (
    <Meter
      value={72}
      className={styles.customMeter}
      classNames={{ track: styles.customTrack, indicator: styles.customIndicator }}
    >
      <MeterLabel>Monthly quota</MeterLabel>
      <MeterValue />
    </Meter>
  );
}

export function CompositionMeterExample() {
  return (
    <Meter value={58} withTrack={false} className={styles.composedMeter}>
      <MeterLabel>Team capacity</MeterLabel>
      <MeterValue>{(formattedValue) => `${formattedValue} available`}</MeterValue>
      <MeterTrack className={styles.composedTrack}>
        <MeterIndicator className={styles.composedIndicator} />
      </MeterTrack>
    </Meter>
  );
}