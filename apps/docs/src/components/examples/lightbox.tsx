import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const lightboxTriggerCss = `
  .lightbox-trigger {
    display: block;
    margin: 0;
    border: 0;
    border-radius: var(--moduix-radius-md);
    padding: 0;
    background: transparent;
    cursor: zoom-in;
  }

  .lightbox-trigger img {
    display: block;
    width: 18rem;
    max-width: min(18rem, calc(100vw - var(--moduix-spacing-10)));
    aspect-ratio: 16 / 10;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const lightboxStackCss = `
  .lightbox-stack {
    display: grid;
    justify-items: center;
    gap: var(--moduix-spacing-3);
  }
`;

const lightboxButtonCss = `
  .lightbox-button {
    border: 0;
    border-radius: var(--moduix-radius-md);
    background: var(--moduix-color-muted);
    padding: var(--moduix-spacing-3) var(--moduix-spacing-4);
    color: var(--moduix-color-foreground);
    font: inherit;
  }
`;

const lightboxGalleryCss = `
  .lightbox-gallery {
    display: grid;
    width: min(36rem, calc(100vw - var(--moduix-spacing-10)));
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--moduix-spacing-3);
  }

  .lightbox-gallery-trigger {
    display: block;
    margin: 0;
    width: 100%;
    border: 0;
    border-radius: var(--moduix-radius-sm);
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
    inset-block-end: var(--moduix-spacing-3);
    inset-inline-start: 50%;
    translate: -50% 0;
    border-radius: var(--moduix-radius-sm);
    background: rgb(0 0 0 / 0.65);
    padding: var(--moduix-spacing-1) var(--moduix-spacing-2);
    color: white;
    font-size: var(--moduix-text-sm);
  }
