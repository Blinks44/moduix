import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const skeletonCssProperties: CssPropertyInput[] = [
  [
    '--moduix-skeleton-animation',
    'var(--moduix-animation-pulse)',
    'Controls the pulse loading animation.',
  ],
  [
    '--moduix-skeleton-border-radius',
    'var(--moduix-radius-md)',
    'Controls default skeleton border radius.',
  ],
  [
    '--moduix-skeleton-bg',
    'color-mix(in oklab, var(--moduix-color-muted-foreground) 18%, var(--moduix-color-background))',
    'Controls skeleton background color.',
  ],
  ['--moduix-skeleton-height', 'var(--moduix-spacing-4)', 'Controls default loading height.'],
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