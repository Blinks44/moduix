import type { CssPropertyInput } from '../../mdx/reference';

export const alertCssProperties: CssPropertyInput[] = [
  [
    '--moduix-alert-bg',
    'var(--moduix-color-card)',
    'Overrides the alert background. Each `status` sets its own default.',
  ],
  [
    '--moduix-alert-border-color',
    'var(--moduix-color-border)',
    'Overrides the alert border color. Each `status` sets its own default.',
  ],
  [
    '--moduix-alert-color',
    'var(--moduix-color-card-foreground)',
    'Overrides the alert text color. Each `status` sets its own default.',
  ],
  [
    '--moduix-alert-description-color',
    'var(--moduix-color-muted-foreground)',
    'Controls description text color.',
  ],
  [
    '--moduix-alert-indicator-color',
    'var(--moduix-color-muted-foreground)',
    'Overrides the indicator color. Each `status` sets its own default.',
  ],
  [
    '--moduix-color-success',
    'oklch(0.627 0.194 149.214)',
    'Shared success palette token used by the success status.',
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