import { Lightbox, Portal, useLightbox } from '@moduix/react';
import { useRef, useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const images = [
  {
    id: 'mountain',
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
    alt: 'Mountain ridge at sunset',
  },
  {
    id: 'sea',
    thumbnail:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
    alt: 'Sea cliffs under a cloudy sky',
  },
  {
    id: 'forest',
    thumbnail:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
    alt: 'Road through a green forest',
  },
];

export const lightboxExampleCss = `
  .lightbox-trigger,
  .lightbox-gallery-trigger {
    display: block;
    margin: 0;
    border: 0;
    padding: 0;
    background: transparent;
    cursor: zoom-in;
  }

  .lightbox-trigger {
    border-radius: var(--radius-md);
  }

  .lightbox-trigger img {
    display: block;
    width: 18rem;
    max-width: min(18rem, calc(100vw - var(--spacing-10)));
    aspect-ratio: 16 / 10;
    border-radius: inherit;
    object-fit: cover;
  }

  .lightbox-stack {
    display: grid;
    justify-items: center;
    gap: var(--spacing-3);
  }

  .lightbox-button {
    border: 0;
    border-radius: var(--radius-md);
    background: var(--color-muted);
    padding: var(--spacing-3) var(--spacing-4);
    color: var(--color-foreground);
    font: inherit;
  }

  .lightbox-gallery {
    display: grid;
    width: min(36rem, calc(100vw - var(--spacing-10)));
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--spacing-3);
  }

  .lightbox-gallery-trigger {
    width: 100%;
    border-radius: var(--radius-sm);
  }

  .lightbox-gallery-trigger img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    border-radius: inherit;
    object-fit: cover;
  }

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

export const lightboxImagesData = `
  const images = [
    {
      id: "mountain",
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90",
      alt: "Mountain ridge at sunset",
    },
    {
      id: "sea",
      thumbnail: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80",
      src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90",
      alt: "Sea cliffs under a cloudy sky",
    },
    {
      id: "forest",
      thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90",
      alt: "Road through a green forest",
    },
  ];
`;

export const lightboxEmptyData = '// No additional data is required.';

export const lightboxOverrideCssProperties: CssPropertyInput[] = [
  ['--lightbox-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Backdrop fill.'],
  ['--lightbox-backdrop-blur', '4px', 'Backdrop blur radius.'],
  ['--lightbox-backdrop-transition', 'var(--transition-default)', 'Backdrop motion timing.'],
  ['--lightbox-positioner-padding', 'var(--spacing-4)', 'Viewport edge padding.'],
  ['--lightbox-content-max-width', '80vw', 'Maximum content width.'],
  ['--lightbox-content-max-height', '80dvh', 'Maximum content height.'],
  ['--lightbox-transition', '220ms ease', 'Content motion timing.'],
  ['--lightbox-media-max-width', '80vw', 'Maximum media width.'],
  ['--lightbox-media-max-height', '80dvh', 'Maximum media height.'],
  ['--lightbox-media-radius', 'var(--radius-md)', 'Media corner radius.'],
  ['--lightbox-media-shadow', 'var(--shadow-lg)', 'Media shadow.'],
  ['--lightbox-close-icon-size', '2rem', 'Close control size.'],
  ['--lightbox-close-icon-glyph-size', '0.875rem', 'Close glyph size.'],
  ['--lightbox-close-icon-radius', 'var(--radius-sm)', 'Close control radius.'],
  ['--lightbox-close-icon-bg', 'var(--color-background)', 'Close control background.'],
  ['--lightbox-close-icon-bg-hover', 'var(--color-muted)', 'Close control hover background.'],
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

function LightboxSurface({
  src,
  alt,
  closeOnMediaClick = false,
}: {
  src: string;
  alt: string;
  closeOnMediaClick?: boolean;
}) {
  return (
    <Portal>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={alt}>
          <Lightbox.Frame closeOnClick={closeOnMediaClick}>
            <img src={src} alt={alt} />
          </Lightbox.Frame>
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Portal>
  );
}

export function LightboxExample() {
  return (
    <>
      <style>{lightboxExampleCss}</style>
      <Lightbox>
        <Lightbox.Trigger asChild>
          <button type="button" className="lightbox-trigger">
            <img src={images[0].thumbnail} alt={images[0].alt} />
          </button>
        </Lightbox.Trigger>
        <LightboxSurface src={images[0].src} alt={images[0].alt} />
      </Lightbox>
    </>
  );
}

export function ControlledLightboxExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lightbox-stack">
      <style>{lightboxExampleCss}</style>
      <span>{open ? 'Open' : 'Closed'}</span>
      <Lightbox open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Lightbox.Trigger className="lightbox-button">Open controlled lightbox</Lightbox.Trigger>
        <LightboxSurface src={images[1].src} alt={images[1].alt} />
      </Lightbox>
    </div>
  );
}

export function ClickToCloseLightboxExample() {
  return (
    <>
      <style>{lightboxExampleCss}</style>
      <Lightbox>
        <Lightbox.Trigger className="lightbox-button">
          Open click-to-close lightbox
        </Lightbox.Trigger>
        <LightboxSurface src={images[1].src} alt={images[1].alt} closeOnMediaClick />
      </Lightbox>
    </>
  );
}

export function GalleryLightboxExample() {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <>
      <style>{lightboxExampleCss}</style>
      <Lightbox
        onTriggerValueChange={(details) => {
          setActiveImage(images.find((image) => image.id === details.value) ?? images[0]);
        }}
      >
        <div className="lightbox-gallery">
          {images.map((image) => (
            <Lightbox.Trigger key={image.id} value={image.id} asChild>
              <button type="button" className="lightbox-gallery-trigger">
                <img src={image.thumbnail} alt={image.alt} />
              </button>
            </Lightbox.Trigger>
          ))}
        </div>
        <LightboxSurface src={activeImage.src} alt={activeImage.alt} />
      </Lightbox>
    </>
  );
}

export function DelegatedLightboxExample() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <style>{lightboxExampleCss}</style>
      <div ref={rootRef} className="lightbox-gallery">
        {images.map((image) => (
          <button key={image.id} type="button" className="lightbox-gallery-trigger">
            <img src={image.thumbnail} data-lightbox-src={image.src} alt={image.alt} />
          </button>
        ))}
      </div>
      <Lightbox.Gallery rootRef={rootRef} selector="button" />
    </>
  );
}

export function RootProviderLightboxExample() {
  const lightbox = useLightbox();

  return (
    <div className="lightbox-stack">
      <style>{lightboxExampleCss}</style>
      <button type="button" className="lightbox-button" onClick={() => lightbox.setOpen(true)}>
        Lightbox is {lightbox.open ? 'open' : 'closed'}
      </button>
      <Lightbox.RootProvider value={lightbox}>
        <Portal>
          <Lightbox.Backdrop />
          <Lightbox.Positioner>
            <Lightbox.CloseIcon />
            <Lightbox.Content aria-label={images[2].alt}>
              <Lightbox.Frame>
                <img src={images[2].src} alt={images[2].alt} />
              </Lightbox.Frame>
              <Lightbox.Context>
                {(state) => (
                  <span className="lightbox-status">
                    Preview is {state.open ? 'open' : 'closed'}
                  </span>
                )}
              </Lightbox.Context>
            </Lightbox.Content>
          </Lightbox.Positioner>
        </Portal>
      </Lightbox.RootProvider>
    </div>
  );
}

export function LazyMountLightboxExample() {
  return (
    <>
      <style>{lightboxExampleCss}</style>
      <Lightbox lazyMount unmountOnExit>
        <Lightbox.Trigger className="lightbox-button">Open lazy lightbox</Lightbox.Trigger>
        <LightboxSurface src={images[0].src} alt={images[0].alt} />
      </Lightbox>
    </>
  );
}

export function CustomizedLightboxExample() {
  return (
    <>
      <style>{lightboxExampleCss}</style>
      <Lightbox>
        <Lightbox.Trigger className="lightbox-button">Open styled lightbox</Lightbox.Trigger>
        <Portal>
          <Lightbox.Backdrop className="lightbox-custom-backdrop" />
          <Lightbox.Positioner>
            <Lightbox.CloseIcon className="lightbox-custom-close" />
            <Lightbox.Content className="lightbox-custom-content" aria-label={images[1].alt}>
              <Lightbox.Frame>
                <img src={images[1].src} alt={images[1].alt} />
              </Lightbox.Frame>
            </Lightbox.Content>
          </Lightbox.Positioner>
        </Portal>
      </Lightbox>
    </>
  );
}