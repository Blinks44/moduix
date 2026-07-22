import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const fileUploadExampleCss = `
  .file-upload-demo {
    width: min(28rem, 100%);
  }

  .file-upload-demo:not(:has([data-slot='file-upload-dropzone'])) {
    width: min(18.75rem, 100%);
  }

  .rp-preview--internal__card__content > :not(:has([data-slot='file-upload-dropzone'])) {
    width: min(18.75rem, 100%);
  }

  .file-upload-preview-demo {
    margin-inline: auto;
  }

  .file-upload-simple-demo {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    background-color: color-mix(in oklab, var(--color-muted) 32%, var(--color-background));
  }

  .file-upload-stack {
    display: grid;
    gap: var(--spacing-3);
  }

  .file-upload-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    --file-upload-action-size: var(--file-upload-trigger-height, var(--button-size-md, var(--size-md)));
  }

  .file-upload-dropzone-content {
    display: grid;
    justify-items: center;
    gap: var(--spacing-1);
  }

  .file-upload-dropzone-content [data-slot='file-upload-trigger'] {
    margin-top: var(--spacing-2);
  }

  .file-upload-dropzone-title {
    color: var(--color-foreground);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    line-height: var(--line-height-text-sm);
  }

  .file-upload-dropzone-description {
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }

  .file-upload-state,
  .file-upload-error {
    margin: 0;
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }

  .file-upload-error {
    color: var(--color-destructive);
  }

  .file-upload-submit {
    justify-self: start;
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-2) var(--spacing-3);
    background-color: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

`;

