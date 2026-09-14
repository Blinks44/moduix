import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Carousel } from '@/components/carousel/Carousel';
import type { LightboxImageSelectDetails } from '@/components/lightbox/Lightbox';
import { Lightbox, useLightbox, useLightboxContext } from '@/components/lightbox/Lightbox';

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

function LightboxSurface(props: { src: string; alt: string }) {
  return (
    <>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={props.alt}>
          <Lightbox.Body>
            <Lightbox.Image src={props.src} alt={props.alt} />
          </Lightbox.Body>
        </Lightbox.Content>
      </Lightbox.Positioner>
    </>
  );
}

function ClickToCloseLightboxSurface(props: { src: string; alt: string }) {
  return (
    <>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={props.alt}>
          <Lightbox.Body>
            <Lightbox.Image src={props.src} alt={props.alt} closeOnClick />
          </Lightbox.Body>
        </Lightbox.Content>
      </Lightbox.Positioner>
    </>
  );
}

function LightboxStatus() {
  const dialog = useLightboxContext();

  return <span class={statusClass}>Preview is {dialog().open ? 'open' : 'closed'}</span>;
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
      <Lightbox.Trigger
        asChild={(triggerProps) => (
          <button {...triggerProps()} type="button" class={imageTriggerClass}>
            <img src={images[0].src} alt={images[0].alt} class={imageTriggerImageClass} />
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
      <div class={stackClass}>
        <span>{open() ? 'Open' : 'Closed'}</span>
        <Lightbox open={open()} onOpenChange={(details) => setOpen(details.open)}>
          <Lightbox.Trigger class={textTriggerClass}>Open controlled lightbox</Lightbox.Trigger>
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
        <div class={galleryClass}>
          {images.map((image) => (
            <Lightbox.Trigger
              value={image.id}
              asChild={(triggerProps) => (
                <button {...triggerProps()} type="button" class={galleryTriggerClass}>
                  <img src={image.src} alt={image.alt} class={galleryTriggerImageClass} />
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
      <div class={stackClass}>
        <button type="button" class={textTriggerClass} onClick={() => lightbox().setOpen(true)}>
          Lightbox is {lightbox().open ? 'open' : 'closed'}
        </button>
        <Lightbox.RootProvider value={lightbox}>
          <Lightbox.Backdrop />
          <Lightbox.Positioner>
            <Lightbox.CloseIcon />
            <Lightbox.Content aria-label={images[2].alt}>
              <Lightbox.Header>
                <Lightbox.Title>{images[2].alt}</Lightbox.Title>
                <Lightbox.Description>State comes from useLightbox.</Lightbox.Description>
              </Lightbox.Header>
              <Lightbox.Body>
                <Lightbox.Image src={images[2].src} alt={images[2].alt} />
              </Lightbox.Body>
              <Lightbox.Footer>
                <LightboxStatus />
              </Lightbox.Footer>
            </Lightbox.Content>
          </Lightbox.Positioner>
        </Lightbox.RootProvider>
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
        <div ref={(element) => (rootRef = element)} class={galleryClass}>
          {images.map((image) => (
            <button type="button" class={galleryTriggerClass}>
              <img
                src={image.src}
                data-lightbox-src={image.src}
                alt={image.alt}
                class={galleryTriggerImageClass}
              />
            </button>
          ))}
        </div>
        <Lightbox lazyMount unmountOnExit>
          <Lightbox.Bind
            rootRef={() => rootRef}
            selector="button"
            onImageSelect={(details) => setActiveImage(details)}
          />
          <Lightbox.Backdrop />
          <Lightbox.Positioner>
            <Lightbox.CloseIcon />
            <Lightbox.Content aria-label={activeImage()?.alt ?? 'Image preview'}>
              <Lightbox.Body>
                {activeImage() ? (
                  <Lightbox.Image src={activeImage()!.src} alt={activeImage()!.alt ?? ''} />
                ) : null}
              </Lightbox.Body>
            </Lightbox.Content>
          </Lightbox.Positioner>
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
        <div class={galleryClass}>
          {images.map((image) => (
            <Lightbox.Trigger
              value={image.id}
              asChild={(triggerProps) => (
                <button {...triggerProps()} type="button" class={galleryTriggerClass}>
                  <img src={image.src} alt={image.alt} class={galleryTriggerImageClass} />
                </button>
              )}
            />
          ))}
        </div>
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={activeImage().alt}>
            <Lightbox.Gallery>
              <Carousel
                aria-label="Server-driven image carousel"
                page={activeIndex()}
                onPageChange={(details) => setActiveIndex(details.page)}
                slideCount={images.length}
              >
                <Carousel.Control>
                  <Carousel.PrevTrigger />
                  <Carousel.ItemGroup>
                    {images.map((image, index) => (
                      <Carousel.Item index={index}>
                        <img src={image.src} alt={image.alt} />
                      </Carousel.Item>
                    ))}
                  </Carousel.ItemGroup>
                  <Carousel.NextTrigger />
                </Carousel.Control>
                <Carousel.IndicatorGroup>
                  {images.map((image, index) => (
                    <Carousel.Indicator index={index}>
                      <img src={image.src} alt="" />
                    </Carousel.Indicator>
                  ))}
                </Carousel.IndicatorGroup>
              </Carousel>
            </Lightbox.Gallery>
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
    );
  },
};

export const ClickToCloseImage: Story = {
  render: () => (
    <Lightbox>
      <Lightbox.Trigger class={textTriggerClass}>Open click-to-close lightbox</Lightbox.Trigger>
      <ClickToCloseLightboxSurface src={images[1].src} alt={images[1].alt} />
    </Lightbox>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Lightbox>
      <Lightbox.Trigger class={textTriggerClass}>Open styled lightbox</Lightbox.Trigger>
      <Lightbox.Backdrop class="bg-slate-900/70" />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon class="rounded-md bg-muted [@media(hover:hover)]:hover:bg-accent" />
        <Lightbox.Content class="max-h-[72dvh] max-w-[72vw]" aria-label={images[1].alt}>
          <Lightbox.Body>
            <Lightbox.Image src={images[1].src} alt={images[1].alt} />
          </Lightbox.Body>
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  ),
};