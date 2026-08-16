import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const pinInputOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-pin-input-bg', 'var(--moduix-color-background)', 'Controls input background.'],
  [
    '--moduix-pin-input-border-color',
    'var(--moduix-color-border)',
    'Controls default input border color.',
  ],
  [
    '--moduix-pin-input-border-color-complete',
    'var(--moduix-pin-input-border-color, var(--moduix-color-border))',
    'Controls complete input border color.',
  ],
  [
    '--moduix-pin-input-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  [
    '--moduix-pin-input-border-width',
    'var(--moduix-border-width-sm)',
    'Controls input border width.',
  ],
  ['--moduix-pin-input-color', 'var(--moduix-color-foreground)', 'Controls input text color.'],
  [
    '--moduix-pin-input-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  ['--moduix-pin-input-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-pin-input-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-pin-input-focus-ring-width',
    'var(--moduix-pin-input-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--moduix-pin-input-font-size', 'var(--moduix-text-lg)', 'Controls input font size.'],
  ['--moduix-pin-input-font-weight', 'var(--moduix-weight-medium)', 'Controls input font weight.'],
  ['--moduix-pin-input-gap', 'var(--moduix-spacing-2)', 'Controls spacing between inputs.'],
  [
    '--moduix-pin-input-input-height',
    'var(--moduix-pin-input-input-size, var(--moduix-size-md))',
    'Controls input slot height.',
  ],
  ['--moduix-pin-input-input-padding-x', '0', 'Controls horizontal input padding.'],
  ['--moduix-pin-input-input-padding-y', '0', 'Controls vertical input padding.'],
  ['--moduix-pin-input-input-size', 'var(--moduix-size-md)', 'Controls square input slot size.'],
  [
    '--moduix-pin-input-input-width',
    'var(--moduix-pin-input-input-size, var(--moduix-size-md))',
    'Controls input slot width.',
  ],
  ['--moduix-pin-input-label-color', 'var(--moduix-color-foreground)', 'Controls label color.'],
  ['--moduix-pin-input-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-pin-input-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-pin-input-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-pin-input-line-height',
    'var(--moduix-line-height-text-lg)',
    'Controls input line height.',
  ],
  ['--moduix-pin-input-max-width', 'none', 'Controls root max width.'],
  [
    '--moduix-pin-input-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls placeholder color.',
  ],
  ['--moduix-pin-input-radius', 'var(--moduix-radius-md)', 'Controls input corner radius.'],
  [
    '--moduix-pin-input-root-gap',
    'var(--moduix-spacing-2)',
    'Controls root spacing between label and control.',
  ],
  [
    '--moduix-pin-input-separator-color',
    'var(--moduix-color-muted-foreground)',
    'Controls separator color.',
  ],
  [
    '--moduix-pin-input-separator-height',
    'var(--moduix-pin-input-separator-size, var(--moduix-spacing-4))',
    'Controls separator height.',
  ],
  [
    '--moduix-pin-input-separator-size',
    'var(--moduix-spacing-4)',
    'Controls separator width and height.',
  ],
  [
    '--moduix-pin-input-separator-width',
    'var(--moduix-pin-input-separator-size, var(--moduix-spacing-4))',
    'Controls separator width.',
  ],
  [
    '--moduix-pin-input-transition',
    'var(--moduix-transition-default)',
    'Controls input state transitions.',
  ],
  ['--moduix-pin-input-width', 'auto', 'Controls root width.'],
];

export function PinInputCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={pinInputOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}