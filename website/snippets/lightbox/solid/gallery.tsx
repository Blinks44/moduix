import { Carousel } from '@moduix/solid/carousel';
import { Lightbox } from '@moduix/solid/lightbox';
import { For, createSignal } from 'solid-js';
import styles from '@/components/examples/lightbox/lightbox-gallery.module.css';

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

export default function GalleryLightboxDemo() {
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
        <For each={images}>
          {(image) => (
            <Lightbox.Trigger
              value={image.id}
              asChild={(props) => (
                <button {...props()} type="button" class={styles.galleryTrigger}>
                  <img src={image.thumbnail} alt={image.alt} />
                </button>
              )}
            />
          )}
        </For>
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
                  <For each={images}>
                    {(image, index) => (
                      <Carousel.Item index={index()}>
                        <img src={image.src} alt={image.alt} />
                      </Carousel.Item>
                    )}
                  </For>
                </Carousel.ItemGroup>
                <Carousel.NextTrigger />
              </Carousel.Control>

              <Carousel.IndicatorGroup>
                <For each={images}>
                  {(image, index) => (
                    <Carousel.Indicator index={index()}>
                      <img src={image.thumbnail} alt="" />
                    </Carousel.Indicator>
                  )}
                </For>
              </Carousel.IndicatorGroup>
            </Carousel>
          </Lightbox.Gallery>
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}