const fileUploadOverrideCssProperties: CssPropertyInput[] = [
  ['--file-upload-action-bg', 'transparent', 'Controls delete and clear button background.'],
  [
    '--file-upload-action-bg-hover',
    'var(--color-muted)',
    'Controls delete and clear button hover background.',
  ],
  [
    '--file-upload-action-color',
    'var(--color-muted-foreground)',
    'Controls delete and clear button color.',
  ],
  [
    '--file-upload-action-color-hover',
    'var(--color-foreground)',
    'Controls delete and clear button hover color.',
  ],
  ['--file-upload-action-icon-size', 'var(--spacing-4)', 'Controls delete and clear icon size.'],
  ['--file-upload-action-radius', 'var(--radius-sm)', 'Controls delete and clear button radius.'],
  ['--file-upload-action-size', 'var(--size-sm)', 'Controls delete and clear button size.'],
  [
    '--file-upload-clear-trigger-color',
    'var(--color-muted-foreground)',
    'Controls clear trigger text color.',
  ],
  ['--file-upload-clear-trigger-font-size', 'var(--text-sm)', 'Controls clear trigger font size.'],
  ['--file-upload-clear-trigger-gap', 'var(--spacing-2)', 'Controls clear trigger content gap.'],
  [
    '--file-upload-clear-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls clear trigger line height.',
  ],
  [
    '--file-upload-clear-trigger-padding-x',
    'var(--spacing-2)',
    'Controls clear trigger horizontal padding.',
  ],
  ['--file-upload-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--file-upload-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--file-upload-dropzone-bg', 'var(--color-background)', 'Controls dropzone background.'],
  [
    '--file-upload-dropzone-bg-dragging',
    'var(--color-accent)',
    'Controls dropzone background while dragging.',
  ],
  ['--file-upload-dropzone-border-color', 'var(--color-border)', 'Controls dropzone border color.'],
  [
    '--file-upload-dropzone-border-color-dragging',
    'var(--color-primary)',
    'Controls dropzone border color while dragging.',
  ],
  [
    '--file-upload-dropzone-border-width',
    'var(--border-width-sm)',
    'Controls dropzone border width.',
  ],
  [
    '--file-upload-dropzone-color',
    'var(--color-muted-foreground)',
    'Controls dropzone text color.',
  ],
  [
    '--file-upload-dropzone-color-dragging',
    'var(--color-foreground)',
    'Controls dropzone text color while dragging.',
  ],
  ['--file-upload-dropzone-gap', 'var(--spacing-3)', 'Controls dropzone content gap.'],
  ['--file-upload-dropzone-icon-bg', 'var(--color-muted)', 'Controls dropzone icon background.'],
  [
    '--file-upload-dropzone-icon-border-color',
    'var(--color-border)',
    'Controls dropzone icon border color.',
  ],
  [
    '--file-upload-dropzone-icon-border-width',
    'var(--border-width-sm)',
    'Controls dropzone icon border width.',
  ],
  ['--file-upload-dropzone-icon-box-size', 'var(--spacing-10)', 'Controls dropzone icon box size.'],
  ['--file-upload-dropzone-icon-color', 'var(--color-foreground)', 'Controls dropzone icon color.'],
  ['--file-upload-dropzone-icon-radius', 'var(--radius-full)', 'Controls dropzone icon radius.'],
  ['--file-upload-dropzone-icon-size', 'var(--spacing-4)', 'Controls dropzone icon size.'],
  ['--file-upload-dropzone-min-height', '8rem', 'Controls dropzone minimum height.'],
  ['--file-upload-dropzone-padding', 'var(--spacing-5)', 'Controls dropzone padding.'],
  ['--file-upload-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--file-upload-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls action focus ring offset.',
  ],
  [
    '--file-upload-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls focus ring width.',
  ],
  ['--file-upload-gap', 'var(--spacing-3)', 'Controls spacing between root children.'],
  [
    '--file-upload-invalid-color',
    'var(--color-destructive)',
    'Controls invalid and rejected borders.',
  ],
  ['--file-upload-item-bg', 'var(--color-background)', 'Controls item background.'],
  ['--file-upload-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  ['--file-upload-item-border-width', 'var(--border-width-sm)', 'Controls item border width.'],
  ['--file-upload-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  ['--file-upload-item-gap', 'var(--spacing-3)', 'Controls item column gap.'],
  ['--file-upload-item-group-gap', 'var(--spacing-2)', 'Controls item group gap.'],
  ['--file-upload-image-item-max-width', '10rem', 'Controls compact image card width.'],
  ['--file-upload-item-min-height', 'var(--size-md)', 'Controls compact item minimum height.'],
  ['--file-upload-item-name-color', 'currentColor', 'Controls file name color.'],
  ['--file-upload-item-name-font-size', 'var(--text-sm)', 'Controls file name font size.'],
  [
    '--file-upload-item-name-font-weight',
    'var(--weight-medium)',
    'Controls file name font weight.',
  ],
  [
    '--file-upload-item-name-line-height',
    'var(--line-height-text-sm)',
    'Controls file name line height.',
  ],
  ['--file-upload-item-padding-x', 'var(--spacing-3)', 'Controls item horizontal padding.'],
  ['--file-upload-item-padding-y', 'var(--spacing-2)', 'Controls item vertical padding.'],
  ['--file-upload-item-preview-bg', 'var(--color-muted)', 'Controls preview background.'],
  [
    '--file-upload-item-preview-color',
    'var(--color-muted-foreground)',
    'Controls preview icon color.',
  ],
  [
    '--file-upload-item-preview-icon-size',
    'var(--spacing-4)',
    'Controls fallback preview icon size.',
  ],
  [
    '--file-upload-item-preview-min-height',
    'var(--size-xl)',
    'Controls preview item minimum height.',
  ],
  [
    '--file-upload-item-preview-padding-y',
    'var(--spacing-2)',
    'Controls preview item vertical padding.',
  ],
  ['--file-upload-item-preview-radius', 'var(--radius-sm)', 'Controls preview box radius.'],
  ['--file-upload-item-preview-size', 'var(--spacing-10)', 'Controls preview box size.'],
  ['--file-upload-item-radius', 'var(--radius-md)', 'Controls item radius.'],
  ['--file-upload-item-row-gap', 'var(--spacing-1)', 'Controls item row gap.'],
  [
    '--file-upload-item-size-color',
    'var(--color-muted-foreground)',
    'Controls file size text color.',
  ],
  ['--file-upload-item-size-font-size', 'var(--text-xs)', 'Controls file size font size.'],
  [
    '--file-upload-item-size-line-height',
    'var(--line-height-text-xs)',
    'Controls file size line height.',
  ],
  [
    '--file-upload-label-color',
    'var(--file-upload-color, var(--color-foreground))',
    'Controls label color.',
  ],
  ['--file-upload-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--file-upload-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--file-upload-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--file-upload-max-width', '28rem', 'Controls root maximum width.'],
  ['--file-upload-radius', 'var(--radius-md)', 'Controls shared dropzone and item radius.'],
  ['--file-upload-transition', 'var(--transition-default)', 'Controls interactive transitions.'],
  [
    '--file-upload-trigger-bg',
    'var(--button-default-bg, var(--color-primary))',
    'Controls trigger background.',
  ],
  [
    '--file-upload-trigger-bg-hover',
    'var(--button-default-bg-hover, var(--color-foreground))',
    'Controls trigger hover background.',
  ],
  [
    '--file-upload-trigger-border-color',
    'var(--button-default-border-color, var(--color-primary))',
    'Controls trigger border color.',
  ],
  [
    '--file-upload-trigger-border-width',
    'var(--button-border-width, var(--border-width-sm))',
    'Controls trigger border width.',
  ],
  [
    '--file-upload-trigger-color',
    'var(--button-default-color, var(--color-primary-foreground))',
    'Controls trigger text color.',
  ],
  [
    '--file-upload-trigger-font-size',
    'var(--button-font-size, var(--text-sm))',
    'Controls trigger font size.',
  ],
  [
    '--file-upload-trigger-font-weight',
    'var(--button-font-weight, var(--weight-medium))',
    'Controls trigger font weight.',
  ],
  [
    '--file-upload-trigger-gap',
    'var(--button-content-gap, var(--spacing-2))',
    'Controls trigger content gap.',
  ],
  [
    '--file-upload-trigger-height',
    'var(--button-size-md, var(--size-md))',
    'Controls trigger height.',
  ],
  [
    '--file-upload-trigger-line-height',
    'var(--button-line-height, var(--line-height-text-sm))',
    'Controls trigger line height.',
  ],
  [
    '--file-upload-trigger-padding-x',
    'var(--button-padding-x-md, var(--spacing-4))',
    'Controls trigger horizontal padding.',
  ],
  [
    '--file-upload-trigger-radius',
    'var(--button-radius, var(--radius-md))',
    'Controls trigger radius.',
  ],
  ['--file-upload-width', '100%', 'Controls root width.'],
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