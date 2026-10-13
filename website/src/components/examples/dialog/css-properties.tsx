import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

export const dialogOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-dialog-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Backdrop color.',
  ],
  ['--moduix-dialog-backdrop-blur', '4px', 'Backdrop blur.'],
  ['--moduix-dialog-backdrop-ending-blur', 'none', 'Backdrop blur at the end of closing.'],
  ['--moduix-dialog-backdrop-ending-opacity', '0', 'Backdrop opacity at the end of closing.'],
  ['--moduix-dialog-backdrop-starting-blur', 'none', 'Backdrop blur at the start of opening.'],
  ['--moduix-dialog-backdrop-starting-opacity', '0', 'Backdrop opacity at the start of opening.'],
  [
    '--moduix-dialog-backdrop-transition',
    'var(--moduix-transition-default)',
    'Backdrop animation timing.',
  ],
  ['--moduix-dialog-bg', 'var(--moduix-color-popover)', 'Content background.'],
  ['--moduix-dialog-border-color', 'var(--moduix-color-border)', 'Content border color.'],
  ['--moduix-dialog-border-width', 'var(--moduix-border-width-sm)', 'Content border width.'],
  ['--moduix-dialog-body-margin-top', 'var(--moduix-spacing-4)', 'Space above the body.'],
  ['--moduix-dialog-color', 'var(--moduix-color-popover-foreground)', 'Content text color.'],
  [
    '--moduix-dialog-close-icon-inset-block-start',
    'var(--moduix-spacing-4)',
    'Close icon inset from the block start edge.',
  ],
  [
    '--moduix-dialog-close-icon-inset-inline-end',
    'var(--moduix-spacing-4)',
    'Close icon inset from the inline end edge.',
  ],
  ['--moduix-dialog-close-icon-size', 'var(--moduix-spacing-7)', 'Close icon control size.'],
  ['--moduix-dialog-content-ending-translate-x', '0', 'Closing animation horizontal offset.'],
  ['--moduix-dialog-content-ending-translate-y', '0', 'Closing animation vertical offset.'],
  ['--moduix-dialog-content-starting-opacity', '0', 'Opening animation start opacity.'],
  ['--moduix-dialog-content-ending-opacity', '0', 'Closing animation end opacity.'],
  [
    '--moduix-dialog-content-starting-scale',
    'var(--moduix-scale-popup)',
    'Opening animation start scale.',
  ],
  [
    '--moduix-dialog-content-ending-scale',
    'var(--moduix-scale-popup)',
    'Closing animation end scale.',
  ],
  ['--moduix-dialog-content-starting-translate-x', '0', 'Opening animation horizontal offset.'],
  ['--moduix-dialog-content-starting-translate-y', '0', 'Opening animation vertical offset.'],
  ['--moduix-dialog-description-color', 'var(--moduix-dialog-muted-color)', 'Description color.'],
  ['--moduix-dialog-description-font-size', 'var(--moduix-text-md)', 'Description font size.'],
  [
    '--moduix-dialog-description-line-height',
    'var(--moduix-line-height-text-md)',
    'Description line height.',
  ],
  ['--moduix-dialog-footer-gap', 'var(--moduix-spacing-2)', 'Footer action gap.'],
  ['--moduix-dialog-footer-margin-top', 'var(--moduix-spacing-6)', 'Footer top margin.'],
  ['--moduix-dialog-header-gap', 'var(--moduix-spacing-1)', 'Header gap.'],
  ['--moduix-dialog-max-width', 'calc(100vw - var(--moduix-spacing-8))', 'Content maximum width.'],
  [
    '--moduix-dialog-muted-color',
    'var(--moduix-color-muted-foreground)',
    'Muted text fallback color.',
  ],
  ['--moduix-dialog-nested-overlay-bg', 'rgb(0 0 0 / 0.05)', 'Nested parent overlay.'],
  ['--moduix-dialog-nested-scale-step', '0.05', 'Nested parent scale step.'],
  [
    '--moduix-dialog-nested-transition',
    'var(--moduix-dialog-transition)',
    'Nested parent transition timing.',
  ],
  [
    '--moduix-dialog-nested-translate-step',
    'var(--moduix-spacing-10)',
    'Nested parent offset step.',
  ],
  ['--moduix-dialog-padding', 'var(--moduix-spacing-6)', 'Content padding.'],
  ['--moduix-dialog-positioner-padding', 'var(--moduix-spacing-4)', 'Positioner viewport padding.'],
  ['--moduix-dialog-radius', 'var(--moduix-radius-lg)', 'Content border radius.'],
  ['--moduix-dialog-shadow', 'var(--moduix-shadow-lg)', 'Content shadow.'],
  ['--moduix-dialog-title-color', 'var(--moduix-dialog-color)', 'Title color.'],
  ['--moduix-dialog-title-font-size', 'var(--moduix-text-lg)', 'Title font size.'],
  ['--moduix-dialog-title-font-weight', 'var(--moduix-weight-semibold)', 'Title font weight.'],
  ['--moduix-dialog-title-line-height', 'var(--moduix-line-height-text-lg)', 'Title line height.'],
  ['--moduix-dialog-transition', 'var(--moduix-transition-default)', 'Content animation timing.'],
  ['--moduix-dialog-width', '28rem', 'Content width. Overrides the width from the `size` prop.'],
];

export function DialogCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={dialogOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}