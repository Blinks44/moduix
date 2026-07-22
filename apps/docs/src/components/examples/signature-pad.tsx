import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

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

const signaturePadCssProperties: CssPropertyInput[] = [
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
    'var(--signature-pad-height, 10rem)',
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
    'var(--focus-ring-width, var(--border-width-md))',
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
  ['--signature-pad-shadow', 'var(--shadow-sm)', 'Controls the drawing area shadow.'],
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
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls clear trigger focus ring width.',
  ],
  [
    '--signature-pad-clear-trigger-icon-size',
    'var(--spacing-4)',
    'Controls clear trigger icon size.',
  ],
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