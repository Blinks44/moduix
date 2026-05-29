import type { ComponentProps } from 'react';
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from 'moduix';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './progress.module.css';

export const progressOverrideCssProperties: CssPropertyInput[] = [
  ['--progress-color', 'var(--color-foreground)', 'Controls the default progress text color.'],
  ['--progress-gap', '0.5rem', 'Controls spacing between progress slots.'],
  ['--progress-indicator-bg', 'var(--color-primary)', 'Controls indicator background color.'],
  ['--progress-indicator-radius', 'inherit', 'Controls indicator corner radius.'],
  [
    '--progress-indicator-indeterminate-animation',
    'progress-indeterminate 1.5s ease-in-out infinite',
    'Controls indicator animation in indeterminate state.',
  ],
  [
    '--progress-indicator-indeterminate-width',
    '35%',
    'Controls indicator width in indeterminate state.',
  ],
  [
    '--progress-indicator-transition',
    'var(--transition-default)',
    'Controls indicator width transition.',
  ],
  ['--progress-label-color', 'var(--progress-color)', 'Controls label text color.'],
  ['--progress-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--progress-label-font-weight', 'var(--weight-regular)', 'Controls label font weight.'],
  ['--progress-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--progress-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--progress-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--progress-track-border-width', 'var(--border-width-sm)', 'Controls track border width.'],
  ['--progress-track-height', '0.5rem', 'Controls track height.'],
  ['--progress-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--progress-value-color', 'var(--progress-color)', 'Controls value text color.'],
  ['--progress-value-font-size', 'var(--text-sm)', 'Controls value font size.'],
  ['--progress-value-font-weight', 'var(--weight-regular)', 'Controls value font weight.'],
  ['--progress-value-line-height', 'var(--line-height-text-sm)', 'Controls value line height.'],
  ['--progress-width', '12rem', 'Controls the root progress width.'],
];
export const progressPlaygroundCssProperties: CssPropertyInput[] = [
  ['--progress-color', 'var(--color-foreground)', 'Controls default text color.'],
  ['--progress-indicator-bg', 'var(--color-primary)', 'Controls indicator color.'],
  ['--progress-indicator-radius', 'inherit', 'Controls indicator radius.'],
  ['--progress-track-bg', 'var(--color-muted)', 'Controls track background.'],
  ['--progress-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--progress-track-border-width', 'var(--border-width-sm)', 'Controls track border width.'],
  ['--progress-track-height', '0.5rem', 'Controls track height.'],
  ['--progress-track-radius', 'var(--radius-full)', 'Controls track radius.'],
];
const progressCssProperties = progressOverrideCssProperties.map(normalizeCssProperty);
const progressPlaygroundProperties = progressPlaygroundCssProperties.map(normalizeCssProperty);

export function ProgressCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={progressCssProperties} />;
}

export function ProgressCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={progressPlaygroundProperties}
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

export function ProgressExample(props: ComponentProps<typeof Progress>) {
  const { value = 24, ...restProps } = props;

  return (
    <Progress value={value} {...restProps}>
      <ProgressLabel>Export data</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}

export function ControlledProgressExample() {
  const [value, setValue] = useState(45);

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
    <Progress
      value={0.64}
      min={0}
      max={1}
      locale="de-DE"
      format={{ style: 'percent', maximumFractionDigits: 0 }}
    >
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
    <Progress value={3} min={0} max={5} aria-valuetext="3 of 5 onboarding steps completed">
      <ProgressLabel>Onboarding</ProgressLabel>
      <ProgressValue>{() => '3 of 5 complete'}</ProgressValue>
    </Progress>
  );
}

export function CustomStylesProgressExample() {
  return (
    <Progress value={72} className={styles.customProgress}>
      <ProgressLabel>Monthly quota</ProgressLabel>
      <ProgressValue />
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

export function CustomCompositionProgressExample() {
  return (
    <ProgressRoot value={58} className={styles.composedProgress}>
      <ProgressLabel>Team rollout</ProgressLabel>
      <ProgressValue>{(formattedValue) => `${formattedValue} shipped`}</ProgressValue>
      <ProgressTrack className={styles.composedTrack}>
        <ProgressIndicator className={styles.composedIndicator} />
      </ProgressTrack>
    </ProgressRoot>
  );
}

export function DeepCompositionProgressExample() {
  return (
    <ProgressRoot value={72} className={styles.customProgress}>
      <ProgressLabel>Monthly export</ProgressLabel>
      <ProgressValue />
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  );
}