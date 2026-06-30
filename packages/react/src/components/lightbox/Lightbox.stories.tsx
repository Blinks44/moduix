import type { Meta, StoryObj } from '@storybook/react-vite';
import { Portal } from '@ark-ui/react/portal';
import { useRef, useState } from 'react';
import type { LightboxImageSelectDetails } from './Lightbox';
import { Carousel } from '../carousel';
import { Lightbox, useLightbox } from './Lightbox';
import styles from './Lightbox.stories.module.css';

const images = [
  {
    id: 'mountain',
    src: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1800&q=90',
    alt: 'Mountain ridge at sunset',
  },
  {
    id: 'earth',
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=90',
    alt: 'Earth from space',
  },
  {
    id: 'forest',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
    alt: 'Road through a forest',
  },
];

function LightboxSurface({ src, alt }: { src: string; alt: string }) {
  return (
    <Portal>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={alt}>
          <Lightbox.Image src={src} alt={alt} />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Portal>
  );
}

function ClickToCloseLightboxSurface({ src, alt }: { src: string; alt: string }) {
  return (
    <Portal>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={alt}>
          <Lightbox.Image src={src} alt={alt} closeOnClick />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Portal>
  );
}

const meta = {
  title: 'Components/Lightbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Lightbox>
      <Lightbox.Trigger asChild>
        <button type="button" className={styles.imageTrigger}>
          <img src={images[0].src} alt={images[0].alt} />
        </button>
      </Lightbox.Trigger>
      <LightboxSurface src={images[0].src} alt={images[0].alt} />
    </Lightbox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className={styles.stack}>
        <span>{open ? 'Open' : 'Closed'}</span>
        <Lightbox open={open} onOpenChange={(details) => setOpen(details.open)}>
          <Lightbox.Trigger className={styles.textTrigger}>
            Open controlled lightbox
          </Lightbox.Trigger>
          <LightboxSurface src={images[1].src} alt={images[1].alt} />
        </Lightbox>
      </div>
    );
  },
};

export const MultipleTriggers: Story = {
  render: () => {
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
      <Lightbox
        onTriggerValueChange={(details) => {
          setActiveImage(images.find((image) => image.id === details.value) ?? images[0]);
        }}
      >
        <div className={styles.gallery}>
          {images.map((image) => (
            <Lightbox.Trigger key={image.id} value={image.id} asChild>
              <button type="button" className={styles.galleryTrigger}>
                <img src={image.src} alt={image.alt} />
              </button>
            </Lightbox.Trigger>
          ))}
        </div>
        <LightboxSurface src={activeImage.src} alt={activeImage.alt} />
      </Lightbox>
    );
  },
};

export const RootProviderAndContext: Story = {
  render: () => {
    const lightbox = useLightbox();

    return (
      <div className={styles.stack}>
        <button type="button" className={styles.textTrigger} onClick={() => lightbox.setOpen(true)}>
          Lightbox is {lightbox.open ? 'open' : 'closed'}
        </button>
        <Lightbox.RootProvider value={lightbox}>
          <Portal>
            <Lightbox.Backdrop />
            <Lightbox.Positioner>
              <Lightbox.CloseIcon />
              <Lightbox.Content aria-label={images[2].alt}>
                <Lightbox.Image src={images[2].src} alt={images[2].alt} />
                <Lightbox.Context>
                  {(state) => (
                    <span className={styles.status}>
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
  },
};

export const BoundContent: Story = {
  render: () => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [activeImage, setActiveImage] = useState<LightboxImageSelectDetails | null>(null);

    return (
      <>
        <div ref={rootRef} className={styles.gallery}>
          {images.map((image) => (
            <button key={image.id} type="button" className={styles.galleryTrigger}>
              <img src={image.src} data-lightbox-src={image.src} alt={image.alt} />
            </button>
          ))}
        </div>
        <Lightbox lazyMount unmountOnExit>
          <Lightbox.Bind rootRef={rootRef} selector="button" onImageSelect={setActiveImage} />
          <Portal>
            <Lightbox.Backdrop />
            <Lightbox.Positioner>
              <Lightbox.CloseIcon />
              <Lightbox.Content aria-label={activeImage?.alt ?? 'Image preview'}>
                {activeImage ? (
                  <Lightbox.Image src={activeImage.src} alt={activeImage.alt ?? ''} />
                ) : null}
              </Lightbox.Content>
            </Lightbox.Positioner>
          </Portal>
        </Lightbox>
      </>
    );
  },
};

export const GalleryFromServerData: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = images[activeIndex] ?? images[0];

    return (
      <Lightbox
        onTriggerValueChange={(details) => {
          const nextIndex = images.findIndex((image) => image.id === details.value);
          setActiveIndex(nextIndex >= 0 ? nextIndex : 0);
        }}
      >
        <div className={styles.gallery}>
          {images.map((image) => (
            <Lightbox.Trigger key={image.id} value={image.id} asChild>
              <button type="button" className={styles.galleryTrigger}>
                <img src={image.src} alt={image.alt} />
              </button>
            </Lightbox.Trigger>
          ))}
        </div>
        <Portal>
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
                        <img src={image.src} alt="" />
                      </Carousel.Indicator>
                    ))}
                  </Carousel.IndicatorGroup>
                </Carousel.Root>
              </Lightbox.Gallery>
            </Lightbox.Content>
          </Lightbox.Positioner>
        </Portal>
      </Lightbox>
    );
  },
};

export const ClickToCloseImage: Story = {
  render: () => (
    <Lightbox>
      <Lightbox.Trigger className={styles.textTrigger}>
        Open click-to-close lightbox
      </Lightbox.Trigger>
      <ClickToCloseLightboxSurface src={images[1].src} alt={images[1].alt} />
    </Lightbox>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Lightbox>
      <Lightbox.Trigger className={styles.textTrigger}>Open styled lightbox</Lightbox.Trigger>
      <Portal>
        <Lightbox.Backdrop className={styles.customBackdrop} />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon className={styles.customCloseIcon} />
          <Lightbox.Content className={styles.customContent} aria-label={images[1].alt}>
            <Lightbox.Image src={images[1].src} alt={images[1].alt} />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Portal>
    </Lightbox>
  ),
};