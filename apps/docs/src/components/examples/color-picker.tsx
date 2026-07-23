import type { CssPropertyInput } from '../mdx/reference';

export const colorPickerExampleCss = `
  .color-picker-demo-layout {
    display: flex;
    flex-direction: column;
    gap: var(--moduix-spacing-2);
  }

  .color-picker-slider-group {
    display: flex;
    align-items: center;
    gap: var(--moduix-spacing-3);
  }

`;

export const colorPickerInlineCss = `
  .color-picker-value-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--moduix-spacing-3);
  }

  .color-picker-input-row {
    display: flex;
    min-width: 0;
    gap: var(--moduix-spacing-2);
  }

  .color-picker-control-swatch {
    position: relative;
    display: grid;
    width: var(--moduix-size-md);
    height: var(--moduix-size-md);
    flex-shrink: 0;
    overflow: hidden;
    border-radius: var(--moduix-radius-md);
    box-shadow: inset 0 0 0 var(--moduix-border-width-sm) var(--moduix-color-border);
  }

  .color-picker-trigger-value {
    display: inline-flex;
    align-items: center;
    gap: var(--moduix-spacing-2);
  }

  .color-picker-trigger-value-swatch {
    position: relative;
    display: grid;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: var(--moduix-radius-sm);
    box-shadow: inset 0 0 0 var(--moduix-border-width-sm) var(--moduix-color-border);
  }
`;

export const colorPickerFormCss = `
  .color-picker-form {
    display: flex;
    flex-direction: column;
    gap: var(--moduix-spacing-3);
  }

.color-picker-submit {
  align-self: center;
  width: fit-content;
}
`;

export const colorPickerValueSwatchCss = `
  .color-picker-value-swatch {
    position: relative;
    display: grid;
    width: 4rem;
    height: 4rem;
    overflow: hidden;
    border-radius: var(--moduix-radius-md);
    box-shadow: inset 0 0 0 var(--moduix-border-width-sm) var(--moduix-color-border);
  }
`;

export const colorPickerDialogCss = `
  .color-picker-dialog-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

`;

