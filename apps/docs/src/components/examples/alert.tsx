import type { CssPropertyInput } from '../mdx/reference';

export const alertStatusesCss = `
  .alert-stack {
    display: grid;
    inline-size: 100%;
    gap: var(--moduix-spacing-3);
  }
`;

export const alertCustomCompositionCss = `
  .alert-custom {
    --moduix-alert-warning-bg: color-mix(in oklab, var(--moduix-color-primary) 12%, var(--moduix-color-background));
    --moduix-alert-warning-border-color: color-mix(in oklab, var(--moduix-color-primary) 38%, transparent);
    --moduix-alert-warning-indicator-color: var(--moduix-color-primary);
    --moduix-alert-radius: var(--moduix-radius-md);
    --moduix-alert-shadow: var(--moduix-shadow-sm);
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
  ['--moduix-alert-bg', 'Selected status background', 'Overrides the background for every status.'],
  [
    '--moduix-alert-border-color',
    'Selected status border color',
    'Overrides the border color for every status.',
  ],
  ['--moduix-alert-border-width', 'var(--moduix-border-width-sm)', 'Controls alert border width.'],
  [
    '--moduix-alert-color',
    'Selected status foreground',
    'Overrides the text color for every status.',
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
    'Selected status indicator color',
    'Overrides the indicator color for every status.',
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
  ['--moduix-alert-neutral-bg', 'var(--moduix-color-card)', 'Controls neutral background.'],
  [
    '--moduix-alert-neutral-border-color',
    'var(--moduix-color-border)',
    'Controls neutral border color.',
  ],
  [
    '--moduix-alert-neutral-color',
    'var(--moduix-color-card-foreground)',
    'Controls neutral text color.',
  ],
  [
    '--moduix-alert-neutral-indicator-color',
    'var(--moduix-color-muted-foreground)',
    'Controls neutral indicator color.',
  ],
  ['--moduix-alert-info-bg', 'Primary 4% over background', 'Controls informational background.'],
  ['--moduix-alert-info-border-color', 'Primary at 32%', 'Controls informational border color.'],
  [
    '--moduix-alert-info-color',
    'var(--moduix-color-foreground)',
    'Controls informational text color.',
  ],
  [
    '--moduix-alert-info-indicator-color',
    'var(--moduix-color-primary)',
    'Controls informational indicator color.',
  ],
  ['--moduix-alert-success-bg', 'Success 10% over background', 'Controls success background.'],
  ['--moduix-alert-success-border-color', 'Success at 34%', 'Controls success border color.'],
  [
    '--moduix-alert-success-color',
    'var(--moduix-color-foreground)',
    'Controls success text color.',
  ],
  [
    '--moduix-alert-success-indicator-color',
    'var(--moduix-color-success)',
    'Controls success indicator color.',
  ],
  ['--moduix-alert-warning-bg', 'Warning 13% over background', 'Controls warning background.'],
  ['--moduix-alert-warning-border-color', 'Warning at 38%', 'Controls warning border color.'],
  [
    '--moduix-alert-warning-color',
    'var(--moduix-color-foreground)',
    'Controls warning text color.',
  ],
  [
    '--moduix-alert-warning-indicator-color',
    'var(--moduix-color-warning)',
    'Controls warning indicator color.',
  ],
  ['--moduix-alert-error-bg', 'Destructive 9% over background', 'Controls error background.'],
  ['--moduix-alert-error-border-color', 'Destructive at 35%', 'Controls error border color.'],
  ['--moduix-alert-error-color', 'var(--moduix-color-foreground)', 'Controls error text color.'],
  [
    '--moduix-alert-error-indicator-color',
    'var(--moduix-color-destructive)',
    'Controls error indicator color.',
  ],
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
    'var(--moduix-alert-color, selected status foreground)',
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