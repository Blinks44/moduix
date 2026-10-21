import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const ratingGroupOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-rating-group-active-color',
    'var(--moduix-color-primary)',
    'Controls the filled star color.',
  ],
  [
    '--moduix-rating-group-color',
    'var(--moduix-color-muted-foreground)',
    'Controls the empty star outline color.',
  ],
  ['--moduix-rating-group-gap', 'var(--moduix-spacing-1)', 'Controls gap between rating items.'],
  [
    '--moduix-rating-group-icon-size',
    'Size-specific fallback',
    'Overrides the star size for every `size`.',
  ],
];

const ratingGroupCssPropertiesReference =
  ratingGroupOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function RatingGroupCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={ratingGroupCssPropertiesReference} />;
}