`;

const lightboxCustomizationCss = `
  .lightbox-custom-backdrop {
    --moduix-lightbox-backdrop-bg: rgb(15 23 42 / 0.72);
  }

  .lightbox-custom-content {
    --moduix-lightbox-content-max-width: 72vw;
    --moduix-lightbox-content-max-height: 72dvh;
    --moduix-lightbox-media-radius: var(--moduix-radius-lg);
  }

  .lightbox-custom-close {
    --moduix-lightbox-close-icon-bg: var(--moduix-color-muted);
    --moduix-lightbox-close-icon-bg-hover: var(--moduix-color-accent);
    --moduix-lightbox-close-icon-radius: var(--moduix-radius-md);
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
  [
    '--moduix-lightbox-backdrop-bg',
    'var(--moduix-backdrop-bg, var(--moduix-color-overlay))',
    'Backdrop fill.',
  ],
  ['--moduix-lightbox-backdrop-blur', '4px', 'Backdrop blur radius.'],
  ['--moduix-lightbox-backdrop-ending-blur', 'none', 'Customizes lightbox backdrop ending blur.'],
  [
    '--moduix-lightbox-backdrop-ending-opacity',
    '0',
    'Customizes lightbox backdrop ending opacity.',
  ],
  [
    '--moduix-lightbox-backdrop-starting-blur',
    'none',
    'Customizes lightbox backdrop starting blur.',
  ],
  [
    '--moduix-lightbox-backdrop-starting-opacity',
    '0',
    'Customizes lightbox backdrop starting opacity.',
  ],
  [
    '--moduix-lightbox-backdrop-transition',
    'var(--moduix-transition-default)',
    'Backdrop motion timing.',
  ],
  [
    '--moduix-lightbox-close-icon-bg',
    'var(--moduix-color-background)',
    'Close control background.',
  ],
  [
    '--moduix-lightbox-close-icon-bg-hover',
    'var(--moduix-color-muted)',
    'Close control hover background.',
  ],
  [
    '--moduix-lightbox-close-icon-color',
    'var(--moduix-color-foreground)',
    'Customizes lightbox close icon color.',
  ],
  [
    '--moduix-lightbox-close-icon-color-hover',
    'var(--moduix-color-foreground)',
    'Customizes lightbox close icon color hover.',
  ],
  [
    '--moduix-lightbox-close-icon-focus-ring-color',
    'var(--moduix-color-ring)',
    'Customizes lightbox close icon focus ring color.',
  ],
  ['--moduix-lightbox-close-icon-glyph-size', 'var(--moduix-spacing-3-5)', 'Close glyph size.'],
  [
    '--moduix-lightbox-close-icon-inset-block-start',
    'var(--moduix-spacing-4)',
    'Customizes lightbox close icon inset block start.',
  ],
  [
    '--moduix-lightbox-close-icon-inset-inline-end',
    'var(--moduix-spacing-4)',
    'Customizes lightbox close icon inset inline end.',
  ],
  ['--moduix-lightbox-close-icon-radius', 'var(--moduix-radius-sm)', 'Close control radius.'],
  ['--moduix-lightbox-close-icon-size', 'var(--moduix-spacing-8)', 'Close control size.'],
  ['--moduix-lightbox-content-gap', 'var(--moduix-spacing-3)', 'Customizes lightbox content gap.'],
  ['--moduix-lightbox-content-ending-opacity', '0', 'Customizes lightbox content ending opacity.'],
  ['--moduix-lightbox-content-ending-scale', '0.82', 'Customizes lightbox content ending scale.'],
  [
    '--moduix-lightbox-content-ending-translate-x',
    '0',
    'Customizes lightbox content ending translate x.',
  ],
  [
    '--moduix-lightbox-content-ending-translate-y',
    '0',
    'Customizes lightbox content ending translate y.',
  ],
  ['--moduix-lightbox-content-max-height', '80dvh', 'Maximum content height.'],
  ['--moduix-lightbox-content-max-width', '80vw', 'Maximum content width.'],
  [
    '--moduix-lightbox-content-starting-opacity',
    '0',
    'Customizes lightbox content starting opacity.',
  ],
  [
    '--moduix-lightbox-content-starting-scale',
    '0.82',
    'Customizes lightbox content starting scale.',
  ],
  [
    '--moduix-lightbox-content-starting-translate-x',
    '0',
    'Customizes lightbox content starting translate x.',
  ],
  [
    '--moduix-lightbox-content-starting-translate-y',
    '0',
    'Customizes lightbox content starting translate y.',
  ],
  [
    '--moduix-lightbox-description-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes lightbox description color.',
  ],
  [
    '--moduix-lightbox-description-font-size',
    'var(--moduix-text-sm)',
    'Customizes lightbox description font size.',
  ],
  [
    '--moduix-lightbox-description-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes lightbox description line height.',
  ],
  [
    '--moduix-lightbox-footer-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes lightbox footer color.',
  ],
  [
    '--moduix-lightbox-footer-font-size',
    'var(--moduix-text-sm)',
    'Customizes lightbox footer font size.',
  ],
  ['--moduix-lightbox-footer-gap', 'var(--moduix-spacing-2)', 'Customizes lightbox footer gap.'],
  ['--moduix-lightbox-footer-justify', 'flex-end', 'Customizes lightbox footer justify.'],
  [
    '--moduix-lightbox-footer-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes lightbox footer line height.',
  ],
  ['--moduix-lightbox-gallery-aspect-ratio', '16 / 10', 'Gallery viewport aspect ratio.'],
  ['--moduix-lightbox-gallery-gap', 'var(--moduix-spacing-4)', 'Space between carousel parts.'],
  ['--moduix-lightbox-gallery-max-width', '72rem', 'Maximum gallery width.'],
  [
    '--moduix-lightbox-gallery-thumbnail-active-translate-y',
    'calc(var(--moduix-border-width-sm) * -1)',
    'Current thumbnail vertical lift.',
  ],
  [
    '--moduix-lightbox-gallery-thumbnail-border-color',
    'var(--moduix-color-primary)',
    'Current thumbnail border color.',
  ],
  [
    '--moduix-lightbox-gallery-thumbnail-height',
    'var(--moduix-size-xl)',
    'Thumbnail indicator height.',
  ],
  ['--moduix-lightbox-gallery-thumbnail-opacity', '0.65', 'Idle thumbnail opacity.'],
  ['--moduix-lightbox-gallery-thumbnail-opacity-hover', '0.9', 'Hovered thumbnail opacity.'],
  [
    '--moduix-lightbox-gallery-thumbnail-radius',
    'var(--moduix-radius-md)',
    'Thumbnail indicator corner radius.',
  ],
  ['--moduix-lightbox-gallery-thumbnail-width', '5rem', 'Thumbnail indicator width.'],
  [
    '--moduix-lightbox-gallery-track-bg',
    'color-mix(in oklab, black 88%, var(--moduix-color-background) 12%)',
    'Gallery viewport background.',
  ],
  ['--moduix-lightbox-gallery-track-max-height', '68dvh', 'Maximum gallery viewport height.'],
  ['--moduix-lightbox-header-gap', 'var(--moduix-spacing-1)', 'Customizes lightbox header gap.'],
  ['--moduix-lightbox-body-gap', 'var(--moduix-spacing-3)', 'Customizes lightbox body gap.'],
  ['--moduix-lightbox-media-max-height', '80dvh', 'Maximum media height.'],
  ['--moduix-lightbox-media-max-width', '80vw', 'Maximum media width.'],
  ['--moduix-lightbox-media-radius', 'var(--moduix-radius-md)', 'Media corner radius.'],
  ['--moduix-lightbox-media-shadow', 'var(--moduix-shadow-lg)', 'Media shadow.'],
  ['--moduix-lightbox-positioner-padding', 'var(--moduix-spacing-4)', 'Viewport edge padding.'],
  [
    '--moduix-lightbox-title-color',
    'var(--moduix-color-foreground)',
    'Customizes lightbox title color.',
  ],
  [
    '--moduix-lightbox-title-font-size',
    'var(--moduix-text-md)',
    'Customizes lightbox title font size.',
  ],
  [
    '--moduix-lightbox-title-font-weight',
    'var(--moduix-weight-semibold)',
    'Customizes lightbox title font weight.',
  ],
  [
    '--moduix-lightbox-title-line-height',
    'var(--moduix-line-height-text-md)',
    'Customizes lightbox title line height.',
  ],
  [
    '--moduix-lightbox-trigger-focus-ring-color',
    'var(--moduix-color-ring)',
    'Trigger focus ring color.',
  ],
  [
    '--moduix-lightbox-trigger-focus-ring-offset',
    'var(--moduix-focus-ring-offset)',
    'Trigger focus ring offset.',
  ],
  [
    '--moduix-lightbox-trigger-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Trigger focus ring width.',
  ],
  ['--moduix-lightbox-transition', '220ms ease', 'Content motion timing.'],
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