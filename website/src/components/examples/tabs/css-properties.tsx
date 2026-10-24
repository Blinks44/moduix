import type { CssPropertyInput } from '../../mdx/reference';

export const tabsOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-tabs-bg', 'var(--moduix-color-background)', 'Controls the content background color.'],
  [
    '--moduix-tabs-border-color',
    'var(--moduix-color-border)',
    'Controls the content border color.',
  ],
  [
    '--moduix-tabs-indicator-bg',
    'var(--moduix-color-background)',
    'Controls the default indicator background.',
  ],
  ['--moduix-tabs-list-bg', 'var(--moduix-color-muted)', 'Controls the tab list background color.'],
  [
    '--moduix-tabs-list-border-color',
    'var(--moduix-color-border)',
    'Controls the tab list border color.',
  ],
  [
    '--moduix-tabs-tab-color',
    'var(--moduix-color-muted-foreground)',
    'Controls inactive trigger text color.',
  ],
  [
    '--moduix-tabs-tab-color-active',
    'var(--moduix-color-foreground)',
    'Controls selected and hovered trigger text color and the line indicator color.',
  ],
];