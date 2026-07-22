import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const tagsInputCssProperties: CssPropertyInput[] = [
  ['--tags-input-bg', 'var(--input-bg, var(--color-background))', 'Controls control background.'],
  [
    '--tags-input-border-color',
    'var(--input-border-color, var(--color-border))',
    'Controls control border color.',
  ],
  [
    '--tags-input-border-width',
    'var(--input-border-width, var(--border-width-sm))',
    'Controls control border width.',
  ],
  ['--tags-input-clear-trigger-bg', 'transparent', 'Controls clear trigger background.'],
  [
    '--tags-input-clear-trigger-bg-hover',
    'var(--color-muted)',
    'Controls clear trigger hover background.',
  ],
  [
    '--tags-input-clear-trigger-color',
    'var(--color-muted-foreground)',
    'Controls clear trigger color.',
  ],
  [
    '--tags-input-clear-trigger-color-hover',
    'var(--color-foreground)',
    'Controls clear trigger hover color.',
  ],
  ['--tags-input-clear-trigger-icon-size', 'var(--spacing-3)', 'Controls clear trigger icon size.'],
  ['--tags-input-clear-trigger-radius', 'var(--radius-sm)', 'Controls clear trigger radius.'],
  ['--tags-input-clear-trigger-size', 'var(--size-xs)', 'Controls clear trigger size.'],
  ['--tags-input-color', 'var(--input-color, var(--color-foreground))', 'Controls text color.'],
  ['--tags-input-control-gap', 'var(--spacing-1)', 'Controls spacing inside the control.'],
  ['--tags-input-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  [
    '--tags-input-focus-ring-color',
    'var(--input-focus-ring-color, var(--color-ring))',
    'Controls focus ring color.',
  ],
  [
    '--tags-input-focus-ring-offset',
    'var(--input-focus-ring-offset, calc(0px - var(--tags-input-border-width, var(--input-border-width, var(--border-width-sm)))))',
    'Controls focus ring offset.',
  ],
  [
    '--tags-input-focus-ring-width',
    'var(--input-focus-ring-width, var(--tags-input-border-width, var(--input-border-width, var(--focus-ring-inset-width, var(--border-width-sm)))))',
    'Controls focus ring width.',
  ],
  ['--tags-input-gap', 'var(--field-gap, var(--spacing-1))', 'Controls root vertical gap.'],
  [
    '--tags-input-input-font-size',
    'var(--input-font-size, var(--text-sm))',
    'Controls entry input font size.',
  ],
  ['--tags-input-input-height', 'var(--size-xs)', 'Controls entry input height.'],
  [
    '--tags-input-input-line-height',
    'var(--input-line-height, var(--line-height-text-sm))',
    'Controls entry input line height.',
  ],
  ['--tags-input-input-min-width', '7rem', 'Controls entry input minimum width.'],
  ['--tags-input-input-padding-x', 'var(--spacing-1)', 'Controls entry input horizontal padding.'],
  [
    '--tags-input-invalid-border-color',
    'var(--input-border-color-invalid, var(--color-destructive))',
    'Controls invalid border color.',
  ],
  [
    '--tags-input-invalid-focus-ring-color',
    'var(--input-border-color-invalid, var(--color-destructive))',
    'Controls invalid focus ring color.',
  ],
  ['--tags-input-item-bg', 'var(--color-secondary)', 'Controls tag background color.'],
  ['--tags-input-item-border-color', 'transparent', 'Controls tag border color.'],
  ['--tags-input-item-border-width', 'var(--border-width-sm)', 'Controls tag border width.'],
  ['--tags-input-item-color', 'var(--color-secondary-foreground)', 'Controls tag text color.'],
  ['--tags-input-item-font-size', 'var(--text-xs)', 'Controls tag font size.'],
  ['--tags-input-item-font-weight', 'var(--weight-medium)', 'Controls tag font weight.'],
  ['--tags-input-item-gap', 'var(--spacing-1)', 'Controls spacing inside each tag.'],
  ['--tags-input-item-height', 'var(--size-xs)', 'Controls tag minimum height.'],
  [
    '--tags-input-item-highlight-ring-color',
    'var(--color-ring)',
    'Controls highlighted tag ring color.',
  ],
  [
    '--tags-input-item-highlight-ring-width',
    'var(--border-width-sm)',
    'Controls highlighted tag ring width.',
  ],
  ['--tags-input-item-input-width', '7rem', 'Controls edit input width.'],
  ['--tags-input-item-line-height', 'var(--line-height-text-xs)', 'Controls tag line height.'],
  ['--tags-input-item-padding-x', 'var(--spacing-2)', 'Controls tag horizontal padding.'],
  ['--tags-input-item-padding-y', 'var(--spacing-0-5)', 'Controls tag vertical padding.'],
  ['--tags-input-item-radius', 'var(--radius-full)', 'Controls tag corner radius.'],
  [
    '--tags-input-label-color',
    'var(--field-label-color, var(--color-foreground))',
    'Controls label color.',
  ],
  [
    '--tags-input-label-font-size',
    'var(--field-label-font-size, var(--text-sm))',
    'Controls label font size.',
  ],
  [
    '--tags-input-label-font-weight',
    'var(--field-label-font-weight, var(--weight-medium))',
    'Controls label font weight.',
  ],
  ['--tags-input-label-gap', 'var(--field-label-gap, var(--spacing-1))', 'Controls label gap.'],
  [
    '--tags-input-label-line-height',
    'var(--field-label-line-height, var(--line-height-text-sm))',
    'Controls label line height.',
  ],
  ['--tags-input-max-width', '24rem', 'Controls root max width.'],
  [
    '--tags-input-min-height',
    'var(--input-height, var(--size-md))',
    'Controls control minimum height.',
  ],
  ['--tags-input-padding-x', 'var(--spacing-2)', 'Controls horizontal control padding.'],
  ['--tags-input-padding-y', '0.3125rem', 'Controls vertical control padding.'],
  [
    '--tags-input-placeholder-color',
    'var(--input-placeholder-color, var(--color-muted-foreground))',
    'Controls entry input placeholder color.',
  ],
  ['--tags-input-radius', 'var(--input-radius, var(--radius-md))', 'Controls control radius.'],
  [
    '--tags-input-readonly-bg',
    'var(--input-readonly-bg, var(--color-background))',
    'Controls read-only control background.',
  ],
  [
    '--tags-input-readonly-color',
    'var(--input-readonly-color, var(--color-foreground))',
    'Controls read-only text color.',
  ],
  [
    '--tags-input-transition',
    'var(--input-transition, var(--transition-default))',
    'Controls component state transitions.',
  ],
  ['--tags-input-trigger-bg', 'transparent', 'Controls item delete trigger background.'],
  [
    '--tags-input-trigger-bg-hover',
    'color-mix(in oklab, currentColor 12%, transparent)',
    'Controls item delete trigger hover background.',
  ],
  ['--tags-input-trigger-color', 'currentColor', 'Controls item delete trigger color.'],
  [
    '--tags-input-trigger-focus-ring-color',
    'var(--color-ring)',
    'Controls trigger focus ring color.',
  ],
  [
    '--tags-input-trigger-focus-ring-offset',
    'var(--focus-ring-offset)',
    'Controls clear trigger focus offset.',
  ],
  [
    '--tags-input-trigger-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls trigger focus ring width.',
  ],
  ['--tags-input-trigger-icon-size', 'var(--spacing-2-5)', 'Controls trigger icon size.'],
  ['--tags-input-trigger-radius', 'var(--radius-full)', 'Controls item delete trigger radius.'],
  ['--tags-input-trigger-size', 'var(--spacing-4)', 'Controls item delete trigger size.'],
  ['--tags-input-width', '100%', 'Controls root width.'],
];

export function TagsInputCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={tagsInputCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}