import type { CssPropertyInput } from '../../mdx/reference';

export const kbdOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-kbd-bg', 'var(--moduix-color-muted)', 'Controls key background color.'],
  ['--moduix-kbd-border-color', 'var(--moduix-color-border)', 'Controls key border color.'],
  ['--moduix-kbd-border-width', 'var(--moduix-border-width-sm)', 'Controls key border width.'],
  ['--moduix-kbd-color', 'var(--moduix-color-foreground)', 'Controls key text color.'],
  ['--moduix-kbd-height', 'var(--moduix-size-xs)', 'Controls key minimum height and width.'],
  ['--moduix-kbd-padding-x', 'var(--moduix-spacing-2)', 'Controls horizontal key padding.'],
  ['--moduix-kbd-radius', 'var(--moduix-radius-sm)', 'Controls key border radius.'],
  [
    '--moduix-kbd-shadow',
    'inset 0 -1px 0 color-mix(in oklab, currentColor 12%, transparent)',
    'Controls key inset shadow.',
  ],
];