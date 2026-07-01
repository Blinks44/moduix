import type { LightboxImageSelectDetails } from '@moduix/react';
import { Carousel, Lightbox, useLightbox } from '@moduix/react';
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
  ['--lightbox-gallery-max-width', '72rem', 'Maximum gallery width.'],
  ['--lightbox-gallery-aspect-ratio', '16 / 10', 'Gallery viewport aspect ratio.'],
  ['--lightbox-gallery-track-max-height', '68dvh', 'Maximum gallery viewport height.'],
  ['--lightbox-gallery-gap', 'var(--spacing-4)', 'Space between carousel parts.'],
  [
    '--lightbox-gallery-track-bg',
    'color-mix(in oklab, black 88%, var(--color-background) 12%)',
    'Gallery viewport background.',
  ],
  ['--lightbox-gallery-thumbnail-width', '5rem', 'Thumbnail indicator width.'],
  ['--lightbox-gallery-thumbnail-height', '3rem', 'Thumbnail indicator height.'],
  ['--lightbox-gallery-thumbnail-radius', 'var(--radius-md)', 'Thumbnail indicator corner radius.'],
  ['--lightbox-gallery-thumbnail-opacity', '0.65', 'Idle thumbnail opacity.'],
  ['--lightbox-gallery-thumbnail-opacity-hover', '0.9', 'Hovered thumbnail opacity.'],
  [
    '--lightbox-gallery-thumbnail-border-color',
    'var(--color-primary)',
    'Current thumbnail border color.',
  ],
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
  closeOnImageClick = false,
}: {
  src: string;
  alt: string;
  closeOnImageClick?: boolean;
}) {
  return (
    <>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={alt}>
          <Lightbox.Image src={src} alt={alt} closeOnClick={closeOnImageClick} />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </>
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
        <LightboxSurface src={images[1].src} alt={images[1].alt} closeOnImageClick />
      </Lightbox>
    </>
  );
}

export function MultipleTriggersLightboxExample() {
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

export function GalleryLightboxExample() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <>
      <style>{lightboxExampleCss}</style>
      <Lightbox
        onTriggerValueChange={(details) => {
          const nextIndex = images.findIndex((image) => image.id === details.value);
          setActiveIndex(nextIndex >= 0 ? nextIndex : 0);
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
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={activeImage.alt}>
            <Lightbox.Gallery>
              <Carousel.Root
                page={activeIndex}
                onPageChange={(details) => setActiveIndex(details.page)}
                slideCount={images.length}
              >
                <Carousel.Control>
                  <Carousel.PrevTrigger />
                  <Carousel.ItemGroup aria-label="Server-driven image carousel">
                    {images.map((image, index) => (
                      <Carousel.Item key={image.id} index={index}>
                        <img src={image.src} alt={image.alt} />
                      </Carousel.Item>
                    ))}
                  </Carousel.ItemGroup>
                  <Carousel.NextTrigger />
                </Carousel.Control>
                <Carousel.IndicatorGroup>
                  {images.map((image, index) => (
                    <Carousel.Indicator key={image.id} index={index}>
                      <img src={image.thumbnail} alt="" />
                    </Carousel.Indicator>
                  ))}
                </Carousel.IndicatorGroup>
              </Carousel.Root>
            </Lightbox.Gallery>
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
    </>
  );
}

export function BoundLightboxExample() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState<LightboxImageSelectDetails | null>(null);

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
      <Lightbox lazyMount unmountOnExit>
        <Lightbox.Bind rootRef={rootRef} selector="button" onImageSelect={setActiveImage} />
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={activeImage?.alt ?? 'Image preview'}>
            {activeImage ? (
              <Lightbox.Image src={activeImage.src} alt={activeImage.alt ?? ''} />
            ) : null}
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
    </>
  );
}

export function FocusLightboxExample() {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="lightbox-stack">
      <style>{lightboxExampleCss}</style>
      <button ref={triggerRef} type="button" className="lightbox-button">
        Focus returns here
      </button>
      <Lightbox
        initialFocusEl={() => closeRef.current}
        finalFocusEl={() => triggerRef.current}
        ids={{
          content: 'lightbox-focus-content',
          title: 'lightbox-focus-title',
        }}
      >
        <Lightbox.Trigger className="lightbox-button">Open focus-managed lightbox</Lightbox.Trigger>
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon ref={closeRef} />
          <Lightbox.Content>
            <Lightbox.Title className="lightbox-status">Mountain ridge at sunset</Lightbox.Title>
            <Lightbox.Image src={images[0].src} alt={images[0].alt} />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
    </div>
  );
}

export function NonModalLightboxExample() {
  return (
    <div className="lightbox-stack">
      <style>{lightboxExampleCss}</style>
      <Lightbox modal={false} trapFocus={false} preventScroll={false}>
        <Lightbox.Trigger className="lightbox-button">Open non-modal lightbox</Lightbox.Trigger>
        <LightboxSurface src={images[2].src} alt={images[2].alt} />
      </Lightbox>
      <button type="button" className="lightbox-button">
        Background action
      </button>
    </div>
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
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={images[2].alt}>
            <Lightbox.Image src={images[2].src} alt={images[2].alt} />
            <Lightbox.Context>
              {(state) => (
                <span className="lightbox-status">Preview is {state.open ? 'open' : 'closed'}</span>
              )}
            </Lightbox.Context>
          </Lightbox.Content>
        </Lightbox.Positioner>
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
        <Lightbox.Backdrop className="lightbox-custom-backdrop" />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon className="lightbox-custom-close" />
          <Lightbox.Content className="lightbox-custom-content" aria-label={images[1].alt}>
            <Lightbox.Image src={images[1].src} alt={images[1].alt} />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
    </>
  );
}