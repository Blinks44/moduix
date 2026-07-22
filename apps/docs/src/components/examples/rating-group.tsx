import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const ratingGroupExampleCss = `
  .rating-group-stack {
    display: grid;
    gap: var(--spacing-3);
    justify-items: center;
    width: min(20rem, 100%);
  }

  .rating-group-field {
    align-items: center;
    text-align: center;
    width: min(20rem, 100%);
  }

  .rating-group-hint {
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }
`;

export const ratingGroupCustomIconCss = `
  .rating-group-custom-icon {
    color: var(--rating-group-active-color, var(--color-primary));

    & > svg {
      fill: currentColor;
      stroke: currentColor;
    }
  }

  .rating-group-custom-icon:not([data-highlighted]) {
    color: var(--rating-group-color, var(--color-muted-foreground));

    & > svg {
      fill: transparent;
      stroke: currentColor;
    }
  }
`;

const ratingGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--rating-group-active-color', 'var(--color-primary)', 'Controls highlighted star color.'],
  ['--rating-group-color', 'var(--color-muted-foreground)', 'Controls empty star color.'],
  [
    '--rating-group-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled label and control opacity.',
  ],
  ['--rating-group-focus-ring-color', 'transparent', 'Controls item focus ring color.'],
  ['--rating-group-focus-ring-offset', '0', 'Controls item focus ring offset.'],
  ['--rating-group-focus-ring-width', '0', 'Controls item focus ring width.'],
  ['--rating-group-gap', 'var(--spacing-1)', 'Controls gap between rating items.'],
  ['--rating-group-root-gap', 'var(--spacing-1)', 'Controls gap between label and control.'],
  ['--rating-group-icon-size-xs', 'var(--spacing-3-5)', 'Controls icon size for `xs`.'],
  ['--rating-group-icon-size-sm', 'var(--spacing-4)', 'Controls icon size for `sm`.'],
  ['--rating-group-icon-size-md', 'var(--spacing-5)', 'Controls icon size for `md`.'],
  ['--rating-group-icon-size-lg', 'var(--spacing-6)', 'Controls icon size for `lg`.'],
  ['--rating-group-icon-size-xl', 'var(--spacing-7)', 'Controls icon size for `xl`.'],
  ['--rating-group-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--rating-group-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--rating-group-label-font-weight', 'var(--weight-semibold)', 'Controls label weight.'],
  ['--rating-group-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  [
    '--rating-group-transition',
    'var(--transition-default)',
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