import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const imageCropperExampleCss = `
.cropper-stack {
  display: grid;
  justify-items: center;
  gap: var(--moduix-spacing-3);
}

.cropper-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--moduix-spacing-1);
}
`;

const imageCropperOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-image-cropper-border-color',
    'var(--moduix-color-border)',
    'Controls the viewport border color.',
  ],
  [
    '--moduix-image-cropper-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the viewport border width.',
  ],
  [
    '--moduix-image-cropper-checker-color',
    'color-mix(in oklab, var(--moduix-color-muted) 72%, transparent)',
    'Controls the checkerboard tile color.',
  ],
  [
    '--moduix-image-cropper-checker-size',
    'var(--moduix-spacing-4)',
    'Controls the checkerboard tile size.',
  ],
  [
    '--moduix-image-cropper-color',
    'var(--moduix-color-foreground)',
    'Controls inherited text color.',
  ],
  [
    '--moduix-image-cropper-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls selection focus ring color.',
  ],
  [
    '--moduix-image-cropper-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls selection focus ring width.',
  ],
  ['--moduix-image-cropper-gap', 'var(--moduix-spacing-3)', 'Controls root layout gap.'],
  ['--moduix-image-cropper-grid-color', 'rgb(255 255 255 / 62%)', 'Controls crop grid color.'],
  [
    '--moduix-image-cropper-grid-width',
    'var(--moduix-border-width-sm)',
    'Controls crop grid line width.',
  ],
  ['--moduix-image-cropper-handle-bg', 'rgb(255 255 255 / 96%)', 'Controls handle fill color.'],
  [
    '--moduix-image-cropper-handle-border-color',
    'rgb(255 255 255 / 88%)',
    'Controls handle border color.',
  ],
  [
    '--moduix-image-cropper-handle-border-width',
    'var(--moduix-border-width-sm)',
    'Controls handle border width.',
  ],
  [
    '--moduix-image-cropper-handle-edge-radius',
    'var(--moduix-radius-full)',
    'Controls side handle radius.',
  ],
  ['--moduix-image-cropper-handle-edge-thickness', '0.2rem', 'Controls side handle thickness.'],
  [
    '--moduix-image-cropper-handle-radius',
    'var(--moduix-radius-xs)',
    'Controls corner handle radius.',
  ],
  [
    '--moduix-image-cropper-handle-shadow',
    '0 1px 3px rgb(15 23 42 / 18%)',
    'Controls handle shadow.',
  ],
  ['--moduix-image-cropper-handle-size', 'var(--moduix-spacing-3)', 'Controls corner handle size.'],
  ['--moduix-image-cropper-max-width', '100%', 'Controls root maximum width.'],
  ['--moduix-image-cropper-radius', 'var(--moduix-radius-lg)', 'Controls viewport radius.'],
  [
    '--moduix-image-cropper-selection-border-color',
    'var(--moduix-color-primary)',
    'Controls selection border color.',
  ],
  [
    '--moduix-image-cropper-selection-border-width',
    'var(--moduix-border-width-md)',
    'Controls selection border width.',
  ],
  [
    '--moduix-image-cropper-selection-circle-radius',
    'var(--moduix-radius-full)',
    'Controls circular selection radius.',
  ],
  [
    '--moduix-image-cropper-selection-inner-border-color',
    'rgb(255 255 255 / 64%)',
    'Controls selection inner border color.',
  ],
  [
    '--moduix-image-cropper-selection-inner-border-width',
    'var(--moduix-border-width-sm)',
    'Controls selection inner border width.',
  ],
  [
    '--moduix-image-cropper-selection-overlay-bg',
    'rgb(0 0 0 / 45%)',
    'Controls the outside-selection overlay color.',
  ],
  [
    '--moduix-image-cropper-selection-radius',
    'var(--moduix-radius-md)',
    'Controls selection radius.',
  ],
  ['--moduix-image-cropper-shadow', 'none', 'Controls viewport shadow.'],
  [
    '--moduix-image-cropper-transition',
    'var(--moduix-transition-default)',
    'Controls visual transitions.',
  ],
  [
    '--moduix-image-cropper-viewport-bg',
    'var(--moduix-color-background)',
    'Controls viewport background.',
  ],
  [
    '--moduix-image-cropper-viewport-height',
    'min(var(--moduix-image-cropper-viewport-min-height, 20rem), 62.5vw)',
    'Controls viewport height; the default follows narrow viewports.',
  ],
  ['--moduix-image-cropper-viewport-min-height', '20rem', 'Controls viewport minimum height.'],
  ['--moduix-image-cropper-width', '32rem', 'Controls root width.'],
];

export function ImageCropperCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={imageCropperOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}