export const colorPickerOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-color-picker-action-bg', 'transparent', 'Controls action button background color.'],
  [
    '--moduix-color-picker-action-bg-hover',
    'var(--moduix-color-muted)',
    'Controls hovered action background.',
  ],
  [
    '--moduix-color-picker-action-color',
    'var(--moduix-color-muted-foreground)',
    'Controls action button text and icon color.',
  ],
  [
    '--moduix-color-picker-action-color-hover',
    'var(--moduix-color-foreground)',
    'Controls hovered action button color.',
  ],
  [
    '--moduix-color-picker-action-font-size',
    'var(--moduix-text-sm)',
    'Controls action button font size.',
  ],
  [
    '--moduix-color-picker-action-gap',
    'var(--moduix-spacing-2)',
    'Controls action button content gap.',
  ],
  [
    '--moduix-color-picker-action-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls action button line height.',
  ],
  [
    '--moduix-color-picker-action-padding-x',
    'var(--moduix-spacing-2)',
    'Controls action button inline padding.',
  ],
  ['--moduix-color-picker-action-size', 'var(--moduix-size-md)', 'Controls action button height.'],
  ['--moduix-color-picker-alpha-input-width', '4rem', 'Controls alpha input width.'],
  [
    '--moduix-color-picker-area-border-color',
    'color-mix(in oklab, var(--moduix-color-border) 70%, transparent)',
    'Controls color area inset border color.',
  ],
  [
    '--moduix-color-picker-area-border-width',
    'var(--moduix-border-width-sm)',
    'Controls color area inset border width.',
  ],
  ['--moduix-color-picker-area-height', '10rem', 'Controls color area height.'],
  [
    '--moduix-color-picker-area-radius',
    'var(--moduix-radius-md)',
    'Controls color area corner radius.',
  ],
  [
    '--moduix-color-picker-border-color',
    'var(--moduix-color-border)',
    'Controls shared control border color.',
  ],
  [
    '--moduix-color-picker-border-width',
    'var(--moduix-border-width-sm)',
    'Controls shared control border width.',
  ],
  [
    '--moduix-color-picker-channel-slider-border-color',
    'color-mix(in oklab, black 14%, transparent)',
    'Controls channel slider inset border color.',
  ],
  [
    '--moduix-color-picker-channel-slider-border-width',
    'var(--moduix-border-width-sm)',
    'Controls channel slider inset border width.',
  ],
  [
    '--moduix-color-picker-channel-slider-height',
    'var(--moduix-spacing-3)',
    'Controls horizontal channel slider height.',
  ],
  [
    '--moduix-color-picker-sliders-gap',
    'var(--moduix-spacing-2)',
    'Controls the gap between the default hue and alpha sliders.',
  ],
  [
    '--moduix-color-picker-channel-slider-label-color',
    'var(--moduix-color-picker-color)',
    'Controls channel slider label color.',
  ],
  [
    '--moduix-color-picker-channel-slider-label-font-size',
    'var(--moduix-text-sm)',
    'Controls channel slider label font size.',
  ],
  [
    '--moduix-color-picker-channel-slider-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls channel slider label font weight.',
  ],
  [
    '--moduix-color-picker-channel-slider-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls channel slider label line height.',
  ],
  [
    '--moduix-color-picker-channel-slider-radius',
    'var(--moduix-radius-full)',
    'Controls channel slider corner radius.',
  ],
  [
    '--moduix-color-picker-channel-slider-track-size',
    'var(--moduix-spacing-3)',
    'Controls channel slider track thickness.',
  ],
  [
    '--moduix-color-picker-channel-slider-value-color',
    'var(--moduix-color-muted-foreground)',
    'Controls channel slider value text color.',
  ],
  [
    '--moduix-color-picker-channel-slider-value-font-size',
    'var(--moduix-text-sm)',
    'Controls channel slider value font size.',
  ],
  [
    '--moduix-color-picker-channel-slider-value-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls channel slider value line height.',
  ],
  [
    '--moduix-color-picker-channel-slider-vertical-height',
    '10rem',
    'Controls vertical channel slider height.',
  ],
  ['--moduix-color-picker-color', 'var(--moduix-color-foreground)', 'Controls shared text color.'],
  [
    '--moduix-color-picker-content-bg',
    'var(--moduix-color-popover)',
    'Controls popup background color.',
  ],
  [
    '--moduix-color-picker-content-border-color',
    'var(--moduix-color-border)',
    'Controls popup border color.',
  ],
  [
    '--moduix-color-picker-content-border-width',
    'var(--moduix-border-width-sm)',
    'Controls popup border width.',
  ],
  ['--moduix-color-picker-content-closed-opacity', '0', 'Controls closed-state animation opacity.'],
  [
    '--moduix-color-picker-content-closed-scale',
    'var(--moduix-scale-popup)',
    'Controls closed-state animation scale.',
  ],
  [
    '--moduix-color-picker-content-color',
    'var(--moduix-color-popover-foreground)',
    'Controls popup text color.',
  ],
  ['--moduix-color-picker-content-gap', 'var(--moduix-spacing-3)', 'Controls popup content gap.'],
  ['--moduix-color-picker-content-max-height', '32rem', 'Controls popup maximum height.'],
  ['--moduix-color-picker-content-padding', 'var(--moduix-spacing-4)', 'Controls popup padding.'],
  [
    '--moduix-color-picker-content-radius',
    'var(--moduix-color-picker-radius)',
    'Controls popup corner radius.',
  ],
  ['--moduix-color-picker-content-shadow', 'var(--moduix-shadow-lg)', 'Controls popup shadow.'],
  ['--moduix-color-picker-content-width', '16rem', 'Controls popup content width.'],
  [
    '--moduix-color-picker-control-bg',
    'var(--moduix-color-background)',
    'Controls field control background.',
  ],
  ['--moduix-color-picker-control-gap', 'var(--moduix-spacing-2)', 'Controls visible control gap.'],
  [
    '--moduix-color-picker-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-color-picker-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focused border and ring color.',
  ],
  [
    '--moduix-color-picker-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--moduix-color-picker-icon-size', 'var(--moduix-spacing-4)', 'Controls action icon size.'],
  [
    '--moduix-color-picker-input-font-size',
    'var(--moduix-text-sm)',
    'Controls channel input font size.',
  ],
  ['--moduix-color-picker-input-height', 'var(--moduix-size-md)', 'Controls channel input height.'],
  [
    '--moduix-color-picker-input-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls channel input line height.',
  ],
  [
    '--moduix-color-picker-input-padding-x',
    'var(--moduix-spacing-3)',
    'Controls channel input inline padding.',
  ],
  [
    '--moduix-color-picker-invalid-color',
    'var(--moduix-color-destructive)',
    'Controls invalid border color.',
  ],
  [
    '--moduix-color-picker-label-color',
    'var(--moduix-color-picker-color)',
    'Controls root label text color.',
  ],
  [
    '--moduix-color-picker-label-font-size',
    'var(--moduix-text-sm)',
    'Controls root label font size.',
  ],
  [
    '--moduix-color-picker-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls root label font weight.',
  ],
  [
    '--moduix-color-picker-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls root label line height.',
  ],
  ['--moduix-color-picker-max-width', '100%', 'Controls the maximum root width.'],
  [
    '--moduix-color-picker-radius',
    'var(--moduix-radius-md)',
    'Controls shared control corner radius.',
  ],
  [
    '--moduix-color-picker-root-gap',
    'var(--moduix-spacing-2)',
    'Controls vertical spacing in the root.',
  ],
  [
    '--moduix-color-picker-swatch-border-color',
    'color-mix(in oklab, black 14%, transparent)',
    'Controls swatch inset border color.',
  ],
  [
    '--moduix-color-picker-swatch-border-width',
    'var(--moduix-border-width-sm)',
    'Controls swatch inset border width.',
  ],
  ['--moduix-color-picker-swatch-gap', 'var(--moduix-spacing-2)', 'Controls swatch group gap.'],
  ['--moduix-color-picker-swatch-indicator-color', 'white', 'Controls checked swatch icon color.'],
  [
    '--moduix-color-picker-swatch-indicator-shadow',
    'drop-shadow(0 1px 1px rgb(0 0 0 / 0.45))',
    'Controls checked swatch icon contrast shadow.',
  ],
  [
    '--moduix-color-picker-swatch-indicator-size',
    'var(--moduix-spacing-4)',
    'Controls checked swatch icon size.',
  ],
  [
    '--moduix-color-picker-swatch-radius',
    'var(--moduix-radius-sm)',
    'Controls swatch corner radius.',
  ],
  ['--moduix-color-picker-swatch-size', 'var(--moduix-size-sm)', 'Controls swatch size.'],
  [
    '--moduix-color-picker-thumb-bg',
    'var(--moduix-color-background)',
    'Controls thumb fill color.',
  ],
  [
    '--moduix-color-picker-thumb-focus-ring-width',
    'var(--moduix-border-width-lg)',
    'Controls focused thumb ring width.',
  ],
  [
    '--moduix-color-picker-thumb-inner-ring-color',
    'var(--moduix-color-background)',
    'Controls thumb inner ring color.',
  ],
  [
    '--moduix-color-picker-thumb-inner-ring-width',
    'var(--moduix-border-width-md)',
    'Controls thumb inner ring width.',
  ],
  [
    '--moduix-color-picker-thumb-outer-ring-color',
    'color-mix(in oklab, black 18%, transparent)',
    'Controls thumb outer ring color.',
  ],
  [
    '--moduix-color-picker-thumb-outer-ring-width',
    'var(--moduix-border-width-lg)',
    'Controls thumb outer ring width.',
  ],
  [
    '--moduix-color-picker-thumb-radius',
    'var(--moduix-radius-full)',
    'Controls thumb corner radius.',
  ],
  ['--moduix-color-picker-thumb-shadow', 'var(--moduix-shadow-sm)', 'Controls thumb shadow.'],
  [
    '--moduix-color-picker-thumb-size',
    'var(--moduix-spacing-4)',
    'Controls area and slider thumb size.',
  ],
  [
    '--moduix-color-picker-transition',
    'var(--moduix-transition-default)',
    'Controls transition timing.',
  ],
  [
    '--moduix-color-picker-trigger-fit-content-gap',
    'var(--moduix-spacing-2)',
    'Controls content gap for fit-content triggers.',
  ],
  [
    '--moduix-color-picker-trigger-fit-content-padding-x',
    'var(--moduix-spacing-3)',
    'Controls inline padding for fit-content triggers.',
  ],
  [
    '--moduix-color-picker-trigger-fit-content-swatch-size',
    'var(--moduix-spacing-4)',
    'Controls direct swatch size inside fit-content triggers.',
  ],
  [
    '--moduix-color-picker-trigger-padding',
    'var(--moduix-spacing-1)',
    'Controls trigger swatch padding.',
  ],
  [
    '--moduix-color-picker-trigger-size',
    'var(--moduix-size-md)',
    'Controls the trigger swatch button size.',
  ],
  [
    '--moduix-color-picker-value-text-color',
    'var(--moduix-color-picker-color)',
    'Controls value text color.',
  ],
  [
    '--moduix-color-picker-value-text-font-size',
    'var(--moduix-text-sm)',
    'Controls value text font size.',
  ],
  [
    '--moduix-color-picker-value-text-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--moduix-color-picker-view-gap', 'var(--moduix-spacing-2)', 'Controls format view gap.'],
  ['--moduix-color-picker-width', '16rem', 'Controls the root width.'],
];