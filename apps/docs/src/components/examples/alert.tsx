import type { CssPropertyInput } from '../mdx/reference';

export const alertExampleCss = `
  .alert-demo {
    max-width: 24rem;
  }
`;

export const alertStatusesCss = `
  .alert-stack {
    display: grid;
    width: min(24rem, 100%);
    gap: var(--spacing-3);
  }
`;

export const alertCustomCompositionCss = `
  .alert-custom {
    --alert-bg: color-mix(in oklab, var(--color-primary) 12%, var(--color-background));
    --alert-border-color: color-mix(in oklab, var(--color-primary) 38%, transparent);
    --alert-indicator-color: var(--color-primary);
    --alert-radius: var(--radius-md);
    --alert-shadow: var(--shadow-sm);

    max-width: 24rem;
  }
`;

export const alertCssProperties: CssPropertyInput[] = [
  ['--alert-actions-gap', 'var(--spacing-2)', 'Controls gap between action elements.'],
  ['--alert-actions-margin-top', 'var(--spacing-2)', 'Controls spacing before the actions row.'],
  ['--alert-bg', 'var(--alert-bg-default, var(--color-card))', 'Controls alert background.'],
  [
    '--alert-border-color',
    'var(--alert-border-color-default, var(--color-border))',
    'Controls alert border color.',
  ],
  ['--alert-border-width', 'var(--border-width-sm)', 'Controls alert border width.'],
  [
    '--alert-color',
    'var(--alert-color-default, var(--color-card-foreground))',
    'Controls alert text color.',
  ],
  ['--alert-content-gap', 'var(--spacing-1)', 'Controls gap inside AlertContent.'],
  [
    '--alert-description-color',
    'var(--color-muted-foreground)',
    'Controls description text color.',
  ],
  ['--alert-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  [
    '--alert-description-line-height',
    'var(--line-height-text-sm)',
    'Controls description line-height.',
  ],
  ['--alert-gap', 'var(--spacing-3)', 'Controls root column gap.'],
  [
    '--alert-indicator-color',
    'var(--alert-indicator-color-default, currentColor)',
    'Controls indicator color.',
  ],
  ['--alert-indicator-offset', 'var(--spacing-0-5)', 'Controls indicator vertical offset.'],
  ['--alert-indicator-size', 'var(--spacing-4)', 'Controls indicator size.'],
  ['--alert-padding', 'var(--spacing-3)', 'Controls alert padding.'],
  ['--alert-radius', 'var(--radius-lg)', 'Controls alert border radius.'],
  ['--alert-shadow', 'none', 'Controls alert shadow.'],
  [
    '--color-primary',
    'oklch(0.546 0.215 262.88)',
    'Shared primary palette token used by the info status.',
  ],
  [
    '--color-success',
    'oklch(0.627 0.194 149.214)',
    'Shared success palette token used by the success status.',
  ],
  [
    '--alert-title-color',
    'var(--alert-color, var(--alert-color-default))',
    'Controls title text color.',
  ],
  ['--alert-title-font-size', 'var(--text-sm)', 'Controls title font size.'],
  ['--alert-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--alert-title-line-height', 'var(--line-height-text-sm)', 'Controls title line-height.'],
  [
    '--color-warning',
    'oklch(0.795 0.184 86.047)',
    'Shared warning palette token used by the warning status.',
  ],
  [
    '--color-destructive',
    'theme destructive',
    'Shared destructive palette token used by the error status.',
  ],
];