import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const dialogExampleCss = `
  .dialog-stack {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-2);
  }

  .dialog-form {
    display: grid;
    gap: var(--spacing-3);
    margin-top: var(--spacing-4);
  }

  .dialog-input {
    width: 100%;
    min-height: var(--size-md);
    padding-inline: var(--spacing-3);
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
  }

  .dialog-scroll-content {
    display: grid;
    gap: var(--spacing-4);
    padding-inline-end: var(--spacing-3);
  }

  .dialog-scroll-content h3,
  .dialog-scroll-content p {
    margin: 0;
  }

  .dialog-inside-scroll {
    max-height: min(32rem, calc(100dvh - var(--spacing-8)));
  }

  .dialog-scroll-area {
    height: 16rem;
    margin-top: var(--spacing-4);
  }

  .dialog-outside-positioner {
    place-items: start center;
  }

  .dialog-outside-content {
    max-height: none;
    margin-block: var(--spacing-8);
  }

  .dialog-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
  }

  .dialog-textarea {
    min-height: 7rem;
    padding-block: var(--spacing-2);
    resize: vertical;
  }
`;

const dialogOverrideCssProperties: CssPropertyInput[] = [
  ['--dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Backdrop color.'],
  ['--dialog-backdrop-blur', '4px', 'Backdrop blur.'],
  ['--dialog-backdrop-ending-blur', 'none', 'Backdrop blur at the end of closing.'],
  ['--dialog-backdrop-ending-opacity', '0', 'Backdrop opacity at the end of closing.'],
  ['--dialog-backdrop-starting-blur', 'none', 'Backdrop blur at the start of opening.'],
  ['--dialog-backdrop-starting-opacity', '0', 'Backdrop opacity at the start of opening.'],
  ['--dialog-backdrop-transition', 'var(--transition-default)', 'Backdrop animation timing.'],
  ['--dialog-bg', 'var(--color-popover)', 'Content background.'],
  ['--dialog-border-color', 'var(--color-border)', 'Content border color.'],
  ['--dialog-border-width', 'var(--border-width-sm)', 'Content border width.'],
  ['--dialog-close-icon-bg', 'transparent', 'Close icon background.'],
  ['--dialog-close-icon-bg-hover', 'var(--color-accent)', 'Close icon hover background.'],
  ['--dialog-close-icon-color', 'var(--dialog-muted-color)', 'Close icon color.'],
  [
    '--dialog-close-icon-color-hover',
    'var(--dialog-close-icon-color, var(--dialog-color))',
    'Close icon hover color.',
  ],
  [
    '--dialog-close-icon-focus-ring-color',
    'var(--dialog-focus-ring-color, var(--color-ring))',
    'Close icon focus ring color.',
  ],
  ['--dialog-close-icon-glyph-size', 'var(--spacing-3)', 'Close icon glyph size.'],
  ['--dialog-color', 'var(--color-popover-foreground)', 'Content text color.'],
  [
    '--dialog-close-icon-inset-block-start',
    'var(--spacing-4)',
    'Close icon inset from the block start edge.',
  ],
  [
    '--dialog-close-icon-inset-inline-end',
    'var(--spacing-4)',
    'Close icon inset from the inline end edge.',
  ],
  ['--dialog-close-icon-radius', 'var(--radius-md)', 'Close icon border radius.'],
  ['--dialog-close-icon-size', 'var(--spacing-7)', 'Close icon control size.'],
  ['--dialog-content-ending-translate-x', '0', 'Closing animation horizontal offset.'],
  ['--dialog-content-ending-translate-y', '0', 'Closing animation vertical offset.'],
  ['--dialog-content-margin', 'var(--spacing-4) 0 0', 'Body margin.'],
  ['--dialog-content-starting-opacity', '0', 'Opening animation start opacity.'],
  ['--dialog-content-ending-opacity', '0', 'Closing animation end opacity.'],
  ['--dialog-content-starting-scale', 'var(--scale-popup)', 'Opening animation start scale.'],
  ['--dialog-content-ending-scale', 'var(--scale-popup)', 'Closing animation end scale.'],
  ['--dialog-content-starting-translate-x', '0', 'Opening animation horizontal offset.'],
  ['--dialog-content-starting-translate-y', '0', 'Opening animation vertical offset.'],
  ['--dialog-control-bg', 'var(--color-background)', 'Native trigger background.'],
  ['--dialog-control-bg-hover', 'var(--color-accent)', 'Native trigger hover background.'],
  ['--dialog-control-border-color', 'var(--color-border)', 'Native trigger border color.'],
  ['--dialog-control-border-width', 'var(--border-width-sm)', 'Native trigger border width.'],
  ['--dialog-control-color', 'var(--color-foreground)', 'Native trigger text color.'],
  ['--dialog-control-font-size', 'var(--text-md)', 'Native trigger font size.'],
  ['--dialog-control-height', 'var(--size-md)', 'Native trigger minimum height.'],
  ['--dialog-control-line-height', 'var(--line-height-text-md)', 'Native trigger line height.'],
  ['--dialog-control-padding-x', 'var(--spacing-3-5)', 'Native trigger horizontal padding.'],
  ['--dialog-control-padding-y', 'var(--spacing-1)', 'Native trigger vertical padding.'],
  ['--dialog-control-radius', 'var(--radius-md)', 'Native trigger border radius.'],
  ['--dialog-description-color', 'var(--dialog-muted-color)', 'Description and body color.'],
  ['--dialog-description-font-size', 'var(--text-md)', 'Description and body font size.'],
  [
    '--dialog-description-line-height',
    'var(--line-height-text-md)',
    'Description and body line height.',
  ],
  ['--dialog-focus-ring-color', 'var(--color-ring)', 'Native control focus ring color.'],
  [
    '--dialog-focus-ring-width',
    'var(--dialog-control-border-width, var(--border-width-sm))',
    'Native control focus ring width.',
  ],
  ['--dialog-footer-gap', 'var(--spacing-2)', 'Footer action gap.'],
  ['--dialog-footer-margin-top', 'var(--spacing-6)', 'Footer top margin.'],
  ['--dialog-header-gap', 'var(--spacing-1)', 'Header gap.'],
  ['--dialog-max-width', 'calc(100vw - var(--spacing-8))', 'Content maximum width.'],
  ['--dialog-muted-color', 'var(--color-muted-foreground)', 'Muted text fallback color.'],
  ['--dialog-nested-overlay-bg', 'rgb(0 0 0 / 0.05)', 'Nested parent overlay.'],
  ['--dialog-nested-scale-step', '0.05', 'Nested parent scale step.'],
  ['--dialog-nested-transition', 'var(--dialog-transition)', 'Nested parent transition timing.'],
  ['--dialog-nested-translate-step', 'var(--spacing-10)', 'Nested parent offset step.'],
  ['--dialog-padding', 'var(--spacing-6)', 'Content padding.'],
  ['--dialog-positioner-padding', 'var(--spacing-4)', 'Positioner viewport padding.'],
  ['--dialog-radius', 'var(--radius-lg)', 'Content border radius.'],
  ['--dialog-shadow', 'var(--shadow-lg)', 'Content shadow.'],
  ['--dialog-title-color', 'var(--dialog-color)', 'Title color.'],
  ['--dialog-title-font-size', 'var(--text-lg)', 'Title font size.'],
  ['--dialog-title-font-weight', 'var(--weight-semibold)', 'Title font weight.'],
  ['--dialog-title-line-height', 'var(--line-height-text-lg)', 'Title line height.'],
  ['--dialog-transition', 'var(--transition-default)', 'Content animation timing.'],
  ['--dialog-width', '28rem', 'Content width.'],
];

export function DialogCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
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