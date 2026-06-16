import {
  Lightbox,
  LightboxBackdrop,
  LightboxClose,
  LightboxCloseButton,
  LightboxContent,
  LightboxFrame,
  LightboxGallery,
  LightboxImage,
  LightboxPopup,
  LightboxPortal,
  LightboxTrigger,
  LightboxViewport,
} from 'moduix';
import { type CSSProperties, useRef } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

const images = {
  mountainSmall:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  mountainLarge:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
  sea: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=80',
  forest:
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
  road: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
};

const previewImageStyle = {
  display: 'block',
  width: '18rem',
  maxWidth: 'min(18rem, calc(100vw - var(--spacing-10)))',
  aspectRatio: '16 / 10',
  borderRadius: 'var(--radius-md)',
  objectFit: 'cover',
} satisfies CSSProperties;

const triggerButtonStyle = {
  border: 0,
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-muted)',
  padding: 'var(--spacing-3) var(--spacing-4)',
  color: 'var(--color-foreground)',
  cursor: 'zoom-in',
  font: 'inherit',
} satisfies CSSProperties;

const dynamicRootStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 'var(--spacing-3)',
  width: 'min(36rem, calc(100vw - var(--spacing-10)))',
} satisfies CSSProperties;

const dynamicItemStyle = {
  display: 'block',
  width: '100%',
  margin: 0,
  border: 0,
  borderRadius: 'var(--radius-sm)',
  padding: 0,
  background: 'transparent',
  cursor: 'zoom-in',
} satisfies CSSProperties;

const dynamicImageStyle = {
  display: 'block',
  width: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: 'var(--radius-sm)',
} satisfies CSSProperties;

const customBackdropStyle = {
  backgroundColor: 'rgb(15 23 42 / 0.62)',
} satisfies CSSProperties;

const customPopupStyle = {
  '--lightbox-width': '72vw',
  '--lightbox-height': '72dvh',
} as CSSProperties;

const customCloseStyle = {
  '--lightbox-close-bg': 'var(--color-muted)',
  '--lightbox-close-bg-hover': 'var(--color-accent)',
  '--lightbox-close-radius': 'var(--radius-md)',
} as CSSProperties;

export const lightboxOverrideCssProperties: CssPropertyInput[] = [
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop fill.'],
  ['--lightbox-backdrop-blur', '4px', 'Controls backdrop blur.'],
  ['--lightbox-backdrop-transition', 'var(--transition-default)', 'Controls backdrop transition.'],
  ['--lightbox-close-bg', 'var(--color-background)', 'Controls close button background.'],
  ['--lightbox-close-bg-hover', 'var(--color-muted)', 'Controls close button hover background.'],
  ['--lightbox-close-color', 'var(--color-foreground)', 'Controls close icon color.'],
  ['--lightbox-close-color-hover', 'var(--color-foreground)', 'Controls close icon hover color.'],
  ['--lightbox-close-icon-size', '0.875rem', 'Controls close icon size.'],
  ['--lightbox-close-offset-right', 'var(--spacing-4)', 'Controls close button right offset.'],
  ['--lightbox-close-offset-top', 'var(--spacing-4)', 'Controls close button top offset.'],
  ['--lightbox-close-radius', 'var(--radius-sm)', 'Controls close button radius.'],
  ['--lightbox-close-size', '2rem', 'Controls close button size.'],
  ['--lightbox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--lightbox-height', '80dvh', 'Controls the popup height limit.'],
  [
    '--lightbox-image-enter-duration',
    'var(--duration-normal)',
    'Controls image enter animation duration.',
  ],
  ['--lightbox-image-enter-scale', '0.9', 'Controls image enter animation scale.'],
  ['--lightbox-image-max-height', '80dvh', 'Controls max image height.'],
  ['--lightbox-image-max-width', '80vw', 'Controls max image width.'],
  ['--lightbox-image-radius', 'var(--radius-md)', 'Controls image corner radius in modal.'],
  ['--lightbox-image-shadow', 'var(--shadow-lg)', 'Controls image shadow in modal.'],
  ['--lightbox-max-height', '80dvh', 'Controls max popup height.'],
  ['--lightbox-max-width', '80vw', 'Controls max popup width.'],
  [
    '--lightbox-transition',
    'var(--duration-normal) var(--ease-standard)',
    'Controls popup transition.',
  ],
  ['--lightbox-viewport-padding', 'var(--spacing-4)', 'Controls viewport padding.'],
  ['--lightbox-width', '80vw', 'Controls the popup width limit.'],
];

export const lightboxPlaygroundCssProperties: CssPropertyInput[] = [
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop fill.'],
  ['--lightbox-backdrop-blur', '4px', 'Controls backdrop blur.'],
  ['--lightbox-close-bg', 'var(--color-background)', 'Controls close button background.'],
  ['--lightbox-height', '80dvh', 'Controls popup height.'],
  ['--lightbox-image-radius', 'var(--radius-md)', 'Controls image corner radius.'],
  ['--lightbox-width', '80vw', 'Controls popup width.'],
];

export function LightboxCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={lightboxOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function LightboxCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={lightboxPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function LightboxExample() {
  return (
    <Lightbox>
      <LightboxImage
        src={images.mountainSmall}
        fullSrc={images.mountainLarge}
        alt="Mountain ridge at sunset"
        style={previewImageStyle}
      />
      <LightboxContent />
    </Lightbox>
  );
}

export function TriggerLightboxExample() {
  return (
    <Lightbox>
      <LightboxTrigger style={triggerButtonStyle}>Open image</LightboxTrigger>
      <LightboxContent>
        <img src={images.road} alt="Road through forest" />
      </LightboxContent>
    </Lightbox>
  );
}

export function DynamicLightboxGalleryExample() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div ref={rootRef} style={dynamicRootStyle}>
        <button type="button" style={dynamicItemStyle}>
          <img
            src={images.mountainSmall}
            data-lightbox-src={images.mountainLarge}
            alt="Mountain landscape"
            style={dynamicImageStyle}
          />
        </button>
        <button type="button" style={dynamicItemStyle}>
          <img
            src={images.sea}
            data-lightbox-src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90"
            alt="Sea at sunset"
            style={dynamicImageStyle}
          />
        </button>
        <button type="button" style={dynamicItemStyle}>
          <img
            src={images.forest}
            data-lightbox-src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=90"
            alt="Forest and mountain road"
            style={dynamicImageStyle}
          />
        </button>
      </div>
      <LightboxGallery rootRef={rootRef} selector="button" />
    </>
  );
}

export function CustomizedLightboxExample() {
  return (
    <Lightbox>
      <LightboxImage src={images.road} alt="Road through forest" style={previewImageStyle} />
      <LightboxPortal>
        <LightboxBackdrop style={customBackdropStyle} />
        <LightboxViewport>
          <LightboxCloseButton style={customCloseStyle} aria-label="Close preview" />
          <LightboxPopup style={customPopupStyle}>
            <LightboxFrame>
              <LightboxClose nativeButton={false} render={<div />}>
                <img src={images.road} alt="Road through forest" />
              </LightboxClose>
            </LightboxFrame>
          </LightboxPopup>
        </LightboxViewport>
      </LightboxPortal>
    </Lightbox>
  );
}