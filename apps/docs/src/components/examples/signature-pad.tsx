import type { ComponentProps } from 'react';
import {
  Button,
  Field,
  RotateCcwIcon,
  SignaturePad,
  useSignaturePad,
  useSignaturePadContext,
} from '@moduix/react';
import { useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './signature-pad.module.css';

const initialSignaturePaths = [
  'M6.757,45.806C11.684,39.875,17.669,32.53,24.079,29.566C26.284,28.546,27.452,29.271,27.521,31.667C27.636,35.667,22.571,44.044,25.147,44.955C29.026,46.326,39.597,31.439,42.437,34.176C44.579,36.24,37.018,46.47,40.286,47.783C45.649,49.936,60.544,38.473,67.547,36.797C72.925,35.51,72.235,43.583,76.9,43.937C82.556,44.366,91.341,36.575,96.806,34.921C101.242,33.579,100.14,40.045,104.271,40.93C110.069,42.171,119.64,35.12,125.14,33.842C128.063,33.163,128.868,34.596,129.043,37.296',
];

export const signaturePadExampleCss = `
  .signature-pad-stack {
    display: grid;
    gap: var(--spacing-3);
    justify-items: center;
  }

  .signature-pad-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    justify-content: center;
  }

  .signature-pad-field {
    align-items: center;
    width: auto;
  }

  .signature-pad-status {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

export const signaturePadPreviewCss = `
  .signature-pad-preview {
    display: block;
    width: 17.5rem;
    max-width: 100%;
    height: auto;
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-background);
  }

  .signature-pad-preview-placeholder {
    display: grid;
    width: 17.5rem;
    max-width: 100%;
    min-height: 6rem;
    place-items: center;
    border: var(--border-width-sm) dashed var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

export const signaturePadBasicData = `const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};`;

export const signaturePadPreviewData = `const imageType = 'image/png';`;

export const signaturePadControlledData = `const initialSignaturePaths = [
  'M6.757,45.806C11.684,39.875,17.669,32.53,24.079,29.566C26.284,28.546,27.452,29.271,27.521,31.667C27.636,35.667,22.571,44.044,25.147,44.955C29.026,46.326,39.597,31.439,42.437,34.176C44.579,36.24,37.018,46.47,40.286,47.783C45.649,49.936,60.544,38.473,67.547,36.797C72.925,35.51,72.235,43.583,76.9,43.937C82.556,44.366,91.341,36.575,96.806,34.921C101.242,33.579,100.14,40.045,104.271,40.93C110.069,42.171,119.64,35.12,125.14,33.842C128.063,33.163,128.868,34.596,129.043,37.296',
];`;

export const signaturePadDrawingData = `const drawing = {
  fill: '#2563eb',
  size: 4,
  simulatePressure: false,
};`;

export const signaturePadFieldData = `const signatureName = 'signature';`;

export const signaturePadCssProperties: CssPropertyInput[] = [
  ['--signature-pad-width', '17.5rem', 'Controls the root width.'],
  ['--signature-pad-max-width', '100%', 'Controls the root max width.'],
  ['--signature-pad-height', '10rem', 'Controls the drawing area height.'],
  ['--signature-pad-bg', 'var(--color-background)', 'Controls the drawing area background.'],
  [
    '--signature-pad-border-color',
    'var(--color-border)',
    'Controls the drawing area border color.',
  ],
  [
    '--signature-pad-border-width',
    'var(--border-width-sm)',
    'Controls the drawing area border width.',
  ],
  ['--signature-pad-color', 'var(--color-foreground)', 'Controls inherited text color.'],
  ['--signature-pad-control-width', '100%', 'Controls the drawing control width.'],
  [
    '--signature-pad-control-height',
    'var(--signature-pad-height)',
    'Controls the drawing control height.',
  ],
  ['--signature-pad-control-min-width', '0', 'Controls the drawing control minimum width.'],
  ['--signature-pad-control-min-height', '10rem', 'Controls the drawing control minimum height.'],
  ['--signature-pad-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  [
    '--signature-pad-focus-border-color',
    'var(--color-ring)',
    'Controls the focused drawing area border color.',
  ],
  [
    '--signature-pad-focus-ring-color',
    'var(--color-ring)',
    'Controls the focused drawing area ring color.',
  ],
  [
    '--signature-pad-focus-ring-width',
    'var(--border-width-md)',
    'Controls the focused drawing area ring width.',
  ],
  ['--signature-pad-gap', 'var(--spacing-2)', 'Controls spacing between root parts.'],
  [
    '--signature-pad-guide-border-width',
    'var(--border-width-sm)',
    'Controls guide line thickness.',
  ],
  ['--signature-pad-guide-bottom', 'var(--spacing-8)', 'Controls guide line bottom offset.'],
  ['--signature-pad-guide-color', 'var(--color-border)', 'Controls the guide line color.'],
  ['--signature-pad-guide-inset-x', 'var(--spacing-6)', 'Controls guide line horizontal inset.'],
  ['--signature-pad-label-color', 'var(--color-foreground)', 'Controls label color.'],
  ['--signature-pad-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--signature-pad-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  [
    '--signature-pad-label-line-height',
    'var(--line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--signature-pad-radius', 'var(--radius-md)', 'Controls the drawing area radius.'],
  ['--signature-pad-shadow', 'var(--shadow-xs)', 'Controls the drawing area shadow.'],
  ['--signature-pad-stroke-color', 'var(--color-foreground)', 'Controls default path fill.'],
  ['--signature-pad-transition', 'var(--transition-default)', 'Controls state transitions.'],
  ['--signature-pad-clear-trigger-bg', 'transparent', 'Controls clear trigger background.'],
  [
    '--signature-pad-clear-trigger-bg-hover',
    'var(--color-accent)',
    'Controls clear trigger hover background.',
  ],
  [
    '--signature-pad-clear-trigger-border-color',
    'transparent',
    'Controls clear trigger border color.',
  ],
  ['--signature-pad-clear-trigger-border-width', '0', 'Controls clear trigger border width.'],
  [
    '--signature-pad-clear-trigger-color',
    'var(--color-muted-foreground)',
    'Controls clear trigger icon color.',
  ],
  [
    '--signature-pad-clear-trigger-color-hover',
    'var(--color-foreground)',
    'Controls clear trigger hover color.',
  ],
  [
    '--signature-pad-clear-trigger-focus-ring-color',
    'var(--color-ring)',
    'Controls clear trigger focus ring color.',
  ],
  [
    '--signature-pad-clear-trigger-focus-ring-offset',
    'var(--spacing-1)',
    'Controls clear trigger focus ring offset.',
  ],
  [
    '--signature-pad-clear-trigger-focus-ring-width',
    'var(--border-width-md)',
    'Controls clear trigger focus ring width.',
  ],
  ['--signature-pad-clear-trigger-icon-size', '1rem', 'Controls clear trigger icon size.'],
  [
    '--signature-pad-clear-trigger-offset',
    'var(--spacing-2)',
    'Controls clear trigger top and right offset.',
  ],
  ['--signature-pad-clear-trigger-radius', 'var(--radius-sm)', 'Controls clear trigger radius.'],
  ['--signature-pad-clear-trigger-size', 'var(--size-md)', 'Controls clear trigger square size.'],
];

const signaturePadCssPropertiesReference = signaturePadCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function SignaturePadCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={signaturePadCssPropertiesReference} />;
}

