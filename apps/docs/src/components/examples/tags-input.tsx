import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const tagsInputCssProperties: CssPropertyInput[] = [
  [
    '--moduix-tags-input-bg',
    'var(--moduix-input-bg, var(--moduix-color-background))',
    'Controls control background.',
  ],
  [
    '--moduix-tags-input-border-color',
    'var(--moduix-input-border-color, var(--moduix-color-border))',
    'Controls control border color.',
  ],
  [
    '--moduix-tags-input-border-width',
    'var(--moduix-input-border-width, var(--moduix-border-width-sm))',
    'Controls control border width.',
  ],
  ['--moduix-tags-input-clear-trigger-bg', 'transparent', 'Controls clear trigger background.'],
  [
    '--moduix-tags-input-clear-trigger-bg-hover',
    'var(--moduix-color-muted)',
    'Controls clear trigger hover background.',
  ],
  [
    '--moduix-tags-input-clear-trigger-color',
    'var(--moduix-color-muted-foreground)',
    'Controls clear trigger color.',
  ],
  [
    '--moduix-tags-input-clear-trigger-color-hover',
    'var(--moduix-color-foreground)',
    'Controls clear trigger hover color.',
  ],
  [
    '--moduix-tags-input-clear-trigger-icon-size',
    'var(--moduix-spacing-3)',
    'Controls clear trigger icon size.',
  ],
  [
    '--moduix-tags-input-clear-trigger-radius',
    'var(--moduix-radius-sm)',
    'Controls clear trigger radius.',
  ],
  [
    '--moduix-tags-input-clear-trigger-size',
    'var(--moduix-size-xs)',
    'Controls clear trigger size.',
  ],
  [
    '--moduix-tags-input-color',
    'var(--moduix-input-color, var(--moduix-color-foreground))',
    'Controls text color.',
  ],
  [
    '--moduix-tags-input-control-gap',
    'var(--moduix-spacing-1)',
    'Controls spacing inside the control.',
  ],
  [
    '--moduix-tags-input-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-tags-input-focus-ring-color',
    'var(--moduix-input-focus-ring-color, var(--moduix-color-ring))',
    'Controls focus ring color.',
  ],
  [
    '--moduix-tags-input-focus-ring-offset',
    'var(--moduix-input-focus-ring-offset, calc(0px - var(--moduix-tags-input-border-width, var(--moduix-input-border-width, var(--moduix-border-width-sm)))))',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-tags-input-focus-ring-width',
    'var(--moduix-input-focus-ring-width, var(--moduix-tags-input-border-width, var(--moduix-input-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-tags-input-gap',
    'var(--moduix-field-gap, var(--moduix-spacing-1))',
    'Controls root vertical gap.',
  ],
  [
    '--moduix-tags-input-input-font-size',
    'var(--moduix-input-font-size, var(--moduix-text-sm))',
    'Controls entry input font size.',
  ],
  ['--moduix-tags-input-input-height', 'var(--moduix-size-xs)', 'Controls entry input height.'],
  [
    '--moduix-tags-input-input-line-height',
    'var(--moduix-input-line-height, var(--moduix-line-height-text-sm))',
    'Controls entry input line height.',
  ],
  ['--moduix-tags-input-input-min-width', '7rem', 'Controls entry input minimum width.'],
  [
    '--moduix-tags-input-input-padding-x',
    'var(--moduix-spacing-1)',
    'Controls entry input horizontal padding.',
  ],
  [
    '--moduix-tags-input-invalid-border-color',
    'var(--moduix-input-border-color-invalid, var(--moduix-color-destructive))',
    'Controls invalid border color.',
  ],
  [
    '--moduix-tags-input-invalid-focus-ring-color',
    'var(--moduix-input-border-color-invalid, var(--moduix-color-destructive))',
    'Controls invalid focus ring color.',
  ],
  [
    '--moduix-tags-input-item-bg',
    'var(--moduix-color-secondary)',
    'Controls tag background color.',
  ],
  ['--moduix-tags-input-item-border-color', 'transparent', 'Controls tag border color.'],
  [
    '--moduix-tags-input-item-border-width',
    'var(--moduix-border-width-sm)',
    'Controls tag border width.',
  ],
  [
    '--moduix-tags-input-item-color',
    'var(--moduix-color-secondary-foreground)',
    'Controls tag text color.',
  ],
  ['--moduix-tags-input-item-font-size', 'var(--moduix-text-xs)', 'Controls tag font size.'],
  [
    '--moduix-tags-input-item-font-weight',
    'var(--moduix-weight-medium)',
    'Controls tag font weight.',
  ],
  ['--moduix-tags-input-item-gap', 'var(--moduix-spacing-1)', 'Controls spacing inside each tag.'],
  ['--moduix-tags-input-item-height', 'var(--moduix-size-xs)', 'Controls tag minimum height.'],
  [
    '--moduix-tags-input-item-highlight-ring-color',
    'var(--moduix-color-ring)',
    'Controls highlighted tag ring color.',
  ],
  [
    '--moduix-tags-input-item-highlight-ring-width',
    'var(--moduix-border-width-sm)',
    'Controls highlighted tag ring width.',
  ],
  ['--moduix-tags-input-item-input-width', '7rem', 'Controls edit input width.'],
  [
    '--moduix-tags-input-item-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls tag line height.',
  ],
  [
    '--moduix-tags-input-item-padding-x',
    'var(--moduix-spacing-2)',
    'Controls tag horizontal padding.',
  ],
  [
    '--moduix-tags-input-item-padding-y',
    'var(--moduix-spacing-0-5)',
    'Controls tag vertical padding.',
  ],
  ['--moduix-tags-input-item-radius', 'var(--moduix-radius-full)', 'Controls tag corner radius.'],
  [
    '--moduix-tags-input-label-color',
    'var(--moduix-field-label-color, var(--moduix-color-foreground))',
    'Controls label color.',
  ],
  [
    '--moduix-tags-input-label-font-size',
    'var(--moduix-field-label-font-size, var(--moduix-text-sm))',
    'Controls label font size.',
  ],
  [
    '--moduix-tags-input-label-font-weight',
    'var(--moduix-field-label-font-weight, var(--moduix-weight-medium))',
    'Controls label font weight.',
  ],
  [
    '--moduix-tags-input-label-gap',
    'var(--moduix-field-label-gap, var(--moduix-spacing-1))',
    'Controls label gap.',
  ],
  [
    '--moduix-tags-input-label-line-height',
    'var(--moduix-field-label-line-height, var(--moduix-line-height-text-sm))',
    'Controls label line height.',
  ],
  ['--moduix-tags-input-max-width', '24rem', 'Controls root max width.'],
  [
    '--moduix-tags-input-min-height',
    'var(--moduix-input-height, var(--moduix-size-md))',
    'Controls control minimum height.',
  ],
  [
    '--moduix-tags-input-padding-x',
    'var(--moduix-spacing-2)',
    'Controls horizontal control padding.',
  ],
  ['--moduix-tags-input-padding-y', '0.3125rem', 'Controls vertical control padding.'],
  [
    '--moduix-tags-input-placeholder-color',
    'var(--moduix-input-placeholder-color, var(--moduix-color-muted-foreground))',
    'Controls entry input placeholder color.',
  ],
  [
    '--moduix-tags-input-radius',
    'var(--moduix-input-radius, var(--moduix-radius-md))',
    'Controls control radius.',
  ],
  [
    '--moduix-tags-input-readonly-bg',
    'var(--moduix-input-readonly-bg, var(--moduix-color-background))',
    'Controls read-only control background.',
  ],
  [
    '--moduix-tags-input-readonly-color',
    'var(--moduix-input-readonly-color, var(--moduix-color-foreground))',
    'Controls read-only text color.',
  ],
  [
    '--moduix-tags-input-transition',
    'var(--moduix-input-transition, var(--moduix-transition-default))',
    'Controls component state transitions.',
  ],
  ['--moduix-tags-input-trigger-bg', 'transparent', 'Controls item delete trigger background.'],
  [
    '--moduix-tags-input-trigger-bg-hover',
    'color-mix(in oklab, currentColor 12%, transparent)',
    'Controls item delete trigger hover background.',
  ],
  ['--moduix-tags-input-trigger-color', 'currentColor', 'Controls item delete trigger color.'],
  [
    '--moduix-tags-input-trigger-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls trigger focus ring color.',
  ],
  [
    '--moduix-tags-input-trigger-focus-ring-offset',
    'var(--moduix-focus-ring-offset)',
    'Controls clear trigger focus offset.',
  ],
  [
    '--moduix-tags-input-trigger-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls trigger focus ring width.',
  ],
  [
    '--moduix-tags-input-trigger-icon-size',
    'var(--moduix-spacing-2-5)',
    'Controls trigger icon size.',
  ],
  [
    '--moduix-tags-input-trigger-radius',
    'var(--moduix-radius-full)',
    'Controls item delete trigger radius.',
  ],
  [
    '--moduix-tags-input-trigger-size',
    'var(--moduix-spacing-4)',
    'Controls item delete trigger size.',
  ],
  ['--moduix-tags-input-width', '100%', 'Controls root width.'],
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