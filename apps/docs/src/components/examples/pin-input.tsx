import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const pinInputOverrideCssProperties: CssPropertyInput[] = [
  ['--pin-input-bg', 'var(--color-background)', 'Controls input background.'],
  ['--pin-input-border-color', 'var(--color-border)', 'Controls default input border color.'],
  [
    '--pin-input-border-color-complete',
    'var(--pin-input-border-color, var(--color-border))',
    'Controls complete input border color.',
  ],
  [
    '--pin-input-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--pin-input-border-width', 'var(--border-width-sm)', 'Controls input border width.'],
  ['--pin-input-color', 'var(--color-foreground)', 'Controls input text color.'],
  ['--pin-input-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--pin-input-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--pin-input-focus-ring-offset',
    'var(--focus-ring-inset-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--pin-input-focus-ring-width',
    'var(--pin-input-border-width, var(--focus-ring-inset-width, var(--border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--pin-input-font-size', 'var(--text-lg)', 'Controls input font size.'],
  ['--pin-input-font-weight', 'var(--weight-medium)', 'Controls input font weight.'],
  ['--pin-input-gap', 'var(--spacing-2)', 'Controls spacing between inputs.'],
  [
    '--pin-input-input-height',
    'var(--pin-input-input-size, var(--size-md))',
    'Controls input slot height.',
  ],
  ['--pin-input-input-padding-x', '0', 'Controls horizontal input padding.'],
  ['--pin-input-input-padding-y', '0', 'Controls vertical input padding.'],
  ['--pin-input-input-size', 'var(--size-md)', 'Controls square input slot size.'],
  [
    '--pin-input-input-width',
    'var(--pin-input-input-size, var(--size-md))',
    'Controls input slot width.',
  ],
  ['--pin-input-label-color', 'var(--color-foreground)', 'Controls label color.'],
  ['--pin-input-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--pin-input-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--pin-input-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--pin-input-line-height', 'var(--line-height-text-lg)', 'Controls input line height.'],
  ['--pin-input-max-width', 'none', 'Controls root max width.'],
  ['--pin-input-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--pin-input-radius', 'var(--radius-md)', 'Controls input corner radius.'],
  ['--pin-input-root-gap', 'var(--spacing-2)', 'Controls root spacing between label and control.'],
  ['--pin-input-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
  [
    '--pin-input-separator-height',
    'var(--pin-input-separator-size, var(--spacing-4))',
    'Controls separator height.',
  ],
  ['--pin-input-separator-size', 'var(--spacing-4)', 'Controls separator width and height.'],
  [
    '--pin-input-separator-width',
    'var(--pin-input-separator-size, var(--spacing-4))',
    'Controls separator width.',
  ],
  ['--pin-input-transition', 'var(--transition-default)', 'Controls input state transitions.'],
  ['--pin-input-width', 'auto', 'Controls root width.'],
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