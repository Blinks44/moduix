import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@/components/carousel/Carousel';
import type { LightboxImageSelectDetails } from '@/components/lightbox/Lightbox';
import {
  LightboxRootProvider,
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxTitle,
  LightboxDescription,
  LightboxCloseIcon,
  LightboxHeader,
  LightboxBody,
  LightboxFooter,
  LightboxImage,
  LightboxGallery,
  LightboxBind,
  Lightbox,
  useLightbox,
  useLightboxContext,
} from '@/components/lightbox/Lightbox';
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

function LightboxSurface(props: { src: string; alt: string }) {
  return (
    <>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label={props.alt}>
          <LightboxBody>
            <LightboxImage src={props.src} alt={props.alt} />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </>
  );
}

function ClickToCloseLightboxSurface(props: { src: string; alt: string }) {
  return (
    <>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label={props.alt}>
          <LightboxBody>
            <LightboxImage src={props.src} alt={props.alt} closeOnClick />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </>
  );
}

function LightboxStatus() {
  const dialog = useLightboxContext();

  return <span class={styles.status}>Preview is {dialog().open ? 'open' : 'closed'}</span>;
}

const meta = {
  title: 'Components/Lightbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Lightbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Lightbox>
      <LightboxTrigger
        asChild={(triggerProps) => (
          <button {...triggerProps()} type="button" class={styles.imageTrigger}>
            <img src={images[0].src} alt={images[0].alt} />
          </button>
        )}
      />
      <LightboxSurface src={images[0].src} alt={images[0].alt} />
    </Lightbox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = createSignal(false);

    return (
      <div class={styles.stack}>
        <span>{open() ? 'Open' : 'Closed'}</span>
        <Lightbox open={open()} onOpenChange={(details) => setOpen(details.open)}>
          <LightboxTrigger class={styles.textTrigger}>Open controlled lightbox</LightboxTrigger>
          <LightboxSurface src={images[1].src} alt={images[1].alt} />
        </Lightbox>
      </div>
    );
  },
};

export const MultipleTriggers: Story = {
  render: () => {
    const [activeImage, setActiveImage] = createSignal(images[0]);

    return (
      <Lightbox
        onTriggerValueChange={(details) => {
          setActiveImage(images.find((image) => image.id === details.value) ?? images[0]);
        }}
      >
        <div class={styles.gallery}>
          {images.map((image) => (
            <LightboxTrigger
              value={image.id}
              asChild={(triggerProps) => (
                <button {...triggerProps()} type="button" class={styles.galleryTrigger}>
                  <img src={image.src} alt={image.alt} />
                </button>
              )}
            />
          ))}
        </div>
        <LightboxSurface src={activeImage().src} alt={activeImage().alt} />
      </Lightbox>
    );
  },
};

export const RootProviderAndContext: Story = {
  render: () => {
    const lightbox = useLightbox();

    return (
      <div class={styles.stack}>
        <button type="button" class={styles.textTrigger} onClick={() => lightbox().setOpen(true)}>
          Lightbox is {lightbox().open ? 'open' : 'closed'}
        </button>
        <LightboxRootProvider value={lightbox}>
          <LightboxBackdrop />
          <LightboxPositioner>
            <LightboxCloseIcon />
            <LightboxContent aria-label={images[2].alt}>
              <LightboxHeader>
                <LightboxTitle>{images[2].alt}</LightboxTitle>
                <LightboxDescription>State comes from useLightbox.</LightboxDescription>
              </LightboxHeader>
              <LightboxBody>
                <LightboxImage src={images[2].src} alt={images[2].alt} />
              </LightboxBody>
              <LightboxFooter>
                <LightboxStatus />
              </LightboxFooter>
            </LightboxContent>
          </LightboxPositioner>
        </LightboxRootProvider>
      </div>
    );
  },
};

export const BoundContent: Story = {
  render: () => {
    let rootRef: HTMLDivElement | undefined;
    const [activeImage, setActiveImage] = createSignal<LightboxImageSelectDetails | null>(null);

    return (
      <>
        <div ref={(element) => (rootRef = element)} class={styles.gallery}>
          {images.map((image) => (
            <button type="button" class={styles.galleryTrigger}>
              <img src={image.src} data-lightbox-src={image.src} alt={image.alt} />
            </button>
          ))}
        </div>
        <Lightbox lazyMount unmountOnExit>
          <LightboxBind
            rootRef={() => rootRef}
            selector="button"
            onImageSelect={(details) => setActiveImage(details)}
          />
          <LightboxBackdrop />
          <LightboxPositioner>
            <LightboxCloseIcon />
            <LightboxContent aria-label={activeImage()?.alt ?? 'Image preview'}>
              <LightboxBody>
                {activeImage() ? (
                  <LightboxImage src={activeImage()!.src} alt={activeImage()!.alt ?? ''} />
                ) : null}
              </LightboxBody>
            </LightboxContent>
          </LightboxPositioner>
        </Lightbox>
      </>
    );
  },
};

export const GalleryFromServerData: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = createSignal(0);
    const activeImage = () => images[activeIndex()] ?? images[0];

    return (
      <Lightbox
        onTriggerValueChange={(details) => {
          const nextIndex = images.findIndex((image) => image.id === details.value);
          setActiveIndex(nextIndex >= 0 ? nextIndex : 0);
        }}
      >
        <div class={styles.gallery}>
          {images.map((image) => (
            <LightboxTrigger
              value={image.id}
              asChild={(triggerProps) => (
                <button {...triggerProps()} type="button" class={styles.galleryTrigger}>
                  <img src={image.src} alt={image.alt} />
                </button>
              )}
            />
          ))}
        </div>
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxCloseIcon />
          <LightboxContent aria-label={activeImage().alt}>
            <LightboxGallery>
              <Carousel
                aria-label="Server-driven image carousel"
                page={activeIndex()}
                onPageChange={(details) => setActiveIndex(details.page)}
                slideCount={images.length}
              >
                <CarouselControl>
                  <CarouselPrevTrigger />
                  <CarouselItemGroup>
                    {images.map((image, index) => (
                      <CarouselItem index={index}>
                        <img src={image.src} alt={image.alt} />
                      </CarouselItem>
                    ))}
                  </CarouselItemGroup>
                  <CarouselNextTrigger />
                </CarouselControl>
                <CarouselIndicatorGroup>
                  {images.map((image, index) => (
                    <CarouselIndicator index={index}>
                      <img src={image.src} alt="" />
                    </CarouselIndicator>
                  ))}
                </CarouselIndicatorGroup>
              </Carousel>
            </LightboxGallery>
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    );
  },
};

export const ClickToCloseImage: Story = {
  render: () => (
    <Lightbox>
      <LightboxTrigger class={styles.textTrigger}>Open click-to-close lightbox</LightboxTrigger>
      <ClickToCloseLightboxSurface src={images[1].src} alt={images[1].alt} />
    </Lightbox>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Lightbox>
      <LightboxTrigger class={styles.textTrigger}>Open styled lightbox</LightboxTrigger>
      <LightboxBackdrop class={styles.customBackdrop} />
      <LightboxPositioner>
        <LightboxCloseIcon class={styles.customCloseIcon} />
        <LightboxContent class={styles.customContent} aria-label={images[1].alt}>
          <LightboxBody>
            <LightboxImage src={images[1].src} alt={images[1].alt} />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ),
};