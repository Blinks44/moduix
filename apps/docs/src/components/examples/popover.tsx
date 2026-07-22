import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const popoverOverrideCssProperties: CssPropertyInput[] = [
  ['--popover-arrow-size', 'var(--spacing-2-5)', 'Controls the Ark arrow size.'],
  ['--popover-arrow-stroke-color', 'var(--popover-border-color)', 'Controls arrow border color.'],
  ['--popover-bg', 'var(--color-popover)', 'Controls the content background color.'],
  ['--popover-body-margin', '0', 'Controls body margin.'],
  ['--popover-border-color', 'var(--color-border)', 'Controls content border color.'],
  ['--popover-border-width', 'var(--border-width-sm)', 'Controls content border width.'],
  ['--popover-color', 'var(--color-popover-foreground)', 'Controls content text color.'],
  ['--popover-control-bg', 'var(--color-background)', 'Controls default trigger backgrounds.'],
  [
    '--popover-control-bg-active',
    'var(--popover-control-bg-hover)',
    'Controls open trigger color.',
  ],
  ['--popover-control-bg-hover', 'var(--color-accent)', 'Controls control hover backgrounds.'],
  ['--popover-control-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--popover-control-border-width', 'var(--border-width-sm)', 'Controls control border width.'],
  ['--popover-control-color', 'var(--color-foreground)', 'Controls control text color.'],
  ['--popover-control-font-size', 'var(--text-md)', 'Controls control font size.'],
  ['--popover-control-height', 'var(--size-md)', 'Controls control min height.'],
  ['--popover-control-line-height', 'var(--line-height-text-md)', 'Controls line height.'],
  ['--popover-control-padding-x', 'var(--spacing-3-5)', 'Controls horizontal control padding.'],
  ['--popover-control-padding-y', 'var(--spacing-1)', 'Controls vertical control padding.'],
  ['--popover-control-radius', 'var(--radius-md)', 'Controls control radius.'],
  ['--popover-close-icon-bg', 'transparent', 'Controls close icon background.'],
  ['--popover-close-icon-bg-hover', 'var(--color-accent)', 'Controls close icon hover background.'],
  ['--popover-close-icon-color', 'var(--color-muted-foreground)', 'Controls close icon color.'],
  [
    '--popover-close-icon-color-hover',
    'var(--popover-color, var(--color-popover-foreground))',
    'Controls close icon hover color.',
  ],
  ['--popover-close-icon-focus-ring-color', 'var(--color-ring)', 'Controls close icon focus ring.'],
  ['--popover-close-icon-glyph-size', 'var(--spacing-3-5)', 'Controls close icon glyph size.'],
  ['--popover-close-icon-offset', 'var(--spacing-3)', 'Controls close icon offset.'],
  ['--popover-close-icon-radius', 'var(--radius-sm)', 'Controls close icon radius.'],
  ['--popover-close-icon-size', 'var(--spacing-7)', 'Controls close icon size.'],
  ['--popover-content-ending-opacity', '0', 'Controls exit opacity.'],
  ['--popover-content-ending-scale', 'var(--scale-popup)', 'Controls exit scale.'],
  ['--popover-content-ending-translate-x', '0', 'Controls exit horizontal offset.'],
  ['--popover-content-ending-translate-y', '0', 'Controls exit vertical offset.'],
  ['--popover-content-starting-opacity', '0', 'Controls enter opacity.'],
  ['--popover-content-starting-scale', 'var(--scale-popup)', 'Controls enter scale.'],
  ['--popover-content-starting-translate-x', '0', 'Controls enter horizontal offset.'],
  ['--popover-content-starting-translate-y', '0', 'Controls enter vertical offset.'],
  ['--popover-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--popover-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  ['--popover-description-line-height', 'var(--line-height-text-sm)', 'Controls line height.'],
  ['--popover-description-margin', '0', 'Controls description margin.'],
  ['--popover-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--popover-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--popover-focus-ring-width',
    'var(--popover-control-border-width, var(--focus-ring-inset-width, var(--border-width-sm)))',
    'Controls ring width.',
  ],
  ['--popover-footer-gap', 'var(--spacing-2)', 'Controls footer action spacing.'],
  ['--popover-footer-justify', 'flex-end', 'Controls footer alignment.'],
  ['--popover-footer-margin', 'var(--spacing-3) 0 0', 'Controls footer margin.'],
  ['--popover-header-gap', 'var(--spacing-1)', 'Controls header spacing.'],
  [
    '--popover-header-padding-inline-end',
    'calc(var(--popover-close-icon-size, 1.75rem) + var(--popover-close-icon-offset, var(--spacing-3)))',
    'Controls header space reserved when CloseIcon is present.',
  ],
  ['--popover-height', 'auto', 'Controls content height.'],
  ['--popover-max-height', '24rem', 'Controls content max height.'],
  ['--popover-max-width', '28rem', 'Controls content max width.'],
  ['--popover-min-width', '16rem', 'Controls content min width.'],
  ['--popover-padding-x', 'var(--spacing-4)', 'Controls horizontal content padding.'],
  ['--popover-padding-y', 'var(--spacing-4)', 'Controls vertical content padding.'],
  ['--popover-radius', 'var(--radius-md)', 'Controls content radius.'],
  ['--popover-shadow', 'var(--shadow-lg)', 'Controls content shadow.'],
  ['--popover-title-color', 'var(--popover-color)', 'Controls title color.'],
  ['--popover-title-font-size', 'var(--text-md)', 'Controls title font size.'],
  ['--popover-title-font-weight', 'var(--weight-semibold)', 'Controls title weight.'],
  ['--popover-title-line-height', 'var(--line-height-text-md)', 'Controls title line height.'],
  ['--popover-transition', 'var(--duration-fast)', 'Controls content animation duration.'],
  ['--popover-width', 'auto', 'Controls content width.'],
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