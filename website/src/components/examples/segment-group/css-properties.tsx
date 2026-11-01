import type { CssPropertyInput } from '../../mdx/reference';

export const segmentGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-segment-group-bg', 'var(--moduix-muted)', 'Controls the root background.'],
  [
    '--moduix-segment-group-border-color',
    'var(--moduix-border)',
    'Controls the root border color.',
  ],
  [
    '--moduix-segment-group-indicator-bg',
    'var(--moduix-background)',
    'Controls the indicator background.',
  ],
  [
    '--moduix-segment-group-item-color',
    'var(--moduix-muted-foreground)',
    'Controls unchecked item text.',
  ],
  [
    '--moduix-segment-group-item-color-checked',
    'var(--moduix-foreground)',
    'Controls checked item text.',
  ],
];