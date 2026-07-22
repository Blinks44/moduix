import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const floatingPanelOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-floating-panel-behind-opacity', '0.55', 'Opacity when another panel is topmost.'],
  ['--moduix-floating-panel-bg', 'var(--moduix-color-popover)', 'Panel surface background.'],
  [
    '--moduix-floating-panel-body-color',
    'var(--moduix-floating-panel-color, var(--moduix-color-popover-foreground))',
    'Body text color.',
  ],
  ['--moduix-floating-panel-body-font-size', 'var(--moduix-text-sm)', 'Body text size.'],
  [
    '--moduix-floating-panel-body-line-height',
    'var(--moduix-line-height-text-sm)',
    'Body line height.',
  ],
  ['--moduix-floating-panel-body-padding', 'var(--moduix-spacing-4)', 'Body padding.'],
  ['--moduix-floating-panel-border-color', 'var(--moduix-color-border)', 'Panel border color.'],
  ['--moduix-floating-panel-border-width', 'var(--moduix-border-width-sm)', 'Panel border width.'],
  ['--moduix-floating-panel-color', 'var(--moduix-color-popover-foreground)', 'Panel text color.'],
  [
    '--moduix-floating-panel-control-bg',
    'var(--moduix-color-background)',
    'Control button background.',
  ],
  [
    '--moduix-floating-panel-control-bg-hover',
    'var(--moduix-color-accent)',
    'Control hover background.',
  ],
  [
    '--moduix-floating-panel-control-border-color',
    'var(--moduix-color-border)',
    'Control border color.',
  ],
  [
    '--moduix-floating-panel-control-border-width',
    'var(--moduix-border-width-sm)',
    'Control border width.',
  ],
  [
    '--moduix-floating-panel-control-color',
    'var(--moduix-color-foreground)',
    'Control text and icon color.',
  ],
  [
    '--moduix-floating-panel-control-gap',
    'var(--moduix-spacing-1)',
    'Spacing between control buttons.',
  ],
  [
    '--moduix-floating-panel-control-icon-size',
    'var(--moduix-spacing-4)',
    'Default control icon size.',
  ],
  ['--moduix-floating-panel-control-radius', 'var(--moduix-radius-sm)', 'Control button radius.'],
  ['--moduix-floating-panel-control-size', 'var(--moduix-size-sm)', 'Control button square size.'],
  [
    '--moduix-floating-panel-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Disabled part opacity.',
  ],
  [
    '--moduix-floating-panel-drag-indicator-color',
    'var(--moduix-color-muted-foreground)',
    'Grip icon color.',
  ],
  ['--moduix-floating-panel-drag-indicator-size', 'var(--moduix-spacing-4)', 'Grip icon size.'],
  ['--moduix-floating-panel-ending-opacity', '0', 'Exit animation opacity.'],
  ['--moduix-floating-panel-ending-scale', 'var(--moduix-scale-popup)', 'Exit animation scale.'],
  ['--moduix-floating-panel-ending-translate-x', '0', 'Exit horizontal offset.'],
  ['--moduix-floating-panel-ending-translate-y', '0', 'Exit vertical offset.'],
  ['--moduix-floating-panel-focus-ring-color', 'var(--moduix-color-ring)', 'Focus ring color.'],
  [
    '--moduix-floating-panel-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Focus ring width.',
  ],
  [
    '--moduix-floating-panel-footer-border-color',
    'var(--moduix-floating-panel-border-color, var(--moduix-color-border))',
    'Customizes floating panel footer border color.',
  ],
  [
    '--moduix-floating-panel-footer-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes floating panel footer border width.',
  ],
  [
    '--moduix-floating-panel-footer-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes floating panel footer color.',
  ],
  [
    '--moduix-floating-panel-footer-font-size',
    'var(--moduix-text-xs)',
    'Customizes floating panel footer font size.',
  ],
  [
    '--moduix-floating-panel-footer-gap',
    'var(--moduix-spacing-2)',
    'Customizes floating panel footer gap.',
  ],
  [
    '--moduix-floating-panel-footer-justify',
    'flex-end',
    'Customizes floating panel footer justify.',
  ],
  [
    '--moduix-floating-panel-footer-line-height',
    'var(--moduix-line-height-text-xs)',
    'Customizes floating panel footer line height.',
  ],
  [
    '--moduix-floating-panel-footer-padding-x',
    'var(--moduix-spacing-3)',
    'Customizes floating panel footer padding x.',
  ],
  [
    '--moduix-floating-panel-footer-padding-y',
    'var(--moduix-spacing-2)',
    'Customizes floating panel footer padding y.',
  ],
  ['--moduix-floating-panel-header-bg', 'var(--moduix-color-muted)', 'Header background.'],
  [
    '--moduix-floating-panel-header-border-color',
    'var(--moduix-floating-panel-border-color, var(--moduix-color-border))',
    'Header border color.',
  ],
  [
    '--moduix-floating-panel-header-border-width',
    'var(--moduix-border-width-sm)',
    'Header border width.',
  ],
  ['--moduix-floating-panel-header-gap', 'var(--moduix-spacing-3)', 'Header content gap.'],
  ['--moduix-floating-panel-header-height', 'var(--moduix-size-xl)', 'Header minimum height.'],
  [
    '--moduix-floating-panel-header-padding-x',
    'var(--moduix-spacing-3)',
    'Header horizontal padding.',
  ],
  [
    '--moduix-floating-panel-header-padding-y',
    'var(--moduix-spacing-2)',
    'Header vertical padding.',
  ],
  ['--moduix-floating-panel-height', '100%', 'Content height inside Ark positioner.'],
  ['--moduix-floating-panel-min-height', '10rem', 'Minimum content height.'],
  ['--moduix-floating-panel-min-width', '16rem', 'Minimum content width.'],
  ['--moduix-floating-panel-radius', 'var(--moduix-radius-md)', 'Panel radius.'],
  [
    '--moduix-floating-panel-resize-corner-size',
    'var(--moduix-spacing-3)',
    'Corner resize handle size.',
  ],
  [
    '--moduix-floating-panel-resize-edge-inset',
    'var(--moduix-spacing-3)',
    'Edge resize handle inset.',
  ],
  [
    '--moduix-floating-panel-resize-edge-size',
    'var(--moduix-spacing-2)',
    'Edge resize handle thickness.',
  ],
  ['--moduix-floating-panel-shadow', 'var(--moduix-shadow-lg)', 'Panel shadow.'],
  ['--moduix-floating-panel-starting-opacity', '0', 'Enter animation opacity.'],
  ['--moduix-floating-panel-starting-scale', 'var(--moduix-scale-popup)', 'Enter animation scale.'],
  ['--moduix-floating-panel-starting-translate-x', '0', 'Enter horizontal offset.'],
  ['--moduix-floating-panel-starting-translate-y', '0', 'Enter vertical offset.'],
  [
    '--moduix-floating-panel-title-color',
    'var(--moduix-floating-panel-color, var(--moduix-color-popover-foreground))',
    'Title color.',
  ],
  ['--moduix-floating-panel-title-font-size', 'var(--moduix-text-sm)', 'Title text size.'],
  ['--moduix-floating-panel-title-font-weight', 'var(--moduix-weight-semibold)', 'Title weight.'],
  ['--moduix-floating-panel-title-gap', 'var(--moduix-spacing-2)', 'Title inline gap.'],
  [
    '--moduix-floating-panel-title-line-height',
    'var(--moduix-line-height-text-sm)',
    'Title line height.',
  ],
  [
    '--moduix-floating-panel-transition',
    'var(--moduix-transition-default)',
    'Shared transition timing.',
  ],
  [
    '--moduix-floating-panel-trigger-bg',
    'var(--moduix-color-background)',
    'Default trigger background.',
  ],
  [
    '--moduix-floating-panel-trigger-bg-active',
    'var(--moduix-floating-panel-trigger-bg-hover, var(--moduix-color-accent))',
    'Open trigger background.',
  ],
  [
    '--moduix-floating-panel-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Default trigger hover background.',
  ],
  [
    '--moduix-floating-panel-trigger-border-color',
    'var(--moduix-color-border)',
    'Default trigger border color.',
  ],
  [
    '--moduix-floating-panel-trigger-border-width',
    'var(--moduix-border-width-sm)',
    'Default trigger border width.',
  ],
  [
    '--moduix-floating-panel-trigger-color',
    'var(--moduix-color-foreground)',
    'Default trigger text color.',
  ],
  [
    '--moduix-floating-panel-trigger-font-size',
    'var(--moduix-text-md)',
    'Default trigger text size.',
  ],
  [
    '--moduix-floating-panel-trigger-height',
    'var(--moduix-size-md)',
    'Default trigger minimum height.',
  ],
  [
    '--moduix-floating-panel-trigger-line-height',
    'var(--moduix-line-height-text-md)',
    'Default trigger line height.',
  ],
  [
    '--moduix-floating-panel-trigger-padding-x',
    'var(--moduix-spacing-3)',
    'Default trigger horizontal padding.',
  ],
  [
    '--moduix-floating-panel-trigger-padding-y',
    'var(--moduix-spacing-1)',
    'Default trigger vertical padding.',
  ],
  ['--moduix-floating-panel-trigger-radius', 'var(--moduix-radius-md)', 'Default trigger radius.'],
  ['--moduix-floating-panel-width', '100%', 'Content width inside Ark positioner.'],
  ['--moduix-floating-panel-z-index', 'var(--moduix-z-popup)', 'Fallback panel z-index.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function FloatingPanelCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={floatingPanelOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}