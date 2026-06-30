import { ProgressLinear, Slider, useProgressLinear } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const progressLinearExampleCss = `
  .progress-linear-stack {
    display: grid;
    gap: var(--spacing-4);
  }

  .progress-linear-slider {
    width: 12rem;
  }
`;

export const progressLinearCustomStylingCss = `
  .progress-linear-custom {
    --progress-linear-width: 16rem;
    --progress-linear-track-height: 0.75rem;
    --progress-linear-track-bg: var(--color-accent);
  }

  .progress-linear-custom [data-slot="progress-linear-track"] {
    box-shadow: inset 0 0 0 var(--border-width-md)
      color-mix(in oklab, var(--color-primary), transparent 75%);
  }

  .progress-linear-custom [data-slot="progress-linear-range"] {
    background: linear-gradient(90deg, var(--color-primary), var(--color-chart-2));
  }
`;

export const progressLinearVerticalCss = `
  .progress-linear-vertical {
    --progress-linear-height: 10rem;
  }
`;

export const progressLinearBasicData = `const defaultValue = 24;`;

export const progressLinearControlledData = `const initialValue = 45;`;

export const progressLinearInitialValueData = `const defaultValue = 70;`;

export const progressLinearMinMaxData = `
const defaultValue = 420;
const min = 200;
const max = 800;
`;

export const progressLinearIndeterminateData = `const defaultValue = null;`;

export const progressLinearVerticalData = `
const defaultValue = 42;
const orientation = 'vertical';
`;

export const progressLinearValueTextData = `const fallbackText = 'Loading...';`;

export const progressLinearRootProviderData = `const defaultValue = 58;`;

export const progressLinearContextData = `const defaultValue = 64;`;

export const progressLinearStateViewsData = `const defaultValue = null;`;

export const progressLinearCustomStylingData = `const defaultValue = 72;`;

export const progressLinearCssProperties: CssPropertyInput[] = [
  ['--progress-linear-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--progress-linear-gap', '0.5rem', 'Controls spacing between label/value and track.'],
  ['--progress-linear-height', '12rem', 'Controls vertical root height.'],
  ['--progress-linear-label-color', 'currentColor', 'Controls label text color.'],
  ['--progress-linear-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--progress-linear-label-font-weight', 'var(--weight-regular)', 'Controls label weight.'],
  [
    '--progress-linear-label-line-height',
    'var(--line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--progress-linear-range-bg', 'var(--color-primary)', 'Controls filled range color.'],
  [
    '--progress-linear-range-indeterminate-animation',
    'progress-linear-indeterminate 1.5s ease-in-out infinite',
    'Controls indeterminate range animation.',
  ],
  [
    '--progress-linear-range-indeterminate-vertical-animation',
    'progress-linear-indeterminate-vertical 1.5s ease-in-out infinite',
    'Controls vertical indeterminate range animation.',
  ],
  ['--progress-linear-range-indeterminate-width', '35%', 'Controls indeterminate range length.'],
  ['--progress-linear-range-radius', 'inherit', 'Controls filled range radius.'],
  [
    '--progress-linear-range-transition',
    'var(--transition-default)',
    'Controls range size transition.',
  ],
  ['--progress-linear-track-bg', 'var(--color-muted)', 'Controls track background.'],
  [
    '--progress-linear-track-border-color',
    'var(--color-border)',
    'Controls track inset border color.',
  ],
  [
    '--progress-linear-track-border-width',
    'var(--border-width-sm)',
    'Controls track inset border width.',
  ],
  ['--progress-linear-track-height', '0.5rem', 'Controls track height.'],
  ['--progress-linear-track-radius', 'var(--radius-full)', 'Controls track radius.'],
  ['--progress-linear-track-width', '0.5rem', 'Controls vertical track width.'],
  ['--progress-linear-value-text-color', 'currentColor', 'Controls value text color.'],
  ['--progress-linear-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  [
    '--progress-linear-value-text-font-weight',
    'var(--weight-regular)',
    'Controls value text weight.',
  ],
  [
    '--progress-linear-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--progress-linear-vertical-width', 'max-content', 'Controls vertical root width.'],
  ['--progress-linear-width', '12rem', 'Controls default root width.'],
];

const progressLinearCssPropertiesReference = progressLinearCssProperties.map(normalizeCssProperty);

export function ProgressLinearCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={progressLinearCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function ProgressLinearParts() {
  return (
    <>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </>
  );
}

export function ProgressLinearExample(props: ComponentProps<typeof ProgressLinear.Root>) {
  return (
    <ProgressLinear defaultValue={24} {...props}>
      <ProgressLinear.Label>Export data</ProgressLinear.Label>
      <ProgressLinearParts />
    </ProgressLinear>
  );
}

export function ControlledProgressLinearExample() {
  const [value, setValue] = useState<number | null>(45);

  return (
    <div className="progress-linear-stack">
      <ProgressLinear value={value} onValueChange={(details) => setValue(details.value)}>
        <ProgressLinear.Label>Upload status</ProgressLinear.Label>
        <ProgressLinearParts />
      </ProgressLinear>
      <Slider
        className="progress-linear-slider"
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

export function InitialValueProgressLinearExample() {
  return (
    <ProgressLinear defaultValue={70}>
      <ProgressLinear.Label>Import data</ProgressLinear.Label>
      <ProgressLinearParts />
    </ProgressLinear>
  );
}

export function MinMaxProgressLinearExample() {
  return (
    <ProgressLinear defaultValue={420} min={200} max={800}>
      <ProgressLinear.Label>Requests per minute</ProgressLinear.Label>
      <ProgressLinearParts />
    </ProgressLinear>
  );
}

export function IndeterminateProgressLinearExample() {
  return (
    <ProgressLinear defaultValue={null}>
      <ProgressLinear.Label>Preparing report</ProgressLinear.Label>
      <ProgressLinearParts />
    </ProgressLinear>
  );
}

export function VerticalProgressLinearExample() {
  return (
    <ProgressLinear defaultValue={42} orientation="vertical" className="progress-linear-vertical">
      <ProgressLinear.Label>Indexing files</ProgressLinear.Label>
      <ProgressLinearParts />
    </ProgressLinear>
  );
}

export function ValueTextProgressLinearExample() {
  return (
    <ProgressLinear
      translations={{
        value({ value, max }) {
          if (value === null) return 'Loading...';
          return `${value} of ${max} items loaded`;
        },
      }}
    >
      <ProgressLinear.Label>Migration</ProgressLinear.Label>
      <ProgressLinearParts />
    </ProgressLinear>
  );
}

export function RootProviderProgressLinearExample() {
  const progress = useProgressLinear({ defaultValue: 58 });

  return (
    <ProgressLinear.RootProvider value={progress}>
      <ProgressLinear.Label>Team rollout</ProgressLinear.Label>
      <ProgressLinearParts />
    </ProgressLinear.RootProvider>
  );
}

export function ContextProgressLinearExample() {
  return (
    <ProgressLinear defaultValue={64}>
      <ProgressLinear.Label>Migration</ProgressLinear.Label>
      <ProgressLinearParts />
      <ProgressLinear.Context>
        {(progress) => (
          <span className="progress-linear-context">Current percent: {progress.percent}%</span>
        )}
      </ProgressLinear.Context>
    </ProgressLinear>
  );
}

export function CustomStylingProgressLinearExample() {
  return (
    <ProgressLinear defaultValue={72} className="progress-linear-custom">
      <ProgressLinear.Label>Monthly quota</ProgressLinear.Label>
      <ProgressLinearParts />
    </ProgressLinear>
  );
}