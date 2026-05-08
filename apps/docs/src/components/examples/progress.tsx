import { Progress, ProgressLabel, ProgressValue, type ProgressProps } from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './progress.module.css';

export const progressCssProperties: CssPropertyInput[] = [
  ['--progress-width', '12rem', 'Controls the root progress width.'],
  ['--progress-color', 'var(--color-foreground)', 'Controls the default progress text color.'],
  ['--progress-gap', '0.5rem', 'Controls spacing between progress slots.'],
  ['--progress-label-color', 'var(--progress-color)', 'Controls label text color.'],
  ['--progress-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--progress-label-font-weight', 'var(--weight-regular)', 'Controls label font weight.'],
  ['--progress-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--progress-value-color', 'var(--progress-color)', 'Controls value text color.'],
  ['--progress-value-font-size', 'var(--text-sm)', 'Controls value font size.'],
  ['--progress-value-font-weight', 'var(--weight-regular)', 'Controls value font weight.'],
  ['--progress-value-line-height', 'var(--line-height-text-sm)', 'Controls value line height.'],
  ['--progress-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--progress-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--progress-track-height', '0.5rem', 'Controls track height.'],
  ['--progress-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--progress-indicator-bg', 'var(--color-primary)', 'Controls indicator background color.'],
  [
    '--progress-indicator-transition',
    'var(--transition-default)',
    'Controls indicator width transition.',
  ],
  [
    '--progress-indicator-indeterminate-width',
    '35%',
    'Controls indicator width in indeterminate state.',
  ],
  [
    '--progress-indicator-indeterminate-animation',
    'progress-indeterminate 1.5s ease-in-out infinite',
    'Controls indicator animation in indeterminate state.',
  ],
];

export function ProgressExample({ value = 24, ...props }: ProgressProps) {
  return (
    <Progress value={value} {...props}>
      <ProgressLabel>Export data</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}

export function ControlledProgressExample() {
  const [value, setValue] = React.useState(45);

  return (
    <div className={styles.stack}>
      <Progress value={value}>
        <ProgressLabel>Upload status</ProgressLabel>
        <ProgressValue />
      </Progress>
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

export function MinMaxRangeProgressExample() {
  return (
    <Progress value={420} min={200} max={800}>
      <ProgressLabel>Requests per minute</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}

export function LocaleAndFormatProgressExample() {
  return (
    <Progress value={0.64} min={0} max={1} locale="de-DE" format={{ style: 'percent' }}>
      <ProgressLabel>Storage usage</ProgressLabel>
      <ProgressValue>{(formattedValue) => `${formattedValue} belegt`}</ProgressValue>
    </Progress>
  );
}

export function IndeterminateProgressExample() {
  return (
    <Progress value={null}>
      <ProgressLabel>Preparing report</ProgressLabel>
      <ProgressValue>{() => 'In progress'}</ProgressValue>
    </Progress>
  );
}

export function AriaValueTextProgressExample() {
  return (
    <Progress value={3} min={0} max={5} aria-valuetext="Step 3 of 5 completed">
      <ProgressLabel>Onboarding</ProgressLabel>
      <ProgressValue>{() => 'Step 3 of 5'}</ProgressValue>
    </Progress>
  );
}

export function CustomValueTextProgressExample() {
  return (
    <Progress
      value={68}
      getAriaValueText={(formattedValue) => `${formattedValue} of task completed`}
    >
      <ProgressLabel>Migration</ProgressLabel>
      <ProgressValue>{(formattedValue) => `${formattedValue} done`}</ProgressValue>
    </Progress>
  );
}

export function CustomStylingProgressExample() {
  return (
    <Progress
      value={72}
      className={styles.customProgress}
      classNames={{ track: styles.customTrack, indicator: styles.customIndicator }}
    >
      <ProgressLabel>Monthly export</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}