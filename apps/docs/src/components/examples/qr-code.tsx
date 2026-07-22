import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const qrCodeExampleCss = `
  .qr-code-root {
    --qr-code-size: 9rem;
  }

  .qr-code-stack {
    display: grid;
    gap: var(--spacing-3);
    justify-items: center;
  }

  .qr-code-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    justify-content: center;
  }

  .qr-code-status {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
    text-align: center;
  }
`;

export const qrCodeFillCss = `
  .qr-code-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    gap: var(--spacing-4);
    align-items: start;
  }

  .qr-code-primary {
    --qr-code-fill: var(--color-primary);
  }

  .qr-code-danger {
    --qr-code-fill: var(--color-destructive);
  }
`;

export const qrCodeOverlayCss = `
  .qr-code-brand {
    --qr-code-fill: var(--color-primary);
  }

  .qr-code-overlay {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    line-height: var(--line-height-text-xs);
  }
`;

const qrCodeCssProperties: CssPropertyInput[] = [
  ['--qrcode-height', 'computed by Ark', 'Runtime height for the generated frame.'],
  ['--qrcode-pixel-size', 'computed by Ark', 'Runtime pixel size used by the generator.'],
  ['--qrcode-width', 'computed by Ark', 'Runtime width for the generated frame.'],
  ['--qr-code-color', 'var(--color-foreground)', 'Controls root text and inherited SVG color.'],
  [
    '--qr-code-disabled-opacity',
    'var(--button-disabled-opacity, var(--opacity-disabled))',
    'Controls disabled trigger opacity.',
  ],
  [
    '--qr-code-download-trigger-bg',
    'var(--button-outline-bg, var(--color-background))',
    'Controls download trigger background.',
  ],
  [
    '--qr-code-download-trigger-bg-hover',
    'var(--button-outline-bg-hover, var(--color-accent))',
    'Controls download trigger hover background.',
  ],
  [
    '--qr-code-download-trigger-border-color',
    'var(--button-outline-border-color, var(--color-border))',
    'Controls download trigger border color.',
  ],
  [
    '--qr-code-download-trigger-border-width',
    'var(--button-border-width, var(--border-width-sm))',
    'Controls download trigger border width.',
  ],
  [
    '--qr-code-download-trigger-color',
    'var(--button-outline-color, var(--color-foreground))',
    'Controls download trigger text color.',
  ],
  [
    '--qr-code-download-trigger-focus-ring-color',
    'var(--button-focus-ring-color, var(--color-ring))',
    'Controls download trigger focus ring color.',
  ],
  [
    '--qr-code-download-trigger-focus-ring-offset',
    'var(--qr-code-download-trigger-border-width, var(--button-border-width, var(--border-width-sm)))',
    'Controls download trigger focus ring offset.',
  ],
  [
    '--qr-code-download-trigger-focus-ring-width',
    'var(--button-focus-ring-width, var(--focus-ring-width, var(--border-width-md)))',
    'Controls download trigger focus ring width.',
  ],
  [
    '--qr-code-download-trigger-font-size',
    'var(--button-font-size, var(--text-sm))',
    'Controls download trigger font size.',
  ],
  [
    '--qr-code-download-trigger-font-weight',
    'var(--button-font-weight, var(--weight-medium))',
    'Controls download trigger font weight.',
  ],
  [
    '--qr-code-download-trigger-gap',
    'var(--button-content-gap, var(--spacing-2))',
    'Controls download trigger content gap.',
  ],
  [
    '--qr-code-download-trigger-height',
    'var(--button-size-md, var(--size-md))',
    'Controls download trigger minimum height.',
  ],
  [
    '--qr-code-download-trigger-icon-size',
    'var(--button-icon-size, var(--spacing-4))',
    'Controls icon size inside the download trigger.',
  ],
  [
    '--qr-code-download-trigger-line-height',
    'var(--button-line-height, var(--line-height-text-sm))',
    'Controls download trigger line height.',
  ],
  [
    '--qr-code-download-trigger-padding-x',
    'var(--button-padding-x-md, var(--spacing-4))',
    'Controls download trigger inline padding.',
  ],
  [
    '--qr-code-download-trigger-radius',
    'var(--button-radius, var(--radius-md))',
    'Controls download trigger border radius.',
  ],
  ['--qr-code-fill', 'currentColor', 'Controls QR module fill color.'],
  ['--qr-code-gap', 'var(--spacing-3)', 'Controls root spacing between parts.'],
  ['--qr-code-max-width', '100%', 'Controls root maximum width.'],
  ['--qr-code-overlay-bg', 'var(--color-background)', 'Controls overlay background.'],
  ['--qr-code-overlay-color', 'var(--color-foreground)', 'Controls overlay text color.'],
  ['--qr-code-overlay-padding', 'var(--spacing-1)', 'Controls overlay padding.'],
  ['--qr-code-overlay-radius', 'var(--radius-sm)', 'Controls overlay radius.'],
  ['--qr-code-overlay-size', 'var(--size-lg)', 'Controls overlay width and height.'],
  ['--qr-code-size', '8rem', 'Controls the preferred frame width.'],
  [
    '--qr-code-transition',
    'var(--button-transition, var(--transition-default))',
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