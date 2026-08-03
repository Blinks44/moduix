import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const toastOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-toast-action-bg', 'transparent', 'Controls action button background.'],
  [
    '--moduix-toast-action-bg-hover',
    'var(--moduix-color-accent)',
    'Controls action hover background.',
  ],
  [
    '--moduix-toast-action-border-color',
    'var(--moduix-color-border)',
    'Controls action border color.',
  ],
  [
    '--moduix-toast-action-border-width',
    'var(--moduix-toast-border-width, var(--moduix-border-width-sm))',
    'Controls action button border width.',
  ],
  ['--moduix-toast-action-color', 'var(--moduix-color-foreground)', 'Controls action text color.'],
  ['--moduix-toast-action-font-size', 'var(--moduix-text-xs)', 'Controls action font size.'],
  [
    '--moduix-toast-action-font-weight',
    'var(--moduix-weight-medium)',
    'Controls action font weight.',
  ],
  [
    '--moduix-toast-action-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing inside action buttons.',
  ],
  [
    '--moduix-toast-action-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls action line height.',
  ],
  [
    '--moduix-toast-action-margin-top',
    'var(--moduix-spacing-2)',
    'Controls action spacing from the description.',
  ],
  [
    '--moduix-toast-action-min-height',
    'var(--moduix-size-xs)',
    'Controls action button minimum height.',
  ],
  [
    '--moduix-toast-action-padding-x',
    'var(--moduix-spacing-2)',
    'Controls action horizontal padding.',
  ],
  [
    '--moduix-toast-action-padding-y',
    'var(--moduix-spacing-1)',
    'Controls action vertical padding.',
  ],
  [
    '--moduix-toast-action-radius',
    'var(--moduix-radius-sm)',
    'Controls action button border radius.',
  ],
  ['--moduix-toast-bg', 'var(--moduix-color-popover)', 'Controls toast background color.'],
  ['--moduix-toast-border-color', 'var(--moduix-color-border)', 'Controls toast border color.'],
  ['--moduix-toast-border-width', 'var(--moduix-border-width-sm)', 'Controls toast border width.'],
  ['--moduix-toast-close-bg', 'transparent', 'Controls close button background.'],
  [
    '--moduix-toast-close-bg-hover',
    'var(--moduix-color-muted)',
    'Controls close hover background.',
  ],
  [
    '--moduix-toast-close-color',
    'var(--moduix-color-muted-foreground)',
    'Controls close button color.',
  ],
  [
    '--moduix-toast-close-color-hover',
    'var(--moduix-color-foreground)',
    'Controls close hover color.',
  ],
  [
    '--moduix-toast-close-focus-ring-offset',
    'var(--moduix-focus-ring-offset)',
    'Controls close button focus ring offset.',
  ],
  [
    '--moduix-toast-close-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls close button focus ring width.',
  ],
  [
    '--moduix-toast-close-icon-size',
    'var(--moduix-spacing-3)',
    'Controls default close icon size.',
  ],
  [
    '--moduix-toast-close-offset-right',
    'var(--moduix-spacing-2)',
    'Controls close button right offset.',
  ],
  [
    '--moduix-toast-close-offset-top',
    'var(--moduix-spacing-2)',
    'Controls close button top offset.',
  ],
  [
    '--moduix-toast-close-radius',
    'var(--moduix-radius-sm)',
    'Controls close button border radius.',
  ],
  ['--moduix-toast-close-size', 'var(--moduix-spacing-7)', 'Controls close button size.'],
  [
    '--moduix-toast-close-transition',
    'var(--moduix-transition-default)',
    'Controls close button transition timing.',
  ],
  ['--moduix-toast-color', 'var(--moduix-color-popover-foreground)', 'Controls toast text color.'],
  [
    '--moduix-toast-content-gap',
    'var(--moduix-spacing-1)',
    'Controls spacing between title, description, and action.',
  ],
  [
    '--moduix-toast-description-color',
    'var(--moduix-color-muted-foreground)',
    'Controls description color.',
  ],
  [
    '--moduix-toast-description-font-size',
    'var(--moduix-text-sm)',
    'Controls description font size.',
  ],
  [
    '--moduix-toast-description-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls description line height.',
  ],
  [
    '--moduix-toast-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls action and close focus rings.',
  ],
  ['--moduix-toast-focus-ring-offset', '0', 'Controls action focus ring offset.'],
  [
    '--moduix-toast-focus-ring-width',
    'var(--moduix-toast-action-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))',
    'Controls action and close focus ring width.',
  ],
  ['--moduix-toast-min-height', '0', 'Controls root toast minimum height.'],
  ['--moduix-toast-padding', 'var(--moduix-spacing-4)', 'Controls root toast padding.'],
  ['--moduix-toast-radius', 'var(--moduix-radius-lg)', 'Controls toast border radius.'],
  ['--moduix-toast-shadow', 'var(--moduix-shadow-lg)', 'Controls toast shadow.'],
  ['--moduix-toast-title-font-size', 'var(--moduix-text-sm)', 'Controls title font size.'],
  ['--moduix-toast-title-gap', 'var(--moduix-spacing-2)', 'Controls spacing inside title content.'],
  [
    '--moduix-toast-title-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls title font weight.',
  ],
  [
    '--moduix-toast-title-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls title line height.',
  ],
  ['--moduix-toast-transition', '400ms', 'Controls toast movement transition.'],
  ['--moduix-toast-transition-out', '400ms', 'Controls exit movement transition.'],
  ['--moduix-toast-opacity-transition-out', '200ms', 'Controls exit opacity transition.'],
  [
    '--moduix-toast-viewport-inset',
    'var(--moduix-spacing-4)',
    'Controls toast max-width distance from the window edge.',
  ],
  ['--moduix-toast-width', '20rem', 'Controls toast width.'],
  ['--moduix-toast-z-index', 'var(--moduix-z-toast)', 'Controls toast stack z-index.'],
];

export const toastExampleCss = `
.toast-preview-stack {
  display: grid;
  gap: var(--moduix-spacing-3);
  justify-items: center;
}

.toast-preview-stack > [data-preview-meta] {
  justify-self: center;
}
`;

export function ToastCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={toastOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}