import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const textareaCssProperties: CssPropertyInput[] = [
  ['--textarea-bg', 'var(--color-background)', 'Controls the textarea background color.'],
  ['--textarea-border-color', 'var(--color-border)', 'Controls the textarea border color.'],
  [
    '--textarea-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--textarea-border-style', 'solid', 'Controls the textarea border style.'],
  ['--textarea-border-width', 'var(--border-width-sm)', 'Controls the textarea border width.'],
  ['--textarea-color', 'var(--color-foreground)', 'Controls the textarea text color.'],
  ['--textarea-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--textarea-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--textarea-focus-ring-offset', 'var(--focus-ring-inset-offset)', 'Controls focus ring offset.'],
  [
    '--textarea-focus-ring-width',
    'var(--textarea-border-width, var(--focus-ring-inset-width, var(--border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--textarea-font-size', 'var(--text-md)', 'Controls default font size.'],
  ['--textarea-line-height', 'var(--line-height-text-md)', 'Controls default line height.'],
  ['--textarea-max-width', 'none', 'Controls the textarea max width.'],
  ['--textarea-min-height', '6rem', 'Controls default minimum textarea height.'],
  ['--textarea-padding-x', 'var(--spacing-3-5)', 'Controls default horizontal padding.'],
  ['--textarea-padding-y', 'var(--spacing-2)', 'Controls default vertical padding.'],
  ['--textarea-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--textarea-radius', 'var(--radius-md)', 'Controls textarea corner radius.'],
  [
    '--textarea-readonly-bg',
    'var(--textarea-bg, var(--color-background))',
    'Controls readonly background color.',
  ],
  [
    '--textarea-readonly-color',
    'var(--textarea-color, var(--color-foreground))',
    'Controls readonly text color.',
  ],
  ['--textarea-resize', 'vertical', 'Controls default textarea resize behavior.'],
  ['--textarea-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--textarea-width', '100%', 'Controls textarea width.'],
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