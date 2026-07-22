import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const lightboxTriggerCss = `
  .lightbox-trigger {
    display: block;
    margin: 0;
    border: 0;
    border-radius: var(--radius-md);
    padding: 0;
    background: transparent;
    cursor: zoom-in;
  }

  .lightbox-trigger img {
    display: block;
    width: 18rem;
    max-width: min(18rem, calc(100vw - var(--spacing-10)));
    aspect-ratio: 16 / 10;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const lightboxStackCss = `
  .lightbox-stack {
    display: grid;
    justify-items: center;
    gap: var(--spacing-3);
  }
`;

const lightboxButtonCss = `
  .lightbox-button {
    border: 0;
    border-radius: var(--radius-md);
    background: var(--color-muted);
    padding: var(--spacing-3) var(--spacing-4);
    color: var(--color-foreground);
    font: inherit;
  }
`;

const lightboxGalleryCss = `
  .lightbox-gallery {
    display: grid;
    width: min(36rem, calc(100vw - var(--spacing-10)));
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--spacing-3);
  }

  .lightbox-gallery-trigger {
    display: block;
    margin: 0;
    width: 100%;
    border: 0;
    border-radius: var(--radius-sm);
    padding: 0;
    background: transparent;
    cursor: zoom-in;
  }

  .lightbox-gallery-trigger img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const lightboxStatusCss = `
  .lightbox-status {
    position: absolute;
    inset-block-end: var(--spacing-3);
    inset-inline-start: 50%;
    translate: -50% 0;
    border-radius: var(--radius-sm);
    background: rgb(0 0 0 / 0.65);
    padding: var(--spacing-1) var(--spacing-2);
    color: white;
    font-size: var(--text-sm);
  }
`;

const lightboxCustomizationCss = `
  .lightbox-custom-backdrop {
    --lightbox-backdrop-bg: rgb(15 23 42 / 0.72);
  }

  .lightbox-custom-content {
    --lightbox-content-max-width: 72vw;
    --lightbox-content-max-height: 72dvh;
    --lightbox-media-radius: var(--radius-lg);
  }

  .lightbox-custom-close {
    --lightbox-close-icon-bg: var(--color-muted);
    --lightbox-close-icon-bg-hover: var(--color-accent);
    --lightbox-close-icon-radius: var(--radius-md);
  }
`;

export const lightboxBasicCss = lightboxTriggerCss;
export const lightboxBindCmsContentCss = lightboxGalleryCss;
export const lightboxClickToCloseImageCss = lightboxButtonCss;
export const lightboxControlledCss = `${lightboxStackCss}${lightboxButtonCss}`;
export const lightboxFocusAndIdsCss = `${lightboxStackCss}${lightboxButtonCss}${lightboxStatusCss}`;
export const lightboxGalleryExampleCss = lightboxGalleryCss;
export const lightboxLazyMountCss = lightboxButtonCss;
export const lightboxMultipleTriggersCss = lightboxGalleryCss;
export const lightboxNonModalCss = `${lightboxStackCss}${lightboxButtonCss}`;
export const lightboxRootProviderCss = `${lightboxStackCss}${lightboxButtonCss}${lightboxStatusCss}`;
export const lightboxAdvancedCustomizationCss = `${lightboxButtonCss}${lightboxCustomizationCss}`;

