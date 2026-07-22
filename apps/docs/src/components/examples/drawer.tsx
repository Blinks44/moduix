import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const drawerOverrideCssProperties: CssPropertyInput[] = [
  ['--drawer-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Backdrop background.'],
  ['--drawer-backdrop-blur', '4px', 'Backdrop blur amount.'],
  ['--drawer-backdrop-transition', 'var(--transition-spring)', 'Backdrop enter and exit motion.'],
  ['--drawer-bg', 'var(--color-popover)', 'Content background.'],
  ['--drawer-body-margin-top', 'var(--spacing-4)', 'Space above body content.'],
  ['--drawer-bleed-size', 'var(--size-xl)', 'Overdrag background extension.'],
  ['--drawer-border-color', 'var(--color-border)', 'Content border color.'],
  ['--drawer-border-width', 'var(--border-width-sm)', 'Content border width.'],
  ['--drawer-color', 'var(--color-popover-foreground)', 'Content text color.'],
  ['--drawer-close-icon-bg', 'transparent', 'Close icon button background.'],
  ['--drawer-close-icon-bg-hover', 'var(--color-accent)', 'Close icon button hover background.'],
  [
    '--drawer-close-icon-color',
    'var(--drawer-description-color, var(--color-muted-foreground))',
    'Close icon button color.',
  ],
  [
    '--drawer-close-icon-color-hover',
    'var(--drawer-color, var(--color-popover-foreground))',
    'Close icon button hover color.',
  ],
  [
    '--drawer-close-icon-focus-ring-color',
    'var(--drawer-focus-ring-color, var(--color-ring))',
    'Close icon button focus ring color.',
  ],
  ['--drawer-close-icon-glyph-size', 'var(--spacing-3)', 'Close icon glyph size.'],
  ['--drawer-close-icon-radius', 'var(--radius-md)', 'Close icon button radius.'],
  ['--drawer-close-icon-size', 'var(--spacing-7)', 'Close icon button size.'],
  ['--drawer-control-bg', 'var(--color-background)', 'Default trigger background.'],
  ['--drawer-control-bg-hover', 'var(--color-accent)', 'Default trigger hover background.'],
  ['--drawer-control-border-color', 'var(--color-border)', 'Default trigger border color.'],
  ['--drawer-control-border-width', 'var(--border-width-sm)', 'Default trigger border width.'],
  ['--drawer-control-color', 'var(--color-foreground)', 'Default trigger text color.'],
  ['--drawer-control-font-size', 'var(--text-md)', 'Default trigger font size.'],
  ['--drawer-control-height', 'var(--size-md)', 'Default trigger minimum height.'],
  ['--drawer-control-line-height', 'var(--line-height-text-md)', 'Default trigger line height.'],
  ['--drawer-control-padding-x', 'var(--spacing-3-5)', 'Default trigger horizontal padding.'],
  ['--drawer-control-padding-y', 'var(--spacing-1)', 'Default trigger vertical padding.'],
  ['--drawer-control-radius', 'var(--radius-md)', 'Default trigger radius.'],
  ['--drawer-description-color', 'var(--color-muted-foreground)', 'Secondary text color.'],
  ['--drawer-description-font-size', 'var(--text-md)', 'Secondary text size.'],
  ['--drawer-description-line-height', 'var(--line-height-text-md)', 'Secondary line height.'],
  ['--drawer-focus-ring-color', 'var(--color-ring)', 'Interactive focus ring color.'],
  [
    '--drawer-focus-ring-width',
    'var(--drawer-control-border-width, var(--border-width-sm))',
    'Focus ring width.',
  ],
  ['--drawer-footer-gap', 'var(--spacing-2)', 'Footer action gap.'],
  ['--drawer-footer-margin-top', 'var(--spacing-6)', 'Space above the footer.'],
  ['--drawer-grabber-indicator-bg', 'var(--color-muted-foreground)', 'Grabber indicator color.'],
  ['--drawer-grabber-indicator-height', '0.25rem', 'Grabber indicator height.'],
  ['--drawer-grabber-indicator-opacity', '0.45', 'Grabber indicator opacity.'],
  ['--drawer-grabber-indicator-opacity-hover', '0.7', 'Grabber indicator hover opacity.'],
  ['--drawer-grabber-indicator-radius', 'var(--radius-full)', 'Grabber indicator radius.'],
  ['--drawer-grabber-indicator-width', '3rem', 'Grabber indicator width.'],
  ['--drawer-grabber-padding', 'var(--spacing-3)', 'Grabber vertical padding.'],
  ['--drawer-header-gap', 'var(--spacing-1)', 'Header gap.'],
  ['--drawer-indent-background-bg', 'var(--color-foreground)', 'Indent background color.'],
  ['--drawer-indent-background-opacity', '0', 'Idle indent background opacity.'],
  ['--drawer-indent-background-opacity-active', '1', 'Active indent background opacity.'],
  ['--drawer-indent-radius-active', 'var(--radius-lg)', 'Active indent radius.'],
  ['--drawer-indent-scale-active', '0.97', 'Active indent scale.'],
  ['--drawer-indent-transition', 'var(--transition-spring)', 'Indent motion.'],
  ['--drawer-indent-translate-y-active', 'var(--spacing-2)', 'Active indent translation.'],
  ['--drawer-max-height', '80dvh', 'Maximum vertical drawer height.'],
  ['--drawer-nested-scale-step', '0.05', 'Scale step for nested drawers.'],
  [
    '--drawer-nested-transition',
    'var(--drawer-transition, var(--transition-spring))',
    'Nested drawer scale and offset motion.',
  ],
  ['--drawer-nested-translate-step', 'var(--spacing-10)', 'Offset step for nested drawers.'],
  ['--drawer-padding-x', 'var(--spacing-6)', 'Content horizontal padding.'],
  ['--drawer-padding-y', 'var(--spacing-4)', 'Content vertical padding.'],
  ['--drawer-positioner-padding', '0', 'Positioner inset padding.'],
  ['--drawer-radius', 'var(--radius-xl)', 'Content radius.'],
  ['--drawer-shadow', 'var(--shadow-lg)', 'Content shadow.'],
  ['--drawer-side-height', '100%', 'Height of start/end drawers.'],
  ['--drawer-side-width', '22rem', 'Width of start/end drawers.'],
  ['--drawer-size', '100%', 'Base content size used by Ark drag and snap-point measurement.'],
  ['--drawer-swipe-area-size', 'var(--spacing-10)', 'Edge-open gesture area size.'],
  ['--drawer-title-color', 'var(--drawer-color)', 'Title color.'],
  ['--drawer-title-font-size', 'var(--text-lg)', 'Title size.'],
  ['--drawer-title-font-weight', 'var(--weight-semibold)', 'Title weight.'],
  ['--drawer-title-line-height', 'var(--line-height-text-lg)', 'Title line height.'],
  ['--drawer-transition', 'var(--transition-spring)', 'Content enter, snap-back, and exit motion.'],
  ['--drawer-width', '100%', 'Width of up/down drawers.'],
];

export function DrawerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={drawerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}