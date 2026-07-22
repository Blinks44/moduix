import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const dialogExampleCss = `
  .dialog-stack {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--moduix-spacing-2);
  }

  .dialog-form {
    display: grid;
    gap: var(--moduix-spacing-3);
    margin-top: var(--moduix-spacing-4);
  }

  .dialog-input {
    width: 100%;
    min-height: var(--moduix-size-md);
    padding-inline: var(--moduix-spacing-3);
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    background: var(--moduix-color-background);
    color: var(--moduix-color-foreground);
    font: inherit;
  }

  .dialog-scroll-content {
    display: grid;
    gap: var(--moduix-spacing-4);
    padding-inline-end: var(--moduix-spacing-3);
  }

  .dialog-scroll-content h3,
  .dialog-scroll-content p {
    margin: 0;
  }

  .dialog-inside-scroll {
    max-height: min(32rem, calc(100dvh - var(--moduix-spacing-8)));
  }

  .dialog-scroll-area {
    height: 16rem;
    margin-top: var(--moduix-spacing-4);
  }

  .dialog-outside-positioner {
    place-items: start center;
  }

  .dialog-outside-content {
    max-height: none;
    margin-block: var(--moduix-spacing-8);
  }

  .dialog-state {
    margin-top: var(--moduix-spacing-3);
    color: var(--moduix-color-muted-foreground);
  }

  .dialog-textarea {
    min-height: 7rem;
    padding-block: var(--moduix-spacing-2);
    resize: vertical;
  }
`;

const dialogOverrideCssProperties: CssPropertyInput[] = [
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
  ['--moduix-dialog-close-icon-bg', 'transparent', 'Close icon background.'],
  [
    '--moduix-dialog-close-icon-bg-hover',
    'var(--moduix-color-accent)',
    'Close icon hover background.',
  ],
  ['--moduix-dialog-close-icon-color', 'var(--moduix-dialog-muted-color)', 'Close icon color.'],
  [
    '--moduix-dialog-close-icon-color-hover',
    'var(--moduix-dialog-close-icon-color, var(--moduix-dialog-color))',
    'Close icon hover color.',
  ],
  [
    '--moduix-dialog-close-icon-focus-ring-color',
    'var(--moduix-dialog-focus-ring-color, var(--moduix-color-ring))',
    'Close icon focus ring color.',
  ],
  ['--moduix-dialog-close-icon-glyph-size', 'var(--moduix-spacing-3)', 'Close icon glyph size.'],
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
  ['--moduix-dialog-close-icon-radius', 'var(--moduix-radius-md)', 'Close icon border radius.'],
  ['--moduix-dialog-close-icon-size', 'var(--moduix-spacing-7)', 'Close icon control size.'],
  ['--moduix-dialog-content-ending-translate-x', '0', 'Closing animation horizontal offset.'],
  ['--moduix-dialog-content-ending-translate-y', '0', 'Closing animation vertical offset.'],
  ['--moduix-dialog-content-margin', 'var(--moduix-spacing-4) 0 0', 'Body margin.'],
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
  ['--moduix-dialog-control-bg', 'var(--moduix-color-background)', 'Native trigger background.'],
  [
    '--moduix-dialog-control-bg-hover',
    'var(--moduix-color-accent)',
    'Native trigger hover background.',
  ],
  [
    '--moduix-dialog-control-border-color',
    'var(--moduix-color-border)',
    'Native trigger border color.',
  ],
  [
    '--moduix-dialog-control-border-width',
    'var(--moduix-border-width-sm)',
    'Native trigger border width.',
  ],
  ['--moduix-dialog-control-color', 'var(--moduix-color-foreground)', 'Native trigger text color.'],
  ['--moduix-dialog-control-font-size', 'var(--moduix-text-md)', 'Native trigger font size.'],
  ['--moduix-dialog-control-height', 'var(--moduix-size-md)', 'Native trigger minimum height.'],
  [
    '--moduix-dialog-control-line-height',
    'var(--moduix-line-height-text-md)',
    'Native trigger line height.',
  ],
  [
    '--moduix-dialog-control-padding-x',
    'var(--moduix-spacing-3-5)',
    'Native trigger horizontal padding.',
  ],
  [
    '--moduix-dialog-control-padding-y',
    'var(--moduix-spacing-1)',
    'Native trigger vertical padding.',
  ],
  ['--moduix-dialog-control-radius', 'var(--moduix-radius-md)', 'Native trigger border radius.'],
  [
    '--moduix-dialog-description-color',
    'var(--moduix-dialog-muted-color)',
    'Description and body color.',
  ],
  [
    '--moduix-dialog-description-font-size',
    'var(--moduix-text-md)',
    'Description and body font size.',
  ],
  [
    '--moduix-dialog-description-line-height',
    'var(--moduix-line-height-text-md)',
    'Description and body line height.',
  ],
  [
    '--moduix-dialog-focus-ring-color',
    'var(--moduix-color-ring)',
    'Native control focus ring color.',
  ],
  [
    '--moduix-dialog-focus-ring-width',
    'var(--moduix-dialog-control-border-width, var(--moduix-border-width-sm))',
    'Native control focus ring width.',
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
  ['--moduix-dialog-width', '28rem', 'Content width.'],
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