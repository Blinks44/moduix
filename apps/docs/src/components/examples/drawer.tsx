import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const drawerOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-drawer-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Backdrop background.',
  ],
  ['--moduix-drawer-backdrop-blur', '4px', 'Backdrop blur amount.'],
  [
    '--moduix-drawer-backdrop-transition',
    'var(--moduix-transition-spring)',
    'Backdrop enter and exit motion.',
  ],
  ['--moduix-drawer-bg', 'var(--moduix-color-popover)', 'Content background.'],
  ['--moduix-drawer-body-margin-top', 'var(--moduix-spacing-4)', 'Space above body content.'],
  ['--moduix-drawer-bleed-size', 'var(--moduix-size-xl)', 'Overdrag background extension.'],
  ['--moduix-drawer-border-color', 'var(--moduix-color-border)', 'Content border color.'],
  ['--moduix-drawer-border-width', 'var(--moduix-border-width-sm)', 'Content border width.'],
  ['--moduix-drawer-color', 'var(--moduix-color-popover-foreground)', 'Content text color.'],
  ['--moduix-drawer-close-icon-bg', 'transparent', 'Close icon button background.'],
  [
    '--moduix-drawer-close-icon-bg-hover',
    'var(--moduix-color-accent)',
    'Close icon button hover background.',
  ],
  [
    '--moduix-drawer-close-icon-color',
    'var(--moduix-drawer-description-color, var(--moduix-color-muted-foreground))',
    'Close icon button color.',
  ],
  [
    '--moduix-drawer-close-icon-color-hover',
    'var(--moduix-drawer-color, var(--moduix-color-popover-foreground))',
    'Close icon button hover color.',
  ],
  [
    '--moduix-drawer-close-icon-focus-ring-color',
    'var(--moduix-drawer-focus-ring-color, var(--moduix-color-ring))',
    'Close icon button focus ring color.',
  ],
  ['--moduix-drawer-close-icon-glyph-size', 'var(--moduix-spacing-3)', 'Close icon glyph size.'],
  ['--moduix-drawer-close-icon-radius', 'var(--moduix-radius-md)', 'Close icon button radius.'],
  ['--moduix-drawer-close-icon-size', 'var(--moduix-spacing-7)', 'Close icon button size.'],
  ['--moduix-drawer-control-bg', 'var(--moduix-color-background)', 'Default trigger background.'],
  [
    '--moduix-drawer-control-bg-hover',
    'var(--moduix-color-accent)',
    'Default trigger hover background.',
  ],
  [
    '--moduix-drawer-control-border-color',
    'var(--moduix-color-border)',
    'Default trigger border color.',
  ],
  [
    '--moduix-drawer-control-border-width',
    'var(--moduix-border-width-sm)',
    'Default trigger border width.',
  ],
  [
    '--moduix-drawer-control-color',
    'var(--moduix-color-foreground)',
    'Default trigger text color.',
  ],
  ['--moduix-drawer-control-font-size', 'var(--moduix-text-md)', 'Default trigger font size.'],
  ['--moduix-drawer-control-height', 'var(--moduix-size-md)', 'Default trigger minimum height.'],
  [
    '--moduix-drawer-control-line-height',
    'var(--moduix-line-height-text-md)',
    'Default trigger line height.',
  ],
  [
    '--moduix-drawer-control-padding-x',
    'var(--moduix-spacing-3-5)',
    'Default trigger horizontal padding.',
  ],
  [
    '--moduix-drawer-control-padding-y',
    'var(--moduix-spacing-1)',
    'Default trigger vertical padding.',
  ],
  ['--moduix-drawer-control-radius', 'var(--moduix-radius-md)', 'Default trigger radius.'],
  [
    '--moduix-drawer-description-color',
    'var(--moduix-color-muted-foreground)',
    'Secondary text color.',
  ],
  ['--moduix-drawer-description-font-size', 'var(--moduix-text-md)', 'Secondary text size.'],
  [
    '--moduix-drawer-description-line-height',
    'var(--moduix-line-height-text-md)',
    'Secondary line height.',
  ],
  ['--moduix-drawer-focus-ring-color', 'var(--moduix-color-ring)', 'Interactive focus ring color.'],
  [
    '--moduix-drawer-focus-ring-width',
    'var(--moduix-drawer-control-border-width, var(--moduix-border-width-sm))',
    'Focus ring width.',
  ],
  ['--moduix-drawer-footer-gap', 'var(--moduix-spacing-2)', 'Footer action gap.'],
  ['--moduix-drawer-footer-margin-top', 'var(--moduix-spacing-6)', 'Space above the footer.'],
  [
    '--moduix-drawer-grabber-indicator-bg',
    'var(--moduix-color-muted-foreground)',
    'Grabber indicator color.',
  ],
  ['--moduix-drawer-grabber-indicator-height', '0.25rem', 'Grabber indicator height.'],
  ['--moduix-drawer-grabber-indicator-opacity', '0.45', 'Grabber indicator opacity.'],
  ['--moduix-drawer-grabber-indicator-opacity-hover', '0.7', 'Grabber indicator hover opacity.'],
  [
    '--moduix-drawer-grabber-indicator-radius',
    'var(--moduix-radius-full)',
    'Grabber indicator radius.',
  ],
  ['--moduix-drawer-grabber-indicator-width', '3rem', 'Grabber indicator width.'],
  ['--moduix-drawer-grabber-padding', 'var(--moduix-spacing-3)', 'Grabber vertical padding.'],
  ['--moduix-drawer-header-gap', 'var(--moduix-spacing-1)', 'Header gap.'],
  [
    '--moduix-drawer-indent-background-bg',
    'var(--moduix-color-foreground)',
    'Indent background color.',
  ],
  ['--moduix-drawer-indent-background-opacity', '0', 'Idle indent background opacity.'],
  ['--moduix-drawer-indent-background-opacity-active', '1', 'Active indent background opacity.'],
  ['--moduix-drawer-indent-radius-active', 'var(--moduix-radius-lg)', 'Active indent radius.'],
  ['--moduix-drawer-indent-scale-active', '0.97', 'Active indent scale.'],
  ['--moduix-drawer-indent-transition', 'var(--moduix-transition-spring)', 'Indent motion.'],
  [
    '--moduix-drawer-indent-translate-y-active',
    'var(--moduix-spacing-2)',
    'Active indent translation.',
  ],
  ['--moduix-drawer-island-inset', 'var(--moduix-spacing-4)', 'Inset around island drawers.'],
  ['--moduix-drawer-max-height', '80dvh', 'Maximum vertical drawer height.'],
  ['--moduix-drawer-nested-scale-step', '0.05', 'Scale step for nested drawers.'],
  [
    '--moduix-drawer-nested-transition',
    'var(--moduix-drawer-transition, var(--moduix-transition-spring))',
    'Nested drawer scale and offset motion.',
  ],
  [
    '--moduix-drawer-nested-translate-step',
    'var(--moduix-spacing-10)',
    'Offset step for nested drawers.',
  ],
  ['--moduix-drawer-padding-x', 'var(--moduix-spacing-6)', 'Content horizontal padding.'],
  ['--moduix-drawer-padding-y', 'var(--moduix-spacing-4)', 'Content vertical padding.'],
  ['--moduix-drawer-positioner-padding', '0', 'Positioner inset padding.'],
  ['--moduix-drawer-radius', 'var(--moduix-radius-xl)', 'Content radius.'],
  ['--moduix-drawer-shadow', 'var(--moduix-shadow-lg)', 'Content shadow.'],
  ['--moduix-drawer-side-height', '100%', 'Height of start/end drawers.'],
  ['--moduix-drawer-side-width', '22rem', 'Width of start/end drawers.'],
  [
    '--moduix-drawer-size',
    '100%',
    'Base content size used by Ark drag and snap-point measurement.',
  ],
  ['--moduix-drawer-swipe-area-size', 'var(--moduix-spacing-10)', 'Edge-open gesture area size.'],
  ['--moduix-drawer-title-color', 'var(--moduix-drawer-color)', 'Title color.'],
  ['--moduix-drawer-title-font-size', 'var(--moduix-text-lg)', 'Title size.'],
  ['--moduix-drawer-title-font-weight', 'var(--moduix-weight-semibold)', 'Title weight.'],
  ['--moduix-drawer-title-line-height', 'var(--moduix-line-height-text-lg)', 'Title line height.'],
  [
    '--moduix-drawer-transition',
    'var(--moduix-transition-spring)',
    'Content enter, snap-back, and exit motion.',
  ],
  ['--moduix-drawer-width', '100%', 'Width of up/down drawers.'],
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