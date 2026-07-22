import type { CssPropertyInput } from '../mdx/reference';

export const clipboardExampleCss = `
  .clipboard-action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--moduix-size-md);
    padding-inline: 1rem;
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    background-color: var(--moduix-color-background);
    color: var(--moduix-color-foreground);
    font: inherit;
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
    cursor: pointer;
  }

  .clipboard-action-button:focus-visible {
    outline: var(--moduix-border-width-md) solid var(--moduix-color-ring);
    outline-offset: calc(var(--moduix-border-width-sm) * -1);
  }

  .clipboard-value-text {
    flex: 1 1 auto;
  }

  .clipboard-status-text {
    margin: 0;
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }
`;

export const clipboardOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-clipboard-color',
    'var(--moduix-color-foreground)',
    'Controls the default text color of the root.',
  ],
  ['--moduix-clipboard-width', '100%', 'Controls the root width.'],
  ['--moduix-clipboard-max-width', 'none', 'Controls the default maximum width.'],
  [
    '--moduix-clipboard-gap',
    'var(--moduix-spacing-1-5)',
    'Controls spacing between label and control.',
  ],
  [
    '--moduix-clipboard-control-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between value surface and trigger.',
  ],
  ['--moduix-clipboard-label-color', 'currentColor', 'Controls label text color.'],
  ['--moduix-clipboard-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-clipboard-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-clipboard-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-clipboard-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled input and trigger opacity.',
  ],
  [
    '--moduix-clipboard-input-border-color',
    'var(--moduix-input-border-color, var(--moduix-color-border))',
    'Controls the input border color.',
  ],
  [
    '--moduix-clipboard-input-border-width',
    'var(--moduix-input-border-width, var(--moduix-border-width-sm))',
    'Controls input border width.',
  ],
  [
    '--moduix-clipboard-input-bg',
    'var(--moduix-input-bg, var(--moduix-color-background))',
    'Controls the input background.',
  ],
  [
    '--moduix-clipboard-input-color',
    'var(--moduix-input-color, var(--moduix-color-foreground))',
    'Controls the input text color.',
  ],
  [
    '--moduix-clipboard-input-focus-ring-color',
    'var(--moduix-input-focus-ring-color, var(--moduix-color-ring))',
    'Controls input focus ring color.',
  ],
  [
    '--moduix-clipboard-input-focus-ring-offset',
    'var(--moduix-clipboard-input-border-width, var(--moduix-input-border-width, var(--moduix-border-width-sm)))',
    'Controls input focus ring offset.',
  ],
  [
    '--moduix-clipboard-input-focus-ring-width',
    'var(--moduix-input-focus-ring-width, var(--moduix-clipboard-input-border-width, var(--moduix-input-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))))',
    'Controls input focus ring width.',
  ],
  [
    '--moduix-clipboard-input-font-size',
    'var(--moduix-input-font-size-md, var(--moduix-text-md))',
    'Controls input font size.',
  ],
  [
    '--moduix-clipboard-input-height',
    'var(--moduix-input-height-md, var(--moduix-size-md))',
    'Controls input minimum height.',
  ],
  [
    '--moduix-clipboard-input-line-height',
    'var(--moduix-input-line-height-md, var(--moduix-line-height-text-md))',
    'Controls input line height.',
  ],
  [
    '--moduix-clipboard-input-padding-x',
    'var(--moduix-input-padding-x-md, var(--moduix-spacing-3-5))',
    'Controls input horizontal padding.',
  ],
  [
    '--moduix-clipboard-input-padding-y',
    'var(--moduix-input-padding-y-md, var(--moduix-spacing-1))',
    'Controls input vertical padding.',
  ],
  [
    '--moduix-clipboard-input-placeholder-color',
    'var(--moduix-input-placeholder-color, var(--moduix-color-muted-foreground))',
    'Controls input placeholder color.',
  ],
  [
    '--moduix-clipboard-input-radius',
    'var(--moduix-input-radius, var(--moduix-radius-md))',
    'Controls the input radius.',
  ],
  [
    '--moduix-clipboard-input-readonly-bg',
    'var(--moduix-input-readonly-bg, var(--moduix-clipboard-input-bg, var(--moduix-color-background)))',
    'Controls read-only input background.',
  ],
  [
    '--moduix-clipboard-input-readonly-color',
    'var(--moduix-input-readonly-color, var(--moduix-clipboard-input-color, var(--moduix-color-foreground)))',
    'Controls read-only input text color.',
  ],
  [
    '--moduix-clipboard-trigger-bg',
    'var(--moduix-button-outline-bg, var(--moduix-color-background))',
    'Controls trigger background color.',
  ],
  [
    '--moduix-clipboard-trigger-bg-hover',
    'var(--moduix-button-outline-bg-hover, var(--moduix-color-accent))',
    'Controls trigger hover background.',
  ],
  [
    '--moduix-clipboard-trigger-border-color',
    'var(--moduix-button-outline-border-color, var(--moduix-color-border))',
    'Controls trigger border color.',
  ],
  [
    '--moduix-clipboard-trigger-border-width',
    'var(--moduix-button-border-width, var(--moduix-border-width-sm))',
    'Controls trigger border width.',
  ],
  [
    '--moduix-clipboard-trigger-color',
    'var(--moduix-button-outline-color, var(--moduix-color-foreground))',
    'Controls trigger text and icon color.',
  ],
  [
    '--moduix-clipboard-trigger-focus-ring-color',
    'var(--moduix-button-focus-ring-color, var(--moduix-color-ring))',
    'Controls trigger focus ring color.',
  ],
  [
    '--moduix-clipboard-trigger-focus-ring-offset',
    'var(--moduix-clipboard-trigger-border-width, var(--moduix-button-border-width, var(--moduix-border-width-sm)))',
    'Controls trigger focus ring offset.',
  ],
  [
    '--moduix-clipboard-trigger-focus-ring-width',
    'var(--moduix-button-focus-ring-width, var(--moduix-focus-ring-width, var(--moduix-border-width-md)))',
    'Controls trigger focus ring width.',
  ],
  [
    '--moduix-clipboard-trigger-font-size',
    'var(--moduix-button-font-size, var(--moduix-text-sm))',
    'Controls trigger font size.',
  ],
  [
    '--moduix-clipboard-trigger-font-weight',
    'var(--moduix-button-font-weight, var(--moduix-weight-medium))',
    'Controls trigger font weight.',
  ],
  [
    '--moduix-clipboard-trigger-gap',
    'var(--moduix-button-content-gap, var(--moduix-spacing-2))',
    'Controls gap between trigger children.',
  ],
  [
    '--moduix-clipboard-trigger-height',
    'var(--moduix-button-size-md, var(--moduix-size-md))',
    'Controls trigger minimum height.',
  ],
  [
    '--moduix-clipboard-trigger-line-height',
    'var(--moduix-button-line-height, var(--moduix-line-height-text-sm))',
    'Controls trigger line height.',
  ],
  [
    '--moduix-clipboard-trigger-padding-x',
    'var(--moduix-button-padding-x-md, var(--moduix-spacing-4))',
    'Controls trigger horizontal padding.',
  ],
  [
    '--moduix-clipboard-trigger-radius',
    'var(--moduix-button-radius, var(--moduix-radius-md))',
    'Controls trigger radius.',
  ],
  [
    '--moduix-clipboard-indicator-size',
    'var(--moduix-button-icon-size, var(--moduix-spacing-4))',
    'Controls idle and copied icon size.',
  ],
  [
    '--moduix-clipboard-value-text-color',
    'currentColor',
    'Controls value text color when using `Clipboard.ValueText`.',
  ],
  ['--moduix-clipboard-value-text-font-size', 'inherit', 'Controls value text font size.'],
  ['--moduix-clipboard-value-text-font-weight', 'inherit', 'Controls value text font weight.'],
  ['--moduix-clipboard-value-text-line-height', 'inherit', 'Controls value text line height.'],
  [
    '--moduix-clipboard-transition',
    'var(--moduix-transition-default)',
    'Controls input and trigger transition timing.',
  ],
];