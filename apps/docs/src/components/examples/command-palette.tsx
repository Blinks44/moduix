import type { CssPropertyInput } from '../mdx/reference';

export const commandPaletteOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-command-palette-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Controls backdrop fill.',
  ],
  ['--moduix-command-palette-backdrop-blur', '4px', 'Controls backdrop blur.'],
  [
    '--moduix-command-palette-backdrop-ending-blur',
    'none',
    'Customizes command palette backdrop ending blur.',
  ],
  [
    '--moduix-command-palette-backdrop-ending-opacity',
    '0',
    'Customizes command palette backdrop ending opacity.',
  ],
  [
    '--moduix-command-palette-backdrop-starting-blur',
    'none',
    'Customizes command palette backdrop starting blur.',
  ],
  [
    '--moduix-command-palette-backdrop-starting-opacity',
    '0',
    'Customizes command palette backdrop starting opacity.',
  ],
  [
    '--moduix-command-palette-backdrop-transition',
    'var(--moduix-transition-default)',
    'Customizes command palette backdrop transition.',
  ],
  ['--moduix-command-palette-bg', 'var(--moduix-color-popover)', 'Customizes command palette bg.'],
  [
    '--moduix-command-palette-border-color',
    'color-mix(in oklab, var(--moduix-color-border) 84%, transparent)',
    'Customizes command palette border color.',
  ],
  [
    '--moduix-command-palette-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes command palette border width.',
  ],
  [
    '--moduix-command-palette-clear-bg-hover',
    'var(--moduix-color-accent)',
    'Customizes command palette clear bg hover.',
  ],
  [
    '--moduix-command-palette-clear-radius',
    'var(--moduix-radius-md)',
    'Customizes command palette clear radius.',
  ],
  [
    '--moduix-command-palette-clear-size',
    'var(--moduix-size-sm)',
    'Customizes command palette clear size.',
  ],
  [
    '--moduix-command-palette-color',
    'var(--moduix-color-popover-foreground)',
    'Customizes command palette color.',
  ],
  [
    '--moduix-command-palette-content-ending-opacity',
    '0',
    'Customizes command palette content ending opacity.',
  ],
  [
    '--moduix-command-palette-content-ending-scale',
    'var(--moduix-scale-popup)',
    'Customizes command palette content ending scale.',
  ],
  [
    '--moduix-command-palette-content-ending-translate-x',
    '0',
    'Customizes command palette content ending translate x.',
  ],
  [
    '--moduix-command-palette-content-ending-translate-y',
    '-0.75rem',
    'Customizes command palette content ending translate y.',
  ],
  [
    '--moduix-command-palette-content-starting-opacity',
    '0',
    'Customizes command palette content starting opacity.',
  ],
  [
    '--moduix-command-palette-content-starting-scale',
    'var(--moduix-scale-popup)',
    'Customizes command palette content starting scale.',
  ],
  [
    '--moduix-command-palette-content-starting-translate-x',
    '0',
    'Customizes command palette content starting translate x.',
  ],
  [
    '--moduix-command-palette-content-starting-translate-y',
    '-0.75rem',
    'Customizes command palette content starting translate y.',
  ],
  [
    '--moduix-command-palette-control-margin-bottom',
    'var(--moduix-spacing-2)',
    'Customizes command palette control margin bottom.',
  ],
  [
    '--moduix-command-palette-control-margin-x',
    'var(--moduix-spacing-4)',
    'Customizes command palette control margin x.',
  ],
  [
    '--moduix-command-palette-control-margin-y',
    'var(--moduix-spacing-2)',
    'Customizes command palette control margin y.',
  ],
  [
    '--moduix-command-palette-control-padding-x',
    'var(--moduix-spacing-3)',
    'Customizes command palette control padding x.',
  ],
  [
    '--moduix-command-palette-control-padding-y',
    'var(--moduix-spacing-1)',
    'Customizes command palette control padding y.',
  ],
  [
    '--moduix-command-palette-divider-color',
    'var(--moduix-color-border)',
    'Customizes command palette divider color.',
  ],
  [
    '--moduix-command-palette-divider-width',
    'var(--moduix-border-width-sm)',
    'Customizes command palette divider width.',
  ],
  [
    '--moduix-command-palette-description-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes command palette description color.',
  ],
  [
    '--moduix-command-palette-description-font-size',
    'var(--moduix-text-sm)',
    'Customizes command palette description font size.',
  ],
  [
    '--moduix-command-palette-description-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes command palette description line height.',
  ],
  [
    '--moduix-command-palette-empty-font-size',
    'var(--moduix-text-sm)',
    'Customizes command palette empty font size.',
  ],
  [
    '--moduix-command-palette-empty-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes command palette empty line height.',
  ],
  [
    '--moduix-command-palette-empty-padding-x',
    'var(--moduix-spacing-4)',
    'Customizes command palette empty padding x.',
  ],
  [
    '--moduix-command-palette-empty-padding-y',
    'var(--moduix-spacing-3)',
    'Customizes command palette empty padding y.',
  ],
  [
    '--moduix-command-palette-focus-ring-color',
    'var(--moduix-color-ring)',
    'Customizes command palette focus ring color.',
  ],
  [
    '--moduix-command-palette-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Customizes command palette focus ring offset.',
  ],
  [
    '--moduix-command-palette-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Customizes command palette focus ring width.',
  ],
  [
    '--moduix-command-palette-footer-font-size',
    'var(--moduix-text-xs)',
    'Customizes command palette footer font size.',
  ],
  [
    '--moduix-command-palette-footer-gap',
    'var(--moduix-spacing-3)',
    'Customizes command palette footer gap.',
  ],
  [
    '--moduix-command-palette-footer-line-height',
    'var(--moduix-line-height-text-xs)',
    'Customizes command palette footer line height.',
  ],
  [
    '--moduix-command-palette-footer-padding-x',
    'var(--moduix-spacing-4)',
    'Customizes command palette footer padding x.',
  ],
  [
    '--moduix-command-palette-footer-padding-y',
    'var(--moduix-spacing-2)',
    'Customizes command palette footer padding y.',
  ],
  [
    '--moduix-command-palette-group-gap',
    'var(--moduix-spacing-1)',
    'Customizes command palette group gap.',
  ],
  [
    '--moduix-command-palette-group-label-font-size',
    'var(--moduix-popup-group-label-font-size, var(--moduix-text-xs))',
    'Customizes command palette group label font size.',
  ],
  [
    '--moduix-command-palette-group-label-font-weight',
    'var(--moduix-popup-group-label-font-weight, var(--moduix-weight-regular))',
    'Customizes command palette group label font weight.',
  ],
  [
    '--moduix-command-palette-group-label-line-height',
    'var(--moduix-popup-group-label-line-height, var(--moduix-line-height-text-xs))',
    'Customizes command palette group label line height.',
  ],
  [
    '--moduix-command-palette-group-label-padding-x',
    'var(--moduix-spacing-3)',
    'Customizes command palette group label padding x.',
  ],
  [
    '--moduix-command-palette-group-label-padding-y',
    'var(--moduix-popup-group-label-padding-y, var(--moduix-spacing-1))',
    'Customizes command palette group label padding y.',
  ],
  [
    '--moduix-command-palette-group-padding-bottom',
    'var(--moduix-spacing-2)',
    'Customizes command palette group padding bottom.',
  ],
  [
    '--moduix-command-palette-header-gap',
    'var(--moduix-spacing-1)',
    'Customizes command palette header gap.',
  ],
  [
    '--moduix-command-palette-header-padding-x',
    'var(--moduix-spacing-4)',
    'Customizes command palette header padding x.',
  ],
  [
    '--moduix-command-palette-header-padding-y',
    'var(--moduix-spacing-4)',
    'Customizes command palette header padding y.',
  ],
  [
    '--moduix-command-palette-highlight-bg',
    'var(--moduix-color-accent)',
    'Controls highlighted item background.',
  ],
  [
    '--moduix-command-palette-highlight-color',
    'var(--moduix-color-foreground)',
    'Customizes command palette highlight color.',
  ],
  [
    '--moduix-command-palette-icon-size',
    'var(--moduix-spacing-4)',
    'Customizes command palette icon size.',
  ],
  [
    '--moduix-command-palette-input-bg',
    'var(--moduix-color-background)',
    'Customizes command palette input bg.',
  ],
  [
    '--moduix-command-palette-input-border-color',
    'var(--moduix-color-border)',
    'Customizes command palette input border color.',
  ],
  [
    '--moduix-command-palette-input-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Customizes command palette input border color invalid.',
  ],
  [
    '--moduix-command-palette-input-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes command palette input border width.',
  ],
  [
    '--moduix-command-palette-input-color',
    'var(--moduix-color-foreground)',
    'Customizes command palette input color.',
  ],
  [
    '--moduix-command-palette-input-control-height',
    'auto',
    'Customizes command palette input control height.',
  ],
  [
    '--moduix-command-palette-input-font-size',
    'var(--moduix-text-sm)',
    'Customizes command palette input font size.',
  ],
  [
    '--moduix-command-palette-input-gap',
    'var(--moduix-spacing-2)',
    'Customizes command palette input gap.',
  ],
  [
    '--moduix-command-palette-input-height',
    'var(--moduix-size-md)',
    'Customizes command palette input height.',
  ],
  [
    '--moduix-command-palette-input-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes command palette input line height.',
  ],
  [
    '--moduix-command-palette-input-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes command palette input placeholder color.',
  ],
  [
    '--moduix-command-palette-input-radius',
    'var(--moduix-radius-md)',
    'Customizes command palette input radius.',
  ],
  [
    '--moduix-command-palette-item-color',
    'var(--moduix-command-palette-color)',
    'Customizes command palette item color.',
  ],
  [
    '--moduix-command-palette-item-description-font-size',
    'var(--moduix-text-xs)',
    'Customizes command palette item description font size.',
  ],
  [
    '--moduix-command-palette-item-description-line-height',
    'var(--moduix-line-height-text-xs)',
    'Customizes command palette item description line height.',
  ],
  [
    '--moduix-command-palette-item-font-size',
    'var(--moduix-popup-item-font-size, var(--moduix-text-sm))',
    'Customizes command palette item font size.',
  ],
  [
    '--moduix-command-palette-item-gap',
    'var(--moduix-spacing-3)',
    'Customizes command palette item gap.',
  ],
  [
    '--moduix-command-palette-item-icon-bg',
    'var(--moduix-color-muted)',
    'Customizes command palette item icon bg.',
  ],
  [
    '--moduix-command-palette-item-icon-border-color',
    'var(--moduix-color-border)',
    'Customizes command palette item icon border color.',
  ],
  [
    '--moduix-command-palette-item-icon-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes command palette item icon border width.',
  ],
  [
    '--moduix-command-palette-item-icon-box-size',
    'var(--moduix-spacing-8)',
    'Customizes command palette item icon box size.',
  ],
  [
    '--moduix-command-palette-item-icon-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes command palette item icon color.',
  ],
  [
    '--moduix-command-palette-item-icon-radius',
    'var(--moduix-radius-md)',
    'Customizes command palette item icon radius.',
  ],
  [
    '--moduix-command-palette-item-icon-size',
    'var(--moduix-spacing-4)',
    'Customizes command palette item icon size.',
  ],
  [
    '--moduix-command-palette-item-label-font-weight',
    'var(--moduix-weight-medium)',
    'Customizes command palette item label font weight.',
  ],
  [
    '--moduix-command-palette-item-line-height',
    'var(--moduix-popup-item-line-height, var(--moduix-line-height-text-sm))',
    'Customizes command palette item line height.',
  ],
  [
    '--moduix-command-palette-item-meta-font-size',
    'var(--moduix-text-xs)',
    'Customizes command palette item meta font size.',
  ],
  [
    '--moduix-command-palette-item-meta-line-height',
    'var(--moduix-line-height-text-xs)',
    'Customizes command palette item meta line height.',
  ],
  [
    '--moduix-command-palette-item-min-height',
    'var(--moduix-popup-item-min-height, var(--moduix-size-sm))',
    'Customizes command palette item min height.',
  ],
  [
    '--moduix-command-palette-item-padding-x',
    'var(--moduix-popup-item-padding-x-start, var(--moduix-spacing-3))',
    'Customizes command palette item padding x.',
  ],
  [
    '--moduix-command-palette-item-padding-y',
    'var(--moduix-popup-item-padding-y, var(--moduix-spacing-1))',
    'Customizes command palette item padding y.',
  ],
  [
    '--moduix-command-palette-item-radius',
    'var(--moduix-radius-md)',
    'Customizes command palette item radius.',
  ],
  [
    '--moduix-command-palette-item-text-gap',
    'var(--moduix-spacing-1)',
    'Customizes command palette item text gap.',
  ],
  [
    '--moduix-command-palette-kbd-bg',
    'var(--moduix-color-muted)',
    'Customizes command palette kbd bg.',
  ],
  [
    '--moduix-command-palette-kbd-border-color',
    'var(--moduix-color-border)',
    'Customizes command palette kbd border color.',
  ],
  [
    '--moduix-command-palette-kbd-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes command palette kbd border width.',
  ],
  [
    '--moduix-command-palette-kbd-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes command palette kbd color.',
  ],
  [
    '--moduix-command-palette-kbd-font-family',
    'var(--moduix-font-mono)',
    'Customizes command palette kbd font family.',
  ],
  [
    '--moduix-command-palette-kbd-font-size',
    'var(--moduix-text-xs)',
    'Customizes command palette kbd font size.',
  ],
  ['--moduix-command-palette-kbd-height', '1.25rem', 'Customizes command palette kbd height.'],
  [
    '--moduix-command-palette-kbd-line-height',
    '1rem',
    'Customizes command palette kbd line height.',
  ],
  [
    '--moduix-command-palette-kbd-min-width',
    '1.25rem',
    'Customizes command palette kbd min width.',
  ],
  [
    '--moduix-command-palette-kbd-padding-x',
    'var(--moduix-spacing-1)',
    'Customizes command palette kbd padding x.',
  ],
  [
    '--moduix-command-palette-kbd-radius',
    'var(--moduix-radius-sm)',
    'Customizes command palette kbd radius.',
  ],
  [
    '--moduix-command-palette-list-padding-x',
    'var(--moduix-spacing-2)',
    'Customizes command palette list padding x.',
  ],
  [
    '--moduix-command-palette-list-padding-y',
    'var(--moduix-spacing-2)',
    'Customizes command palette list padding y.',
  ],
  [
    '--moduix-command-palette-list-scroll-padding-y',
    'var(--moduix-spacing-2)',
    'Customizes command palette list scroll padding y.',
  ],
  ['--moduix-command-palette-max-height', '34rem', 'Customizes command palette max height.'],
  [
    '--moduix-command-palette-max-width',
    'calc(100vw - var(--moduix-spacing-8))',
    'Customizes command palette max width.',
  ],
  [
    '--moduix-command-palette-muted-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes command palette muted color.',
  ],
  [
    '--moduix-command-palette-positioner-padding',
    '10dvh var(--moduix-spacing-4) var(--moduix-spacing-4)',
    'Customizes command palette positioner padding.',
  ],
  ['--moduix-command-palette-radius', 'var(--moduix-radius-lg)', 'Controls palette corner radius.'],
  [
    '--moduix-command-palette-scrollbar-margin',
    'var(--moduix-spacing-1)',
    'Customizes command palette scrollbar margin.',
  ],
  [
    '--moduix-command-palette-scrollbar-size',
    'var(--moduix-spacing-1-5)',
    'Customizes command palette scrollbar size.',
  ],
  [
    '--moduix-command-palette-scrollbar-thumb-bg',
    'var(--moduix-color-border)',
    'Customizes command palette scrollbar thumb bg.',
  ],
  [
    '--moduix-command-palette-selected-color',
    'var(--moduix-command-palette-highlight-color)',
    'Customizes command palette selected color.',
  ],
  [
    '--moduix-command-palette-separator-margin-x',
    'var(--moduix-spacing-2)',
    'Customizes command palette separator margin x.',
  ],
  [
    '--moduix-command-palette-separator-margin-y',
    'var(--moduix-spacing-2)',
    'Customizes command palette separator margin y.',
  ],
  [
    '--moduix-command-palette-shadow',
    'var(--moduix-shadow-lg)',
    'Customizes command palette shadow.',
  ],
  [
    '--moduix-command-palette-top-bg',
    'color-mix(in oklab, var(--moduix-color-popover) 96%, white 4%)',
    'Customizes command palette top bg.',
  ],
  [
    '--moduix-command-palette-title-color',
    'var(--moduix-command-palette-color, var(--moduix-color-popover-foreground))',
    'Customizes command palette title color.',
  ],
  [
    '--moduix-command-palette-title-font-size',
    'var(--moduix-text-md)',
    'Customizes command palette title font size.',
  ],
  [
    '--moduix-command-palette-title-font-weight',
    'var(--moduix-weight-semibold)',
    'Customizes command palette title font weight.',
  ],
  [
    '--moduix-command-palette-title-line-height',
    'var(--moduix-line-height-text-md)',
    'Customizes command palette title line height.',
  ],
  [
    '--moduix-command-palette-transition',
    'var(--moduix-transition-default)',
    'Customizes command palette transition.',
  ],
  [
    '--moduix-command-palette-trigger-bg',
    'var(--moduix-color-background)',
    'Customizes command palette trigger bg.',
  ],
  [
    '--moduix-command-palette-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Customizes command palette trigger bg hover.',
  ],
  [
    '--moduix-command-palette-trigger-border-color',
    'var(--moduix-color-border)',
    'Customizes command palette trigger border color.',
  ],
  [
    '--moduix-command-palette-trigger-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes command palette trigger border width.',
  ],
  [
    '--moduix-command-palette-trigger-color',
    'var(--moduix-color-foreground)',
    'Customizes command palette trigger color.',
  ],
  [
    '--moduix-command-palette-trigger-font-size',
    'var(--moduix-text-md)',
    'Customizes command palette trigger font size.',
  ],
  [
    '--moduix-command-palette-trigger-gap',
    'var(--moduix-spacing-2)',
    'Customizes command palette trigger gap.',
  ],
  [
    '--moduix-command-palette-trigger-height',
    'var(--moduix-size-md)',
    'Customizes command palette trigger height.',
  ],
  [
    '--moduix-command-palette-trigger-line-height',
    'var(--moduix-line-height-text-md)',
    'Customizes command palette trigger line height.',
  ],
  [
    '--moduix-command-palette-trigger-padding-x',
    'var(--moduix-spacing-3-5)',
    'Customizes command palette trigger padding x.',
  ],
  [
    '--moduix-command-palette-trigger-padding-y',
    'var(--moduix-spacing-1)',
    'Customizes command palette trigger padding y.',
  ],
  [
    '--moduix-command-palette-trigger-radius',
    'var(--moduix-radius-md)',
    'Customizes command palette trigger radius.',
  ],
  ['--moduix-command-palette-width', '37.5rem', 'Controls palette width.'],
];