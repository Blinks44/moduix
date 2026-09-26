import { Button } from '@moduix/solid/button';
import {
  Carousel,
  CarouselContext,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@moduix/solid/carousel';
import { For } from 'solid-js';
import styles from '@/components/examples/carousel/carousel-advanced-customization.module.css';

const slides = [
  {
    id: 'fjord',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    id: 'coast',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80',
    alt: 'Ocean waves rolling onto a sandy beach.',
  },
  {
    id: 'village',
    src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80',
    alt: 'A colorful hillside town on the coast.',
  },
  {
    id: 'forest',
    src: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80',
    alt: 'A misty green forest with tall trees.',
  },
  {
    id: 'desert',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80',
    alt: 'Golden sand dunes under a bright sky.',
  },
];

export default function AdvancedCustomizationCarousel() {
  return (
    <Carousel
      class={styles.root}
      aria-label="Advanced customization gallery"
      slideCount={slides.length}
      slidesPerPage={2}
      spacing="var(--moduix-spacing-3)"
    >
      <CarouselItemGroup class={styles.itemGroup} aria-label="Advanced customization gallery">
        <For each={slides}>
          {(slide, index) => (
            <CarouselItem index={index()}>
              <img class={styles.image} src={slide.src} alt={slide.alt} />
            </CarouselItem>
          )}
        </For>
      </CarouselItemGroup>

      <CarouselContext>
        {(api) => (
          <>
            <CarouselControl class={styles.control}>
              <CarouselPrevTrigger />
              <CarouselIndicatorGroup>
                <For each={api().pageSnapPoints}>
                  {(_, index) => <CarouselIndicator index={index()} />}
                </For>
              </CarouselIndicatorGroup>
              <CarouselNextTrigger />
            </CarouselControl>

            <div style={{ 'margin-inline': 'auto' }}>
              <Button size="sm" variant="outline" onClick={() => api().scrollToIndex(3)}>
                Go to slide 4
              </Button>
            </div>
          </>
        )}
      </CarouselContext>
    </Carousel>
  );
}