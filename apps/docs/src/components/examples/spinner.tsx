import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const spinnerInlineCss = `
  .inline {
    display: inline-flex;
    align-items: center;
    gap: var(--moduix-spacing-2);
  }

  .muted {
    color: var(--moduix-color-muted-foreground);
  }
`;

export const spinnerRowCss = `
  .row {
    display: flex;
    align-items: center;
    gap: var(--moduix-spacing-4);
  }
`;

export const spinnerAsChildCss = `
  .customSpinnerHost {
    color: var(--moduix-color-primary);
  }
`;

const spinnerOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-spinner-animation',
    'var(--moduix-animation-spin)',
    'Controls indicator rotation animation.',
  ],
  ['--moduix-spinner-color', 'currentColor', 'Controls spinner color.'],
  ['--moduix-spinner-radius', 'var(--moduix-radius-full)', 'Controls round spinner part radius.'],
  [
    '--moduix-spinner-ring-border-width',
    'var(--moduix-border-width-md)',
    'Controls ring stroke width.',
  ],
  [
    '--moduix-spinner-ring-track-color',
    'color-mix(in oklab, currentColor 22%, transparent)',
    'Controls inactive ring stroke color.',
  ],
  [
    '--moduix-spinner-size',
    'var(--moduix-spinner-size-md, var(--moduix-spacing-5))',
    'Controls spinner size override.',
  ],
  ['--moduix-spinner-size-xs', 'var(--moduix-spacing-3)', 'Controls xs spinner size.'],
  ['--moduix-spinner-size-sm', 'var(--moduix-spacing-4)', 'Controls sm spinner size.'],
  ['--moduix-spinner-size-md', 'var(--moduix-spacing-5)', 'Controls md spinner size.'],
  ['--moduix-spinner-size-lg', 'var(--moduix-spacing-7)', 'Controls lg spinner size.'],
  ['--moduix-spinner-size-xl', 'var(--moduix-size-md)', 'Controls xl spinner size.'],
];

export function SpinnerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={spinnerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}