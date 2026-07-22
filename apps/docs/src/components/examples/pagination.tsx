import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const paginationDemoCss = `
  .pagination-demo {
    display: flex;
    width: fit-content;
  }
`;

const paginationStackCss = `
  .pagination-stack {
    display: grid;
    gap: var(--spacing-3);
    justify-items: start;
  }
`;

const paginationRowCss = `
  .pagination-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-3);
  }
`;

const paginationMutedCss = `
  .pagination-muted {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

const paginationDataSlicingLayoutCss = `
  .pagination-users {
    display: grid;
    gap: var(--spacing-2);
    width: 24rem;
    max-width: 100%;
  }

  .pagination-user {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-3);
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-3);
    background: var(--color-muted);
  }
`;

const paginationPageSizeControlCss = `
  .pagination-page-size-select {
    --select-width: 5.5rem;
  }
`;

export const paginationBasicCss = paginationDemoCss;

export const paginationAdvancedCustomizationCss = paginationDemoCss;

export const paginationControlledCss = `${paginationDemoCss}${paginationStackCss}${paginationMutedCss}`;

export const paginationContextCss = `${paginationRowCss}${paginationMutedCss}`;

export const paginationDataSlicingCss = `${paginationStackCss}${paginationRowCss}${paginationMutedCss}${paginationDataSlicingLayoutCss}`;

export const paginationLinkCss = paginationDemoCss;

export const paginationPageRangeCss = `${paginationStackCss}${paginationRowCss}${paginationMutedCss}`;

export const paginationPageSizeControlExampleCss = `${paginationStackCss}${paginationRowCss}${paginationMutedCss}${paginationPageSizeControlCss}`;

export const paginationRootProviderCss = `${paginationDemoCss}${paginationStackCss}`;

export const paginationTranslationsCss = paginationDemoCss;

export const paginationWithEdgesCss = paginationDemoCss;

const paginationOverrideCssProperties: CssPropertyInput[] = [
  ['--pagination-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--pagination-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--pagination-ellipsis-color', 'var(--color-muted-foreground)', 'Controls ellipsis color.'],
  ['--pagination-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--pagination-focus-ring-offset',
    'var(--focus-ring-inset-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--pagination-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls focus ring width.',
  ],
  ['--pagination-font-size', 'var(--text-sm)', 'Controls pagination font size.'],
  ['--pagination-font-weight', 'var(--weight-medium)', 'Controls pagination font weight.'],
  ['--pagination-gap', 'var(--spacing-1)', 'Controls gap between pagination parts.'],
  ['--pagination-icon-size', 'var(--spacing-4)', 'Controls trigger icon size.'],
  ['--pagination-item-bg', 'var(--color-background)', 'Controls item background color.'],
  [
    '--pagination-item-bg-hover',
    'var(--color-accent)',
    'Controls item and trigger hover background.',
  ],
  [
    '--pagination-item-bg-selected',
    'var(--color-foreground)',
    'Controls selected item background color.',
  ],
  ['--pagination-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  [
    '--pagination-item-border-color-selected',
    'var(--color-foreground)',
    'Controls selected item border color.',
  ],
  ['--pagination-item-border-width', 'var(--border-width-sm)', 'Controls item border width.'],
  ['--pagination-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  [
    '--pagination-item-color-selected',
    'var(--color-background)',
    'Controls selected item text color.',
  ],
  ['--pagination-item-padding-inline', 'var(--spacing-3)', 'Controls item horizontal padding.'],
  ['--pagination-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  ['--pagination-item-size', 'var(--size-md)', 'Controls item width and height.'],
  ['--pagination-line-height', 'var(--line-height-text-sm)', 'Controls pagination line height.'],
  ['--pagination-transition', 'var(--transition-default)', 'Controls state transitions.'],
  ['--pagination-trigger-gap', 'var(--spacing-2)', 'Controls trigger content gap.'],
];

const paginationCssPropertiesReference = paginationOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function PaginationCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={paginationCssPropertiesReference} />;
}