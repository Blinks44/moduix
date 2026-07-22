import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const qrCodeExampleCss = `
  .qr-code-root {
    --moduix-qr-code-size: 9rem;
  }

  .qr-code-stack {
    display: grid;
    gap: var(--moduix-spacing-3);
    justify-items: center;
  }

  .qr-code-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--moduix-spacing-2);
    justify-content: center;
  }

  .qr-code-status {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
    text-align: center;
  }
`;

export const qrCodeFillCss = `
  .qr-code-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    gap: var(--moduix-spacing-4);
    align-items: start;
  }

  .qr-code-primary {
    --moduix-qr-code-fill: var(--moduix-color-primary);
  }

  .qr-code-danger {
    --moduix-qr-code-fill: var(--moduix-color-destructive);
  }
`;

export const qrCodeOverlayCss = `
  .qr-code-brand {
    --moduix-qr-code-fill: var(--moduix-color-primary);
  }

  .qr-code-overlay {
    font-size: var(--moduix-text-xs);
    font-weight: var(--moduix-weight-semibold);
    line-height: var(--moduix-line-height-text-xs);
  }
`;

const qrCodeCssProperties: CssPropertyInput[] = [
  ['--qrcode-height', 'computed by Ark', 'Runtime height for the generated frame.'],
  ['--qrcode-pixel-size', 'computed by Ark', 'Runtime pixel size used by the generator.'],
  ['--qrcode-width', 'computed by Ark', 'Runtime width for the generated frame.'],
  [
    '--moduix-qr-code-color',
    'var(--moduix-color-foreground)',
    'Controls root text and inherited SVG color.',
  ],
  [
    '--moduix-qr-code-disabled-opacity',
    'var(--moduix-button-disabled-opacity, var(--moduix-opacity-disabled))',
    'Controls disabled trigger opacity.',
  ],
  [
    '--moduix-qr-code-download-trigger-bg',
    'var(--moduix-button-outline-bg, var(--moduix-color-background))',
    'Controls download trigger background.',
  ],
  [
    '--moduix-qr-code-download-trigger-bg-hover',
    'var(--moduix-button-outline-bg-hover, var(--moduix-color-accent))',
    'Controls download trigger hover background.',
  ],
  [
    '--moduix-qr-code-download-trigger-border-color',
    'var(--moduix-button-outline-border-color, var(--moduix-color-border))',
    'Controls download trigger border color.',
  ],
  [
    '--moduix-qr-code-download-trigger-border-width',
    'var(--moduix-button-border-width, var(--moduix-border-width-sm))',
    'Controls download trigger border width.',
  ],
  [
    '--moduix-qr-code-download-trigger-color',
    'var(--moduix-button-outline-color, var(--moduix-color-foreground))',
    'Controls download trigger text color.',
  ],
  [
    '--moduix-qr-code-download-trigger-focus-ring-color',
    'var(--moduix-button-focus-ring-color, var(--moduix-color-ring))',
    'Controls download trigger focus ring color.',
  ],
  [
    '--moduix-qr-code-download-trigger-focus-ring-offset',
    'var(--moduix-qr-code-download-trigger-border-width, var(--moduix-button-border-width, var(--moduix-border-width-sm)))',
    'Controls download trigger focus ring offset.',
  ],
  [
    '--moduix-qr-code-download-trigger-focus-ring-width',
    'var(--moduix-button-focus-ring-width, var(--moduix-focus-ring-width, var(--moduix-border-width-md)))',
    'Controls download trigger focus ring width.',
  ],
  [
    '--moduix-qr-code-download-trigger-font-size',
    'var(--moduix-button-font-size, var(--moduix-text-sm))',
    'Controls download trigger font size.',
  ],
  [
    '--moduix-qr-code-download-trigger-font-weight',
    'var(--moduix-button-font-weight, var(--moduix-weight-medium))',
    'Controls download trigger font weight.',
  ],
  [
    '--moduix-qr-code-download-trigger-gap',
    'var(--moduix-button-content-gap, var(--moduix-spacing-2))',
    'Controls download trigger content gap.',
  ],
  [
    '--moduix-qr-code-download-trigger-height',
    'var(--moduix-button-size-md, var(--moduix-size-md))',
    'Controls download trigger minimum height.',
  ],
  [
    '--moduix-qr-code-download-trigger-icon-size',
    'var(--moduix-button-icon-size, var(--moduix-spacing-4))',
    'Controls icon size inside the download trigger.',
  ],
  [
    '--moduix-qr-code-download-trigger-line-height',
    'var(--moduix-button-line-height, var(--moduix-line-height-text-sm))',
    'Controls download trigger line height.',
  ],
  [
    '--moduix-qr-code-download-trigger-padding-x',
    'var(--moduix-button-padding-x-md, var(--moduix-spacing-4))',
    'Controls download trigger inline padding.',
  ],
  [
    '--moduix-qr-code-download-trigger-radius',
    'var(--moduix-button-radius, var(--moduix-radius-md))',
    'Controls download trigger border radius.',
  ],
  ['--moduix-qr-code-fill', 'currentColor', 'Controls QR module fill color.'],
  ['--moduix-qr-code-gap', 'var(--moduix-spacing-3)', 'Controls root spacing between parts.'],
  ['--moduix-qr-code-max-width', '100%', 'Controls root maximum width.'],
  ['--moduix-qr-code-overlay-bg', 'var(--moduix-color-background)', 'Controls overlay background.'],
  [
    '--moduix-qr-code-overlay-color',
    'var(--moduix-color-foreground)',
    'Controls overlay text color.',
  ],
  ['--moduix-qr-code-overlay-padding', 'var(--moduix-spacing-1)', 'Controls overlay padding.'],
  ['--moduix-qr-code-overlay-radius', 'var(--moduix-radius-sm)', 'Controls overlay radius.'],
  ['--moduix-qr-code-overlay-size', 'var(--moduix-size-lg)', 'Controls overlay width and height.'],
  ['--moduix-qr-code-size', '8rem', 'Controls the preferred frame width.'],
  [
    '--moduix-qr-code-transition',
    'var(--moduix-button-transition, var(--moduix-transition-default))',
    'Controls trigger transitions.',
  ],
];

const qrCodeCssPropertiesReference = qrCodeCssProperties.map(normalizeCssProperty);

export function QrCodeCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={qrCodeCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}