import type { CssPropertyInput } from '../../mdx/reference';

export const toggleGroupOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-toggle-group-bg',
    'var(--moduix-color-muted)',
    'Controls the group background. Outline uses the background color, ghost is transparent.',
  ],
  [
    '--moduix-toggle-group-border-color',
    'var(--moduix-color-border)',
    'Controls the group border color. Ghost is transparent.',
  ],
];