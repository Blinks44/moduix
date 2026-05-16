import { CloseButton, Lightbox, LightboxContent, LightboxGallery, LightboxImage } from 'moduix';
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
  ['--lightbox-width', '80vw', 'Controls the popup width limit.'],
  ['--lightbox-height', '80dvh', 'Controls the popup height limit.'],
  ['--lightbox-max-width', '80vw', 'Controls max popup width.'],
  ['--lightbox-max-height', '80dvh', 'Controls max popup height.'],
  ['--lightbox-image-max-width', '80vw', 'Controls max image width.'],
  ['--lightbox-image-max-height', '80dvh', 'Controls max image height.'],
  ['--lightbox-image-radius', 'var(--radius-lg)', 'Controls image corner radius in modal.'],
  ['--lightbox-image-shadow', 'var(--shadow-lg)', 'Controls image shadow in modal.'],
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop fill.'],
  ['--lightbox-close-size', '2rem', 'Controls close button size.'],
  ['--lightbox-close-radius', 'var(--radius-sm)', 'Controls close button radius.'],
  ['--lightbox-close-bg', 'var(--color-background)', 'Controls close button background.'],
  ['--lightbox-close-color', 'var(--color-foreground)', 'Controls close icon color.'],
];

export const lightboxPlaygroundCssProperties: CssPropertyInput[] = [
  ['--lightbox-width', '80vw', 'Controls popup width.'],
  ['--lightbox-height', '80dvh', 'Controls popup height.'],
  ['--lightbox-image-radius', 'var(--radius-lg)', 'Controls image corner radius.'],
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop fill.'],
  ['--lightbox-close-bg', 'var(--color-background)', 'Controls close button background.'],
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
        alt="Mountain ridge at sunset"
        className={styles.previewImage}
      />
      <LightboxContent>
        <img
          src={images.mountainLarge}
          alt="Mountain ridge at sunset"
          className={styles.contentImage}
        />
      </LightboxContent>
    </Lightbox>
  );
}

export function DynamicLightboxGalleryExample() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <React.Fragment>
      <div ref={rootRef} className={styles.dynamicRoot}>
        <img src={images.mountainSmall} alt="Mountain landscape" className={styles.dynamicImage} />
        <img src={images.sea} alt="Sea at sunset" className={styles.dynamicImage} />
        <img src={images.forest} alt="Forest and mountain road" className={styles.dynamicImage} />
      </div>
      <LightboxGallery rootRef={rootRef} />
    </React.Fragment>
  );
}

export function CustomizedLightboxExample() {
  return (
    <Lightbox>
      <LightboxImage src={images.road} alt="Road through forest" className={styles.previewImage} />
      <LightboxContent
        className={styles.customPopup}
        classNames={{ backdrop: styles.customBackdrop }}
        closeButton={<CloseButton aria-label="Close preview" className={styles.customClose} />}
      >
        <img src={images.road} alt="Road through forest" className={styles.contentImage} />
      </LightboxContent>
    </Lightbox>
  );
}