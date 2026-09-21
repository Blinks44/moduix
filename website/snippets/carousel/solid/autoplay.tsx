import {
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
  CarouselContext,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@moduix/solid/carousel';
import { For } from 'solid-js';
import styles from '@/components/examples/carousel/carousel-autoplay.module.css';

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

export default function AutoplayCarousel() {
  return (
    <Carousel
      class={styles.root}
      aria-label="Autoplay gallery"
      autoplay={{ delay: 3500 }}
      loop
      slideCount={slides.length}
    >
      <CarouselContext>
        {(api) => (
          <>
            <CarouselItemGroup
              class={styles.itemGroup}
              onFocus={() => api().pause()}
              onPointerEnter={() => api().pause()}
            >
              <For each={slides}>
                {(slide, index) => (
                  <CarouselItem index={index()}>
                    <img class={styles.image} src={slide.src} alt={slide.alt} />
                  </CarouselItem>
                )}
              </For>
            </CarouselItemGroup>

            <CarouselControl
              class={styles.control}
              onFocus={() => api().pause()}
              onPointerEnter={() => api().pause()}
            >
              <CarouselAutoplayTrigger>
                <CarouselAutoplayIndicator fallback="Play">Pause</CarouselAutoplayIndicator>
              </CarouselAutoplayTrigger>
              <CarouselPrevTrigger />
              <CarouselIndicators />
              <CarouselNextTrigger />
            </CarouselControl>
          </>
        )}
      </CarouselContext>
    </Carousel>
  );
}