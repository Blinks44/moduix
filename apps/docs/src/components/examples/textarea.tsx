import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const textareaCssProperties: CssPropertyInput[] = [
  [
    '--moduix-textarea-bg',
    'var(--moduix-color-background)',
    'Controls the textarea background color.',
  ],
  [
    '--moduix-textarea-border-color',
    'var(--moduix-color-border)',
    'Controls the textarea border color.',
  ],
  [
    '--moduix-textarea-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--moduix-textarea-border-style', 'solid', 'Controls the textarea border style.'],
  [
    '--moduix-textarea-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the textarea border width.',
  ],
  [
    '--moduix-textarea-color',
    'var(--moduix-color-foreground)',
    'Controls the textarea text color.',
  ],
  [
    '--moduix-textarea-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  ['--moduix-textarea-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-textarea-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-textarea-focus-ring-width',
    'var(--moduix-textarea-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--moduix-textarea-font-size', 'var(--moduix-text-md)', 'Controls default font size.'],
  [
    '--moduix-textarea-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls default line height.',
  ],
  ['--moduix-textarea-max-width', 'none', 'Controls the textarea max width.'],
  ['--moduix-textarea-min-height', '6rem', 'Controls default minimum textarea height.'],
  [
    '--moduix-textarea-padding-x',
    'var(--moduix-spacing-3-5)',
    'Controls default horizontal padding.',
  ],
  ['--moduix-textarea-padding-y', 'var(--moduix-spacing-2)', 'Controls default vertical padding.'],
  [
    '--moduix-textarea-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls placeholder color.',
  ],
  ['--moduix-textarea-radius', 'var(--moduix-radius-md)', 'Controls textarea corner radius.'],
  [
    '--moduix-textarea-readonly-bg',
    'var(--moduix-textarea-bg, var(--moduix-color-background))',
    'Controls readonly background color.',
  ],
  [
    '--moduix-textarea-readonly-color',
    'var(--moduix-textarea-color, var(--moduix-color-foreground))',
    'Controls readonly text color.',
  ],
  ['--moduix-textarea-resize', 'vertical', 'Controls default textarea resize behavior.'],
  [
    '--moduix-textarea-transition',
    'var(--moduix-transition-default)',
    'Controls state transition timing.',
  ],
  ['--moduix-textarea-width', '100%', 'Controls textarea width.'],
];

export function TextareaCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={textareaCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}