import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const ratingGroupExampleCss = `
  .rating-group-stack {
    display: grid;
    gap: var(--moduix-spacing-3);
    justify-items: center;
    width: min(20rem, 100%);
  }

  .rating-group-field {
    align-items: center;
    text-align: center;
    width: min(20rem, 100%);
  }

  .rating-group-hint {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-xs);
    line-height: var(--moduix-line-height-text-xs);
  }
`;

export const ratingGroupCustomIconCss = `
  .rating-group-custom-icon {
    color: var(--moduix-rating-group-active-color, var(--moduix-color-primary));

    & > svg {
      fill: currentColor;
      stroke: currentColor;
    }
  }

  .rating-group-custom-icon:not([data-highlighted]) {
    color: var(--moduix-rating-group-color, var(--moduix-color-muted-foreground));

    & > svg {
      fill: transparent;
      stroke: currentColor;
    }
  }
`;

const ratingGroupOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-rating-group-active-color',
    'var(--moduix-color-primary)',
    'Controls highlighted star color.',
  ],
  [
    '--moduix-rating-group-color',
    'var(--moduix-color-muted-foreground)',
    'Controls empty star color.',
  ],
  [
    '--moduix-rating-group-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled label and control opacity.',
  ],
  ['--moduix-rating-group-focus-ring-color', 'transparent', 'Controls item focus ring color.'],
  ['--moduix-rating-group-focus-ring-offset', '0', 'Controls item focus ring offset.'],
  ['--moduix-rating-group-focus-ring-width', '0', 'Controls item focus ring width.'],
  ['--moduix-rating-group-gap', 'var(--moduix-spacing-1)', 'Controls gap between rating items.'],
  [
    '--moduix-rating-group-root-gap',
    'var(--moduix-spacing-1)',
    'Controls gap between label and control.',
  ],
  [
    '--moduix-rating-group-icon-size-xs',
    'var(--moduix-spacing-3-5)',
    'Controls icon size for `xs`.',
  ],
  ['--moduix-rating-group-icon-size-sm', 'var(--moduix-spacing-4)', 'Controls icon size for `sm`.'],
  ['--moduix-rating-group-icon-size-md', 'var(--moduix-spacing-5)', 'Controls icon size for `md`.'],
  ['--moduix-rating-group-icon-size-lg', 'var(--moduix-spacing-6)', 'Controls icon size for `lg`.'],
  ['--moduix-rating-group-icon-size-xl', 'var(--moduix-spacing-7)', 'Controls icon size for `xl`.'],
  [
    '--moduix-rating-group-label-color',
    'var(--moduix-color-foreground)',
    'Controls label text color.',
  ],
  ['--moduix-rating-group-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-rating-group-label-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls label weight.',
  ],
  [
    '--moduix-rating-group-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-rating-group-transition',
    'var(--moduix-transition-default)',
    'Controls icon color, fill, and clip transition timing.',
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