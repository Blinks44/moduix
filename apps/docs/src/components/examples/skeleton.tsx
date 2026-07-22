import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const skeletonCssProperties: CssPropertyInput[] = [
  ['--skeleton-animation', 'var(--animation-pulse)', 'Controls the pulse loading animation.'],
  ['--skeleton-border-radius', 'var(--radius-md)', 'Controls default skeleton border radius.'],
  [
    '--skeleton-bg',
    'color-mix(in oklab, var(--color-muted-foreground) 18%, var(--color-background))',
    'Controls skeleton background color.',
  ],
  ['--skeleton-height', 'var(--spacing-4)', 'Controls default loading height.'],
];
const skeletonOverrideCssProperties = skeletonCssProperties;

export function SkeletonCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={skeletonOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}