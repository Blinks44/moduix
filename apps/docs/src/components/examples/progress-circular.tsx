import { ProgressCircular, Slider } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const progressCircularCircleExampleCss = `
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

export const progressCircularBasicExampleCss = progressCircularCircleExampleCss;

export const progressCircularControlledExampleCss = `
  .progress-circular-stack {
    display: grid;
    justify-items: center;
    gap: var(--spacing-4);
  }

  .progress-circular-slider {
    width: 12rem;
  }

  ${progressCircularCircleExampleCss}
`;

export const progressCircularStateViewsExampleCss = `
  ${progressCircularCircleExampleCss}

  .progress-circular-state {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

const progressCircularStateMessages = {
  indeterminate: 'Waiting for source data',
  loading: 'Transfer in progress',
  complete: 'Export complete',
};

export const progressCircularBasicData = `const defaultValue = 42;`;

export const progressCircularControlledData = `const initialValue = 42;`;

export const progressCircularInitialValueData = `const defaultValue = 70;`;

export const progressCircularMinMaxData = `
const defaultValue = 420;
const min = 200;
const max = 800;
`;

export const progressCircularIndeterminateData = `const defaultValue = null;`;

export const progressCircularRootProviderData = `const defaultValue = 58;`;

export const progressCircularStateViewsData = `const defaultValue = null;

const progressCircularStateMessages = {
  indeterminate: 'Waiting for source data',
  loading: 'Transfer in progress',
  complete: 'Export complete',
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
  ['--progress-circular-thickness', '0.4rem', 'Controls SVG stroke thickness.'],
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
      <ProgressCircular.Ring />
      <ProgressCircular.ValueText />
    </div>
  );
}

function ProgressCircularAdvancedParts() {
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
          <Slider.Thumb index={0} aria-label="Progress value"></Slider.Thumb>
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
  const progress = ProgressCircular.useProgress({ defaultValue: 58 });

  return (
    <ProgressCircular.RootProvider value={progress}>
      <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
      <ProgressCircularAdvancedParts />
    </ProgressCircular.RootProvider>
  );
}

export function StateViewsProgressCircularExample() {
  return (
    <ProgressCircular defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <ProgressCircularAdvancedParts />
      <ProgressCircular.View className="progress-circular-state" state="indeterminate">
        {progressCircularStateMessages.indeterminate}
      </ProgressCircular.View>
      <ProgressCircular.View className="progress-circular-state" state="loading">
        {progressCircularStateMessages.loading}
      </ProgressCircular.View>
      <ProgressCircular.View className="progress-circular-state" state="complete">
        {progressCircularStateMessages.complete}
      </ProgressCircular.View>
    </ProgressCircular>
  );
}