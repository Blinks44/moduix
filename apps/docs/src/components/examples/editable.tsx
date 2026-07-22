import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const editableExampleCss = `
  .editable-state {
    grid-column: 1 / -1;
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .editable-root-provider-actions {
    display: flex;
    gap: var(--spacing-2);
    margin-top: var(--spacing-3);
  }

  .editable-root-provider-actions button {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-background);
    color: var(--color-foreground);
  }

  .editable-textarea-area {
    align-items: flex-start;
  }

  .editable-textarea-root {
    --editable-control-align: start;
    --editable-width: min(24rem, calc(100vw - var(--spacing-8)));
    --editable-area-width: 100%;
  }

  .editable-textarea-input,
  .editable-textarea-preview {
    min-height: 6rem;
    white-space: pre-wrap;
  }

  .editable-custom-area {
    --editable-area-width: 16rem;
    --editable-border-color: var(--color-primary);
    --editable-focus-ring-color: var(--color-primary);
    --editable-radius: var(--radius-sm);
  }
`;

const editableOverrideCssProperties: CssPropertyInput[] = [
  ['--editable-area-height', 'var(--size-md)', 'Controls the editable surface minimum height.'],
  ['--editable-area-width', '100%', 'Controls the editable surface width.'],
  ['--editable-bg', 'var(--color-background)', 'Controls the editable surface background.'],
  ['--editable-border-color', 'var(--color-border)', 'Controls default border color.'],
  [
    '--editable-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--editable-border-style', 'solid', 'Controls the editable border style.'],
  ['--editable-border-width', 'var(--border-width-sm)', 'Controls the editable border width.'],
  ['--editable-color', 'var(--color-foreground)', 'Controls editable text color.'],
  ['--editable-control-align', 'center', 'Controls vertical alignment of the trigger controls.'],
  ['--editable-control-gap', 'var(--spacing-1)', 'Controls spacing between trigger buttons.'],
  ['--editable-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--editable-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--editable-focus-ring-width',
    'var(--editable-border-width, var(--focus-ring-inset-width, var(--border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--editable-font-size', 'var(--text-md)', 'Controls input and preview font size.'],
  ['--editable-gap', 'var(--spacing-1)', 'Controls spacing between editable parts.'],
  ['--editable-input-width', '100%', 'Controls input and preview width.'],
  ['--editable-label-color', 'var(--color-foreground)', 'Controls label color.'],
  [
    '--editable-label-color-invalid',
    'var(--color-destructive)',
    'Controls label color when invalid.',
  ],
  ['--editable-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--editable-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--editable-label-gap', 'var(--spacing-1)', 'Controls spacing inside the label.'],
  ['--editable-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  [
    '--editable-line-height',
    'var(--line-height-text-md)',
    'Controls input and preview line height.',
  ],
  ['--editable-max-width', '100%', 'Controls root max width.'],
  ['--editable-padding-x', 'var(--spacing-3-5)', 'Controls horizontal surface padding.'],
  ['--editable-padding-y', 'var(--spacing-1)', 'Controls vertical surface padding.'],
  ['--editable-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--editable-preview-min-height', '1lh', 'Controls preview minimum height.'],
  ['--editable-radius', 'var(--radius-md)', 'Controls editable surface corner radius.'],
  ['--editable-textarea-min-height', '6rem', 'Controls textarea input minimum height.'],
  ['--editable-textarea-resize', 'vertical', 'Controls textarea resize behavior.'],
  ['--editable-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--editable-trigger-bg', 'var(--color-background)', 'Controls trigger background.'],
  [
    '--editable-trigger-bg-active',
    'var(--editable-trigger-bg-hover)',
    'Controls active trigger background.',
  ],
  ['--editable-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--editable-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--editable-trigger-border-style', 'solid', 'Controls trigger border style.'],
  ['--editable-trigger-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--editable-trigger-color', 'var(--color-foreground)', 'Controls trigger icon color.'],
  ['--editable-trigger-icon-size', 'var(--spacing-3-5)', 'Controls default trigger icon size.'],
  ['--editable-trigger-radius', 'var(--radius-sm)', 'Controls trigger corner radius.'],
  [
    '--editable-trigger-size',
    'var(--editable-area-height, var(--size-md))',
    'Controls trigger button size.',
  ],
  ['--editable-width', 'auto', 'Controls root width.'],
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