const lightboxOverrideCssProperties: CssPropertyInput[] = [
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Backdrop fill.'],
  ['--lightbox-backdrop-blur', '4px', 'Backdrop blur radius.'],
  ['--lightbox-backdrop-ending-blur', 'none', 'Customizes lightbox backdrop ending blur.'],
  ['--lightbox-backdrop-ending-opacity', '0', 'Customizes lightbox backdrop ending opacity.'],
  ['--lightbox-backdrop-starting-blur', 'none', 'Customizes lightbox backdrop starting blur.'],
  ['--lightbox-backdrop-starting-opacity', '0', 'Customizes lightbox backdrop starting opacity.'],
  ['--lightbox-backdrop-transition', 'var(--transition-default)', 'Backdrop motion timing.'],
  ['--lightbox-close-icon-bg', 'var(--color-background)', 'Close control background.'],
  ['--lightbox-close-icon-bg-hover', 'var(--color-muted)', 'Close control hover background.'],
  [
    '--lightbox-close-icon-color',
    'var(--color-foreground)',
    'Customizes lightbox close icon color.',
  ],
  [
    '--lightbox-close-icon-color-hover',
    'var(--color-foreground)',
    'Customizes lightbox close icon color hover.',
  ],
  [
    '--lightbox-close-icon-focus-ring-color',
    'var(--color-ring)',
    'Customizes lightbox close icon focus ring color.',
  ],
  ['--lightbox-close-icon-glyph-size', 'var(--spacing-3-5)', 'Close glyph size.'],
  [
    '--lightbox-close-icon-inset-block-start',
    'var(--spacing-4)',
    'Customizes lightbox close icon inset block start.',
  ],
  [
    '--lightbox-close-icon-inset-inline-end',
    'var(--spacing-4)',
    'Customizes lightbox close icon inset inline end.',
  ],
  ['--lightbox-close-icon-radius', 'var(--radius-sm)', 'Close control radius.'],
  ['--lightbox-close-icon-size', 'var(--spacing-8)', 'Close control size.'],
  ['--lightbox-content-gap', 'var(--spacing-3)', 'Customizes lightbox content gap.'],
  ['--lightbox-content-ending-opacity', '0', 'Customizes lightbox content ending opacity.'],
  ['--lightbox-content-ending-scale', '0.82', 'Customizes lightbox content ending scale.'],
  ['--lightbox-content-ending-translate-x', '0', 'Customizes lightbox content ending translate x.'],
  ['--lightbox-content-ending-translate-y', '0', 'Customizes lightbox content ending translate y.'],
  ['--lightbox-content-max-height', '80dvh', 'Maximum content height.'],
  ['--lightbox-content-max-width', '80vw', 'Maximum content width.'],
  ['--lightbox-content-starting-opacity', '0', 'Customizes lightbox content starting opacity.'],
  ['--lightbox-content-starting-scale', '0.82', 'Customizes lightbox content starting scale.'],
  [
    '--lightbox-content-starting-translate-x',
    '0',
    'Customizes lightbox content starting translate x.',
  ],
  [
    '--lightbox-content-starting-translate-y',
    '0',
    'Customizes lightbox content starting translate y.',
  ],
  [
    '--lightbox-description-color',
    'var(--color-muted-foreground)',
    'Customizes lightbox description color.',
  ],
  [
    '--lightbox-description-font-size',
    'var(--text-sm)',
    'Customizes lightbox description font size.',
  ],
  [
    '--lightbox-description-line-height',
    'var(--line-height-text-sm)',
    'Customizes lightbox description line height.',
  ],
  ['--lightbox-footer-color', 'var(--color-muted-foreground)', 'Customizes lightbox footer color.'],
  ['--lightbox-footer-font-size', 'var(--text-sm)', 'Customizes lightbox footer font size.'],
  ['--lightbox-footer-gap', 'var(--spacing-2)', 'Customizes lightbox footer gap.'],
  ['--lightbox-footer-justify', 'flex-end', 'Customizes lightbox footer justify.'],
  [
    '--lightbox-footer-line-height',
    'var(--line-height-text-sm)',
    'Customizes lightbox footer line height.',
  ],
  ['--lightbox-gallery-aspect-ratio', '16 / 10', 'Gallery viewport aspect ratio.'],
  ['--lightbox-gallery-gap', 'var(--spacing-4)', 'Space between carousel parts.'],
  ['--lightbox-gallery-max-width', '72rem', 'Maximum gallery width.'],
  [
    '--lightbox-gallery-thumbnail-active-translate-y',
    'calc(var(--border-width-sm) * -1)',
    'Current thumbnail vertical lift.',
  ],
  [
    '--lightbox-gallery-thumbnail-border-color',
    'var(--color-primary)',
    'Current thumbnail border color.',
  ],
  ['--lightbox-gallery-thumbnail-height', 'var(--size-xl)', 'Thumbnail indicator height.'],
  ['--lightbox-gallery-thumbnail-opacity', '0.65', 'Idle thumbnail opacity.'],
  ['--lightbox-gallery-thumbnail-opacity-hover', '0.9', 'Hovered thumbnail opacity.'],
  ['--lightbox-gallery-thumbnail-radius', 'var(--radius-md)', 'Thumbnail indicator corner radius.'],
  ['--lightbox-gallery-thumbnail-width', '5rem', 'Thumbnail indicator width.'],
  [
    '--lightbox-gallery-track-bg',
    'color-mix(in oklab, black 88%, var(--color-background) 12%)',
    'Gallery viewport background.',
  ],
  ['--lightbox-gallery-track-max-height', '68dvh', 'Maximum gallery viewport height.'],
  ['--lightbox-header-gap', 'var(--spacing-1)', 'Customizes lightbox header gap.'],
  ['--lightbox-body-gap', 'var(--spacing-3)', 'Customizes lightbox body gap.'],
  ['--lightbox-media-max-height', '80dvh', 'Maximum media height.'],
  ['--lightbox-media-max-width', '80vw', 'Maximum media width.'],
  ['--lightbox-media-radius', 'var(--radius-md)', 'Media corner radius.'],
  ['--lightbox-media-shadow', 'var(--shadow-lg)', 'Media shadow.'],
  ['--lightbox-positioner-padding', 'var(--spacing-4)', 'Viewport edge padding.'],
  ['--lightbox-title-color', 'var(--color-foreground)', 'Customizes lightbox title color.'],
  ['--lightbox-title-font-size', 'var(--text-md)', 'Customizes lightbox title font size.'],
  [
    '--lightbox-title-font-weight',
    'var(--weight-semibold)',
    'Customizes lightbox title font weight.',
  ],
  [
    '--lightbox-title-line-height',
    'var(--line-height-text-md)',
    'Customizes lightbox title line height.',
  ],
  ['--lightbox-trigger-focus-ring-color', 'var(--color-ring)', 'Trigger focus ring color.'],
  [
    '--lightbox-trigger-focus-ring-offset',
    'var(--focus-ring-offset)',
    'Trigger focus ring offset.',
  ],
  [
    '--lightbox-trigger-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Trigger focus ring width.',
  ],
  ['--lightbox-transition', '220ms ease', 'Content motion timing.'],
];

export function LightboxCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={lightboxOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}