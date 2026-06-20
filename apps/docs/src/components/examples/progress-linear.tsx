import { ProgressLinear, useProgressLinear } from 'moduix';
import { useState, type ComponentProps, type CSSProperties } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const progressLinearExampleCss = `
  .progress-linear-stack {
    display: grid;
    gap: var(--spacing-4);
  }

  .progress-linear-range-input {
    --progress-demo-range-percent: 0%;
    --progress-demo-range-thumb-bg: var(--color-background);
    --progress-demo-range-thumb-border: var(--color-foreground);
    --progress-demo-range-track: var(--color-muted);

    appearance: none;
    width: 12rem;
    height: 0.375rem;
    border-radius: var(--radius-full);
    accent-color: var(--color-foreground);
    background: linear-gradient(
      90deg,
      var(--color-foreground) 0%,
      var(--color-foreground) var(--progress-demo-range-percent, 0%),
      var(--progress-demo-range-track) var(--progress-demo-range-percent, 0%),
      var(--progress-demo-range-track) 100%
    );
    cursor: pointer;
  }

  .progress-linear-range-input::-webkit-slider-runnable-track {
    height: 0.375rem;
    border-radius: var(--radius-full);
    background: transparent;
  }

  .progress-linear-range-input::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    margin-top: calc((0.375rem - 1rem) / 2);
    border: var(--border-width-sm) solid var(--progress-demo-range-thumb-border);
    border-radius: var(--radius-full);
    background: var(--progress-demo-range-thumb-bg);
    box-shadow: var(--shadow-sm);
  }

  .progress-linear-range-input::-moz-range-track {
    height: 0.375rem;
    border: 0;
    border-radius: var(--radius-full);
    background: var(--progress-demo-range-track);
  }

  .progress-linear-range-input::-moz-range-progress {
    height: 0.375rem;
    border-radius: var(--radius-full);
    background: var(--color-foreground);
  }

  .progress-linear-range-input::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    border: var(--border-width-sm) solid var(--progress-demo-range-thumb-border);
    border-radius: var(--radius-full);
    background: var(--progress-demo-range-thumb-bg);
    box-shadow: var(--shadow-sm);
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

export const progressLinearData = `const progressLabels = {
  export: 'Export data',
  upload: 'Upload status',
  import: 'Import data',
  requests: 'Requests per minute',
  report: 'Preparing report',
  migration: 'Migration',
  quota: 'Monthly quota',
};`;

export const progressLinearCssProperties: CssPropertyInput[] = [
  ['--progress-linear-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--progress-linear-gap', '0.5rem', 'Controls spacing between label/value and track.'],
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
  ['--progress-linear-range-indeterminate-width', '35%', 'Controls indeterminate range width.'],
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

function getProgressDemoRangeStyle(value: number | null, min = 0, max = 100): CSSProperties {
  const safeValue = value ?? min;
  const percent = ((safeValue - min) / (max - min)) * 100;

  return {
    '--progress-demo-range-percent': `${Math.max(0, Math.min(100, percent))}%`,
  } as CSSProperties;
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
      <input
        className="progress-linear-range-input"
        type="range"
        min={0}
        max={100}
        value={value ?? 0}
        style={getProgressDemoRangeStyle(value)}
        onChange={(event) => {
          setValue(Number(event.target.value));
        }}
      />
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