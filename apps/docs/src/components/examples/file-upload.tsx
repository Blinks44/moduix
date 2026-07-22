import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const fileUploadExampleCss = `
  .file-upload-simple-demo {
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-lg);
    padding: var(--moduix-spacing-4);
    background-color: color-mix(in oklab, var(--moduix-color-muted) 32%, var(--moduix-color-background));
  }

  .file-upload-stack {
    display: grid;
    gap: var(--moduix-spacing-3);
  }

  .file-upload-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--moduix-spacing-2);
    --moduix-file-upload-action-size: var(--moduix-file-upload-trigger-height, var(--moduix-button-size-md, var(--moduix-size-md)));
  }

  .file-upload-dropzone-content {
    display: grid;
    justify-items: center;
    gap: var(--moduix-spacing-1);
  }

  .file-upload-dropzone-content [data-slot='file-upload-trigger'] {
    margin-top: var(--moduix-spacing-2);
  }

  .file-upload-dropzone-title {
    color: var(--moduix-color-foreground);
    font-size: var(--moduix-text-sm);
    font-weight: var(--moduix-weight-medium);
    line-height: var(--moduix-line-height-text-sm);
  }

  .file-upload-dropzone-description {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-xs);
    line-height: var(--moduix-line-height-text-xs);
  }

  .file-upload-state,
  .file-upload-error {
    margin: 0;
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-xs);
    line-height: var(--moduix-line-height-text-xs);
  }

  .file-upload-error {
    color: var(--moduix-color-destructive);
  }

  .file-upload-submit {
    justify-self: start;
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-sm);
    padding: var(--moduix-spacing-2) var(--moduix-spacing-3);
    background-color: var(--moduix-color-background);
    color: var(--moduix-color-foreground);
    font: inherit;
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }

`;

const fileUploadOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-file-upload-action-bg', 'transparent', 'Controls delete and clear button background.'],
  [
    '--moduix-file-upload-action-bg-hover',
    'var(--moduix-color-muted)',
    'Controls delete and clear button hover background.',
  ],
  [
    '--moduix-file-upload-action-color',
    'var(--moduix-color-muted-foreground)',
    'Controls delete and clear button color.',
  ],
  [
    '--moduix-file-upload-action-color-hover',
    'var(--moduix-color-foreground)',
    'Controls delete and clear button hover color.',
  ],
  [
    '--moduix-file-upload-action-icon-size',
    'var(--moduix-spacing-4)',
    'Controls delete and clear icon size.',
  ],
  [
    '--moduix-file-upload-action-radius',
    'var(--moduix-radius-sm)',
    'Controls delete and clear button radius.',
  ],
  [
    '--moduix-file-upload-action-size',
    'var(--moduix-size-sm)',
    'Controls delete and clear button size.',
  ],
  [
    '--moduix-file-upload-clear-trigger-color',
    'var(--moduix-color-muted-foreground)',
    'Controls clear trigger text color.',
  ],
  [
    '--moduix-file-upload-clear-trigger-font-size',
    'var(--moduix-text-sm)',
    'Controls clear trigger font size.',
  ],
  [
    '--moduix-file-upload-clear-trigger-gap',
    'var(--moduix-spacing-2)',
    'Controls clear trigger content gap.',
  ],
  [
    '--moduix-file-upload-clear-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls clear trigger line height.',
  ],
  [
    '--moduix-file-upload-clear-trigger-padding-x',
    'var(--moduix-spacing-2)',
    'Controls clear trigger horizontal padding.',
  ],
  ['--moduix-file-upload-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--moduix-file-upload-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-file-upload-dropzone-bg',
    'var(--moduix-color-background)',
    'Controls dropzone background.',
  ],
  [
    '--moduix-file-upload-dropzone-bg-dragging',
    'var(--moduix-color-accent)',
    'Controls dropzone background while dragging.',
  ],
  [
    '--moduix-file-upload-dropzone-border-color',
    'var(--moduix-color-border)',
    'Controls dropzone border color.',
  ],
  [
    '--moduix-file-upload-dropzone-border-color-dragging',
    'var(--moduix-color-primary)',
    'Controls dropzone border color while dragging.',
  ],
  [
    '--moduix-file-upload-dropzone-border-width',
    'var(--moduix-border-width-sm)',
    'Controls dropzone border width.',
  ],
  [
    '--moduix-file-upload-dropzone-color',
    'var(--moduix-color-muted-foreground)',
    'Controls dropzone text color.',
  ],
  [
    '--moduix-file-upload-dropzone-color-dragging',
    'var(--moduix-color-foreground)',
    'Controls dropzone text color while dragging.',
  ],
  [
    '--moduix-file-upload-dropzone-gap',
    'var(--moduix-spacing-3)',
    'Controls dropzone content gap.',
  ],
  [
    '--moduix-file-upload-dropzone-icon-bg',
    'var(--moduix-color-muted)',
    'Controls dropzone icon background.',
  ],
  [
    '--moduix-file-upload-dropzone-icon-border-color',
    'var(--moduix-color-border)',
    'Controls dropzone icon border color.',
  ],
  [
    '--moduix-file-upload-dropzone-icon-border-width',
    'var(--moduix-border-width-sm)',
    'Controls dropzone icon border width.',
  ],
  [
    '--moduix-file-upload-dropzone-icon-box-size',
    'var(--moduix-spacing-10)',
    'Controls dropzone icon box size.',
  ],
  [
    '--moduix-file-upload-dropzone-icon-color',
    'var(--moduix-color-foreground)',
    'Controls dropzone icon color.',
  ],
  [
    '--moduix-file-upload-dropzone-icon-radius',
    'var(--moduix-radius-full)',
    'Controls dropzone icon radius.',
  ],
  [
    '--moduix-file-upload-dropzone-icon-size',
    'var(--moduix-spacing-4)',
    'Controls dropzone icon size.',
  ],
  ['--moduix-file-upload-dropzone-min-height', '8rem', 'Controls dropzone minimum height.'],
  [
    '--moduix-file-upload-dropzone-padding',
    'var(--moduix-spacing-5)',
    'Controls dropzone padding.',
  ],
  [
    '--moduix-file-upload-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focus ring color.',
  ],
  [
    '--moduix-file-upload-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls action focus ring offset.',
  ],
  [
    '--moduix-file-upload-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-file-upload-gap',
    'var(--moduix-spacing-3)',
    'Controls spacing between root children.',
  ],
  [
    '--moduix-file-upload-invalid-color',
    'var(--moduix-color-destructive)',
    'Controls invalid and rejected borders.',
  ],
  ['--moduix-file-upload-item-bg', 'var(--moduix-color-background)', 'Controls item background.'],
  [
    '--moduix-file-upload-item-border-color',
    'var(--moduix-color-border)',
    'Controls item border color.',
  ],
  [
    '--moduix-file-upload-item-border-width',
    'var(--moduix-border-width-sm)',
    'Controls item border width.',
  ],
  [
    '--moduix-file-upload-item-color',
    'var(--moduix-color-foreground)',
    'Controls item text color.',
  ],
  ['--moduix-file-upload-item-gap', 'var(--moduix-spacing-3)', 'Controls item column gap.'],
  ['--moduix-file-upload-item-group-gap', 'var(--moduix-spacing-2)', 'Controls item group gap.'],
  ['--moduix-file-upload-image-item-max-width', '10rem', 'Controls compact image card width.'],
  [
    '--moduix-file-upload-item-min-height',
    'var(--moduix-size-md)',
    'Controls compact item minimum height.',
  ],
  ['--moduix-file-upload-item-name-color', 'currentColor', 'Controls file name color.'],
  [
    '--moduix-file-upload-item-name-font-size',
    'var(--moduix-text-sm)',
    'Controls file name font size.',
  ],
  [
    '--moduix-file-upload-item-name-font-weight',
    'var(--moduix-weight-medium)',
    'Controls file name font weight.',
  ],
  [
    '--moduix-file-upload-item-name-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls file name line height.',
  ],
  [
    '--moduix-file-upload-item-padding-x',
    'var(--moduix-spacing-3)',
    'Controls item horizontal padding.',
  ],
  [
    '--moduix-file-upload-item-padding-y',
    'var(--moduix-spacing-2)',
    'Controls item vertical padding.',
  ],
  [
    '--moduix-file-upload-item-preview-bg',
    'var(--moduix-color-muted)',
    'Controls preview background.',
  ],
  [
    '--moduix-file-upload-item-preview-color',
    'var(--moduix-color-muted-foreground)',
    'Controls preview icon color.',
  ],
  [
    '--moduix-file-upload-item-preview-icon-size',
    'var(--moduix-spacing-4)',
    'Controls fallback preview icon size.',
  ],
  [
    '--moduix-file-upload-item-preview-min-height',
    'var(--moduix-size-xl)',
    'Controls preview item minimum height.',
  ],
  [
    '--moduix-file-upload-item-preview-padding-y',
    'var(--moduix-spacing-2)',
    'Controls preview item vertical padding.',
  ],
  [
    '--moduix-file-upload-item-preview-radius',
    'var(--moduix-radius-sm)',
    'Controls preview box radius.',
  ],
  [
    '--moduix-file-upload-item-preview-size',
    'var(--moduix-spacing-10)',
    'Controls preview box size.',
  ],
  ['--moduix-file-upload-item-radius', 'var(--moduix-radius-md)', 'Controls item radius.'],
  ['--moduix-file-upload-item-row-gap', 'var(--moduix-spacing-1)', 'Controls item row gap.'],
  [
    '--moduix-file-upload-item-size-color',
    'var(--moduix-color-muted-foreground)',
    'Controls file size text color.',
  ],
  [
    '--moduix-file-upload-item-size-font-size',
    'var(--moduix-text-xs)',
    'Controls file size font size.',
  ],
  [
    '--moduix-file-upload-item-size-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls file size line height.',
  ],
  [
    '--moduix-file-upload-label-color',
    'var(--moduix-file-upload-color, var(--moduix-color-foreground))',
    'Controls label color.',
  ],
  ['--moduix-file-upload-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-file-upload-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-file-upload-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-file-upload-max-width', '28rem', 'Controls root maximum width.'],
  [
    '--moduix-file-upload-radius',
    'var(--moduix-radius-md)',
    'Controls shared dropzone and item radius.',
  ],
  [
    '--moduix-file-upload-transition',
    'var(--moduix-transition-default)',
    'Controls interactive transitions.',
  ],
  [
    '--moduix-file-upload-trigger-bg',
    'var(--moduix-button-default-bg, var(--moduix-color-primary))',
    'Controls trigger background.',
  ],
  [
    '--moduix-file-upload-trigger-bg-hover',
    'var(--moduix-button-default-bg-hover, var(--moduix-color-foreground))',
    'Controls trigger hover background.',
  ],
  [
    '--moduix-file-upload-trigger-border-color',
    'var(--moduix-button-default-border-color, var(--moduix-color-primary))',
    'Controls trigger border color.',
  ],
  [
    '--moduix-file-upload-trigger-border-width',
    'var(--moduix-button-border-width, var(--moduix-border-width-sm))',
    'Controls trigger border width.',
  ],
  [
    '--moduix-file-upload-trigger-color',
    'var(--moduix-button-default-color, var(--moduix-color-primary-foreground))',
    'Controls trigger text color.',
  ],
  [
    '--moduix-file-upload-trigger-font-size',
    'var(--moduix-button-font-size, var(--moduix-text-sm))',
    'Controls trigger font size.',
  ],
  [
    '--moduix-file-upload-trigger-font-weight',
    'var(--moduix-button-font-weight, var(--moduix-weight-medium))',
    'Controls trigger font weight.',
  ],
  [
    '--moduix-file-upload-trigger-gap',
    'var(--moduix-button-content-gap, var(--moduix-spacing-2))',
    'Controls trigger content gap.',
  ],
  [
    '--moduix-file-upload-trigger-height',
    'var(--moduix-button-size-md, var(--moduix-size-md))',
    'Controls trigger height.',
  ],
  [
    '--moduix-file-upload-trigger-line-height',
    'var(--moduix-button-line-height, var(--moduix-line-height-text-sm))',
    'Controls trigger line height.',
  ],
  [
    '--moduix-file-upload-trigger-padding-x',
    'var(--moduix-button-padding-x-md, var(--moduix-spacing-4))',
    'Controls trigger horizontal padding.',
  ],
  [
    '--moduix-file-upload-trigger-radius',
    'var(--moduix-button-radius, var(--moduix-radius-md))',
    'Controls trigger radius.',
  ],
  ['--moduix-file-upload-width', '100%', 'Controls root width.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function FileUploadCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={fileUploadOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}