import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@moduix/react/carousel';
import styles from '@/components/examples/carousel/carousel-slides-per-page.module.css';

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

export default function SlidesPerPageCarousel() {
  return (
    <Carousel
      className={styles.root}
      aria-label="Two-up gallery"
      slideCount={slides.length}
      slidesPerPage={2}
      spacing="var(--moduix-spacing-3)"
    >
      <CarouselControl className={styles.control}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>

      <CarouselItemGroup className={styles.itemGroup} aria-label="Two-up gallery">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id} index={index}>
            <img className={styles.image} src={slide.src} alt={slide.alt} />
          </CarouselItem>
        ))}
      </CarouselItemGroup>

      <CarouselIndicators />
    </Carousel>
  );
}