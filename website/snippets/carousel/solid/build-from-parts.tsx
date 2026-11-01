import {
  Carousel,
  CarouselControl,
  CarouselContext,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
} from '@moduix/solid/carousel';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-solid';
import { For } from 'solid-js';
import styles from '@/components/examples/carousel/carousel-basic.module.css';

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
];

export default function BuildFromPartsCarouselDemo() {
  return (
    <Carousel class={styles.root} aria-label="Travel gallery" slideCount={slides.length}>
      <CarouselItemGroup>
        <For each={slides}>
          {(slide, index) => (
            <CarouselItem index={index()}>
              <img class={styles.image} src={slide.src} alt={slide.alt} />
            </CarouselItem>
          )}
        </For>
      </CarouselItemGroup>

      <CarouselControl>
        <CarouselPrevTrigger>
          <ChevronLeftIcon strokeWidth={3} />
        </CarouselPrevTrigger>
        <CarouselNextTrigger>
          <ChevronRightIcon strokeWidth={3} />
        </CarouselNextTrigger>
      </CarouselControl>

      <CarouselContext>
        {(api) => (
          <CarouselIndicatorGroup>
            <For each={api().pageSnapPoints}>
              {(_, index) => <CarouselIndicator index={index()} />}
            </For>
          </CarouselIndicatorGroup>
        )}
      </CarouselContext>
      <CarouselProgressText />
    </Carousel>
  );
}