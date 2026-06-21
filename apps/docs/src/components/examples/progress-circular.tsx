import { ProgressCircular, Slider, useProgressCircular } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const progressCircularExampleCss = `
  .progress-circular-stack {
    display: grid;
    justify-items: center;
    gap: var(--spacing-4);
  }

  .progress-circular-slider {
    width: 12rem;
  }

  .progress-circular-circle-container {
    position: relative;
    display: inline-grid;
    place-items: center;
  }

  .progress-circular-circle-container [data-slot="progress-circular-circle"] {
    grid-area: 1 / 1;
  }

  .progress-circular-circle-container [data-slot="progress-circular-value-text"] {
    grid-area: 1 / 1;
  }
`;

export const progressCircularCustomStylingCss = `
  .progress-circular-custom {
    --progress-circular-size: 4rem;
    --progress-circular-thickness: 0.5rem;
    --progress-circular-track-bg: var(--color-accent);
    --progress-circular-range-bg: var(--color-chart-2);
  }

  .progress-circular-custom [data-slot="progress-circular-circle-track"] {
    stroke: color-mix(in oklab, var(--color-primary), transparent 75%);
  }

  .progress-circular-custom [data-slot="progress-circular-circle-range"] {
    filter: drop-shadow(0 0 0.375rem color-mix(in oklab, var(--color-chart-2), transparent 45%));
  }
`;

export const progressCircularData = `const progressLabels = {
  export: 'Export data',
  upload: 'Upload status',
  import: 'Import data',
  requests: 'Requests per minute',
  report: 'Preparing report',
  migration: 'Migration',
  quota: 'Monthly quota',
};`;

export const progressCircularCssProperties: CssPropertyInput[] = [
  ['--progress-circular-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--progress-circular-gap', '0.5rem', 'Controls spacing between label and circle.'],
  ['--progress-circular-label-color', 'currentColor', 'Controls label text color.'],
  ['--progress-circular-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--progress-circular-label-font-weight', 'var(--weight-regular)', 'Controls label weight.'],
  [
    '--progress-circular-label-line-height',
    'var(--line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--progress-circular-range-bg', 'var(--color-primary)', 'Controls circle range color.'],
  [
    '--progress-circular-range-indeterminate-animation',
    'progress-circular-indeterminate 1.4s linear infinite',
    'Controls indeterminate circle animation.',
  ],
  [
    '--progress-circular-range-indeterminate-dasharray',
    '1 200',
    'Controls indeterminate dash pattern.',
  ],
  ['--progress-circular-range-linecap', 'round', 'Controls range stroke linecap.'],
  [
    '--progress-circular-range-transition',
    'var(--transition-default)',
    'Controls circle range transition.',
  ],
  ['--progress-circular-root-width', 'max-content', 'Controls root width.'],
  ['--progress-circular-size', '3rem', 'Controls SVG circle size.'],
  ['--progress-circular-thickness', '0.375rem', 'Controls SVG stroke thickness.'],
  ['--progress-circular-track-bg', 'var(--color-muted)', 'Controls circle track color.'],
  ['--progress-circular-value-text-color', 'currentColor', 'Controls value text color.'],
  ['--progress-circular-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  [
    '--progress-circular-value-text-font-weight',
    'var(--weight-medium)',
    'Controls value text weight.',
  ],
  [
    '--progress-circular-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
];

const progressCircularCssPropertiesReference =
  progressCircularCssProperties.map(normalizeCssProperty);

export function ProgressCircularCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={progressCircularCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function ProgressCircularParts() {
  return (
    <div className="progress-circular-circle-container">
      <ProgressCircular.Circle>
        <ProgressCircular.CircleTrack />
        <ProgressCircular.CircleRange />
      </ProgressCircular.Circle>
      <ProgressCircular.ValueText />
    </div>
  );
}

export function ProgressCircularExample(props: ComponentProps<typeof ProgressCircular.Root>) {
  return (
    <ProgressCircular defaultValue={42} {...props}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <ProgressCircularParts />
    </ProgressCircular>
  );
}

export function ControlledProgressCircularExample() {
  const [value, setValue] = useState<number | null>(42);

  return (
    <div className="progress-circular-stack">
      <ProgressCircular value={value} onValueChange={(details) => setValue(details.value)}>
        <ProgressCircular.Label>Upload status</ProgressCircular.Label>
        <ProgressCircularParts />
      </ProgressCircular>
      <Slider
        className="progress-circular-slider"
        min={0}
        max={100}
        value={[value ?? 0]}
        onValueChange={(details) => {
          setValue(details.value[0] ?? 0);
        }}
      >
        <Slider.Label>Progress value</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Progress value">
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
    </div>
  );
}

export function InitialValueProgressCircularExample() {
  return (
    <ProgressCircular defaultValue={70}>
      <ProgressCircular.Label>Import data</ProgressCircular.Label>
      <ProgressCircularParts />
    </ProgressCircular>
  );
}

export function MinMaxProgressCircularExample() {
  return (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircular.Label>Requests per minute</ProgressCircular.Label>
      <ProgressCircularParts />
    </ProgressCircular>
  );
}

export function IndeterminateProgressCircularExample() {
  return (
    <ProgressCircular defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <ProgressCircularParts />
    </ProgressCircular>
  );
}

export function ValueTextProgressCircularExample() {
  return (
    <ProgressCircular
      translations={{
        value({ value, max }) {
          if (value === null) return 'Loading...';
          return `${value} of ${max}`;
        },
      }}
    >
      <ProgressCircular.Label>Migration</ProgressCircular.Label>
      <ProgressCircularParts />
    </ProgressCircular>
  );
}

export function RootProviderProgressCircularExample() {
  const progress = useProgressCircular({ defaultValue: 58 });

  return (
    <ProgressCircular.RootProvider value={progress}>
      <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
      <ProgressCircularParts />
    </ProgressCircular.RootProvider>
  );
}

export function ContextProgressCircularExample() {
  return (
    <ProgressCircular defaultValue={64}>
      <ProgressCircular.Label>Migration</ProgressCircular.Label>
      <ProgressCircularParts />
      <ProgressCircular.Context>
        {(progress) => (
          <span className="progress-circular-context">Current percent: {progress.percent}%</span>
        )}
      </ProgressCircular.Context>
    </ProgressCircular>
  );
}

export function CustomStylingProgressCircularExample() {
  return (
    <ProgressCircular defaultValue={72} className="progress-circular-custom">
      <ProgressCircular.Label>Monthly quota</ProgressCircular.Label>
      <ProgressCircularParts />
    </ProgressCircular>
  );
}