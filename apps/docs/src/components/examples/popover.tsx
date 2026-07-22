import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const popoverAnchorCss = `
  .popover-anchor-demo {
    display: grid;
    width: 100%;
    gap: var(--moduix-spacing-2);
  }
`;

const popoverOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-popover-arrow-size', 'var(--moduix-spacing-2-5)', 'Controls the Ark arrow size.'],
  [
    '--moduix-popover-arrow-stroke-color',
    'var(--moduix-popover-border-color)',
    'Controls arrow border color.',
  ],
  ['--moduix-popover-bg', 'var(--moduix-color-popover)', 'Controls the content background color.'],
  ['--moduix-popover-body-margin', '0', 'Controls body margin.'],
  ['--moduix-popover-border-color', 'var(--moduix-color-border)', 'Controls content border color.'],
  [
    '--moduix-popover-border-width',
    'var(--moduix-border-width-sm)',
    'Controls content border width.',
  ],
  [
    '--moduix-popover-color',
    'var(--moduix-color-popover-foreground)',
    'Controls content text color.',
  ],
  [
    '--moduix-popover-control-bg',
    'var(--moduix-color-background)',
    'Controls default trigger backgrounds.',
  ],
  [
    '--moduix-popover-control-bg-active',
    'var(--moduix-popover-control-bg-hover)',
    'Controls open trigger color.',
  ],
  [
    '--moduix-popover-control-bg-hover',
    'var(--moduix-color-accent)',
    'Controls control hover backgrounds.',
  ],
  [
    '--moduix-popover-control-border-color',
    'var(--moduix-color-border)',
    'Controls control border color.',
  ],
  [
    '--moduix-popover-control-border-width',
    'var(--moduix-border-width-sm)',
    'Controls control border width.',
  ],
  [
    '--moduix-popover-control-color',
    'var(--moduix-color-foreground)',
    'Controls control text color.',
  ],
  ['--moduix-popover-control-font-size', 'var(--moduix-text-md)', 'Controls control font size.'],
  ['--moduix-popover-control-height', 'var(--moduix-size-md)', 'Controls control min height.'],
  [
    '--moduix-popover-control-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls line height.',
  ],
  [
    '--moduix-popover-control-padding-x',
    'var(--moduix-spacing-3-5)',
    'Controls horizontal control padding.',
  ],
  [
    '--moduix-popover-control-padding-y',
    'var(--moduix-spacing-1)',
    'Controls vertical control padding.',
  ],
  ['--moduix-popover-control-radius', 'var(--moduix-radius-md)', 'Controls control radius.'],
  ['--moduix-popover-close-icon-bg', 'transparent', 'Controls close icon background.'],
  [
    '--moduix-popover-close-icon-bg-hover',
    'var(--moduix-color-accent)',
    'Controls close icon hover background.',
  ],
  [
    '--moduix-popover-close-icon-color',
    'var(--moduix-color-muted-foreground)',
    'Controls close icon color.',
  ],
  [
    '--moduix-popover-close-icon-color-hover',
    'var(--moduix-popover-color, var(--moduix-color-popover-foreground))',
    'Controls close icon hover color.',
  ],
  [
    '--moduix-popover-close-icon-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls close icon focus ring.',
  ],
  [
    '--moduix-popover-close-icon-glyph-size',
    'var(--moduix-spacing-3-5)',
    'Controls close icon glyph size.',
  ],
  ['--moduix-popover-close-icon-offset', 'var(--moduix-spacing-3)', 'Controls close icon offset.'],
  ['--moduix-popover-close-icon-radius', 'var(--moduix-radius-sm)', 'Controls close icon radius.'],
  ['--moduix-popover-close-icon-size', 'var(--moduix-spacing-7)', 'Controls close icon size.'],
  ['--moduix-popover-content-ending-opacity', '0', 'Controls exit opacity.'],
  ['--moduix-popover-content-ending-scale', 'var(--moduix-scale-popup)', 'Controls exit scale.'],
  ['--moduix-popover-content-ending-translate-x', '0', 'Controls exit horizontal offset.'],
  ['--moduix-popover-content-ending-translate-y', '0', 'Controls exit vertical offset.'],
  ['--moduix-popover-content-starting-opacity', '0', 'Controls enter opacity.'],
  ['--moduix-popover-content-starting-scale', 'var(--moduix-scale-popup)', 'Controls enter scale.'],
  ['--moduix-popover-content-starting-translate-x', '0', 'Controls enter horizontal offset.'],
  ['--moduix-popover-content-starting-translate-y', '0', 'Controls enter vertical offset.'],
  [
    '--moduix-popover-description-color',
    'var(--moduix-color-muted-foreground)',
    'Controls description color.',
  ],
  [
    '--moduix-popover-description-font-size',
    'var(--moduix-text-sm)',
    'Controls description font size.',
  ],
  [
    '--moduix-popover-description-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls line height.',
  ],
  ['--moduix-popover-description-margin', '0', 'Controls description margin.'],
  [
    '--moduix-popover-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  ['--moduix-popover-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-popover-focus-ring-width',
    'var(--moduix-popover-control-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))',
    'Controls ring width.',
  ],
  ['--moduix-popover-footer-gap', 'var(--moduix-spacing-2)', 'Controls footer action spacing.'],
  ['--moduix-popover-footer-justify', 'flex-end', 'Controls footer alignment.'],
  ['--moduix-popover-footer-margin', 'var(--moduix-spacing-3) 0 0', 'Controls footer margin.'],
  ['--moduix-popover-header-gap', 'var(--moduix-spacing-1)', 'Controls header spacing.'],
  [
    '--moduix-popover-header-padding-inline-end',
    'calc(var(--moduix-popover-close-icon-size, 1.75rem) + var(--moduix-popover-close-icon-offset, var(--moduix-spacing-3)))',
    'Controls header space reserved when CloseIcon is present.',
  ],
  ['--moduix-popover-height', 'auto', 'Controls content height.'],
  ['--moduix-popover-max-height', '24rem', 'Controls content max height.'],
  ['--moduix-popover-max-width', '28rem', 'Controls content max width.'],
  ['--moduix-popover-min-width', '16rem', 'Controls content min width.'],
  ['--moduix-popover-padding-x', 'var(--moduix-spacing-4)', 'Controls horizontal content padding.'],
  ['--moduix-popover-padding-y', 'var(--moduix-spacing-4)', 'Controls vertical content padding.'],
  ['--moduix-popover-radius', 'var(--moduix-radius-md)', 'Controls content radius.'],
  ['--moduix-popover-shadow', 'var(--moduix-shadow-lg)', 'Controls content shadow.'],
  ['--moduix-popover-title-color', 'var(--moduix-popover-color)', 'Controls title color.'],
  ['--moduix-popover-title-font-size', 'var(--moduix-text-md)', 'Controls title font size.'],
  ['--moduix-popover-title-font-weight', 'var(--moduix-weight-semibold)', 'Controls title weight.'],
  [
    '--moduix-popover-title-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls title line height.',
  ],
  [
    '--moduix-popover-transition',
    'var(--moduix-duration-fast)',
    'Controls content animation duration.',
  ],
  ['--moduix-popover-width', 'auto', 'Controls content width.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function PopoverCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={popoverOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}