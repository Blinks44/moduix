import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const spinnerInlineCss = `
  .inline {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  .muted {
    color: var(--color-muted-foreground);
  }
`;

export const spinnerRowCss = `
  .row {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }
`;

export const spinnerAsChildCss = `
  .customSpinnerHost {
    color: var(--color-primary);
  }
`;

const spinnerOverrideCssProperties: CssPropertyInput[] = [
  ['--spinner-animation', 'var(--animation-spin)', 'Controls indicator rotation animation.'],
  ['--spinner-color', 'currentColor', 'Controls spinner color.'],
  ['--spinner-radius', 'var(--radius-full)', 'Controls round spinner part radius.'],
  ['--spinner-ring-border-width', 'var(--border-width-md)', 'Controls ring stroke width.'],
  [
    '--spinner-ring-track-color',
    'color-mix(in oklab, currentColor 22%, transparent)',
    'Controls inactive ring stroke color.',
  ],
  ['--spinner-size', 'var(--spinner-size-md, var(--spacing-5))', 'Controls spinner size override.'],
  ['--spinner-size-xs', 'var(--spacing-3)', 'Controls xs spinner size.'],
  ['--spinner-size-sm', 'var(--spacing-4)', 'Controls sm spinner size.'],
  ['--spinner-size-md', 'var(--spacing-5)', 'Controls md spinner size.'],
  ['--spinner-size-lg', 'var(--spacing-7)', 'Controls lg spinner size.'],
  ['--spinner-size-xl', 'var(--size-md)', 'Controls xl spinner size.'],
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