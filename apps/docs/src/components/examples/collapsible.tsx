import type { CssPropertyInput } from '../mdx/reference';

export const collapsibleExampleCss = `
  .collapsible-keys-list {
    display: flex;
    flex-direction: column;
    gap: var(--moduix-spacing-1);
    margin: 0;
    padding-inline-start: var(--moduix-spacing-2);
  }

  .collapsible-example-layout {
    display: flex;
    flex-direction: column;
    inline-size: 100%;
    gap: var(--moduix-spacing-2);
  }

  .collapsible-nested-content > p {
    margin: 0 0 var(--moduix-spacing-2);
  }

  .collapsible-nested-root {
    width: 100%;
  }
`;

export const collapsibleCustomCompositionCss = `
  .collapsible-custom-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--moduix-spacing-2);
    width: 100%;
    padding: var(--moduix-spacing-2) var(--moduix-spacing-3);
    border: 0;
    border-radius: var(--moduix-radius-md);
    background-color: var(--moduix-color-muted);
    color: var(--moduix-color-foreground);
  }

  .collapsible-custom-trigger:hover {
    background-color: var(--moduix-color-accent);
  }

  .collapsible-custom-indicator {
    --moduix-collapsible-indicator-open-transform: rotate(180deg);
    color: var(--moduix-color-primary);
  }

  .collapsible-custom-content-body {
    margin-top: var(--moduix-spacing-1);
    --moduix-collapsible-body-padding: var(--moduix-spacing-2) var(--moduix-spacing-3);

    border-radius: var(--moduix-radius-md);
    background-color: var(--moduix-color-muted);
    color: var(--moduix-color-muted-foreground);
  }

  .collapsible-keys-list {
    display: flex;
    flex-direction: column;
    gap: var(--moduix-spacing-1);
    margin: 0;
    padding-inline-start: var(--moduix-spacing-2);
  }
`;

export const collapsibleOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-collapsible-body-gap', 'var(--moduix-spacing-2)', 'Controls body content gap.'],
  ['--moduix-collapsible-body-padding', 'var(--moduix-spacing-2)', 'Controls body padding.'],
  ['--moduix-collapsible-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--moduix-collapsible-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-collapsible-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls trigger focus ring color.',
  ],
  [
    '--moduix-collapsible-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls trigger focus ring offset.',
  ],
  [
    '--moduix-collapsible-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls trigger focus ring width.',
  ],
  ['--moduix-collapsible-max-width', '100%', 'Controls root max width.'],
  [
    '--moduix-collapsible-indicator-open-transform',
    'rotate(180deg)',
    'Controls indicator transform while open.',
  ],
  ['--moduix-collapsible-indicator-size', 'var(--moduix-spacing-3)', 'Controls indicator size.'],
  [
    '--moduix-collapsible-indicator-transition',
    'var(--moduix-transition-default)',
    'Controls indicator transition.',
  ],
  [
    '--moduix-collapsible-content-color',
    'var(--moduix-color-muted-foreground)',
    'Controls content color.',
  ],
  ['--moduix-collapsible-content-closed-opacity', '0.01', 'Controls content opacity while closed.'],
  [
    '--moduix-collapsible-content-font-size',
    'var(--moduix-text-sm)',
    'Controls content font size.',
  ],
  [
    '--moduix-collapsible-content-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls content line height.',
  ],
  ['--moduix-collapsible-content-open-opacity', '1', 'Controls content opacity while open.'],
  [
    '--moduix-collapsible-content-transition',
    'var(--moduix-transition-default)',
    'Controls content open and close animation.',
  ],
  ['--moduix-collapsible-trigger-bg', 'transparent', 'Controls trigger background color.'],
  [
    '--moduix-collapsible-trigger-bg-active',
    'var(--moduix-collapsible-trigger-bg-hover)',
    'Controls trigger background color while pressed.',
  ],
  [
    '--moduix-collapsible-trigger-bg-hover',
    'var(--moduix-collapsible-trigger-bg)',
    'Controls trigger background color on hover.',
  ],
  [
    '--moduix-collapsible-trigger-color',
    'var(--moduix-collapsible-color)',
    'Controls trigger text color.',
  ],
  [
    '--moduix-collapsible-trigger-font-size',
    'var(--moduix-text-sm)',
    'Controls trigger font size.',
  ],
  ['--moduix-collapsible-trigger-gap', 'var(--moduix-spacing-2)', 'Controls trigger content gap.'],
  [
    '--moduix-collapsible-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls trigger line height.',
  ],
  [
    '--moduix-collapsible-trigger-padding-x',
    'var(--moduix-spacing-2)',
    'Controls trigger horizontal padding.',
  ],
  [
    '--moduix-collapsible-trigger-padding-y',
    'var(--moduix-spacing-1)',
    'Controls trigger vertical padding.',
  ],
  ['--moduix-collapsible-trigger-radius', '0', 'Controls trigger corner radius.'],
  [
    '--moduix-collapsible-trigger-transition',
    'var(--moduix-transition-default)',
    'Controls trigger color and background transition.',
  ],
  ['--moduix-collapsible-width', '100%', 'Controls root width.'],
];