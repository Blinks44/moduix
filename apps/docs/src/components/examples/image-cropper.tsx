import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const imageCropperExampleCss = `
.cropper-stack {
  display: grid;
  width: min(32rem, 100%);
  gap: var(--spacing-3);
}

.cropper-toolbar {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  width: fit-content;
  gap: var(--spacing-1);
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-1);
  background: var(--color-muted);
}

.cropper-button {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: var(--border-width-sm) solid transparent;
  border-radius: var(--radius-md);
  padding-inline: var(--spacing-3);
  background: transparent;
  color: var(--color-muted-foreground);
  font: inherit;
  cursor: pointer;
  transition:
    border-color var(--transition-default),
    background-color var(--transition-default),
    box-shadow var(--transition-default),
    color var(--transition-default);
}

.cropper-button:hover {
  color: var(--color-foreground);
}

.cropper-button[data-state="checked"] {
  background: var(--color-background);
  color: var(--color-foreground);
  box-shadow: var(--shadow-sm);
}

.cropper-button:focus-visible {
  outline: var(--border-width-md) solid var(--color-ring);
  outline-offset: var(--border-width-sm);
}

.cropper-icon-button {
  width: 2rem;
  padding-inline: 0;
}

.cropper-icon-button svg {
  width: 1rem;
  height: 1rem;
}

.cropper-output {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
  line-height: var(--line-height-text-xs);
}

.cropper-preview {
  display: grid;
  width: 8rem;
  height: 8rem;
  place-items: center;
  overflow: hidden;
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-muted);
}

.cropper-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;

const imageCropperOverrideCssProperties: CssPropertyInput[] = [
  ['--image-cropper-border-color', 'var(--color-border)', 'Controls the viewport border color.'],
  ['--image-cropper-border-width', 'var(--border-width-sm)', 'Controls the viewport border width.'],
  [
    '--image-cropper-checker-color',
    'color-mix(in oklab, var(--color-muted) 72%, transparent)',
    'Controls the checkerboard tile color.',
  ],
  ['--image-cropper-checker-size', 'var(--spacing-4)', 'Controls the checkerboard tile size.'],
  ['--image-cropper-color', 'var(--color-foreground)', 'Controls inherited text color.'],
  ['--image-cropper-focus-ring-color', 'var(--color-ring)', 'Controls selection focus ring color.'],
  [
    '--image-cropper-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls selection focus ring width.',
  ],
  ['--image-cropper-gap', 'var(--spacing-3)', 'Controls root layout gap.'],
  ['--image-cropper-grid-color', 'rgb(255 255 255 / 62%)', 'Controls crop grid color.'],
  ['--image-cropper-grid-width', 'var(--border-width-sm)', 'Controls crop grid line width.'],
  ['--image-cropper-handle-bg', 'rgb(255 255 255 / 96%)', 'Controls handle fill color.'],
  [
    '--image-cropper-handle-border-color',
    'rgb(255 255 255 / 88%)',
    'Controls handle border color.',
  ],
  [
    '--image-cropper-handle-border-width',
    'var(--border-width-sm)',
    'Controls handle border width.',
  ],
  ['--image-cropper-handle-edge-radius', 'var(--radius-full)', 'Controls side handle radius.'],
  ['--image-cropper-handle-edge-thickness', '0.2rem', 'Controls side handle thickness.'],
  ['--image-cropper-handle-radius', 'var(--radius-xs)', 'Controls corner handle radius.'],
  ['--image-cropper-handle-shadow', '0 1px 3px rgb(15 23 42 / 18%)', 'Controls handle shadow.'],
  ['--image-cropper-handle-size', 'var(--spacing-3)', 'Controls corner handle size.'],
  ['--image-cropper-max-width', '100%', 'Controls root maximum width.'],
  ['--image-cropper-radius', 'var(--radius-lg)', 'Controls viewport radius.'],
  [
    '--image-cropper-selection-border-color',
    'var(--color-primary)',
    'Controls selection border color.',
  ],
  [
    '--image-cropper-selection-border-width',
    'var(--border-width-md)',
    'Controls selection border width.',
  ],
  [
    '--image-cropper-selection-circle-radius',
    'var(--radius-full)',
    'Controls circular selection radius.',
  ],
  [
    '--image-cropper-selection-inner-border-color',
    'rgb(255 255 255 / 64%)',
    'Controls selection inner border color.',
  ],
  [
    '--image-cropper-selection-inner-border-width',
    'var(--border-width-sm)',
    'Controls selection inner border width.',
  ],
  [
    '--image-cropper-selection-overlay-bg',
    'rgb(0 0 0 / 45%)',
    'Controls the outside-selection overlay color.',
  ],
  ['--image-cropper-selection-radius', 'var(--radius-md)', 'Controls selection radius.'],
  ['--image-cropper-shadow', 'none', 'Controls viewport shadow.'],
  ['--image-cropper-transition', 'var(--transition-default)', 'Controls visual transitions.'],
  ['--image-cropper-viewport-bg', 'var(--color-background)', 'Controls viewport background.'],
  [
    '--image-cropper-viewport-height',
    'var(--image-cropper-viewport-min-height, 20rem)',
    'Controls viewport height.',
  ],
  ['--image-cropper-viewport-min-height', '20rem', 'Controls viewport minimum height.'],
  ['--image-cropper-width', '32rem', 'Controls root width.'],
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