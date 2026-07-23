import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const editableExampleCss = `
  .editable-textarea-area {
    align-items: flex-start;
  }

  .editable-textarea-root {
    --moduix-editable-control-align: start;
    --moduix-editable-area-width: 100%;
  }

  .editable-textarea-input,
  .editable-textarea-preview {
    min-height: 6rem;
    white-space: pre-wrap;
  }

  .editable-custom-area {
    --moduix-editable-area-width: 16rem;
    --moduix-editable-border-color: var(--moduix-color-primary);
    --moduix-editable-focus-ring-color: var(--moduix-color-primary);
    --moduix-editable-radius: var(--moduix-radius-sm);
  }
`;

const editableOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-editable-area-height',
    'var(--moduix-size-md)',
    'Controls the editable surface minimum height.',
  ],
  ['--moduix-editable-area-width', '100%', 'Controls the editable surface width.'],
  [
    '--moduix-editable-bg',
    'var(--moduix-color-background)',
    'Controls the editable surface background.',
  ],
  [
    '--moduix-editable-border-color',
    'var(--moduix-color-border)',
    'Controls default border color.',
  ],
  [
    '--moduix-editable-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--moduix-editable-border-style', 'solid', 'Controls the editable border style.'],
  [
    '--moduix-editable-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the editable border width.',
  ],
  ['--moduix-editable-color', 'var(--moduix-color-foreground)', 'Controls editable text color.'],
  [
    '--moduix-editable-control-align',
    'center',
    'Controls vertical alignment of the trigger controls.',
  ],
  [
    '--moduix-editable-control-gap',
    'var(--moduix-spacing-1)',
    'Controls spacing between trigger buttons.',
  ],
  [
    '--moduix-editable-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  ['--moduix-editable-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-editable-focus-ring-width',
    'var(--moduix-editable-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--moduix-editable-font-size', 'var(--moduix-text-md)', 'Controls input and preview font size.'],
  ['--moduix-editable-gap', 'var(--moduix-spacing-1)', 'Controls spacing between editable parts.'],
  ['--moduix-editable-input-width', '100%', 'Controls input and preview width.'],
  ['--moduix-editable-label-color', 'var(--moduix-color-foreground)', 'Controls label color.'],
  [
    '--moduix-editable-label-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls label color when invalid.',
  ],
  ['--moduix-editable-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-editable-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  ['--moduix-editable-label-gap', 'var(--moduix-spacing-1)', 'Controls spacing inside the label.'],
  [
    '--moduix-editable-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-editable-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls input and preview line height.',
  ],
  ['--moduix-editable-max-width', '100%', 'Controls root max width.'],
  [
    '--moduix-editable-padding-x',
    'var(--moduix-spacing-3-5)',
    'Controls horizontal surface padding.',
  ],
  ['--moduix-editable-padding-y', 'var(--moduix-spacing-1)', 'Controls vertical surface padding.'],
  [
    '--moduix-editable-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls placeholder color.',
  ],
  ['--moduix-editable-preview-min-height', '1lh', 'Controls preview minimum height.'],
  [
    '--moduix-editable-radius',
    'var(--moduix-radius-md)',
    'Controls editable surface corner radius.',
  ],
  ['--moduix-editable-textarea-min-height', '6rem', 'Controls textarea input minimum height.'],
  ['--moduix-editable-textarea-resize', 'vertical', 'Controls textarea resize behavior.'],
  [
    '--moduix-editable-transition',
    'var(--moduix-transition-default)',
    'Controls state transition timing.',
  ],
  [
    '--moduix-editable-trigger-bg',
    'var(--moduix-color-background)',
    'Controls trigger background.',
  ],
  [
    '--moduix-editable-trigger-bg-active',
    'var(--moduix-editable-trigger-bg-hover)',
    'Controls active trigger background.',
  ],
  [
    '--moduix-editable-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls trigger hover background.',
  ],
  [
    '--moduix-editable-trigger-border-color',
    'var(--moduix-color-border)',
    'Controls trigger border color.',
  ],
  ['--moduix-editable-trigger-border-style', 'solid', 'Controls trigger border style.'],
  [
    '--moduix-editable-trigger-border-width',
    'var(--moduix-border-width-sm)',
    'Controls trigger border width.',
  ],
  [
    '--moduix-editable-trigger-color',
    'var(--moduix-color-foreground)',
    'Controls trigger icon color.',
  ],
  [
    '--moduix-editable-trigger-icon-size',
    'var(--moduix-spacing-3-5)',
    'Controls default trigger icon size.',
  ],
  [
    '--moduix-editable-trigger-radius',
    'var(--moduix-radius-sm)',
    'Controls trigger corner radius.',
  ],
  [
    '--moduix-editable-trigger-size',
    'var(--moduix-editable-area-height, var(--moduix-size-md))',
    'Controls trigger button size.',
  ],
  ['--moduix-editable-width', 'auto', 'Controls root width.'],
];

export function EditableCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={editableOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}