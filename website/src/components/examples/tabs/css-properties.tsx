import type { CssControls } from '../../mdx/customize';
import type { CssPropertyInput } from '../../mdx/reference';

export const tabsOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-tabs-bg', 'var(--moduix-background)', 'Controls the content background color.'],
  ['--moduix-tabs-border-color', 'var(--moduix-border)', 'Controls the content border color.'],
  [
    '--moduix-tabs-indicator-bg',
    'var(--moduix-background)',
    'Controls the default indicator background.',
  ],
  ['--moduix-tabs-list-bg', 'var(--moduix-muted)', 'Controls the tab list background color.'],
  [
    '--moduix-tabs-list-border-color',
    'var(--moduix-border)',
    'Controls the tab list border color.',
  ],
  [
    '--moduix-tabs-tab-color',
    'var(--moduix-muted-foreground)',
    'Controls inactive trigger text color.',
  ],
  [
    '--moduix-tabs-tab-color-active',
    'var(--moduix-foreground)',
    'Controls selected and hovered trigger text color and the line indicator color.',
  ],
];

export const tabsControls: CssControls = {
  '--moduix-tabs-list-bg': 'color',
  '--moduix-tabs-indicator-bg': 'color',
  '--moduix-tabs-tab-color': 'color',
  '--moduix-tabs-tab-color-active': 'color',
};