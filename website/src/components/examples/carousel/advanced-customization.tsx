import { Button } from '@moduix/react/button';
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
} from '@moduix/react/carousel';
import { PreviewMeta } from '@/components/mdx/Components';
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
      className={styles.root}
      aria-label="Advanced customization gallery"
      slideCount={slides.length}
      slidesPerPage={2}
      spacing="var(--moduix-spacing-3)"
    >
      <CarouselItemGroup className={styles.itemGroup} aria-label="Advanced customization gallery">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id} index={index}>
            <img className={styles.image} src={slide.src} alt={slide.alt} />
          </CarouselItem>
        ))}
      </CarouselItemGroup>

      <CarouselContext>
        {(api) => (
          <>
            <CarouselControl className={styles.control}>
              <CarouselPrevTrigger />
              <CarouselIndicatorGroup>
                {api.pageSnapPoints.map((_, index) => (
                  <CarouselIndicator key={index} index={index} />
                ))}
              </CarouselIndicatorGroup>
              <CarouselNextTrigger />
            </CarouselControl>

            <PreviewMeta style={{ marginInline: 'auto' }}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  api.scrollToIndex(3);
                }}
              >
                Go to slide 4
              </Button>
            </PreviewMeta>
          </>
        )}
      </CarouselContext>
    </Carousel>
  );
}