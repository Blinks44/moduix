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
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './lightbox.module.css';

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

export const lightboxOverrideCssProperties: CssPropertyInput[] = [
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop fill.'],
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
  ['--lightbox-image-enter-duration', '240ms', 'Controls image enter animation duration.'],
  ['--lightbox-image-enter-scale', '0.9', 'Controls image enter animation scale.'],
  ['--lightbox-image-max-height', '80dvh', 'Controls max image height.'],
  ['--lightbox-image-max-width', '80vw', 'Controls max image width.'],
  ['--lightbox-image-radius', 'var(--radius-md)', 'Controls image corner radius in modal.'],
  ['--lightbox-image-shadow', 'var(--shadow-lg)', 'Controls image shadow in modal.'],
  ['--lightbox-max-height', '80dvh', 'Controls max popup height.'],
  ['--lightbox-max-width', '80vw', 'Controls max popup width.'],
  ['--lightbox-scale', '0.82', 'Controls popup initial scale.'],
  ['--lightbox-transition', '220ms ease', 'Controls popup transition.'],
  ['--lightbox-viewport-padding', 'var(--spacing-4)', 'Controls viewport padding.'],
  ['--lightbox-width', '80vw', 'Controls the popup width limit.'],
];

export const lightboxPlaygroundCssProperties: CssPropertyInput[] = [
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop fill.'],
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
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function LightboxExample() {
  return (
    <Lightbox>
      <LightboxImage
        src={images.mountainSmall}
        previewSrc={images.mountainLarge}
        alt="Mountain ridge at sunset"
        className={styles.previewImage}
      />
      <LightboxContent />
    </Lightbox>
  );
}

export function TriggerLightboxExample() {
  return (
    <Lightbox>
      <LightboxTrigger render={<button type="button" className={styles.triggerButton} />}>
        Open image
      </LightboxTrigger>
      <LightboxContent>
        <img src={images.road} alt="Road through forest" className={styles.contentImage} />
      </LightboxContent>
    </Lightbox>
  );
}

export function DynamicLightboxGalleryExample() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <React.Fragment>
      <div ref={rootRef} className={styles.dynamicRoot}>
        <img
          src={images.mountainSmall}
          data-lightbox-src={images.mountainLarge}
          alt="Mountain landscape"
          className={styles.dynamicImage}
        />
        <img
          src={images.sea}
          data-lightbox-src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90"
          alt="Sea at sunset"
          className={styles.dynamicImage}
        />
        <img
          src={images.forest}
          data-lightbox-src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=90"
          alt="Forest and mountain road"
          className={styles.dynamicImage}
        />
      </div>
      <LightboxGallery rootRef={rootRef} />
    </React.Fragment>
  );
}

export function CustomizedLightboxExample() {
  return (
    <Lightbox>
      <LightboxImage src={images.road} alt="Road through forest" className={styles.previewImage} />
      <LightboxPortal>
        <LightboxBackdrop className={styles.customBackdrop} />
        <LightboxViewport>
          <LightboxCloseButton className={styles.customClose} aria-label="Close preview" />
          <LightboxPopup className={styles.customPopup}>
            <LightboxFrame>
              <LightboxClose aria-label="Close preview" nativeButton={false} render={<div />}>
                <img src={images.road} alt="Road through forest" className={styles.contentImage} />
              </LightboxClose>
            </LightboxFrame>
          </LightboxPopup>
        </LightboxViewport>
      </LightboxPortal>
    </Lightbox>
  );
}