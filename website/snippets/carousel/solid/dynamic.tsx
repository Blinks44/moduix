import { Button } from '@moduix/solid/button';
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@moduix/solid/carousel';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/carousel/carousel-dynamic.module.css';

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

export default function DynamicSlidesCarousel() {
  const [visibleSlides, setVisibleSlides] = createSignal(slides.slice(0, 4));
  const [page, setPage] = createSignal(0);

  const addSlide = () => {
    setVisibleSlides((currentSlides) => {
      const template = slides[currentSlides.length % slides.length];

      return [
        ...currentSlides,
        {
          ...template,
          id: `${template.id}-${currentSlides.length}`,
        },
      ];
    });
  };

  return (
    <div class={styles.stack}>
      <Carousel
        class={styles.root}
        aria-label="Dynamic gallery"
        slideCount={visibleSlides().length}
        page={page()}
        onPageChange={(details) => setPage(details.page)}
      >
        <CarouselItemGroup class={styles.itemGroup} aria-label="Dynamic gallery">
          <For each={visibleSlides()}>
            {(slide, index) => (
              <CarouselItem index={index()}>
                <img class={styles.image} src={slide.src} alt={slide.alt} />
              </CarouselItem>
            )}
          </For>
        </CarouselItemGroup>
        <CarouselControl class={styles.control}>
          <CarouselPrevTrigger />
          <CarouselIndicators />
          <CarouselNextTrigger />
        </CarouselControl>
      </Carousel>

      <div>
        <output>Slides: {visibleSlides().length}</output>
        <Button size="sm" variant="outline" onClick={addSlide}>
          Add slide
        </Button>
      </div>
    </div>
  );
}