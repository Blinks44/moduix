import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const signaturePadExampleCss = `
  .signature-pad-stack {
    display: grid;
    gap: var(--moduix-spacing-3);
    justify-items: center;
  }

  .signature-pad-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--moduix-spacing-2);
    justify-content: center;
  }

  .signature-pad-field {
    align-items: center;
    width: auto;
  }

  .signature-pad-status {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }
`;

export const signaturePadPreviewCss = `
  .signature-pad-preview {
    display: block;
    width: 17.5rem;
    max-width: 100%;
    height: auto;
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    background-color: var(--moduix-color-background);
  }

  .signature-pad-preview-placeholder {
    display: grid;
    width: 17.5rem;
    max-width: 100%;
    min-height: 6rem;
    place-items: center;
    border: var(--moduix-border-width-sm) dashed var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }
`;

const signaturePadCssProperties: CssPropertyInput[] = [
  ['--moduix-signature-pad-width', '17.5rem', 'Controls the root width.'],
  ['--moduix-signature-pad-max-width', '100%', 'Controls the root max width.'],
  ['--moduix-signature-pad-height', '10rem', 'Controls the drawing area height.'],
  [
    '--moduix-signature-pad-bg',
    'var(--moduix-color-background)',
    'Controls the drawing area background.',
  ],
  [
    '--moduix-signature-pad-border-color',
    'var(--moduix-color-border)',
    'Controls the drawing area border color.',
  ],
  [
    '--moduix-signature-pad-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the drawing area border width.',
  ],
  [
    '--moduix-signature-pad-color',
    'var(--moduix-color-foreground)',
    'Controls inherited text color.',
  ],
  ['--moduix-signature-pad-control-width', '100%', 'Controls the drawing control width.'],
  [
    '--moduix-signature-pad-control-height',
    'var(--moduix-signature-pad-height, 10rem)',
    'Controls the drawing control height.',
  ],
  ['--moduix-signature-pad-control-min-width', '0', 'Controls the drawing control minimum width.'],
  [
    '--moduix-signature-pad-control-min-height',
    '10rem',
    'Controls the drawing control minimum height.',
  ],
  [
    '--moduix-signature-pad-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-signature-pad-focus-border-color',
    'var(--moduix-color-ring)',
    'Controls the focused drawing area border color.',
  ],
  [
    '--moduix-signature-pad-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls the focused drawing area ring color.',
  ],
  [
    '--moduix-signature-pad-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls the focused drawing area ring width.',
  ],
  ['--moduix-signature-pad-gap', 'var(--moduix-spacing-2)', 'Controls spacing between root parts.'],
  [
    '--moduix-signature-pad-guide-border-width',
    'var(--moduix-border-width-sm)',
    'Controls guide line thickness.',
  ],
  [
    '--moduix-signature-pad-guide-bottom',
    'var(--moduix-spacing-8)',
    'Controls guide line bottom offset.',
  ],
  [
    '--moduix-signature-pad-guide-color',
    'var(--moduix-color-border)',
    'Controls the guide line color.',
  ],
  [
    '--moduix-signature-pad-guide-inset-x',
    'var(--moduix-spacing-6)',
    'Controls guide line horizontal inset.',
  ],
  ['--moduix-signature-pad-label-color', 'var(--moduix-color-foreground)', 'Controls label color.'],
  ['--moduix-signature-pad-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-signature-pad-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-signature-pad-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-signature-pad-radius', 'var(--moduix-radius-md)', 'Controls the drawing area radius.'],
  ['--moduix-signature-pad-shadow', 'var(--moduix-shadow-sm)', 'Controls the drawing area shadow.'],
  [
    '--moduix-signature-pad-stroke-color',
    'var(--moduix-color-foreground)',
    'Controls default path fill.',
  ],
  [
    '--moduix-signature-pad-transition',
    'var(--moduix-transition-default)',
    'Controls state transitions.',
  ],
  ['--moduix-signature-pad-clear-trigger-bg', 'transparent', 'Controls clear trigger background.'],
  [
    '--moduix-signature-pad-clear-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls clear trigger hover background.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-border-color',
    'transparent',
    'Controls clear trigger border color.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-border-width',
    '0',
    'Controls clear trigger border width.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-color',
    'var(--moduix-color-muted-foreground)',
    'Controls clear trigger icon color.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-color-hover',
    'var(--moduix-color-foreground)',
    'Controls clear trigger hover color.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls clear trigger focus ring color.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-focus-ring-offset',
    'var(--moduix-spacing-1)',
    'Controls clear trigger focus ring offset.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls clear trigger focus ring width.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-icon-size',
    'var(--moduix-spacing-4)',
    'Controls clear trigger icon size.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-offset',
    'var(--moduix-spacing-2)',
    'Controls clear trigger top and right offset.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-radius',
    'var(--moduix-radius-sm)',
    'Controls clear trigger radius.',
  ],
  [
    '--moduix-signature-pad-clear-trigger-size',
    'var(--moduix-size-md)',
    'Controls clear trigger square size.',
  ],
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