import type { ComponentProps } from 'react';
import { Meter, MeterIndicator, MeterLabel, MeterRoot, MeterTrack, MeterValue } from 'moduix';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './meter.module.css';

export const meterOverrideCssProperties: CssPropertyInput[] = [
  ['--meter-color', 'var(--color-foreground)', 'Controls the default meter text color.'],
  ['--meter-gap', '0.5rem', 'Controls spacing between meter slots.'],
  ['--meter-indicator-bg', 'var(--color-primary)', 'Controls indicator background color.'],
  ['--meter-indicator-radius', 'inherit', 'Controls indicator corner radius.'],
  [
    '--meter-indicator-transition',
    'var(--transition-default)',
    'Controls indicator width transition.',
  ],
  ['--meter-label-color', 'var(--meter-color)', 'Controls label text color.'],
  ['--meter-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--meter-label-font-weight', 'var(--weight-regular)', 'Controls label font weight.'],
  ['--meter-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--meter-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--meter-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--meter-track-border-width', 'var(--border-width-sm)', 'Controls track border width.'],
  ['--meter-track-height', '0.5rem', 'Controls track height.'],
  ['--meter-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--meter-value-color', 'var(--meter-color)', 'Controls value text color.'],
  ['--meter-value-font-size', 'var(--text-sm)', 'Controls value font size.'],
  ['--meter-value-font-weight', 'var(--weight-regular)', 'Controls value font weight.'],
  ['--meter-value-line-height', 'var(--line-height-text-sm)', 'Controls value line height.'],
  ['--meter-width', '12rem', 'Controls the root meter width.'],
];
export const meterPlaygroundCssProperties: CssPropertyInput[] = [
  ['--meter-color', 'var(--color-foreground)', 'Controls default text color.'],
  ['--meter-indicator-bg', 'var(--color-primary)', 'Controls indicator color.'],
  ['--meter-indicator-radius', 'inherit', 'Controls indicator radius.'],
  ['--meter-track-bg', 'var(--color-muted)', 'Controls track background.'],
  ['--meter-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--meter-track-border-width', 'var(--border-width-sm)', 'Controls track border width.'],
  ['--meter-track-height', '0.5rem', 'Controls track height.'],
  ['--meter-track-radius', 'var(--radius-full)', 'Controls track radius.'],
];
const meterCssProperties = meterOverrideCssProperties.map(normalizeCssProperty);
const meterPlaygroundProperties = meterPlaygroundCssProperties.map(normalizeCssProperty);

export function MeterCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={meterCssProperties} />;
}

export function MeterCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={meterPlaygroundProperties}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function MeterExample(props: ComponentProps<typeof Meter>) {
  const { value = 24, ...restProps } = props;

  return (
    <Meter value={value} {...restProps}>
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
  const [value, setValue] = useState(45);

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

export function LocaleAndFormatMeterExample() {
  return (
    <Meter
      value={0.64}
      min={0}
      max={1}
      locale="de-DE"
      format={{ style: 'percent', maximumFractionDigits: 0 }}
    >
      <MeterLabel>Storage usage</MeterLabel>
      <MeterValue>{(formattedValue) => `${formattedValue} belegt`}</MeterValue>
    </Meter>
  );
}

export function AriaValueTextMeterExample() {
  return (
    <Meter value={3} min={0} max={5} aria-valuetext="3 of 5 service checks are healthy">
      <MeterLabel>Service health</MeterLabel>
      <MeterValue>{() => '3 of 5 healthy'}</MeterValue>
    </Meter>
  );
}

export function CustomValueTextMeterExample() {
  return (
    <Meter
      value={68}
      getAriaValueText={(formattedValue, value) =>
        `${formattedValue} percent of storage used (${value} of 100)`
      }
    >
      <MeterLabel>Storage usage</MeterLabel>
      <MeterValue>{(formattedValue) => `${formattedValue}% used`}</MeterValue>
    </Meter>
  );
}

export function CustomStylesMeterExample() {
  return (
    <Meter value={72} className={styles.customMeter}>
      <MeterLabel>Monthly quota</MeterLabel>
      <MeterValue />
    </Meter>
  );
}

export function CompositionMeterExample() {
  return (
    <MeterRoot value={58} className={styles.composedMeter}>
      <MeterLabel>Team capacity</MeterLabel>
      <MeterValue>{(formattedValue) => `${formattedValue} available`}</MeterValue>
      <MeterTrack className={styles.composedTrack}>
        <MeterIndicator className={styles.composedIndicator} />
      </MeterTrack>
    </MeterRoot>
  );
}