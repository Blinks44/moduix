import type { CssPropertyInput } from '../mdx/reference';

export const collapsibleExampleCss = `
  .collapsible-root {
    width: 14rem;
  }

  .collapsible-keys-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    margin: 0;
    padding-inline-start: var(--spacing-2);
  }

  .collapsible-state {
    margin-top: var(--spacing-2);
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }

  .collapsible-provider-layout {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .collapsible-nested-content > p {
    margin: 0 0 var(--spacing-2);
  }

  .collapsible-nested-root {
    width: 100%;
  }
`;

export const collapsibleCustomCompositionCss = `
  .collapsible-root {
    width: 14rem;
  }

  .collapsible-custom-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2);
    width: 100%;
    padding: var(--spacing-2) var(--spacing-3);
    border: 0;
    border-radius: var(--radius-md);
    background-color: var(--color-muted);
    color: var(--color-foreground);
  }

  .collapsible-custom-trigger:hover {
    background-color: var(--color-accent);
  }

  .collapsible-custom-indicator {
    --collapsible-indicator-open-transform: rotate(180deg);
    color: var(--color-primary);
  }

  .collapsible-custom-content-body {
    margin-top: var(--spacing-1);
    --collapsible-body-padding: var(--spacing-2) var(--spacing-3);

    border-radius: var(--radius-md);
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
  }

  .collapsible-keys-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    margin: 0;
    padding-inline-start: var(--spacing-2);
  }
`;

export const collapsibleOverrideCssProperties: CssPropertyInput[] = [
  ['--collapsible-body-gap', 'var(--spacing-2)', 'Controls body content gap.'],
  ['--collapsible-body-padding', 'var(--spacing-2)', 'Controls body padding.'],
  ['--collapsible-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--collapsible-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--collapsible-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  [
    '--collapsible-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls trigger focus ring offset.',
  ],
  [
    '--collapsible-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls trigger focus ring width.',
  ],
  ['--collapsible-max-width', '100%', 'Controls root max width.'],
  [
    '--collapsible-indicator-open-transform',
    'rotate(180deg)',
    'Controls indicator transform while open.',
  ],
  ['--collapsible-indicator-size', 'var(--spacing-3)', 'Controls indicator size.'],
  [
    '--collapsible-indicator-transition',
    'var(--transition-default)',
    'Controls indicator transition.',
  ],
  ['--collapsible-content-color', 'var(--color-muted-foreground)', 'Controls content color.'],
  ['--collapsible-content-closed-opacity', '0.01', 'Controls content opacity while closed.'],
  ['--collapsible-content-font-size', 'var(--text-sm)', 'Controls content font size.'],
  [
    '--collapsible-content-line-height',
    'var(--line-height-text-sm)',
    'Controls content line height.',
  ],
  ['--collapsible-content-open-opacity', '1', 'Controls content opacity while open.'],
  [
    '--collapsible-content-transition',
    'var(--transition-default)',
    'Controls content open and close animation.',
  ],
  ['--collapsible-trigger-bg', 'transparent', 'Controls trigger background color.'],
  [
    '--collapsible-trigger-bg-active',
    'var(--collapsible-trigger-bg-hover)',
    'Controls trigger background color while pressed.',
  ],
  [
    '--collapsible-trigger-bg-hover',
    'var(--collapsible-trigger-bg)',
    'Controls trigger background color on hover.',
  ],
  ['--collapsible-trigger-color', 'var(--collapsible-color)', 'Controls trigger text color.'],
  ['--collapsible-trigger-font-size', 'var(--text-sm)', 'Controls trigger font size.'],
  ['--collapsible-trigger-gap', 'var(--spacing-2)', 'Controls trigger content gap.'],
  [
    '--collapsible-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls trigger line height.',
  ],
  ['--collapsible-trigger-padding-x', 'var(--spacing-2)', 'Controls trigger horizontal padding.'],
  ['--collapsible-trigger-padding-y', 'var(--spacing-1)', 'Controls trigger vertical padding.'],
  ['--collapsible-trigger-radius', '0', 'Controls trigger corner radius.'],
  [
    '--collapsible-trigger-transition',
    'var(--transition-default)',
    'Controls trigger color and background transition.',
  ],
  ['--collapsible-width', '100%', 'Controls root width.'],
];