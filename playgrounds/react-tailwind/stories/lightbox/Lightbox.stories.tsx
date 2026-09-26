import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@/components/carousel';
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

const stackClass = 'grid justify-items-center gap-3';
const imageTriggerClass = 'block cursor-zoom-in rounded-md border-0 bg-transparent p-0';
const imageTriggerImageClass = 'block aspect-[16/10] w-70 rounded-md object-cover';
const textTriggerClass = 'rounded-md border-0 bg-muted px-4 py-3 text-foreground';
const galleryClass = 'grid w-[min(30rem,calc(100vw-2rem))] grid-cols-3 gap-3';
const galleryTriggerClass = 'block w-full cursor-zoom-in rounded-sm border-0 bg-transparent p-0';
const galleryTriggerImageClass = 'block aspect-square w-full rounded-sm object-cover';
const statusClass =
  'absolute bottom-3 start-1/2 -translate-x-1/2 rounded-sm bg-black/65 px-2 py-1 text-sm text-white';

function LightboxSurface({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label={alt}>
          <LightboxBody>
            <LightboxImage src={src} alt={alt} />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </>
  );
}

function ClickToCloseLightboxSurface({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label={alt}>
          <LightboxBody>
            <LightboxImage src={src} alt={alt} closeOnClick />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </>
  );
}

function LightboxStatus() {
  const dialog = useLightboxContext();

  return <span className={statusClass}>Preview is {dialog.open ? 'open' : 'closed'}</span>;
}

const meta = {
  title: 'Components/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Lightbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Lightbox>
      <LightboxTrigger asChild>
        <button type="button" className={imageTriggerClass}>
          <img src={images[0].src} alt={images[0].alt} className={imageTriggerImageClass} />
        </button>
      </LightboxTrigger>
      <LightboxSurface src={images[0].src} alt={images[0].alt} />
    </Lightbox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className={stackClass}>
        <span>{open ? 'Open' : 'Closed'}</span>
        <Lightbox open={open} onOpenChange={(details) => setOpen(details.open)}>
          <LightboxTrigger className={textTriggerClass}>Open controlled lightbox</LightboxTrigger>
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
        <div className={galleryClass}>
          {images.map((image) => (
            <LightboxTrigger key={image.id} value={image.id} asChild>
              <button type="button" className={galleryTriggerClass}>
                <img src={image.src} alt={image.alt} className={galleryTriggerImageClass} />
              </button>
            </LightboxTrigger>
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
      <div className={stackClass}>
        <button type="button" className={textTriggerClass} onClick={() => lightbox.setOpen(true)}>
          Lightbox is {lightbox.open ? 'open' : 'closed'}
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
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [activeImage, setActiveImage] = useState<LightboxImageSelectDetails | null>(null);

    return (
      <>
        <div ref={rootRef} className={galleryClass}>
          {images.map((image) => (
            <button key={image.id} type="button" className={galleryTriggerClass}>
              <img
                src={image.src}
                data-lightbox-src={image.src}
                alt={image.alt}
                className={galleryTriggerImageClass}
              />
            </button>
          ))}
        </div>
        <Lightbox lazyMount unmountOnExit>
          <LightboxBind rootRef={rootRef} selector="button" onImageSelect={setActiveImage} />
          <LightboxBackdrop />
          <LightboxPositioner>
            <LightboxCloseIcon />
            <LightboxContent aria-label={activeImage?.alt ?? 'Image preview'}>
              <LightboxBody>
                {activeImage ? (
                  <LightboxImage src={activeImage.src} alt={activeImage.alt ?? ''} />
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
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = images[activeIndex] ?? images[0];

    return (
      <Lightbox
        onTriggerValueChange={(details) => {
          const nextIndex = images.findIndex((image) => image.id === details.value);
          setActiveIndex(nextIndex >= 0 ? nextIndex : 0);
        }}
      >
        <div className={galleryClass}>
          {images.map((image) => (
            <LightboxTrigger key={image.id} value={image.id} asChild>
              <button type="button" className={galleryTriggerClass}>
                <img src={image.src} alt={image.alt} className={galleryTriggerImageClass} />
              </button>
            </LightboxTrigger>
          ))}
        </div>
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxCloseIcon />
          <LightboxContent aria-label={activeImage.alt}>
            <LightboxGallery>
              <Carousel
                aria-label="Server-driven image carousel"
                page={activeIndex}
                onPageChange={(details) => setActiveIndex(details.page)}
                slideCount={images.length}
              >
                <CarouselControl>
                  <CarouselPrevTrigger />
                  <CarouselItemGroup>
                    {images.map((image, index) => (
                      <CarouselItem key={image.id} index={index}>
                        <img src={image.src} alt={image.alt} />
                      </CarouselItem>
                    ))}
                  </CarouselItemGroup>
                  <CarouselNextTrigger />
                </CarouselControl>
                <CarouselIndicatorGroup>
                  {images.map((image, index) => (
                    <CarouselIndicator key={image.id} index={index}>
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
      <LightboxTrigger className={textTriggerClass}>Open click-to-close lightbox</LightboxTrigger>
      <ClickToCloseLightboxSurface src={images[1].src} alt={images[1].alt} />
    </Lightbox>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Lightbox>
      <LightboxTrigger className={textTriggerClass}>Open styled lightbox</LightboxTrigger>
      <LightboxBackdrop className="bg-slate-900/70" />
      <LightboxPositioner>
        <LightboxCloseIcon className="rounded-md bg-muted [@media(hover:hover)]:hover:bg-accent" />
        <LightboxContent className="max-h-[72dvh] max-w-[72vw]" aria-label={images[1].alt}>
          <LightboxBody>
            <LightboxImage src={images[1].src} alt={images[1].alt} />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ),
};