function SignaturePadParts(props: ComponentProps<typeof SignaturePad.Root>) {
  return (
    <SignaturePad
      translations={{
        control: 'Signature drawing area',
        clearTrigger: 'Clear signature',
      }}
      {...props}
    >
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}

export function SignaturePadExample() {
  return <SignaturePadParts />;
}

export function ImagePreviewSignaturePadExample() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className={styles.stack}>
      <SignaturePadParts
        onDrawEnd={(details) => {
          void details.getDataUrl('image/png').then(setImageUrl);
        }}
      />
      {imageUrl ? (
        <img src={imageUrl} alt="Signature preview" className={styles.preview} />
      ) : (
        <div className={styles.previewPlaceholder}>Preview appears after signing</div>
      )}
    </div>
  );
}

export function ControlledSignaturePadExample() {
  const [paths, setPaths] = useState(initialSignaturePaths);

  return (
    <div className={styles.stack}>
      <SignaturePadParts paths={paths} onDraw={(details) => setPaths(details.paths)} />
      <div className={styles.actions}>
        <Button size="sm" variant="outline" onClick={() => setPaths(initialSignaturePaths)}>
          Restore
        </Button>
        <Button size="sm" variant="outline" onClick={() => setPaths([])}>
          Clear
        </Button>
      </div>
      <output className={styles.status}>Paths: {paths.length}</output>
    </div>
  );
}

export function DrawingSignaturePadExample() {
  return <SignaturePadParts drawing={{ fill: '#2563eb', size: 4, simulatePressure: false }} />;
}

function SignaturePadHiddenValue() {
  const signaturePad = useSignaturePadContext();

  return <SignaturePad.HiddenInput value={signaturePad.paths.join(' ')} />;
}

export function FieldSignaturePadExample() {
  return (
    <Field className={styles.field} invalid required>
      <SignaturePad
        name="signature"
        translations={{
          control: 'Signature drawing area',
          clearTrigger: 'Clear signature',
        }}
      >
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
        <SignaturePadHiddenValue />
      </SignaturePad>
      <Field.HelperText>Use pointer or touch input to add a signature.</Field.HelperText>
      <Field.ErrorText>Signature is required.</Field.ErrorText>
    </Field>
  );
}

export function RootProviderSignaturePadExample() {
  const signaturePad = useSignaturePad({
    translations: {
      control: 'Signature drawing area',
      clearTrigger: 'Clear signature',
    },
  });

  return (
    <div className={styles.stack}>
      <SignaturePad.RootProvider value={signaturePad}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad.RootProvider>
      <output className={styles.status}>Paths: {signaturePad.paths.length}</output>
    </div>
  );
}

export function AdvancedCustomizationSignaturePadExample() {
  return (
    <SignaturePad>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger>
          <RotateCcwIcon aria-hidden="true" />
        </SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
    </SignaturePad>
  );
}