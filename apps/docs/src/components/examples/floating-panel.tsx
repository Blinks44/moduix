import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const floatingPanelOverrideCssProperties: CssPropertyInput[] = [
  ['--floating-panel-behind-opacity', '0.55', 'Opacity when another panel is topmost.'],
  ['--floating-panel-bg', 'var(--color-popover)', 'Panel surface background.'],
  [
    '--floating-panel-body-color',
    'var(--floating-panel-color, var(--color-popover-foreground))',
    'Body text color.',
  ],
  ['--floating-panel-body-font-size', 'var(--text-sm)', 'Body text size.'],
  ['--floating-panel-body-line-height', 'var(--line-height-text-sm)', 'Body line height.'],
  ['--floating-panel-body-padding', 'var(--spacing-4)', 'Body padding.'],
  ['--floating-panel-border-color', 'var(--color-border)', 'Panel border color.'],
  ['--floating-panel-border-width', 'var(--border-width-sm)', 'Panel border width.'],
  ['--floating-panel-color', 'var(--color-popover-foreground)', 'Panel text color.'],
  ['--floating-panel-control-bg', 'var(--color-background)', 'Control button background.'],
  ['--floating-panel-control-bg-hover', 'var(--color-accent)', 'Control hover background.'],
  ['--floating-panel-control-border-color', 'var(--color-border)', 'Control border color.'],
  ['--floating-panel-control-border-width', 'var(--border-width-sm)', 'Control border width.'],
  ['--floating-panel-control-color', 'var(--color-foreground)', 'Control text and icon color.'],
  ['--floating-panel-control-gap', 'var(--spacing-1)', 'Spacing between control buttons.'],
  ['--floating-panel-control-icon-size', 'var(--spacing-4)', 'Default control icon size.'],
  ['--floating-panel-control-radius', 'var(--radius-sm)', 'Control button radius.'],
  ['--floating-panel-control-size', 'var(--size-sm)', 'Control button square size.'],
  ['--floating-panel-disabled-opacity', 'var(--opacity-disabled)', 'Disabled part opacity.'],
  ['--floating-panel-drag-indicator-color', 'var(--color-muted-foreground)', 'Grip icon color.'],
  ['--floating-panel-drag-indicator-size', 'var(--spacing-4)', 'Grip icon size.'],
  ['--floating-panel-ending-opacity', '0', 'Exit animation opacity.'],
  ['--floating-panel-ending-scale', 'var(--scale-popup)', 'Exit animation scale.'],
  ['--floating-panel-ending-translate-x', '0', 'Exit horizontal offset.'],
  ['--floating-panel-ending-translate-y', '0', 'Exit vertical offset.'],
  ['--floating-panel-focus-ring-color', 'var(--color-ring)', 'Focus ring color.'],
  [
    '--floating-panel-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Focus ring width.',
  ],
  [
    '--floating-panel-footer-border-color',
    'var(--floating-panel-border-color, var(--color-border))',
    'Customizes floating panel footer border color.',
  ],
  [
    '--floating-panel-footer-border-width',
    'var(--border-width-sm)',
    'Customizes floating panel footer border width.',
  ],
  [
    '--floating-panel-footer-color',
    'var(--color-muted-foreground)',
    'Customizes floating panel footer color.',
  ],
  [
    '--floating-panel-footer-font-size',
    'var(--text-xs)',
    'Customizes floating panel footer font size.',
  ],
  ['--floating-panel-footer-gap', 'var(--spacing-2)', 'Customizes floating panel footer gap.'],
  ['--floating-panel-footer-justify', 'flex-end', 'Customizes floating panel footer justify.'],
  [
    '--floating-panel-footer-line-height',
    'var(--line-height-text-xs)',
    'Customizes floating panel footer line height.',
  ],
  [
    '--floating-panel-footer-padding-x',
    'var(--spacing-3)',
    'Customizes floating panel footer padding x.',
  ],
  [
    '--floating-panel-footer-padding-y',
    'var(--spacing-2)',
    'Customizes floating panel footer padding y.',
  ],
  ['--floating-panel-header-bg', 'var(--color-muted)', 'Header background.'],
  [
    '--floating-panel-header-border-color',
    'var(--floating-panel-border-color, var(--color-border))',
    'Header border color.',
  ],
  ['--floating-panel-header-border-width', 'var(--border-width-sm)', 'Header border width.'],
  ['--floating-panel-header-gap', 'var(--spacing-3)', 'Header content gap.'],
  ['--floating-panel-header-height', 'var(--size-xl)', 'Header minimum height.'],
  ['--floating-panel-header-padding-x', 'var(--spacing-3)', 'Header horizontal padding.'],
  ['--floating-panel-header-padding-y', 'var(--spacing-2)', 'Header vertical padding.'],
  ['--floating-panel-height', '100%', 'Content height inside Ark positioner.'],
  ['--floating-panel-min-height', '10rem', 'Minimum content height.'],
  ['--floating-panel-min-width', '16rem', 'Minimum content width.'],
  ['--floating-panel-radius', 'var(--radius-md)', 'Panel radius.'],
  ['--floating-panel-resize-corner-size', 'var(--spacing-3)', 'Corner resize handle size.'],
  ['--floating-panel-resize-edge-inset', 'var(--spacing-3)', 'Edge resize handle inset.'],
  ['--floating-panel-resize-edge-size', 'var(--spacing-2)', 'Edge resize handle thickness.'],
  ['--floating-panel-shadow', 'var(--shadow-lg)', 'Panel shadow.'],
  ['--floating-panel-starting-opacity', '0', 'Enter animation opacity.'],
  ['--floating-panel-starting-scale', 'var(--scale-popup)', 'Enter animation scale.'],
  ['--floating-panel-starting-translate-x', '0', 'Enter horizontal offset.'],
  ['--floating-panel-starting-translate-y', '0', 'Enter vertical offset.'],
  [
    '--floating-panel-title-color',
    'var(--floating-panel-color, var(--color-popover-foreground))',
    'Title color.',
  ],
  ['--floating-panel-title-font-size', 'var(--text-sm)', 'Title text size.'],
  ['--floating-panel-title-font-weight', 'var(--weight-semibold)', 'Title weight.'],
  ['--floating-panel-title-gap', 'var(--spacing-2)', 'Title inline gap.'],
  ['--floating-panel-title-line-height', 'var(--line-height-text-sm)', 'Title line height.'],
  ['--floating-panel-transition', 'var(--transition-default)', 'Shared transition timing.'],
  ['--floating-panel-trigger-bg', 'var(--color-background)', 'Default trigger background.'],
  [
    '--floating-panel-trigger-bg-active',
    'var(--floating-panel-trigger-bg-hover, var(--color-accent))',
    'Open trigger background.',
  ],
  ['--floating-panel-trigger-bg-hover', 'var(--color-accent)', 'Default trigger hover background.'],
  ['--floating-panel-trigger-border-color', 'var(--color-border)', 'Default trigger border color.'],
  [
    '--floating-panel-trigger-border-width',
    'var(--border-width-sm)',
    'Default trigger border width.',
  ],
  ['--floating-panel-trigger-color', 'var(--color-foreground)', 'Default trigger text color.'],
  ['--floating-panel-trigger-font-size', 'var(--text-md)', 'Default trigger text size.'],
  ['--floating-panel-trigger-height', 'var(--size-md)', 'Default trigger minimum height.'],
  [
    '--floating-panel-trigger-line-height',
    'var(--line-height-text-md)',
    'Default trigger line height.',
  ],
  ['--floating-panel-trigger-padding-x', 'var(--spacing-3)', 'Default trigger horizontal padding.'],
  ['--floating-panel-trigger-padding-y', 'var(--spacing-1)', 'Default trigger vertical padding.'],
  ['--floating-panel-trigger-radius', 'var(--radius-md)', 'Default trigger radius.'],
  ['--floating-panel-width', '100%', 'Content width inside Ark positioner.'],
  ['--floating-panel-z-index', 'var(--z-popup)', 'Fallback panel z-index.'],
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