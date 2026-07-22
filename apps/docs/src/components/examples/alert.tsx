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
    gap: var(--moduix-spacing-3);
  }
`;

export const alertCustomCompositionCss = `
  .alert-custom {
    --moduix-alert-bg: color-mix(in oklab, var(--moduix-color-primary) 12%, var(--moduix-color-background));
    --moduix-alert-border-color: color-mix(in oklab, var(--moduix-color-primary) 38%, transparent);
    --moduix-alert-indicator-color: var(--moduix-color-primary);
    --moduix-alert-radius: var(--moduix-radius-md);
    --moduix-alert-shadow: var(--moduix-shadow-sm);

    max-width: 24rem;
  }
`;

export const alertCssProperties: CssPropertyInput[] = [
  [
    '--moduix-alert-actions-gap',
    'var(--moduix-spacing-2)',
    'Controls gap between action elements.',
  ],
  [
    '--moduix-alert-actions-margin-top',
    'var(--moduix-spacing-2)',
    'Controls spacing before the actions row.',
  ],
  [
    '--moduix-alert-bg',
    'var(--alert-bg-default, var(--moduix-color-card))',
    'Controls alert background.',
  ],
  [
    '--moduix-alert-border-color',
    'var(--alert-border-color-default, var(--moduix-color-border))',
    'Controls alert border color.',
  ],
  ['--moduix-alert-border-width', 'var(--moduix-border-width-sm)', 'Controls alert border width.'],
  [
    '--moduix-alert-color',
    'var(--alert-color-default, var(--moduix-color-card-foreground))',
    'Controls alert text color.',
  ],
  ['--moduix-alert-content-gap', 'var(--moduix-spacing-1)', 'Controls gap inside AlertContent.'],
  [
    '--moduix-alert-description-color',
    'var(--moduix-color-muted-foreground)',
    'Controls description text color.',
  ],
  [
    '--moduix-alert-description-font-size',
    'var(--moduix-text-sm)',
    'Controls description font size.',
  ],
  [
    '--moduix-alert-description-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls description line-height.',
  ],
  ['--moduix-alert-gap', 'var(--moduix-spacing-3)', 'Controls root column gap.'],
  [
    '--moduix-alert-indicator-color',
    'var(--alert-indicator-color-default, currentColor)',
    'Controls indicator color.',
  ],
  [
    '--moduix-alert-indicator-offset',
    'var(--moduix-spacing-0-5)',
    'Controls indicator vertical offset.',
  ],
  ['--moduix-alert-indicator-size', 'var(--moduix-spacing-4)', 'Controls indicator size.'],
  ['--moduix-alert-padding', 'var(--moduix-spacing-3)', 'Controls alert padding.'],
  ['--moduix-alert-radius', 'var(--moduix-radius-lg)', 'Controls alert border radius.'],
  ['--moduix-alert-shadow', 'none', 'Controls alert shadow.'],
  [
    '--moduix-color-primary',
    'oklch(0.546 0.215 262.88)',
    'Shared primary palette token used by the info status.',
  ],
  [
    '--moduix-color-success',
    'oklch(0.627 0.194 149.214)',
    'Shared success palette token used by the success status.',
  ],
  [
    '--moduix-alert-title-color',
    'var(--moduix-alert-color, var(--alert-color-default))',
    'Controls title text color.',
  ],
  ['--moduix-alert-title-font-size', 'var(--moduix-text-sm)', 'Controls title font size.'],
  [
    '--moduix-alert-title-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls title font weight.',
  ],
  [
    '--moduix-alert-title-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls title line-height.',
  ],
  [
    '--moduix-color-warning',
    'oklch(0.795 0.184 86.047)',
    'Shared warning palette token used by the warning status.',
  ],
  [
    '--moduix-color-destructive',
    'theme destructive',
    'Shared destructive palette token used by the error status.',
  ],
];